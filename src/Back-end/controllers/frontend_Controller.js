const db = require('../models');

const dashboardData = {
  summary: [
    { label: 'Empleados activos', value: 184, delta: '+6', tone: 'primary' },
    { label: 'Exempleados', value: 37, delta: 'Historico', tone: 'neutral' },
    { label: 'Vacantes abiertas', value: 9, delta: '3 urgentes', tone: 'accent' },
    { label: 'Solicitudes pendientes', value: 17, delta: '6 RH', tone: 'warning' },
    { label: 'Incidencias del mes', value: 28, delta: '-3', tone: 'neutral' },
    { label: 'Vacaciones activas', value: 11, delta: 'Semana actual', tone: 'primary' },
  ],
  charts: {
    incidentsByType: [
      { label: 'Vacaciones', value: 12 },
      { label: 'Incapacidad', value: 5 },
      { label: 'Comision', value: 6 },
      { label: 'Permiso', value: 5 },
    ],
    requestsByStatus: [
      { label: 'Pendiente', value: 17 },
      { label: 'Aprobada', value: 43 },
      { label: 'Rechazada', value: 4 },
    ],
  },
  recentActivity: [
    { title: 'Aprobacion de Vacaciones', description: 'Direccion aprobo una solicitud de vacaciones.', time: 'Hace 18 minutos' },
    { title: 'Alta de Visitante', description: 'Recepcion registro una visita institucional.', time: 'Hace 39 minutos' },
    { title: 'Carga Documental', description: 'RH agrego constancias de servicio a expedientes.', time: 'Hace 1 hora' },
  ],
  upcomingBirthdays: [
    { name: 'Ana Laura Perez', date: '09 mayo', area: 'Direccion Administrativa' },
    { name: 'Jose Miguel Vargas', date: '11 mayo', area: 'Produccion' },
    { name: 'Monica Duran', date: '14 mayo', area: 'Recursos Humanos' },
    {name : 'Pablo Martinez', date: '30 de Junio', area: 'TI'}
  ],
  employeesOnVacation: [
    { name: 'Carlos Ortega', period: '06-10 mayo', relief: 'Comunicacion Social' },
    { name: 'Beatriz Lopez', period: '07-14 mayo', relief: 'Finanzas' },
  ],
  quickActions: [
    { title: 'Registrar Visitante', route: '/visitantes' },
    { title: 'Nueva Solicitud', route: '/solicitudes' },
    { title: 'Ver Comunicados', route: '/comunicados' },
    { title: 'Subir Normatividad', route: '/normatividad' },
  ],
};

