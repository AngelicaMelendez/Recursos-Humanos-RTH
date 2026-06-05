export const ROLE_KEYS = {
  ADMIN_RH: "admin_rh",
  DIRECCION: "direccion_general",
  JEFE_AREA: "jefe_area",
  SUBJEFE_AREA: "subjefe_area",
  RESPONSABLE_DEPARTAMENTO: "responsable_departamento",
  EMPLEADO: "empleado",
  RECEPCION: "recepcion"
};

const ALL_ROLES = Object.values(ROLE_KEYS);

export const ROLE_GROUPS = {
  APPROVERS: [
    ROLE_KEYS.ADMIN_RH,
    ROLE_KEYS.DIRECCION,
    ROLE_KEYS.JEFE_AREA,
    ROLE_KEYS.SUBJEFE_AREA,
    ROLE_KEYS.RESPONSABLE_DEPARTAMENTO
  ],
  ANNOUNCEMENT_MANAGERS: [
    ROLE_KEYS.ADMIN_RH,
    ROLE_KEYS.JEFE_AREA,
    ROLE_KEYS.SUBJEFE_AREA,
    ROLE_KEYS.RESPONSABLE_DEPARTAMENTO
  ],
  ATTENDANCE_REVIEW: [
    ROLE_KEYS.ADMIN_RH,
    ROLE_KEYS.JEFE_AREA,
    ROLE_KEYS.SUBJEFE_AREA,
    ROLE_KEYS.RESPONSABLE_DEPARTAMENTO
  ]
};

const roleAliases = {
  admin: ROLE_KEYS.ADMIN_RH,
  administrador: ROLE_KEYS.ADMIN_RH,
  admin_rh: ROLE_KEYS.ADMIN_RH,
  "administrador rh": ROLE_KEYS.ADMIN_RH,
  direccion: ROLE_KEYS.DIRECCION,
  direccion_general: ROLE_KEYS.DIRECCION,
  director_general: ROLE_KEYS.DIRECCION,
  "direccion general": ROLE_KEYS.DIRECCION,
  "dirección general": ROLE_KEYS.DIRECCION,
  jefe: ROLE_KEYS.JEFE_AREA,
  jefe_area: ROLE_KEYS.JEFE_AREA,
  "jefe de area": ROLE_KEYS.JEFE_AREA,
  "jefe de área": ROLE_KEYS.JEFE_AREA,
  "jefes de area": ROLE_KEYS.JEFE_AREA,
  subjefe: ROLE_KEYS.SUBJEFE_AREA,
  subjefe_area: ROLE_KEYS.SUBJEFE_AREA,
  "subjefe de area": ROLE_KEYS.SUBJEFE_AREA,
  "subjefe de área": ROLE_KEYS.SUBJEFE_AREA,
  subdireccion: ROLE_KEYS.SUBJEFE_AREA,
  responsable_departamento: ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  jefe_departamento: ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  departamento: ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  "responsable de departamento": ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  empleado: ROLE_KEYS.EMPLEADO,
  recepcion: ROLE_KEYS.RECEPCION
};

const moduleByRoute = {
  "/": "dashboard",
  "/calendario": "calendar",
  "/directorio": "directory",
  "/organigrama": "organograma",
  "/solicitudes": "requests",
  "/normatividad": "normativity",
  "/vacantes": "vacancies",
  "/visitantes": "visitors",
  "/auditoria": "audit",
  "/comunicados": "comunicados",
  "/asistencia": "attendance"
};

export const roleLabels = {
  [ROLE_KEYS.ADMIN_RH]: "Administrador RH",
  [ROLE_KEYS.DIRECCION]: "Direccion General",
  [ROLE_KEYS.JEFE_AREA]: "Jefe de Area",
  [ROLE_KEYS.SUBJEFE_AREA]: "Subjefe de Area",
  [ROLE_KEYS.RESPONSABLE_DEPARTAMENTO]: "Responsable de Departamento",
  [ROLE_KEYS.EMPLEADO]: "Empleado",
  [ROLE_KEYS.RECEPCION]: "Recepcion"
};

export const modulePermissions = {
  dashboard: ALL_ROLES,
  calendar: ALL_ROLES,
  directory: ALL_ROLES,
  organograma: ALL_ROLES,
  requests: ALL_ROLES,
  normativity: ALL_ROLES,
  vacancies: ALL_ROLES,
  visitors: ALL_ROLES,
  audit: ALL_ROLES,
  comunicados: ALL_ROLES,
  attendance: ALL_ROLES
};

