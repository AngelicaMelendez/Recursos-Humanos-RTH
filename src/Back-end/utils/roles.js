const ROLE_KEYS = {
  SUPER_USER: 'super_usuario',  /* SUPER USUARIO (TI) */
  RECURSOS_HUMANOS: 'recursos_humanos', /* RECURSOS HUMANOS (ADMINISTRADOR) */
  USUARIO: 'usuario', /* USUARIO (USUARIO) */
  DIRECTOR: 'director' /* DIRECTOR (VISOR) */
};

 const ROLE_GROUPS = {
  APPROVERS: [
    ROLE_KEYS.SUPER_USER,
    ROLE_KEYS.RECURSOS_HUMANOS
  ],
  VIEWERS: [
    ROLE_KEYS.SUPER_USER,
    ROLE_KEYS.DIRECTOR,
    ROLE_KEYS.RECURSOS_HUMANOS
    
  ],
  SOLICITORS: [
    ROLE_KEYS.SUPER_USER,
    ROLE_KEYS.RECURSOS_HUMANOS
  ]
};

const roleAliases = {
  "super_usuario": ROLE_KEYS.SUPER_USER,
  "super usuario": ROLE_KEYS.SUPER_USER,
  "superusuario": ROLE_KEYS.SUPER_USER,
  "super-usuario": ROLE_KEYS.SUPER_USER,
  "recursos_humanos": ROLE_KEYS.RECURSOS_HUMANOS,
  "rh": ROLE_KEYS.RECURSOS_HUMANOS,
  "recursos-humanos": ROLE_KEYS.RECURSOS_HUMANOS,
  "recursoshumanos": ROLE_KEYS.RECURSOS_HUMANOS,
  "director": ROLE_KEYS.DIRECTOR,
  "direc": ROLE_KEYS.DIRECTOR,
  "usua": ROLE_KEYS.USUARIO,
  "user": ROLE_KEYS.USUARIO,
  "usuario": ROLE_KEYS.USUARIO
};

const roleLabels = {
  [ROLE_KEYS.SUPER_USER]: 'Super Usuario',
  [ROLE_KEYS.RECURSOS_HUMANOS]: 'Recursos Humanos',
  [ROLE_KEYS.DIRECTOR]: 'Director',
  [ROLE_KEYS.USUARIO]: 'Usuario'
};



const PERMISSIONS = {
  REQUESTS_APPROVERS:[ROLE_KEYS.SUPER_USER, ROLE_KEYS.RECURSOS_HUMANOS], // Aprueban Solicitudes
  VIEWERS:[ROLE_KEYS.SUPER_USER, ROLE_KEYS.RECURSOS_HUMANOS, ROLE_KEYS.DIRECTOR],  // Visualizan o Leen solamente sin manipular nada
  SOLICITORS: [ROLE_KEYS.USUARIO,ROLE_KEYS.RECURSOS_HUMANOS] // Solicitan peticiones
};

function resolveRoleValue(roleOrUser) {
  if (!roleOrUser) return '';
  if (typeof roleOrUser === 'object') {
    return String(roleOrUser.rol_clave || roleOrUser.rol || '').trim().toLowerCase();
  }
  return String(roleOrUser).trim().toLowerCase();
}

function normalizeRole(roleOrUser) {
  return roleAliases[resolveRoleValue(roleOrUser)] || ROLE_KEYS.USUARIO;
}

function normalizeAllowedRoles(allowedRoles = []) {
  return allowedRoles.flat().filter(Boolean).map((role) => normalizeRole(role));
}

function hasRole(roleOrUser, allowedRoles = []) {
  return normalizeAllowedRoles(allowedRoles).includes(normalizeRole(roleOrUser));
}

// 2. HASTA EL FINAL EXPORTAMOS TODO YA EXISTENTE
module.exports = {
  ROLE_KEYS,
  ROLE_GROUPS,
  PERMISSIONS,
  roleLabels,
  normalizeRole,
  normalizeAllowedRoles,
  hasRole,
};