const db = require('../models');

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  let ip = forwardedFor ? String(forwardedFor).split(',')[0].trim() : (req.ip || req.socket?.remoteAddress || '127.0.0.1');

  // Limpia las notaciones de localhost IPv6 / IPv4-mapped
  if (ip === '::1' || ip === '::ffff:127.0.0.1') {
    return '127.0.0.1';
  }

  return ip;
}

async function getUsername(req) {
  if (!req.user?.id || !db.Usuario) {
    return req.user?.usuario || 'sistema';
  }

  // Si ya viene el usuario en el token JWT / req.user, nos ahorramos la consulta a la BD
  if (req.user.usuario) {
    return req.user.usuario;
  }

  const usuario = await db.Usuario.findByPk(req.user.id, {
    attributes: ['usuario'],
  });

  return usuario?.usuario || `usuario-${req.user.id}`;
}

async function registrarAuditoria(req, { accion, modulo, usuario } = {}) {
  try {
    if (!db.Log || !accion || !modulo) {
      return null;
    }

    return await db.Log.create({
      usuario: usuario || (await getUsername(req)),
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