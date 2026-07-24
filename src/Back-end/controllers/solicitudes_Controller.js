const db = require('../models');
const { Op } = require('sequelize');
const { ROLE_GROUPS, PERMISSIONS, hasRole } = require('../utils/roles');
const { registrarAuditoria } = require('../utils/audit');

// IMPORTANTE: Asegúrate de importar tu función de notificaciones. 
// Si la tienes en otro archivo, cambia esta línea:
// const { crearNotificacionSolicitud } = require('../utils/notificaciones');
async function crearNotificacionSolicitud({ solicitud, tipo, titulo, mensaje }) {
  console.log(`[Notificación - ${tipo}]: ${titulo} - ${mensaje}`);
  // Aquí va tu lógica real de base de datos para guardar/enviar la notificación.
}

const tiposIncidencia = ['vacaciones', 'permiso', 'incapacidad', 'maternidad', 'paternidad', 'comision', 'otro'];

function normalizarTipoIncidencia(tipo) {
  const normalizado = String(tipo || '').toLowerCase();
  return tiposIncidencia.includes(normalizado) ? normalizado : 'otro';
}

function esAutorizador(rol) {
  return hasRole(rol, ROLE_GROUPS.APPROVERS);
}

function puedeVerTodasLasSolicitudes(rol) {
  return hasRole(rol, PERMISSIONS.VIEWERS);
}

function fechaLocalActual() {
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, '0');
  const day = String(hoy.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function validarPeriodoSolicitud({ fecha_inicio, fecha_fin }) {
  const hoy = fechaLocalActual();

  if (!fecha_inicio || !fecha_fin) {
    return 'La fecha de inicio y fin son obligatorias';
  }

  if (fecha_inicio < hoy || fecha_fin < hoy) {
    return 'La solicitud solo puede iniciar en el dia actual o en una fecha posterior';
  }

  if (fecha_fin < fecha_inicio) {
    return 'La fecha final no puede ser anterior a la fecha de inicio';
  }

  return null;
}

// Modificamos esta función para que busque por coincidencia parcial (LIKE) 
// tanto en RFC como en el nuevo campo No_de_empleado
function construirFiltroEmpleado(query) {
  const buscar = String(query.buscar || query.search || query.q || '').trim();
  const filtro = String(query.filtro || query.tipoFiltro || query.campo || '').toLowerCase();

  if (!buscar) {
    return null;
  }

  // 1. Si el usuario eligió filtrar solo por Número de Empleado
  if (filtro === 'empleado' || filtro === 'no_empleado' || filtro === 'numero_empleado') {
    return { No_de_empleado: { [Op.like]: `%${buscar}%` } };
  }

  // 2. Si el usuario eligió filtrar solo por RFC
  if (filtro === 'rfc') {
    return { rfc: { [Op.like]: `%${buscar.toUpperCase()}%` } };
  }

  // 3. AUTOCOMPLETADO MIXTO
  return {
    autocompletar: true,
    buscar: buscar
  };
}

async function obtenerSolicitudes(query = {}, usuarioActual = {}) {
  const filtroEmpleado = construirFiltroEmpleado(query);
  const esVisorGlobal = puedeVerTodasLasSolicitudes(usuarioActual.rol);
  
  // Base del WHERE para la Solicitud
  let whereSolicitud = esVisorGlobal ? {} : { empleado_id: usuarioActual.empleado_id || -1 };

  // Definición de la tabla Empleado que vamos a incluir (JOIN)
  const empleadoInclude = {
    model: db.Empleado,
    as: 'empleado',
    attributes: ['id', 'nombre', 'apellidos', 'rfc', 'No_de_empleado'],
  };

  // Necesitamos subQuery en false si filtramos por campos de la tabla hija/asociada
  let forceSubQueryFalse = false;

  // Aplicamos la lógica de autocompletado o filtros específicos
  if (filtroEmpleado) {
    if (filtroEmpleado.autocompletar) {
      whereSolicitud = {
        ...whereSolicitud,
        [Op.or]: [
          { '$empleado.rfc$': { [Op.like]: `%${filtroEmpleado.buscar.toUpperCase()}%` } },
          { '$empleado.No_de_empleado$': { [Op.like]: `%${filtroEmpleado.buscar}%` } }
        ]
      };
      empleadoInclude.required = true;
      forceSubQueryFalse = true; // Forzamos a Sequelize a no meter esto en una subconsulta
    } else {
      empleadoInclude.where = filtroEmpleado;
      empleadoInclude.required = true;
    }
  }

  return db.Solicitud.findAll({
    where: whereSolicitud,
    include: [
      empleadoInclude,
      {
        model: db.Empleado,
        as: 'aprobador',
        attributes: ['id', 'nombre'],
      },
    ],
    // Si metimos filtros avanzados en asociaciones, subQuery debe ser false
    ...(forceSubQueryFalse && { subQuery: false }), 
    order: [['createdAt', 'DESC']],
  });
}

exports.listar = async (req, res) => {
  try {
    const solicitudes = await obtenerSolicitudes(req.query, req.user);
    // Convertimos cada registro a JSON plano antes de formatear
    res.json(solicitudes.map(sol => toFrontendSolicitud(sol.toJSON ? sol.toJSON() : sol)));
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las solicitudes', details: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const errorPeriodo = validarPeriodoSolicitud(req.body);
    if (errorPeriodo) {
      return res.status(400).json({ error: errorPeriodo });
    }

    const solicitud = await db.Solicitud.create({
      ...req.body,
      documento_adjunto: req.file ? `uploads/${req.file.filename}` : req.body.documento_adjunto,
      empleado_id: req.user.empleado_id,
      estatus: 'pendiente',
    });

    await registrarAuditoria(req, {
      modulo: 'Solicitudes',
      accion: `Creo solicitud FOL-${solicitud.id}`,
    });

    // Lo pasamos a objeto plano antes del formato frontend
    res.status(201).json(toFrontendSolicitud(solicitud.get({ plain: true })));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear la solicitud', details: error.message });
  }
};

exports.aprobar = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await db.Solicitud.findByPk(id);
    if (!solicitud) return res.status(404).json({ error: 'No existe' });
    if (solicitud.estatus !== 'pendiente') {
      return res.status(400).json({ error: 'Solo se puede aprobar una pendiente' });
    }

    solicitud.estatus = 'aprobado';
    solicitud.aprobado_por = req.user.empleado_id;
    solicitud.fecha_resolucion = new Date();
    await solicitud.save();

    await db.Incidencia.create({
      empleado_id: solicitud.empleado_id,
      tipo: normalizarTipoIncidencia(solicitud.tipo),
      titulo: `${solicitud.tipo} - solicitud FOL-${solicitud.id}`,
      descripcion: solicitud.motivo,
      fecha_inicio: solicitud.fecha_inicio,
      fecha_fin: solicitud.fecha_fin,
      estatus: 'aprobado',
      documento_pdf: solicitud.documento_adjunto,
    });

    await crearNotificacionSolicitud({
      solicitud,
      tipo: 'solicitud_aprobada',
      titulo: 'Solicitud aprobada',
      mensaje: `Tu solicitud de ${solicitud.tipo} fue aprobada y ya cuenta con seguimiento en el sistema.`,
    });

    await registrarAuditoria(req, {
      modulo: 'Solicitudes',
      accion: `Aprobo solicitud FOL-${solicitud.id}`,
    });

    res.json(toFrontendSolicitud(solicitud.get({ plain: true })));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo aprobar la solicitud', details: error.message });
  }
};

