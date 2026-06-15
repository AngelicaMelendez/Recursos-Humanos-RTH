const ROLE_KEYS = {
  SUPER_USER: 'super_usuario',
  ADMIN_RH: 'admin_rh',
  EMPLEADO: 'empleado'
};

const roleAliases = {
 // Variantes para Super Usuario
  "superuser": ROLE_KEYS.SUPER_USER,
  "super_usuario": ROLE_KEYS.SUPER_USER,
  "super usuario": ROLE_KEYS.SUPER_USER,
  "super-usuario": ROLE_KEYS.SUPER_USER,

  // Variantes para Administrador de RH
  "admin": ROLE_KEYS.ADMIN_RH,
  "administrador": ROLE_KEYS.ADMIN_RH,
  "admin_rh": ROLE_KEYS.ADMIN_RH,
  "admin-rh": ROLE_KEYS.ADMIN_RH,
  "administrador rh": ROLE_KEYS.ADMIN_RH,
  "administrador_rh": ROLE_KEYS.ADMIN_RH,

  // Variantes para Empleado
  "empleado": ROLE_KEYS.EMPLEADO,
  "user": ROLE_KEYS.EMPLEADO,
  "usuario": ROLE_KEYS.EMPLEADO
};

const roleLabels = {
  [ROLE_KEYS.SUPER_USER]: 'Super Usuario',
  [ROLE_KEYS.ADMIN_RH]: 'Administrador RH',
  [ROLE_KEYS.EMPLEADO]: 'Empleado'
};

const ROLE_GROUPS = {
  REQUEST_APPROVERS: [
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