const fallback = {
  directory: {
    activeEmployees: [
      { id: 'EMP-001', nombre: 'Maria Lopez', area: 'Recursos Humanos', puesto: 'Analista', estatus: 'activa' },
      { id: 'EMP-002', nombre: 'Jorge Valencia', area: 'Produccion', puesto: 'Coordinador', estatus: 'activa' },
    ],
    formerEmployees: [
      { id: 'EXP-001', nombre: 'Patricia Ramos', fecha_baja: '2025-11-14', motivo_baja: 'Jubilacion' },
      { id: 'EXP-002', nombre: 'Pedro Salas', fecha_baja: '2026-01-28', motivo_baja: 'Renuncia voluntaria' },
    ],
  },
  calendar: {
    incidents: [
      { id: 1, empleado_id: 'EMP-015', tipo: 'Vacaciones', fecha_inicio: '2026-05-06', fecha_fin: '2026-05-10', estatus: 'aprobada' },
      { id: 2, empleado_id: 'EMP-032', tipo: 'Incapacidad', fecha_inicio: '2026-05-08', fecha_fin: '2026-05-12', estatus: 'pendiente' },
      { id: 3, empleado_id: 'EMP-044', tipo: 'Comision', fecha_inicio: '2026-05-14', fecha_fin: '2026-05-15', estatus: 'aprobada' },
    ],
    events: [
      { title: 'Vacaciones - Carlos Ortega', start: '2026-05-06', end: '2026-05-11', color: '#621132' },
      { title: 'Incapacidad - Laura Mendoza', start: '2026-05-08', end: '2026-05-13', color: '#b38e5d' },
      { title: 'Cumpleaños - Ana Laura Perez', start: '2026-05-09', color: '#2f6b4f' },
      { title: 'Comision - Jose Miguel Vargas', start: '2026-05-14', end: '2026-05-16', color: '#7d2342' },
      { title: 'Cumpleaños - Pablo Martínez', start: '2026-06-30', end: '2026-06-30', color: '#2f6b4f' },
    ],
  },
  organigram: { // <-- Corregido para que coincida con fallback.organigram
    name: 'Direccion General',
    role: 'Titular del organismo',
    children: [
      { name: 'Produccion TV', role: 'Coordinacion' },
      { name: 'Produccion Radio', role: 'Coordinacion' },
    ],
  },
  solicitudes: [
    { id: 'SOL-201', empleado_id: 'EMP-015', tipo: 'Vacaciones', fecha_inicio: '2026-06-01', fecha_fin: '2026-06-05', estatus: 'pendiente', aprobado_por: 'Jefatura pendiente' },
    { id: 'SOL-202', empleado_id: 'EMP-009', tipo: 'Comision', fecha_inicio: '2026-05-15', fecha_fin: '2026-05-16', estatus: 'aprobada', aprobado_por: 'RH' },
  ],
  normatividad: [
    { id: 1, nombre: 'Manual de Procedimientos RH', tipo: 'Manual', version: '2.1', fecha_publicacion: '2026-02-11', estatus: 'activa' },
    { id: 2, nombre: 'Lineamientos de Control de Asistencia', tipo: 'Lineamiento', version: '1.3', fecha_publicacion: '2025-12-20', estatus: 'activa' },
  ],
  vacantes: [
    { id: 'VAC-10', area: 'Produccion TV', puesto: 'Editor de video', tipo_contrato: 'Honorarios', fecha_publicacion: '2026-04-21', estatus: 'activa' },
    { id: 'VAC-11', area: 'Recursos Humanos', puesto: 'Auxiliar documental', tipo_contrato: 'Base', fecha_publicacion: '2026-05-02', estatus: 'pendiente' },
  ],
  visitantes: [
    { id: 'VIS-001', nombre: 'Daniela Flores', institucion: 'UAEH', motivo: 'Convenio', persona_a_visitar: 'Direccion General', hora_entrada: '09:15', hora_salida: '' },
    { id: 'VIS-002', nombre: 'Luis Rios', institucion: 'Contraloria', motivo: 'Entrega documental', persona_a_visitar: 'RH', hora_entrada: '10:40', hora_salida: '11:05' },
  ],
  pasantes: [
    { id: 'PAS-001', nombre: 'Ximena Ponce', institucion: 'Tec de Monterrey', carrera: 'Comunicacion', periodo_inicio: '2026-02-01', periodo_fin: '2026-07-31', estatus: 'activa' },
    { id: 'PAS-002', nombre: 'Arturo Leon', institucion: 'UAEH', carrera: 'Administracion', periodo_inicio: '2026-03-10', periodo_fin: '2026-08-10', estatus: 'pendiente' },
  ],
  accesos: [
    { id: 'USR-001', empleado_id: 'EMP-001', rol: 'Administrador RH', ultimo_acceso: '2026-05-07 08:10' },
    { id: 'USR-002', empleado_id: 'EMP-002', rol: 'Direccion', ultimo_acceso: '2026-05-07 08:22' },
    { id: 'USR-003', empleado_id: 'EMP-009', rol: 'Recepcion', ultimo_acceso: '2026-05-07 07:59' },
  ],
  auditoria: [
    { usuario: 'admin@hidalgo.gob.mx', accion: 'Aprobo solicitud SOL-202', fecha: '2026-05-07 08:16', modulo: 'Solicitudes', ip: '10.10.5.22' },
    { usuario: 'recepcion@hidalgo.gob.mx', accion: 'Registro visitante VIS-001', fecha: '2026-05-07 09:15', modulo: 'Visitantes', ip: '10.10.7.11' },
  ],
};

const eventosFijos = [
  { title: "Día Naranja", start: "2026-06-10", color: "#F97316" },
  { title: "Entrega de Informes", start: "2026-06-15", color: "#0ea5e9" },
  { title: "Día para Realizar Actividad", start: "2026-06-20", color: "#16a34a" },
  { title: "Cumpleaños - Pablo Martínez", start: "2026-06-30", end: "2026-06-30", color: "#2f6b4f" },
];

function statusToFrontend(status) {
  const map = { activo: 'activa', aprobado: 'aprobada', rechazado: 'rechazada', abierta: 'activa' };
  return map[status] || status;
}

