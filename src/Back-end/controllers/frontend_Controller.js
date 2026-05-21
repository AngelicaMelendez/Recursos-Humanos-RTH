const db = require('../models');

const dashboardData = {
  summary: [
    { label: 'Empleados activos', value: 184, delta: '+6', tone: 'primary' },
    { label: 'Exempleados', value: 37, delta: 'Historico', tone: 'neutral' },
    { label: 'Visitantes hoy', value: 21, delta: '+4', tone: 'accent' },
    { label: 'Pasantes activos', value: 13, delta: '2 por vencer', tone: 'primary' },
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
    { title: 'Aprobacion de vacaciones', description: 'Direccion aprobo una solicitud de vacaciones.', time: 'Hace 18 minutos' },
    { title: 'Alta de visitante', description: 'Recepcion registro una visita institucional.', time: 'Hace 39 minutos' },
    { title: 'Carga documental', description: 'RH agrego constancias de servicio a expedientes.', time: 'Hace 1 hora' },
  ],
  upcomingBirthdays: [
    { name: 'Ana Laura Perez', date: '09 mayo', area: 'Direccion Administrativa' },
    { name: 'Jose Miguel Vargas', date: '11 mayo', area: 'Produccion' },
    { name: 'Monica Duran', date: '14 mayo', area: 'Recursos Humanos' },
  ],
  employeesOnVacation: [
    { name: 'Carlos Ortega', period: '06-10 mayo', relief: 'Comunicacion Social' },
    { name: 'Beatriz Lopez', period: '07-14 mayo', relief: 'Finanzas' },
  ],
  quickActions: [
    { title: 'Registrar visitante', route: '/visitantes' },
    { title: 'Nueva solicitud', route: '/solicitudes' },
    { title: 'Alta de pasante', route: '/pasantes' },
    { title: 'Subir normatividad', route: '/normatividad' },
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
      { title: 'Cumpleanos - Ana Laura Perez', start: '2026-05-09', color: '#2f6b4f' },
      { title: 'Comision - Jose Miguel Vargas', start: '2026-05-14', end: '2026-05-16', color: '#7d2342' },
    ],
  },
  organigram: {
    name: 'Direccion General',
    role: 'Titular del organismo',
    children: [
      {
        name: 'Direccion Administrativa',
        role: 'Recursos, control y planeacion',
        children: [
          { name: 'Recursos Humanos', role: 'Jefatura de departamento' },
          { name: 'Finanzas', role: 'Jefatura de departamento' },
        ],
      },
      {
        name: 'Direccion de Produccion',
        role: 'Operacion radio y television',
        children: [
          { name: 'Produccion TV', role: 'Coordinacion' },
          { name: 'Produccion Radio', role: 'Coordinacion' },
        ],
      },
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
    return res.json(fallbackValue);
  }
}

exports.dashboard = async (req, res) => {
  try {
    const [activos, bajas, visitantesHoy, vacantes, solicitudes, incidencias] = await Promise.all([
      db.Empleado.count({ where: { estatus: 'activo' } }),
      db.Empleado.count({ where: { estatus: 'baja' } }),
      db.Visitante.count({ where: { fecha_entrada: new Date().toISOString().slice(0, 10) } }),
      db.Vacante.count({ where: { estatus: 'abierta' } }),
      db.Solicitud.count({ where: { estatus: 'pendiente' } }),
      db.Incidencia.count(),
    ]);

    res.json({
      ...dashboardData,
      summary: [
        { label: 'Empleados activos', value: activos, delta: 'BD', tone: 'primary' },
        { label: 'Exempleados', value: bajas, delta: 'Historico', tone: 'neutral' },
        { label: 'Visitantes hoy', value: visitantesHoy, delta: 'Hoy', tone: 'accent' },
        { label: 'Pasantes activos', value: fallback.pasantes.length, delta: 'Pendiente BD', tone: 'primary' },
        { label: 'Vacantes abiertas', value: vacantes, delta: 'BD', tone: 'accent' },
        { label: 'Solicitudes pendientes', value: solicitudes, delta: 'BD', tone: 'warning' },
        { label: 'Incidencias del mes', value: incidencias, delta: 'BD', tone: 'neutral' },
        { label: 'Vacaciones activas', value: dashboardData.employeesOnVacation.length, delta: 'Semana actual', tone: 'primary' },
      ],
    });
  } catch (error) {
    res.status(500).json({
      error: 'No se pudo obtener el dashboard desde la base de datos',
      details: error.message,
    });
  }
};

exports.directorio = async (req, res) => withFallback(res, fallback.directory, async () => {
  const empleados = await db.Empleado.findAll({ include: [{ association: 'area' }, { association: 'puesto' }] });
  const rows = empleados.map((empleado) => ({
    id: `EMP-${String(empleado.id).padStart(3, '0')}`,
    nombre: empleado.nombre,
    area: empleado.area?.nombre || 'Sin area',
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
          title: `Solicitud pendiente - ${item.empleado?.nombre || `EMP-${String(item.empleado_id).padStart(3, '0')}`}`,
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
  const areas = await db.Area.findAll({ include: [{ association: 'empleados' }] });
  const byParent = new Map();
  areas.forEach((area) => {
    const key = area.area_padre_id || 'root';
    byParent.set(key, [...(byParent.get(key) || []), area]);
  });

  const build = (parentId = 'root') => (byParent.get(parentId) || []).map((area) => ({
    name: area.nombre,
    role: 'Area institucional',
    children: [
      ...(area.empleados || []).map((empleado) => ({ name: empleado.nombre, role: 'Colaborador' })),
      ...build(area.id),
    ],
  }));

  return { name: 'Direccion General', role: 'Titular del organismo', children: build() };
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

exports.normatividad = async (req, res) => withFallback(res, fallback.normatividad, async () => db.Normatividad.findAll());

exports.vacantes = async (req, res) => withFallback(res, fallback.vacantes, async () => {
  const rows = await db.Vacante.findAll({ include: [{ model: db.Area, as: 'area', required: false }] });
  return rows.map((row) => ({
    id: `VAC-${row.id}`,
    area: row.area?.nombre || 'Sin area',
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
