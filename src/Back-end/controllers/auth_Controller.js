const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('../models');
const { roleLabels, normalizeRole } = require('../utils/roles');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

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
    area_id: usuario.empleado?.area_id,
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
        attributes: ['id', 'nombre', 'area_id'],
      }],
    });

    if (!usuarioRecord) {
      usuarioRecord = await db.Usuario.findOne({
        include: [{
          model: db.Empleado,
          as: 'empleado',
          where: { curp: username },
          attributes: ['id', 'nombre', 'area_id'],
        }],
      });
    }

    if (!usuarioRecord || !(await usuarioRecord.validPassword(password))) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    res.json({ token: signUser(usuarioRecord), user: toFrontendUser(usuarioRecord) });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo iniciar sesion' });
  }
};

exports.register = async (req, res) => {
  const { usuario: username, password, nombre, empleado_id } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
  }

  try {
    const existingUser = await db.Usuario.findOne({ where: { usuario: username } });
    if (existingUser) {
      return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
    }

    if (empleado_id) {
      const empleado = await db.Empleado.findByPk(empleado_id);
      if (!empleado) {
        return res.status(400).json({ error: 'Empleado no encontrado para el usuario' });
      }
    }

    const usuarioRecord = await db.Usuario.create({
      usuario: username,
      nombre: nombre || null,
      password_hash: password,
      empleado_id: empleado_id || null,
      rol: 'empleado',
    });

    const usuarioWithEmpleado = await db.Usuario.findByPk(usuarioRecord.id, {
      include: [{
        model: db.Empleado,
        as: 'empleado',
        attributes: ['id', 'nombre', 'area_id'],
      }],
    });

    res.status(201).json({ token: signUser(usuarioWithEmpleado), user: toFrontendUser(usuarioWithEmpleado) });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo registrar el usuario' });
  }
};

exports.me = async (req, res) => {
  try {
    const usuario = await db.Usuario.findByPk(req.user.id, {
      include: [{ model: db.Empleado, as: 'empleado', attributes: ['id', 'nombre', 'area_id'] }],
    });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ user: toFrontendUser(usuario) });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el perfil' });
  }
};