exports.rechazar = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await db.Solicitud.findByPk(id);
    if (!solicitud) return res.status(404).json({ error: 'No existe' });
    if (solicitud.estatus !== 'pendiente') {
      return res.status(400).json({ error: 'Solo se puede rechazar una pendiente' });
    }

    solicitud.estatus = 'rechazado';
    solicitud.aprobado_por = req.user.empleado_id;
    solicitud.fecha_resolucion = new Date();
    await solicitud.save();

    await crearNotificacionSolicitud({
      solicitud,
      tipo: 'solicitud_rechazada',
      titulo: 'Solicitud rechazada',
      mensaje: `Tu solicitud de ${solicitud.tipo} fue rechazada.`,
    });

    await registrarAuditoria(req, {
      modulo: 'Solicitudes',
      accion: `Rechazo solicitud FOL-${solicitud.id}`,
    });

    res.json(toFrontendSolicitud(solicitud.get({ plain: true })));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo rechazar la solicitud', details: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await db.Solicitud.findByPk(id);

    if (!solicitud) {
      return res.status(404).json({ error: 'No existe la solicitud' });
    }

    const esPropia = solicitud.empleado_id === req.user.empleado_id;
    if (!esPropia && !esAutorizador(req.user.rol)) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar esta solicitud' });
    }

    if (solicitud.estatus !== 'pendiente') {
      return res.status(400).json({ error: 'Solo se pueden eliminar solicitudes pendientes' });
    }

    await solicitud.destroy();
    await registrarAuditoria(req, {
      modulo: 'Solicitudes',
      accion: `Elimino solicitud FOL-${id}`,
    });
    res.json({ mensaje: 'Solicitud eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar la solicitud', details: error.message });
  }
};

function toFrontendSolicitud(row) {
  if (!row) return {};
  const empleadoNombre = [row.empleado?.nombre, row.empleado?.apellidos].filter(Boolean).join(' ');

  return {
    id: `FOL-${row.id}`,
    raw_id: row.id,
    empleado_id: `EMP-${String(row.empleado_id).padStart(3, '0')}`,
    No_de_empleado: row.empleado?.No_de_empleado || 'S/N',
    empleado_nombre: empleadoNombre || row.empleado?.nombre || null,
    empleado_rfc: row.empleado?.rfc || null,
    tipo: row.tipo,
    fecha_inicio: row.fecha_inicio,
    fecha_fin: row.fecha_fin,
    motivo: row.motivo,
    documento_adjunto: row.documento_adjunto,
    estatus: row.estatus === 'aprobado' ? 'aprobada' : row.estatus,
    aprobado_por: row.aprobador?.nombre || row.aprobado_por || 'Pendiente',
    fecha_resolucion: row.fecha_resolucion,
  };
}

exports.toFrontendSolicitud = toFrontendSolicitud;
