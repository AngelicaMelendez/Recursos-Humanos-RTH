const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('../models');
const bcrypt = require('bcryptjs');
const { roleLabels, normalizeRole } = require('../utils/roles');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

function signUser(usuario) {
  const rolNormalizado = normalizeRole(usuario.rol);

  return jwt.sign(
    {
      id: usuario.id,
      rol: rolNormalizado,
      empleado_id: usuario.empleado_id,
      departamento_id: usuario.empleado?.departamento_id || null,
      direccion_id: usuario.empleado?.direccion_id || null,
    },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '8h' }
  );
}

function toFrontendUser(usuario) {
  const rolNormalizado = normalizeRole(usuario.rol);
  const nombreUsuario = usuario.empleado?.nombre || usuario.nombre || usuario.usuario || 'Usuario';

  return {
    id: usuario.id,
    usuario: usuario.usuario,
    empleado_id: usuario.empleado_id,
    nombre: nombreUsuario,
    name: nombreUsuario,
    rol: roleLabels[rolNormalizado] || rolNormalizado,
    rol_clave: rolNormalizado,
    rol_original: usuario.rol,
    departamento_id: usuario.empleado?.departamento_id,
    direccion_id: usuario.empleado?.direccion_id,
  };
}

exports.login = async (req, res) => {
  const { usuario: username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  try {
    let usuarioRecord = await db.Usuario.findOne({
      where: { usuario: username },
      include: [{
        model: db.Empleado,
        as: 'empleado',
        attributes: ['id', 'nombre', 'departamento_id', 'direccion_id'],
      }],
    });

    if (!usuarioRecord) {
      usuarioRecord = await db.Usuario.findOne({
        include: [{
          model: db.Empleado,
          as: 'empleado',
          where: { curp: username },
          attributes: ['id', 'nombre', 'departamento_id', 'direccion_id'],
        }],
      });
    }

    if (!usuarioRecord) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    
    const esPasswordValido = usuarioRecord.password_hash
      ? await usuarioRecord.validPassword(password)
      : false;

    if (!esPasswordValido) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }
    const tokenGen = signUser(usuarioRecord);

    const userFront = toFrontendUser(usuarioRecord);

    res.json({ token: tokenGen, user: userFront });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo iniciar sesion' });
  }
};

exports.me = async (req, res) => {
  try {
    const usuario = await db.Usuario.findByPk(req.user.id, {
      include: [{ model: db.Empleado, as: 'empleado', attributes: ['id', 'nombre', 'departamento_id', 'direccion_id'] }],
    });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ user: toFrontendUser(usuario) });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el perfil' });
  }
};