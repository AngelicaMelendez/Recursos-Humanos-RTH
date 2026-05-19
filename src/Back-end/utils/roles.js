const ROLE_KEYS = {
  ADMIN_RH: 'admin_rh',
  DIRECCION: 'direccion_general',
  JEFE_AREA: 'jefe_area',
  SUBJEFE_AREA: 'subjefe_area',
  RESPONSABLE_DEPARTAMENTO: 'responsable_departamento',
  COORDINADOR: 'coordinador',
  RESPONSABLE_UNIDAD: 'responsable_unidad',
  RESPONSABLE_AREA_TECNICA: 'responsable_area_tecnica',
  RESPONSABLE_OPERATIVO: 'responsable_operativo',
  RESPONSABLE_ADMINISTRATIVO: 'responsable_administrativo',
  EMPLEADO: 'empleado',
  RECEPCION: 'recepcion',
};

const roleAliases = {
  admin: ROLE_KEYS.ADMIN_RH,
  administrador: ROLE_KEYS.ADMIN_RH,
  admin_rh: ROLE_KEYS.ADMIN_RH,
  'administrador rh': ROLE_KEYS.ADMIN_RH,
  direccion: ROLE_KEYS.DIRECCION,
  direccion_general: ROLE_KEYS.DIRECCION,
  'director general': ROLE_KEYS.DIRECCION,
  'direccion general': ROLE_KEYS.DIRECCION,
  jefe: ROLE_KEYS.JEFE_AREA,
  jefe_area: ROLE_KEYS.JEFE_AREA,
  'jefe de area': ROLE_KEYS.JEFE_AREA,
  'jefes de area': ROLE_KEYS.JEFE_AREA,
  subjefe: ROLE_KEYS.SUBJEFE_AREA,
  subjefe_area: ROLE_KEYS.SUBJEFE_AREA,
  'subjefe de area': ROLE_KEYS.SUBJEFE_AREA,
  subdireccion: ROLE_KEYS.SUBJEFE_AREA,
  responsable_departamento: ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  jefe_departamento: ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  departamento: ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  'responsable de departamento': ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  coordinador: ROLE_KEYS.COORDINADOR,
  'responsable de coordinacion': ROLE_KEYS.COORDINADOR,
  coordinacion: ROLE_KEYS.COORDINADOR,
  'coordinador de area': ROLE_KEYS.COORDINADOR,
  responsable_unidad: ROLE_KEYS.RESPONSABLE_UNIDAD,
  'responsable de unidad': ROLE_KEYS.RESPONSABLE_UNIDAD,
  unidad: ROLE_KEYS.RESPONSABLE_UNIDAD,
  'responsable area tecnica': ROLE_KEYS.RESPONSABLE_AREA_TECNICA,
  'responsable de area tecnica': ROLE_KEYS.RESPONSABLE_AREA_TECNICA,
  area_tecnica: ROLE_KEYS.RESPONSABLE_AREA_TECNICA,
  'area tecnica': ROLE_KEYS.RESPONSABLE_AREA_TECNICA,
  responsable_operativo: ROLE_KEYS.RESPONSABLE_OPERATIVO,
  'responsable de operativo': ROLE_KEYS.RESPONSABLE_OPERATIVO,
  operativo: ROLE_KEYS.RESPONSABLE_OPERATIVO,
  'responsable administrativo': ROLE_KEYS.RESPONSABLE_ADMINISTRATIVO,
  responsable_administrativo: ROLE_KEYS.RESPONSABLE_ADMINISTRATIVO,
  administrativo: ROLE_KEYS.RESPONSABLE_ADMINISTRATIVO,
  empleado: ROLE_KEYS.EMPLEADO,
  recepcion: ROLE_KEYS.RECEPCION,
};

const roleLabels = {
  [ROLE_KEYS.ADMIN_RH]: 'Administrador RH',
  [ROLE_KEYS.DIRECCION]: 'Direccion General',
  [ROLE_KEYS.JEFE_AREA]: 'Jefe de Area',
  [ROLE_KEYS.SUBJEFE_AREA]: 'Subjefe de Area',
  [ROLE_KEYS.RESPONSABLE_DEPARTAMENTO]: 'Responsable de Departamento',
  [ROLE_KEYS.COORDINADOR]: 'Coordinador',
  [ROLE_KEYS.RESPONSABLE_UNIDAD]: 'Responsable de Unidad',
  [ROLE_KEYS.RESPONSABLE_AREA_TECNICA]: 'Responsable de Area Tecnica',
  [ROLE_KEYS.RESPONSABLE_OPERATIVO]: 'Responsable Operativo',
  [ROLE_KEYS.RESPONSABLE_ADMINISTRATIVO]: 'Responsable Administrativo',
  [ROLE_KEYS.EMPLEADO]: 'Empleado',
  [ROLE_KEYS.RECEPCION]: 'Recepcion',
};

const ROLE_GROUPS = {
  REQUEST_APPROVERS: [
    ROLE_KEYS.ADMIN_RH,
    ROLE_KEYS.DIRECCION,
    ROLE_KEYS.JEFE_AREA,
    ROLE_KEYS.SUBJEFE_AREA,
    ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  ],
  ANNOUNCEMENT_MANAGERS: [
    ROLE_KEYS.ADMIN_RH,
    ROLE_KEYS.JEFE_AREA,
    ROLE_KEYS.SUBJEFE_AREA,
    ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  ],
  ATTENDANCE_REVIEW: [
    ROLE_KEYS.ADMIN_RH,
    ROLE_KEYS.JEFE_AREA,
    ROLE_KEYS.SUBJEFE_AREA,
    ROLE_KEYS.RESPONSABLE_DEPARTAMENTO,
  ],
};

function resolveRoleValue(roleOrUser) {
  if (!roleOrUser) return '';

  if (typeof roleOrUser === 'object') {
    return String(roleOrUser.rol_clave || roleOrUser.rol || '').trim().toLowerCase();
  }

  return String(roleOrUser).trim().toLowerCase();
}

function normalizeRole(roleOrUser) {
  return roleAliases[resolveRoleValue(roleOrUser)] || ROLE_KEYS.EMPLEADO;
}

function normalizeAllowedRoles(allowedRoles = []) {
  return allowedRoles.flat().filter(Boolean).map((role) => normalizeRole(role));
}

function hasRole(roleOrUser, allowedRoles = []) {
  return normalizeAllowedRoles(allowedRoles).includes(normalizeRole(roleOrUser));
}

module.exports = {
  ROLE_KEYS,
  ROLE_GROUPS,
  roleLabels,
  normalizeRole,
  normalizeAllowedRoles,
  hasRole,
};
