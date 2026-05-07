import {
  AuditLog,
  Employee,
  Incident,
  Intern,
  Request,
  Vacancy,
  Visitor
} from "../models/index.js";

export const getDashboardSummary = async () => {
  const [
    activeEmployees,
    formerEmployees,
    todayVisitors,
    activeInterns,
    openVacancies,
    pendingRequests,
    monthlyIncidents,
    recentLogs
  ] = await Promise.all([
    Employee.count({ where: { estatus: "activo" } }),
    Employee.count({ where: { estatus: "baja" } }),
    Visitor.count(),
    Intern.count({ where: { estatus: "activo" } }),
    Vacancy.count({ where: { estatus: "abierta" } }),
    Request.count({ where: { estatus: "pendiente" } }),
    Incident.count(),
    AuditLog.findAll({ order: [["fecha", "DESC"]], limit: 5 })
  ]);

  return {
    summary: [
      { label: "Empleados activos", value: activeEmployees, delta: "Plantilla vigente", tone: "primary" },
      { label: "Exempleados", value: formerEmployees, delta: "Histórico", tone: "neutral" },
      { label: "Visitantes hoy", value: todayVisitors, delta: "Acceso diario", tone: "accent" },
      { label: "Pasantes activos", value: activeInterns, delta: "Convenios vigentes", tone: "primary" },
      { label: "Vacantes abiertas", value: openVacancies, delta: "Cobertura", tone: "accent" },
      { label: "Solicitudes pendientes", value: pendingRequests, delta: "Por resolver", tone: "warning" },
      { label: "Incidencias del mes", value: monthlyIncidents, delta: "Seguimiento", tone: "neutral" },
      { label: "Eventos auditados", value: recentLogs.length, delta: "Últimos movimientos", tone: "primary" }
    ],
    charts: {
      incidentsByType: [
        { label: "Vacaciones", value: 12 },
        { label: "Incapacidad", value: 6 },
        { label: "Comisión", value: 3 },
        { label: "Permiso", value: 4 }
      ],
      requestsByStatus: [
        { label: "Pendiente", value: pendingRequests },
        { label: "Aprobada", value: 0 },
        { label: "Rechazada", value: 0 }
      ]
    },
    recentActivity: recentLogs.map((log) => ({
      title: log.modulo,
      description: log.accion,
      time: new Date(log.fecha).toLocaleString("es-MX")
    })),
    upcomingBirthdays: [],
    employeesOnVacation: [],
    quickActions: [
      { title: "Registrar visitante", route: "/visitantes" },
      { title: "Nueva solicitud", route: "/solicitudes" },
      { title: "Alta de pasante", route: "/pasantes" },
      { title: "Subir normatividad", route: "/normatividad" }
    ]
  };
};

