const { hasRole, normalizeAllowedRoles } = require('../utils/roles');

module.exports = (...rolesPermitidos) => {
  const rolesNormalizados = normalizeAllowedRoles(rolesPermitidos);

  return (req, res, next) => {
    if (!req.user || !hasRole(req.user, rolesNormalizados)) { 
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };
};