async function withFallback(res, fallbackValue, loader) {
  try {
    const data = await loader();
    if (Array.isArray(data) && data.length === 0) return res.json(fallbackValue);
    return res.json(data || fallbackValue);
  } catch (error) {
    console.error("Error cargando de BD, usando fallback:", error); // Añadido para debug
    return res.json(fallbackValue);
  }
}
exports.dashboard = async (req, res) => {
  try {
    // Verificamos de forma segura si los modelos existen en el objeto db antes de llamar a .count()
    const [activos, bajas, visitantesHoy, vacantes, solicitudes, incidencias] = await Promise.all([
      db.Empleado ? db.Empleado.count({ where: { estatus: 'activo' } }).catch(() => 0) : 0,
      db.Empleado ? db.Empleado.count({ where: { estatus: 'baja' } }).catch(() => 0) : 0,
      db.Visitante ? db.Visitante.count({ where: { fecha_entrada: new Date().toISOString().slice(0, 10) } }).catch(() => 0) : 0,
      db.Vacante ? db.Vacante.count({ where: { estatus: 'abierta' } }).catch(() => 0) : 0,
      db.Solicitud ? db.Solicitud.count({ where: { estatus: 'pendiente' } }).catch(() => 0) : 0,
      db.Incidencia ? db.Incidencia.count().catch(() => 0) : 0,
    ]);

    res.json({
      ...dashboardData,
      summary: [
        { label: 'Empleados Activos', value: activos, delta: 'BD', tone: 'primary' },
        { label: 'Exempleados', value: bajas, delta: 'Historico', tone: 'neutral' },
        { label: 'Visitantes Hoy', value: visitantesHoy, delta: 'Hoy', tone: 'accent' },
        { label: 'Vacantes Abiertas', value: vacantes, delta: 'BD', tone: 'accent' },
        { label: 'Solicitudes Pendientes', value: solicitudes, delta: 'BD', tone: 'warning' },
        { label: 'Incidencias del Mes', value: incidencias, delta: 'BD', tone: 'neutral' },
        { label: 'Vacaciones Activas', value: dashboardData.employeesOnVacation.length, delta: 'Semana actual', tone: 'primary' },
      ],
    });
  } catch (error) {
    console.error("❌ Error real en controlador de dashboard:", error);
    res.status(500).json({
      error: 'No se pudo obtener el dashboard desde la base de datos',
      details: error.message,
    });
  }
};

exports.directorio = async (req, res) => withFallback(res, fallback.directory, async () => {
  const empleados = await db.Empleado.findAll({ include: [{ association: 'departamento' }, { association: 'direccion' }, { association: 'puesto' }] });
  const rows = empleados.map((empleado) => ({
    id: `EMP-${String(empleado.id).padStart(3, '0')}`,
    nombre: empleado.nombre,
    area: empleado.departamento?.nombre || empleado.direccion?.nombre || 'Sin unidad',
    puesto: empleado.puesto?.nombre || 'Sin puesto',
    estatus: statusToFrontend(empleado.estatus),
    fecha_baja: empleado.fecha_baja,
    motivo_baja: empleado.motivo_baja,
  }));

  return {
    activeEmployees: rows.filter((row) => row.estatus === 'activa'),
    formerEmployees: rows.filter((row) => row.estatus === 'baja'),
  };
});

