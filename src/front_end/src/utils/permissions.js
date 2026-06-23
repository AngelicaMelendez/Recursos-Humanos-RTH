export const ROLE_KEYS = {
  SUPER_USER: "super_usuario",
  ADMIN_RH: "admin_rh",
  EMPLEADO: "empleado"
};

const ALL_ROLES = Object.values(ROLE_KEYS);

export const ROLE_GROUPS = {
  APPROVERS: [
    ROLE_KEYS.SUPER_USER,
    ROLE_KEYS.ADMIN_RH
  ],
  ANNOUNCEMENT_MANAGERS: [
    ROLE_KEYS.SUPER_USER,
    ROLE_KEYS.ADMIN_RH
    
  ],
  ATTENDANCE_REVIEW: [
    ROLE_KEYS.SUPER_USER,
    ROLE_KEYS.ADMIN_RH,
    ROLE_KEYS.EMPLEADO
  ]
};

const roleAliases = {
  "superuser": ROLE_KEYS.SUPER_USER,
  "super_usuario": ROLE_KEYS.SUPER_USER,
  "super usuario": ROLE_KEYS.SUPER_USER,
  "super-usuario": ROLE_KEYS.SUPER_USER,

  "admin": ROLE_KEYS.ADMIN_RH,
  "administrador": ROLE_KEYS.ADMIN_RH,
  "admin_rh": ROLE_KEYS.ADMIN_RH,
  "admin-rh": ROLE_KEYS.ADMIN_RH,
  "administrador rh": ROLE_KEYS.ADMIN_RH,
  "administrador_rh": ROLE_KEYS.ADMIN_RH,

  "empleado": ROLE_KEYS.EMPLEADO,
  "user": ROLE_KEYS.EMPLEADO,
  "usuario": ROLE_KEYS.EMPLEADO
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
  [ROLE_KEYS.SUPER_USER]: "Super Usuario",
  [ROLE_KEYS.ADMIN_RH]: "Administrador RH",
  [ROLE_KEYS.EMPLEADO]: "Empleado"
};

export const modulePermissions = {
  dashboard: ALL_ROLES,
  calendar: ALL_ROLES,
  directory: ALL_ROLES,
  organograma: ALL_ROLES,
  requests: ALL_ROLES,
  normativity: ALL_ROLES,
  vacancies: ALL_ROLES,
  visitors: [ROLE_KEYS.SUPER_USER,ROLE_KEYS.ADMIN_RH],
  audit: [ROLE_KEYS.SUPER_USER],
  comunicados: ALL_ROLES,
  attendance: ALL_ROLES
};

const actionCatalog = {
  createEmployee: { label: "Alta Empleado", icon: "plus", operation: "C" },
  deactivateEmployee: { label: "Baja Lógica", icon: "archive", operation: "D" },
  editEmployee: { label: "Actualizar Expediente", icon: "edit", operation: "U" },
  viewDirectory: { label: "Consultar Directorio", icon: "users", operation: "R" },
  updatePersonalData: { label: "Actualizar Mis Datos", icon: "edit", operation: "U" },
  uploadPersonalDocument: { label: "Subir Documento", icon: "upload", operation: "C" },
  viewWorkHistory: { label: "Historial Laboral", icon: "activity", operation: "R" },
  createRequest: { label: "Nueva Solicitud", icon: "plus", operation: "C" },
  deleteRequest: { label: "Eliminar Solicitud", icon: "garbage", operation: "D" },
  approveRequest: { label: "Aprobar Solicitud", icon: "check", operation: "U" },
  rejectRequest: { label: "Rechazar Solicitud", icon: "x", operation: "U" },
  manageIncident: { label: "Gestionar Incidencia", icon: "edit", operation: "U" },
  viewRequests: { label: "Consultar Solicitudes", icon: "file", operation: "R" },
  downloadRequestDocument: { label: "Descargar Documento", icon: "saveAlt", operation: "R" },
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
  crearComunicado: { label: "Publicar Comunicado", icon: "plus", operation: "C" },
  editarComunicado: { label: "Editar Comunicado", icon: "edit", operation: "U" },
  eliminarComunicado: { label: "Eliminar Comunicado", icon: "trash", operation: "D" },
  verComunicados: { label: "Ver Comunicados", icon: "send", operation: "R" },
  reaccionarComunicado: { label: "Reaccionar", icon: "thumbs-up", operation: "U" },
  verHistorialAsistencia: { label: "Ver Historial", icon: "activity", operation: "R" },
  registrarAsistencia: { label: "Registrar Asistencia", icon: "check", operation: "C" }
};

export const roleActionsByModule = {
  directory: {
    [ROLE_KEYS.SUPER_USER]: ["viewDirectory"],
    [ROLE_KEYS.ADMIN_RH]: ["createEmployee", "editEmployee", "deactivateEmployee", "viewDirectory"],
    [ROLE_KEYS.EMPLEADO]: ["updatePersonalData", "uploadPersonalDocument", "viewWorkHistory"]
  },
  requests: {
    [ROLE_KEYS.SUPER_USER]: ["createRequest", "deleteRequest","viewRequests"],
    [ROLE_KEYS.ADMIN_RH]: ["createRequest", "deleteRequest", "approveRequest", "rejectRequest", "manageIncident", "viewRequests", "downloadRequestDocument"],
    [ROLE_KEYS.EMPLEADO]: ["createRequest", "deleteRequest", "viewRequests", "downloadRequestDocument"]
  },
  vacancies: {
    [ROLE_KEYS.SUPER_USER]: ["publishVacancy", "closeVacancy", "viewVacancies"],
    [ROLE_KEYS.ADMIN_RH]: ["publishVacancy", "closeVacancy", "viewVacancies"],
    [ROLE_KEYS.EMPLEADO]: ["viewVacancies"]
  },
  normativity: {
    [ROLE_KEYS.SUPER_USER]: ["uploadNormativity", "updateNormativity", "deactivateNormativity", "viewNormativity"],
    [ROLE_KEYS.ADMIN_RH]: ["uploadNormativity", "updateNormativity", "deactivateNormativity", "viewNormativity"],
    [ROLE_KEYS.EMPLEADO]: ["viewNormativity"]
  },
  visitors: {
    [ROLE_KEYS.SUPER_USER]: ["registerVisitor", "registerVisitorExit", "assignBadge", "viewVisitors", "fullAudit"],
    [ROLE_KEYS.ADMIN_RH]: ["registerVisitor", "registerVisitorExit", "assignBadge", "viewVisitors", "fullAudit"]
  },
  comunicados: {
    [ROLE_KEYS.SUPER_USER]: ["crearComunicado", "editarComunicado", "eliminarComunicado", "verComunicados", "reaccionarComunicado"],
    [ROLE_KEYS.ADMIN_RH]: ["crearComunicado", "editarComunicado", "eliminarComunicado", "verComunicados", "reaccionarComunicado"],
    [ROLE_KEYS.EMPLEADO]: ["verComunicados", "reaccionarComunicado"]
  },
  attendance: {
    [ROLE_KEYS.SUPER_USER]: ["registrarAsistencia", "verHistorialAsistencia"],
    [ROLE_KEYS.ADMIN_RH]: ["registrarAsistencia", "verHistorialAsistencia"],
    [ROLE_KEYS.EMPLEADO]: ["registrarAsistencia", "verHistorialAsistencia"]
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
