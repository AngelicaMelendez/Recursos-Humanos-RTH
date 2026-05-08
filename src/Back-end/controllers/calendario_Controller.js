const db = require('../models');
const { Op } = require('sequelize');

exports.getEventos = async (req, res) => {
  const { start, end } = req.query;
  const where = { estatus: 'aprobado' };

  if (start) where.fecha_inicio = { [Op.gte]: start };
  if (end) where.fecha_fin = { [Op.lte]: end };

  const eventos = await db.Incidencia.findAll({
    where,
    include: [{ association: 'empleado', attributes: ['id', 'nombre'] }],
  });

  res.json(eventos.map((evento) => ({
    title: `${evento.tipo} - ${evento.empleado?.nombre || 'Empleado'}`,
    start: evento.fecha_inicio,
    end: evento.fecha_fin,
    color: evento.tipo === 'vacaciones' ? 'blue' : 'red',
  })));
};
