const { Op } = require('sequelize');
const db = require('../models');

function normalizeText(value) {
  return String(value || '').trim().toLowerCase();
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

function toFrontendLog(log, usersByUsername) {  //El texto de la auditoria enviado al FRONTEND
  const plain = log.get ? log.get({ plain: true }) : log;
  const usuario = usersByUsername.get(normalizeText(plain.usuario));
  const empleado = usuario?.empleado;

  return {
    id: plain.id,
    usuario: plain.usuario || 'sistema',
    No_de_empleado: empleado?.No_de_empleado || 'S/N',
    empleado_nombre: [empleado?.nombre, empleado?.apellidos].filter(Boolean).join(' ') || 'Sin empleado',
    puesto: empleado?.puesto?.nombre || 'Sin puesto',
    departamento: empleado?.departamento?.nombre || 'Sin departamento',
    direccion: empleado?.direccion?.nombre || 'Sin direccion',
    accion: plain.accion,
    fecha: formatDate(plain.fecha || plain.createdAt),
    modulo: plain.modulo,
    ip: plain.ip,
  };
}

function matchesSearch(row, search) {
  if (!search) return true;
  const haystack = [
    row.usuario,
    row.No_de_empleado,
    row.empleado_nombre,
    row.puesto,
    row.departamento,
    row.direccion,
    row.accion,
    row.modulo,
    row.ip,
  ].map(normalizeText).join(' ');

  return haystack.includes(search);
}

exports.listar = async (req, res) => {
  try {
    const search = normalizeText(req.query.buscar || req.query.search || req.query.q);
    const modulo = normalizeText(req.query.modulo);
    const limit = Math.min(Number(req.query.limit) || 500, 1000);

    const where = {};
    if (modulo) {
      where.modulo = { [Op.like]: `%${modulo}%` };
    }

    const logs = await db.Log.findAll({
      where,
      order: [['fecha', 'DESC'], ['createdAt', 'DESC']],
      limit,
    });

    const usernames = [...new Set(logs.map((log) => log.usuario).filter(Boolean))];
    const usuarios = await db.Usuario.findAll({
      where: { usuario: usernames },
      attributes: ['id', 'usuario', 'empleado_id', 'rol'],
      include: [{
        model: db.Empleado,
        as: 'empleado',
        attributes: ['id', 'nombre', 'apellidos', 'No_de_empleado', 'puesto_id', 'departamento_id', 'direccion_id'],
        include: [
          { model: db.Puesto, as: 'puesto', attributes: ['id', 'nombre'] },
          { model: db.Departamento, as: 'departamento', attributes: ['id', 'nombre'] },
          { model: db.Direccion, as: 'direccion', attributes: ['id', 'nombre'] },
        ],
      }],
    });

    const usersByUsername = new Map(
      usuarios.map((usuario) => [normalizeText(usuario.usuario), usuario.get ? usuario.get({ plain: true }) : usuario]),
    );

    const rows = logs
      .map((log) => toFrontendLog(log, usersByUsername))
      .filter((row) => matchesSearch(row, search));

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener los logs de auditoria', details: error.message });
  }
};
