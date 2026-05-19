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
  jefe: ROLE_KEYS.JEFE_AREA,
  jefe_area: ROLE_KEYS.JEFE_AREA,
  "jefe de area": ROLE_KEYS.JEFE_AREA,
  "jefes de area": ROLE_KEYS.JEFE_AREA,
  subjefe: ROLE_KEYS.SUBJEFE_AREA,
  subjefe_area: ROLE_KEYS.SUBJEFE_AREA,
  "subjefe de area": ROLE_KEYS.SUBJEFE_AREA,
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
  "/control-accesos": "accessControl",
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
  accessControl: ALL_ROLES,
  audit: ALL_ROLES,
  comunicados: ALL_ROLES,
  attendance: ALL_ROLES
};

const actionCatalog = {
  createEmployee: { label: "Alta empleado", icon: "plus", operation: "C" },
  deactivateEmployee: { label: "Baja logica", icon: "archive", operation: "D" },
  editEmployee: { label: "Actualizar expediente", icon: "edit", operation: "U" },
  viewDirectory: { label: "Consultar directorio", icon: "users", operation: "R" },
  updatePersonalData: { label: "Actualizar mis datos", icon: "edit", operation: "U" },
  uploadPersonalDocument: { label: "Subir documento", icon: "upload", operation: "C" },
  viewWorkHistory: { label: "Historial laboral", icon: "activity", operation: "R" },
  createRequest: { label: "Nueva solicitud", icon: "plus", operation: "C" },
  deleteRequest: { label: "Eliminar solicitud", icon: "trash", operation: "D" },
  approveRequest: { label: "Aprobar solicitud", icon: "check", operation: "U" },
  rejectRequest: { label: "Rechazar solicitud", icon: "x", operation: "U" },
  manageIncident: { label: "Gestionar incidencia", icon: "edit", operation: "U" },
  viewRequests: { label: "Consultar solicitudes", icon: "file", operation: "R" },
  publishVacancy: { label: "Publicar vacante", icon: "plus", operation: "C" },
  closeVacancy: { label: "Cerrar vacante", icon: "archive", operation: "U" },
  viewVacancies: { label: "Consultar vacantes", icon: "briefcase", operation: "R" },
  uploadNormativity: { label: "Subir normatividad", icon: "upload", operation: "C" },
  updateNormativity: { label: "Actualizar documento", icon: "edit", operation: "U" },
  deactivateNormativity: { label: "Baja logica", icon: "archive", operation: "D" },
  viewNormativity: { label: "Consultar repositorio", icon: "shield", operation: "R" },
  registerVisitor: { label: "Registrar entrada", icon: "plus", operation: "C" },
  registerVisitorExit: { label: "Registrar salida", icon: "check", operation: "U" },
  assignBadge: { label: "Asignar gafete", icon: "tag", operation: "U" },
  viewVisitors: { label: "Visitantes activos", icon: "door", operation: "R" },
  fullAudit: { label: "Auditoria completa", icon: "activity", operation: "R" },
  crearComunicado: { label: "Publicar comunicado", icon: "plus", operation: "C" },
  editarComunicado: { label: "Editar comunicado", icon: "edit", operation: "U" },
  eliminarComunicado: { label: "Eliminar comunicado", icon: "trash", operation: "D" },
  verComunicados: { label: "Ver comunicados", icon: "send", operation: "R" },
  reaccionarComunicado: { label: "Reaccionar", icon: "thumbs-up", operation: "U" },
  verHistorialAsistencia: { label: "Ver historial", icon: "activity", operation: "R" },
  registrarAsistencia: { label: "Registrar asistencia", icon: "check", operation: "C" }
};

const sharedManagementActions = [
  "createRequest",
  "deleteRequest",
  "approveRequest",
  "rejectRequest",
  "manageIncident",
  "viewRequests"
];

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
    [ROLE_KEYS.ADMIN_RH]: ["createRequest", "deleteRequest", "approveRequest", "rejectRequest", "manageIncident", "viewRequests"],
    [ROLE_KEYS.DIRECCION]: ["createRequest"],
    [ROLE_KEYS.JEFE_AREA]: ["createRequest"],
    [ROLE_KEYS.EMPLEADO]: ["createRequest"],
    [ROLE_KEYS.RECEPCION]: ["createRequest"]
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