const actionCatalog = {
  createEmployee: { label: "Alta empleado", icon: "plus", operation: "C" },
  deactivateEmployee: { label: "Baja Lógica", icon: "archive", operation: "D" },
  editEmployee: { label: "Actualizar Expediente", icon: "edit", operation: "U" },
  viewDirectory: { label: "Consultar Directorio", icon: "users", operation: "R" },
  updatePersonalData: { label: "Actualizar mis datos", icon: "edit", operation: "U" },
  uploadPersonalDocument: { label: "Subir documento", icon: "upload", operation: "C" },
  viewWorkHistory: { label: "Historial laboral", icon: "activity", operation: "R" },
  createRequest: { label: "Nueva Solicitud", icon: "plus", operation: "C" },
  deleteRequest: { label: "Eliminar Solicitud", icon: "garbage", operation: "D" },
  approveRequest: { label: "Aprobar Solicitud", icon: "check", operation: "U" },
  rejectRequest: { label: "Rechazar Solicitud", icon: "x", operation: "U" },
  manageIncident: { label: "Gestionar Incidencia", icon: "edit", operation: "U" },
  viewRequests: { label: "Consultar Solicitudes", icon: "file", operation: "R" },
  downloadRequestDocument: { label: "Descargar Documento", icon: "download", operation: "R" },
  publishVacancy: { label: "Publicar Vacante", icon: "plus", operation: "C" },
  closeVacancy: { label: "Cerrar Vacante", icon: "archive", operation: "U" },
  viewVacancies: { label: "Consultar Vacantes", icon: "briefcase", operation: "R" },
  uploadNormativity: { label: "Subir Normatividad", icon: "upload", operation: "C" },
  updateNormativity: { label: "Actualizar Documento", icon: "edit", operation: "U" },
  deactivateNormativity: { label: "Baja Lógica", icon: "archive", operation: "D" },
  viewNormativity: { label: "Consultar Repositorio", icon: "shield", operation: "R" },
  registerVisitor: { label: "Registrar Entrada", icon: "plus", operation: "C" },
  registerVisitorExit: { label: "Registrar Salida", icon: "check", operation: "U" },
  assignBadge: { label: "Asignar Gafete", icon: "tag", operation: "U" },
  viewVisitors: { label: "Visitantes Activos", icon: "door", operation: "R" },
  fullAudit: { label: "Auditoria Completa", icon: "activity", operation: "R" },
  crearComunicado: { label: "Publicar comunicado", icon: "plus", operation: "C" },
  editarComunicado: { label: "Editar comunicado", icon: "edit", operation: "U" },
  eliminarComunicado: { label: "Eliminar comunicado", icon: "trash", operation: "D" },
  verComunicados: { label: "Ver comunicados", icon: "send", operation: "R" },
  reaccionarComunicado: { label: "Reaccionar", icon: "thumbs-up", operation: "U" },
  verHistorialAsistencia: { label: "Ver historial", icon: "activity", operation: "R" },
  registrarAsistencia: { label: "Registrar asistencia", icon: "check", operation: "C" }
};

