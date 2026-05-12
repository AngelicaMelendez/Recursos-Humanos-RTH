const db = require('../models');

exports.listarMisNotificaciones = async (req, res) => {
  try {
    const notificaciones = await db.Notificacion.findAll({
      where: { usuario_id: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las notificaciones', details: error.message });
  }
};

exports.marcarComoLeida = async (req, res) => {
  try {
    const { id } = req.params;
    const notificacion = await db.Notificacion.findOne({
      where: {
        id,
        usuario_id: req.user.id,
      },
    });

    if (!notificacion) {
      return res.status(404).json({ error: 'Notificacion no encontrada' });
    }

    await notificacion.update({ leida: true });
    res.json(notificacion);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo actualizar la notificacion', details: error.message });
  }
};

exports.marcarTodasComoLeidas = async (req, res) => {
  try {
    await db.Notificacion.update(
      { leida: true },
      {
        where: {
          usuario_id: req.user.id,
          leida: false,
        },
      }
    );

    res.json({ mensaje: 'Notificaciones actualizadas' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron actualizar las notificaciones', details: error.message });
  }
};
