const db = require('../models');
const { Op } = require('sequelize');
const { ROLE_GROUPS, hasRole } = require('../utils/roles');

const tiposIncidencia = ['vacaciones', 'permiso', 'incapacidad', 'maternidad', 'paternidad', 'comision', 'otro'];

function normalizarTipoIncidencia(tipo) {
  const normalizado = String(tipo || '').toLowerCase();
  return tiposIncidencia.includes(normalizado) ? normalizado : 'otro';
}

function esAutorizador(rol) {
  return hasRole(rol, ROLE_GROUPS.REQUEST_APPROVERS);
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

function obtenerNumeroEmpleado(valor) {
  const texto = String(valor || '').trim().toUpperCase();
  const numero = texto.replace(/^EMP-?/, '').replace(/\D/g, '');
  return numero ? Number.parseInt(numero, 10) : null;
}

function construirFiltroEmpleado(query) {
  const buscar = String(query.buscar || query.search || query.q || '').trim();
  const filtro = String(query.filtro || query.tipoFiltro || query.campo || '').toLowerCase();

  if (!buscar) {
    return null;
  }

  if (filtro === 'empleado' || filtro === 'no_empleado' || filtro === 'numero_empleado') {
    const empleadoId = obtenerNumeroEmpleado(buscar);
    return { id: empleadoId || -1 };
  }

  if (filtro === 'rfc') {
    return { rfc: { [Op.like]: `%${buscar.toUpperCase()}%` } };
  }

  const empleadoId = obtenerNumeroEmpleado(buscar);
  return {
    [Op.or]: [
      { rfc: { [Op.like]: `%${buscar.toUpperCase()}%` } },
      ...(empleadoId ? [{ id: empleadoId }] : []),
    ],
  };
}

async function obtenerSolicitudes(query = {}) {
  const filtroEmpleado = construirFiltroEmpleado(query);
  const empleadoInclude = {
    model: db.Empleado,
    as: 'empleado',
    attributes: ['id', 'nombre', 'apellidos', 'rfc'],
  };

  if (filtroEmpleado) {
    empleadoInclude.where = filtroEmpleado;
    empleadoInclude.required = true;
  }

  return db.Solicitud.findAll({
    include: [
      empleadoInclude,
      {
        model: db.Empleado,
        as: 'aprobador',
        attributes: ['id', 'nombre'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
}

async function crearNotificacionSolicitud({ solicitud, tipo, titulo, mensaje }) {
  const usuarioSolicitante = await db.Usuario.findOne({
    where: { empleado_id: solicitud.empleado_id },
  });

  if (!usuarioSolicitante) {
    return;
  }

  await db.Notificacion.create({
    usuario_id: usuarioSolicitante.id,
    tipo,
    titulo,
    mensaje,
    metadata: {
      solicitud_id: solicitud.id,
      empleado_id: solicitud.empleado_id,
      fecha_inicio: solicitud.fecha_inicio,
      fecha_fin: solicitud.fecha_fin,
      estatus: solicitud.estatus,
    },
  });
}

exports.listar = async (req, res) => {
  try {
    if (!esAutorizador(req.user.rol)) {
      return res.status(403).json({ error: 'Solo un administrador puede consultar solicitudes' });
    }

    const solicitudes = await obtenerSolicitudes(req.query);
    res.json(solicitudes.map(toFrontendSolicitud));
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
      empleado_id: req.user.empleado_id,
      estatus: 'pendiente',
    });
    res.status(201).json(toFrontendSolicitud(solicitud));
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
      titulo: `${solicitud.tipo} - solicitud SOL-${solicitud.id}`,
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

    res.json(toFrontendSolicitud(solicitud));
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

    res.json(toFrontendSolicitud(solicitud));
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
    res.json({ mensaje: 'Solicitud eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar la solicitud', details: error.message });
  }
};

function toFrontendSolicitud(row) {
  const empleadoNombre = [row.empleado?.nombre, row.empleado?.apellidos].filter(Boolean).join(' ');

  return {
    id: `SOL-${row.id}`,
    raw_id: row.id,
    empleado_id: `EMP-${String(row.empleado_id).padStart(3, '0')}`,
    empleado_numero: `EMP-${String(row.empleado_id).padStart(3, '0')}`,
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