export const roleActionsByModule = {
  directory: {
    [ROLE_KEYS.ADMIN_RH]: ["createEmployee", "editEmployee", "deactivateEmployee", "viewDirectory"],
    [ROLE_KEYS.DIRECCION]: ["viewDirectory"],
    [ROLE_KEYS.JEFE_AREA]: ["viewDirectory"],
    [ROLE_KEYS.SUBJEFE_AREA]: ["viewDirectory"],
    [ROLE_KEYS.RESPONSABLE_DEPARTAMENTO]: ["viewDirectory"],
    [ROLE_KEYS.EMPLEADO]: ["updatePersonalData", "uploadPersonalDocument", "viewWorkHistory"],
    [ROLE_KEYS.RECEPCION]: ["viewDirectory"]
  },
  requests: {
    [ROLE_KEYS.ADMIN_RH]: ["createRequest", "deleteRequest", "approveRequest", "rejectRequest", "manageIncident", "viewRequests", "downloadRequestDocument"],
    [ROLE_KEYS.DIRECCION]: ["createRequest", "deleteRequest", "approveRequest", "rejectRequest", "viewRequests", "downloadRequestDocument"],
    [ROLE_KEYS.JEFE_AREA]: ["createRequest", "deleteRequest", "approveRequest", "rejectRequest", "manageIncident", "viewRequests", "downloadRequestDocument"],
    // ✅ Agregados los privilegios que faltaban para Subjefes y Responsables tras el merge
    [ROLE_KEYS.SUBJEFE_AREA]: ["createRequest", "deleteRequest", "approveRequest", "rejectRequest", "viewRequests", "downloadRequestDocument"],
    [ROLE_KEYS.RESPONSABLE_DEPARTAMENTO]: ["createRequest", "deleteRequest", "approveRequest", "rejectRequest", "viewRequests", "downloadRequestDocument"],
    [ROLE_KEYS.EMPLEADO]: ["createRequest", "deleteRequest", "viewRequests", "downloadRequestDocument"],
    [ROLE_KEYS.RECEPCION]: ["createRequest", "deleteRequest", "viewRequests"]
  },
  vacancies: {
    [ROLE_KEYS.ADMIN_RH]: ["publishVacancy", "closeVacancy", "viewVacancies"],
    [ROLE_KEYS.DIRECCION]: ["viewVacancies"],
    [ROLE_KEYS.JEFE_AREA]: ["viewVacancies"],
    [ROLE_KEYS.SUBJEFE_AREA]: ["viewVacancies"],
    [ROLE_KEYS.RESPONSABLE_DEPARTAMENTO]: ["viewVacancies"],
    [ROLE_KEYS.EMPLEADO]: ["viewVacancies"],
    [ROLE_KEYS.RECEPCION]: ["viewVacancies"]
  },
  normativity: {
    [ROLE_KEYS.ADMIN_RH]: ["uploadNormativity", "updateNormativity", "deactivateNormativity", "viewNormativity"],
    [ROLE_KEYS.DIRECCION]: ["viewNormativity"],
    [ROLE_KEYS.JEFE_AREA]: ["viewNormativity"],
    [ROLE_KEYS.SUBJEFE_AREA]: ["viewNormativity"],
    [ROLE_KEYS.RESPONSABLE_DEPARTAMENTO]: ["viewNormativity"],
    [ROLE_KEYS.EMPLEADO]: ["viewNormativity"],
    [ROLE_KEYS.RECEPCION]: ["viewNormativity"]
  },
  visitors: {
    [ROLE_KEYS.ADMIN_RH]: ["registerVisitor", "registerVisitorExit", "assignBadge", "viewVisitors", "fullAudit"],
    [ROLE_KEYS.RECEPCION]: ["registerVisitor", "registerVisitorExit", "assignBadge", "viewVisitors"],
    [ROLE_KEYS.DIRECCION]: ["viewVisitors"],
    [ROLE_KEYS.JEFE_AREA]: ["viewVisitors"],
    [ROLE_KEYS.SUBJEFE_AREA]: ["viewVisitors"],
    [ROLE_KEYS.RESPONSABLE_DEPARTAMENTO]: ["viewVisitors"],
    [ROLE_KEYS.EMPLEADO]: ["viewVisitors"]
  },
  comunicados: {
    [ROLE_KEYS.ADMIN_RH]: ["crearComunicado", "editarComunicado", "eliminarComunicado", "verComunicados", "reaccionarComunicado"],
    [ROLE_KEYS.DIRECCION]: ["verComunicados", "reaccionarComunicado"],
    [ROLE_KEYS.JEFE_AREA]: ["crearComunicado", "editarComunicado", "eliminarComunicado", "verComunicados", "reaccionarComunicado"],
    [ROLE_KEYS.SUBJEFE_AREA]: ["crearComunicado", "editarComunicado", "eliminarComunicado", "verComunicados", "reaccionarComunicado"],
    [ROLE_KEYS.RESPONSABLE_DEPARTAMENTO]: ["crearComunicado", "editarComunicado", "eliminarComunicado", "verComunicados", "reaccionarComunicado"],
    [ROLE_KEYS.EMPLEADO]: ["verComunicados", "reaccionarComunicado"],
    [ROLE_KEYS.RECEPCION]: ["verComunicados", "reaccionarComunicado"]
  },
  attendance: {
    [ROLE_KEYS.ADMIN_RH]: ["registrarAsistencia", "verHistorialAsistencia"],
    [ROLE_KEYS.DIRECCION]: ["registrarAsistencia", "verHistorialAsistencia"],
    [ROLE_KEYS.JEFE_AREA]: ["registrarAsistencia", "verHistorialAsistencia"],
    [ROLE_KEYS.SUBJEFE_AREA]: ["registrarAsistencia", "verHistorialAsistencia"],
    [ROLE_KEYS.RESPONSABLE_DEPARTAMENTO]: ["registrarAsistencia", "verHistorialAsistencia"],
    [ROLE_KEYS.EMPLEADO]: ["registrarAsistencia", "verHistorialAsistencia"],
    [ROLE_KEYS.RECEPCION]: ["registrarAsistencia", "verHistorialAsistencia"]
  }
};

const resolveRoleValue = (roleOrUser) => {
  if (!roleOrUser) return "";
  if (typeof roleOrUser === "object") {
    return String(roleOrUser.rol_clave || roleOrUser.rol || "").trim().toLowerCase();
  }
  return String(roleOrUser).trim().toLowerCase();
};

export const normalizeRole = (roleOrUser) => roleAliases[resolveRoleValue(roleOrUser)] || ROLE_KEYS.EMPLEADO;

export const hasAnyRole = (roleOrUser, allowedRoles = []) =>
  allowedRoles.flat().filter(Boolean).includes(normalizeRole(roleOrUser));

export const canAccessModule = (roleOrUser, moduleKey) =>
  Boolean(modulePermissions[moduleKey]?.includes(normalizeRole(roleOrUser)));

export const filterNavigationByRole = (items, roleOrUser) =>
  items.filter((item) => canAccessModule(roleOrUser, item.module || moduleByRoute[item.route]));

export const getRoleActions = (roleOrUser, moduleKey) => {
  const normalizedRole = normalizeRole(roleOrUser);
  const actionKeys = roleActionsByModule[moduleKey]?.[normalizedRole] || [];

  return actionKeys.map((key) => ({
    key,
    ...actionCatalog[key]
  }));
};