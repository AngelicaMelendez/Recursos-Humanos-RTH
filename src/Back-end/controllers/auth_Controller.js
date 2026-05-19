const jwt = require('jsonwebtoken');
const db = require('../models');
const { roleLabels, normalizeRole } = require('../utils/roles');

function signUser(usuario) {
  const rolNormalizado = normalizeRole(usuario.rol);

  return jwt.sign(
    { id: usuario.id, rol: rolNormalizado, empleado_id: usuario.empleado_id },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '8h' }
  );
}

function toFrontendUser(usuario) {
  const rolNormalizado = normalizeRole(usuario.rol);

  return {
    id: usuario.id,
    empleado_id: usuario.empleado_id,
    nombre: usuario.empleado?.nombre || 'Usuario',
    rol: roleLabels[rolNormalizado] || rolNormalizado,
    rol_clave: rolNormalizado,
    rol_original: usuario.rol,
    area_id: usuario.empleado?.area_id,
  };
}

exports.login = async (req, res) => {
  const { curp, password } = req.body;

  try {
    const usuario = await db.Usuario.findOne({
      include: [{
        model: db.Empleado,
        as: 'empleado',
        where: { curp },
        attributes: ['id', 'nombre', 'curp', 'area_id'],
      }],
    });

    if (!usuario || !(await usuario.validPassword(password))) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    res.json({ token: signUser(usuario), user: toFrontendUser(usuario) });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo iniciar sesion' });
  }
};

exports.me = async (req, res) => {
  try {
    const usuario = await db.Usuario.findByPk(req.user.id, {
      include: [{ model: db.Empleado, as: 'empleado', attributes: ['id', 'nombre', 'curp', 'area_id'] }],
    });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ user: toFrontendUser(usuario) });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el perfil' });
  }
};
