export const ROLE_KEYS = {
  ADMIN_RH: "admin_rh",
  DIRECCION: "direccion",
  JEFE_AREA: "jefe_area",
  EMPLEADO: "empleado",
  RECEPCION: "recepcion"
};

const roleAliases = {
  admin_rh: ROLE_KEYS.ADMIN_RH,
  "administrador rh": ROLE_KEYS.ADMIN_RH,
  direccion: ROLE_KEYS.DIRECCION,
  "dirección": ROLE_KEYS.DIRECCION,
  jefe_area: ROLE_KEYS.JEFE_AREA,
  "jefe de area": ROLE_KEYS.JEFE_AREA,
  "jefe de área": ROLE_KEYS.JEFE_AREA,
  "jefes de area": ROLE_KEYS.JEFE_AREA,
  empleado: ROLE_KEYS.EMPLEADO,
  recepcion: ROLE_KEYS.RECEPCION,
  "recepción": ROLE_KEYS.RECEPCION
};

const moduleByRoute = {
  "/": "dashboard",
  "/calendario": "calendar",
  "/organigrama": "organigram",
  "/directorio": "directory",
  "/solicitudes": "requests",
  "/normatividad": "normativity",
  "/vacantes": "vacancies",
  "/visitantes": "visitors",
  "/control-accesos": "accessControl",
  "/auditoria": "audit"
};

export const roleLabels = {
  [ROLE_KEYS.ADMIN_RH]: "Administrador RH",
  [ROLE_KEYS.DIRECCION]: "Direccion",
  [ROLE_KEYS.JEFE_AREA]: "Jefe de Area",
  [ROLE_KEYS.EMPLEADO]: "Empleado",
  [ROLE_KEYS.RECEPCION]: "Recepcion"
};

export const modulePermissions = {
  dashboard: [ROLE_KEYS.ADMIN_RH, ROLE_KEYS.DIRECCION, ROLE_KEYS.JEFE_AREA, ROLE_KEYS.EMPLEADO, ROLE_KEYS.RECEPCION],
  calendar: [ROLE_KEYS.ADMIN_RH, ROLE_KEYS.DIRECCION, ROLE_KEYS.JEFE_AREA, ROLE_KEYS.EMPLEADO],
  organigram: [ROLE_KEYS.ADMIN_RH, ROLE_KEYS.DIRECCION, ROLE_KEYS.JEFE_AREA],
  directory: [ROLE_KEYS.ADMIN_RH, ROLE_KEYS.JEFE_AREA, ROLE_KEYS.EMPLEADO],
  requests: [ROLE_KEYS.ADMIN_RH, ROLE_KEYS.DIRECCION, ROLE_KEYS.JEFE_AREA, ROLE_KEYS.EMPLEADO],
  normativity: [ROLE_KEYS.ADMIN_RH],
  vacancies: [ROLE_KEYS.ADMIN_RH, ROLE_KEYS.DIRECCION],
  visitors: [ROLE_KEYS.ADMIN_RH, ROLE_KEYS.RECEPCION],
  accessControl: [ROLE_KEYS.ADMIN_RH],
  audit: [ROLE_KEYS.ADMIN_RH]
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
  fullAudit: { label: "Auditoria completa", icon: "activity", operation: "R" }
};

export const roleActionsByModule = {
  directory: {
    [ROLE_KEYS.ADMIN_RH]: ["createEmployee", "editEmployee", "deactivateEmployee", "viewDirectory"],
    [ROLE_KEYS.JEFE_AREA]: ["viewDirectory"],
    [ROLE_KEYS.EMPLEADO]: ["updatePersonalData", "uploadPersonalDocument", "viewWorkHistory"]
  },
  requests: {
    [ROLE_KEYS.ADMIN_RH]: ["createRequest", "approveRequest", "rejectRequest", "manageIncident", "viewRequests"],
    [ROLE_KEYS.DIRECCION]: ["approveRequest", "rejectRequest", "viewRequests"],
    [ROLE_KEYS.JEFE_AREA]: ["approveRequest", "rejectRequest", "viewRequests"],
    [ROLE_KEYS.EMPLEADO]: ["createRequest", "viewRequests"]
  },
  vacancies: {
    [ROLE_KEYS.ADMIN_RH]: ["publishVacancy", "closeVacancy", "viewVacancies"],
    [ROLE_KEYS.DIRECCION]: ["viewVacancies"]
  },
  normativity: {
    [ROLE_KEYS.ADMIN_RH]: ["uploadNormativity", "updateNormativity", "deactivateNormativity", "viewNormativity"]
  },
  visitors: {
    [ROLE_KEYS.ADMIN_RH]: ["registerVisitor", "registerVisitorExit", "assignBadge", "viewVisitors", "fullAudit"],
    [ROLE_KEYS.RECEPCION]: ["registerVisitor", "registerVisitorExit", "assignBadge", "viewVisitors"]
  }
};

export const normalizeRole = (role) => {
  const value = String(role || "").trim().toLowerCase();
  return roleAliases[value] || ROLE_KEYS.EMPLEADO;
};

export const canAccessModule = (role, moduleKey) =>
  Boolean(modulePermissions[moduleKey]?.includes(normalizeRole(role)));

export const filterNavigationByRole = (items, role) =>
  items.filter((item) => canAccessModule(role, item.module || moduleByRoute[item.route]));

export const getRoleActions = (role, moduleKey) => {
  const normalizedRole = normalizeRole(role);
  const actionKeys = roleActionsByModule[moduleKey]?.[normalizedRole] || [];

  return actionKeys.map((key) => ({
    key,
    ...actionCatalog[key]
  }));
};
