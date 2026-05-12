module.exports = (...rolesPermitidos) => {
  const rolesNormalizados = rolesPermitidos.flat().filter(Boolean);

  return (req, res, next) => {
    if (!req.user || !rolesNormalizados.includes(req.user.rol)) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    next();
  };
};
