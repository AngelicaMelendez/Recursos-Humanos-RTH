export const roleMiddleware = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.rol)) {
    return res.status(403).json({
      message: "No cuentas con permisos suficientes para esta operación."
    });
  }

  return next();
};

