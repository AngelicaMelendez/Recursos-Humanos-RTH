const db = require('../models');
const { Op } = require('sequelize');

exports.getStats = async (req, res) => {
  try {
    const totalActivos = await db.Empleado.count({ where: { estatus: 'activo' } });
    const totalEx = await db.Empleado.count({ where: { estatus: 'baja' } });
    const hoy = new Date().toISOString().slice(0, 10);
    const visitantesHoy = await db.Visitante.count({
      where: { fecha_entrada: hoy } // si guardamos fecha_entrada como DATEONLY
    });
    // ... resto de estadísticas
    res.json({
      totalActivos,
      totalEx,
      visitantesHoy,
      // vacantes, solicitudes pendientes, etc.
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};