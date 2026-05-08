const db = require('../models');
const { Op } = require('sequelize');

exports.listar = async (req, res) => {
  const { page = 1, limit = 20, search } = req.query;
  const where = { estatus: 'activo' };
  if (search) where.nombre = { [Op.like]: `%${search}%` };

  const empleados = await db.Empleado.findAndCountAll({
    where,
    include: ['area', 'puesto', 'jefe'],
    offset: (Number(page) - 1) * Number(limit),
    limit: Number(limit),
  });
  res.json(empleados);
};

exports.obtenerUno = async (req, res) => {
  const emp = await db.Empleado.findByPk(req.params.id, {
    include: ['area', 'puesto', 'documentos', 'historial', 'incidencias'],
  });
  if (!emp) return res.status(404).json({ error: 'No encontrado' });
  res.json(emp);
};

exports.baja = async (req, res) => {
  const { id } = req.params;
  await db.Empleado.update(
    { estatus: 'baja', fecha_baja: new Date(), motivo_baja: req.body.motivo },
    { where: { id } }
  );
  res.json({ mensaje: 'Empleado dado de baja' });
};