exports.calendario = async (req, res) => {
  try {
    const colorPorTipo = {
      vacaciones: '#621132',
      permiso: '#98989A',
      incapacidad: '#98989A',
      maternidad: '#DDC9A3',
      paternidad: '#DDC9A3',
      comision: '#7d2342',
      otro: '#6F7271',
    };

    const addOneDay = (date) => {
      if (!date) return date;
      const nextDate = new Date(`${date}T00:00:00.000Z`);
      nextDate.setUTCDate(nextDate.getUTCDate() + 1);
      return nextDate.toISOString().slice(0, 10);
    };

    const createMonthlyEvents = (title, day, color, year) => {
      const events = [];
      for (let month = 0; month < 264; month += 1) {
        const date = new Date(Date.UTC(year, month, day));
        if (date.getUTCDate() !== day) continue;
        events.push({
          id: `${title.replace(/[^a-zA-Z0-9]/g, '-').toUpperCase()}-${year}-${String(month + 1).padStart(2, '0')}`,
          title,
          start: date.toISOString().slice(0, 10),
          allDay: true,
          color,
        });
      }
      return events;
    };

    const currentYear = new Date().getUTCFullYear();
    const monthlyFixedEvents = [
      ...createMonthlyEvents('Día Naranja', 25, '#F97316', currentYear),
      ...createMonthlyEvents('Entrega de Informes', 14, '#0ea5e9', currentYear),
      ...createMonthlyEvents('Día para Realizar Actividad', 9, '#16a34a', currentYear),

       {
    id: 'CUMPLEAÑOS-PABLO-2026-06-30',
    title: 'Cumpleaños - Pablo',
    start: '2026-06-30',
    allDay: true,
    color: '#2f6b4f',
  },
];

    const [incidents, solicitudes] = await Promise.all([
      db.Incidencia.findAll({
        where: { estatus: 'aprobado' },
        include: [{ association: 'empleado', attributes: ['id', 'nombre'] }],
        order: [['fecha_inicio', 'ASC']],
      }),
      db.Solicitud.findAll({
        where: { estatus: 'pendiente' },
        include: [{ association: 'empleado', attributes: ['id', 'nombre'] }],
        order: [['fecha_inicio', 'ASC']],
      }),
    ]);

    const rows = incidents.map((item) => ({
      id: item.id,
      empleado_id: `EMP-${String(item.empleado_id).padStart(3, '0')}`,
      tipo: item.tipo,
      fecha_inicio: item.fecha_inicio,
      fecha_fin: item.fecha_fin,
      estatus: statusToFrontend(item.estatus),
    }));

    res.json({
      incidents: rows,
      events: [
        ...incidents.map((item) => ({
          id: `INC-${item.id}`,
          title: `${item.tipo} - ${item.empleado?.nombre || `EMP-${String(item.empleado_id).padStart(3, '0')}`}`,
          start: item.fecha_inicio,
          end: addOneDay(item.fecha_fin),
          color: colorPorTipo[item.tipo] || colorPorTipo.otro,
        })),
        ...solicitudes.map((item) => ({
          id: `SOL-${item.id}`,
          title: `Solicitud Pendiente - ${item.empleado?.nombre || `EMP-${String(item.empleado_id).padStart(3, '0')}`}`,
          start: item.fecha_inicio,
          end: addOneDay(item.fecha_fin),
          color: colorPorTipo[item.tipo] || colorPorTipo.otro,
        })),
        ...monthlyFixedEvents,
      ],
    });
  } catch (error) {
    res.status(500).json({
      error: 'No se pudo obtener el calendario desde la base de datos',
      details: error.message,
    });
  }
};


exports.organigrama = async (req, res) => withFallback(res, fallback.organigram, async () => {
  const direcciones = await db.Direccion.findAll({ include: [{ association: 'departamentos' }] });
  const byDireccion = direcciones.map((direccion) => ({
    name: direccion.nombre,
    role: 'Dirección',
    children: direccion.departamentos.map((departamento) => ({
      name: departamento.nombre,
      role: 'Departamento',
      children: [],
    })),
  }));

  return { name: 'Dirección General', role: 'Titular del organismo', children: byDireccion };
});

exports.solicitudes = async (req, res) => withFallback(res, fallback.solicitudes, async () => {
  const rows = await db.Solicitud.findAll();
  return rows.map((row) => ({
    id: `SOL-${row.id}`,
    empleado_id: `EMP-${String(row.empleado_id).padStart(3, '0')}`,
    tipo: row.tipo,
    fecha_inicio: row.fecha_inicio,
    fecha_fin: row.fecha_fin,
    estatus: statusToFrontend(row.estatus),
    aprobado_por: row.aprobado_por || 'Pendiente',
  }));
});

// 1. Modificar la consulta para que devuelva los datos reales de la BD
exports.normatividad = async (req, res) => withFallback(res, fallback.normatividad, async () => {
  return await db.Normatividad.findAll({
    order: [['createdAt', 'DESC']] // Para mostrar las más recientes primero
  });
});

// 2. Agregar la lógica para crear el registro con el PDF adjunto
exports.createNormatividad = async (req, res) => {
  console.log("Modelos disponibles en db:", Object.keys(db)); // 👈 ESTO TE DIRÁ EL NOMBRE EXACTO DEL MODELO
  try {
    const { nombre, tipo, version, fecha_publicacion, estatus } = req.body;

    // Validamos que el nombre sea obligatorio
    if (!nombre) {
      return res.status(400).json({ error: 'El nombre de la normatividad es obligatorio' });
    }

    // Si Multer procesó el archivo con éxito, su ruta estará en req.file.path
    let rutaPdf = null;
    if (req.file) {
      // Reemplazamos diagonales invertidas si estás en Windows para normalizar a URLs válidas
      rutaPdf = req.file.path.replace(/\\/g, '/'); 
    }

    // Creamos el registro en la base de datos utilizando el modelo de Sequelize
    const nuevaNormatividad = await db.Normatividad.create({
      nombre,
      tipo: tipo || null,
      version: version || null,
      fecha_publicacion: fecha_publicacion || null,
      estatus: estatus || 'activa',
      archivo_pdf: rutaPdf // Aquí guardamos 'uploads/nombre-del-archivo.pdf'
    });

    // Respondemos con éxito al cliente (Vue)
    return res.status(201).json({
      message: 'Normatividad creada y archivo subido con éxito',
      data: nuevaNormatividad
    });

  } catch (error) {
    console.error("❌ Error al crear normatividad:", error);
    return res.status(500).json({
      error: 'Error interno al intentar guardar la normatividad',
      details: error.message
    });
  }
};

