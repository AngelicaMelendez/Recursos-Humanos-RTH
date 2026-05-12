export const navigationItems = [
  { label: "Dashboard", route: "/", icon: "grid", module: "dashboard" },
  { label: "Calendario", route: "/calendario", icon: "calendar", module: "calendar" },
  { label: "Organigrama", route: "/organigrama", icon: "hierarchy", module: "organigram" },
  { label: "Directorio", route: "/directorio", icon: "users", module: "directory" },
  { label: "Solicitudes", route: "/solicitudes", icon: "file", module: "requests" },
  { label: "Normatividad", route: "/normatividad", icon: "shield", module: "normativity" },
  { label: "Vacantes", route: "/vacantes", icon: "briefcase", module: "vacancies" },
  { label: "Visitantes", route: "/visitantes", icon: "door", module: "visitors" },
  { label: "Control de accesos", route: "/control-accesos", icon: "lock", module: "accessControl" },
  { label: "Auditoría", route: "/auditoria", icon: "activity" }
];

export const dashboardFallback = {
  summary: [
    { label: "Empleados activos", value: 184, delta: "+6", tone: "primary" },
    { label: "Exempleados", value: 37, delta: "Histórico", tone: "neutral" },
    { label: "Visitantes hoy", value: 21, delta: "+4", tone: "accent" },
    { label: "Vacantes abiertas", value: 9, delta: "3 urgentes", tone: "accent" },
    { label: "Solicitudes pendientes", value: 17, delta: "6 RH", tone: "warning" },
    { label: "Incidencias del mes", value: 28, delta: "-3", tone: "neutral" },
    { label: "Vacaciones activas", value: 11, delta: "Semana actual", tone: "primary" }
  ],
  charts: {
    incidentsByType: [
      { label: "Vacaciones", value: 12 },
      { label: "Incapacidad", value: 5 },
      { label: "Comisión", value: 6 },
      { label: "Permiso", value: 5 }
    ],
    requestsByStatus: [
      { label: "Pendiente", value: 17 },
      { label: "Aprobada", value: 43 },
      { label: "Rechazada", value: 4 }
    ]
  },
  recentActivity: [
    {
      title: "Aprobación de vacaciones",
      description: "Dirección aprobó la solicitud de María Ángeles Hernández.",
      time: "Hace 18 minutos"
    },
    {
      title: "Alta de visitante",
      description: "Recepción registró la visita institucional de la UAEH.",
      time: "Hace 39 minutos"
    },
    {
      title: "Carga documental",
      description: "RH agregó constancias de servicio a 3 expedientes.",
      time: "Hace 1 hora"
    }
  ],
  upcomingBirthdays: [
    { name: "Ana Laura Pérez", date: "09 mayo", area: "Dirección Administrativa" },
    { name: "José Miguel Vargas", date: "11 mayo", area: "Producción" },
    { name: "Mónica Durán", date: "14 mayo", area: "Recursos Humanos" }
  ],
  employeesOnVacation: [
    { name: "Carlos Ortega", period: "06-10 mayo", relief: "Comunicación Social" },
    { name: "Beatriz López", period: "07-14 mayo", relief: "Finanzas" }
  ],
  quickActions: [
    { title: "Registrar visitante", route: "/visitantes" },
    { title: "Nueva solicitud", route: "/solicitudes" },
    { title: "Subir normatividad", route: "/normatividad" }
  ]
};

export const requestStatusColors = {
  pendiente: "warning",
  aprobada: "success",
  rechazada: "danger",
  activa: "primary",
  activo: "primary",
  abierta: "primary",
  baja: "neutral",
  inactiva: "neutral"
};
