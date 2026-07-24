const db = require('../models');

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (forwardedFor) {
    return String(forwardedFor).split(',')[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || null;
}

async function getUsername(req) {
  if (!req.user?.id || !db.Usuario) {
    return req.user?.usuario || 'sistema';
  }

  const usuario = await db.Usuario.findByPk(req.user.id, {
    attributes: ['usuario'],
  });

  return usuario?.usuario || req.user.usuario || `usuario-${req.user.id}`;
}

async function registrarAuditoria(req, { accion, modulo, usuario } = {}) {
  try {
    if (!db.Log || !accion || !modulo) {
      return null;
    }

    return await db.Log.create({
      usuario: usuario || await getUsername(req),
      accion,
      modulo,
      ip: getClientIp(req),
      fecha: new Date(),
    });
  } catch (error) {
    console.error('No se pudo registrar auditoria:', error.message);
    return null;
  }
}

module.exports = {
  registrarAuditoria,
};