// 1. Actualizar datos o reemplazar el PDF de una normatividad existente
exports.updateNormatividad = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, version, fecha_publicacion, estatus } = req.body;

    const documento = await db.Normatividad.findByPk(id);
    if (!documento) {
      return res.status(404).json({ error: 'Documento normativo no encontrado' });
    }

    // Si subieron un nuevo PDF, actualizamos la ruta, si no, dejamos la que ya tenía
    let rutaPdf = documento.archivo_pdf;
    if (req.file) {
      rutaPdf = req.file.path.replace(/\\/g, '/');
    }

    await documento.update({
      nombre: nombre || documento.nombre,
      tipo: tipo || documento.tipo,
      version: version || documento.version,
      fecha_publicacion: fecha_publicacion || documento.fecha_publicacion,
      estatus: estatus || documento.estatus,
      archivo_pdf: rutaPdf
    });

    return res.json({ message: 'Documento actualizado con éxito', data: documento });
  } catch (error) {
    console.error("❌ Error al actualizar normatividad:", error);
    return res.status(500).json({ error: 'Error interno al actualizar', details: error.message });
  }
};

// 2. Baja lógica (Cambiar estatus a inactiva)
exports.bajaLogicaNormatividad = async (req, res) => {
  try {
    const { id } = req.params;
    const documento = await db.Normatividad.findByPk(id);

    if (!documento) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    // Cambiamos el estatus a inactiva sin borrar el registro físico
    await documento.update({ estatus: 'inactiva' });

    return res.json({ message: `El documento "${documento.nombre}" ha sido deshabilitado.` });
  } catch (error) {
    console.error("❌ Error en la baja lógica:", error);
    return res.status(500).json({ error: 'Error al procesar la baja lógica' });
  }
};

const fs = require('fs');
const path = require('path');

exports.deleteNormatividad = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el documento para obtener la ruta del archivo
    const documento = await db.Normatividad.findByPk(id);
    if (!documento) {
      return res.status(404).json({ error: 'El documento no existe o ya fue eliminado.' });
    }

    //  Borrar el archivo PDF físico de la carpeta uploads si existe
    if (documento.archivo_pdf) {
      // Ajusta la ruta física relativa al servidor
      const rutaArchivo = path.join(__dirname, '..', documento.archivo_pdf); 
      
      fs.unlink(rutaArchivo, (err) => {
        if (err) {
          console.error("⚠️ No se pudo borrar el archivo físico, tal vez no exista:", err.message);
        } else {
          console.log(`🗑️ Archivo físico eliminado: ${rutaArchivo}`);
        }
      });
    }

    //  Eliminar el registro de la Base de Datos
    await documento.destroy();

    return res.json({ message: 'Documento y archivo eliminados permanentemente.' });
  } catch (error) {
    console.error("❌ Error al eliminar normatividad:", error);
    return res.status(500).json({ error: 'Error interno al eliminar el documento.' });
  }
};

exports.vacantes = async (req, res) => withFallback(res, fallback.vacantes, async () => {
  const rows = await db.Vacante.findAll({ include: [{ model: db.Departamento, as: 'departamento', required: false }] });
  return rows.map((row) => ({
    id: `VAC-${row.id}`,
    area: row.departamento?.nombre || 'Sin unidad',
    puesto: row.puesto,
    tipo_contrato: row.tipo_contrato,
    fecha_publicacion: row.fecha_publicacion,
    estatus: statusToFrontend(row.estatus),
  }));
});

exports.visitantes = async (req, res) => withFallback(res, fallback.visitantes, async () => db.Visitante.findAll());
exports.pasantes = (req, res) => res.json(fallback.pasantes);

exports.accesos = async (req, res) => withFallback(res, fallback.accesos, async () => {
  const rows = await db.Usuario.findAll();
  return rows.map((row) => ({
    id: `USR-${String(row.id).padStart(3, '0')}`,
    empleado_id: `EMP-${String(row.empleado_id).padStart(3, '0')}`,
    rol: row.rol,
    ultimo_acceso: row.updatedAt,
  }));
});

exports.auditoria = async (req, res) => withFallback(res, fallback.auditoria, async () => db.Log.findAll({ order: [['fecha', 'DESC']] }));
