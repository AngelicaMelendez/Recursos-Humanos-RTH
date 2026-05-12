const db = require('../models');
const { Op } = require('sequelize');

// Obtener comunicados activos segmentados por área
exports.obtenerComunicados = async (req, res) => {
  try {
    const { area_id } = req.query;
    
    const where = {
      estatus: 'activo',
      [Op.or]: [
        { fecha_vencimiento: { [Op.gte]: new Date() } },
        { fecha_vencimiento: null },
      ],
    };

    if (area_id) {
      where.area_id = area_id;
    }

    const comunicados = await db.Comunicado.findAll({
      where,
      include: [
        { model: db.Area, as: 'area', attributes: ['id', 'nombre'] },
        { model: db.Usuario, as: 'autor', attributes: ['id'] },
        { model: db.ReaccionComunicado, as: 'reacciones', attributes: ['usuario_id', 'createdAt'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(comunicados);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener comunicados', details: error.message });
  }
};

// Obtener más reciente por área
exports.obtenerMasReciente = async (req, res) => {
  try {
    const { area_id } = req.query;
    
    const where = {
      estatus: 'activo',
      [Op.or]: [
        { fecha_vencimiento: { [Op.gte]: new Date() } },
        { fecha_vencimiento: null },
      ],
    };

    if (area_id) {
      where.area_id = area_id;
    }

    const comunicado = await db.Comunicado.findOne({
      where,
      include: [
        { model: db.Area, as: 'area', attributes: ['id', 'nombre'] },
        { model: db.Usuario, as: 'autor', attributes: ['id'] },
        { model: db.ReaccionComunicado, as: 'reacciones', attributes: ['usuario_id', 'createdAt'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(comunicado || {});
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el comunicado', details: error.message });
  }
};

// Crear comunicado (Admin/Jefe de Área)
exports.crearComunicado = async (req, res) => {
  try {
    const { titulo, contenido, area_id, fecha_vencimiento } = req.body;
    const usuario_id = req.user.id;

    if (!titulo || !contenido) {
      return res.status(400).json({ error: 'Título y contenido son requeridos' });
    }

    const comunicado = await db.Comunicado.create({
      titulo,
      contenido,
      area_id,
      usuario_id,
      fecha_vencimiento,
      estatus: 'activo',
    });

    res.status(201).json(comunicado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear el comunicado', details: error.message });
  }
};

// Editar comunicado (Admin/Autor)
exports.editarComunicado = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, contenido, area_id, fecha_vencimiento } = req.body;

    const comunicado = await db.Comunicado.findByPk(id);
    if (!comunicado) {
      return res.status(404).json({ error: 'Comunicado no encontrado' });
    }

    await comunicado.update({
      titulo,
      contenido,
      area_id,
      fecha_vencimiento,
    });

    res.json(comunicado);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo editar el comunicado', details: error.message });
  }
};

// Eliminar comunicado (Admin)
exports.eliminarComunicado = async (req, res) => {
  try {
    const { id } = req.params;

    const comunicado = await db.Comunicado.findByPk(id);
    if (!comunicado) {
      return res.status(404).json({ error: 'Comunicado no encontrado' });
    }

    await comunicado.destroy();
    res.json({ mensaje: 'Comunicado eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'No se pudo eliminar el comunicado', details: error.message });
  }
};

// Agregar reacción (Like)
exports.agregarReaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const comunicado = await db.Comunicado.findByPk(id);
    if (!comunicado) {
      return res.status(404).json({ error: 'Comunicado no encontrado' });
    }

    const reaccionExistente = await db.ReaccionComunicado.findOne({
      where: { comunicado_id: id, usuario_id },
    });

    if (reaccionExistente) {
      await reaccionExistente.destroy();
      return res.json({ mensaje: 'Reacción removida' });
    }

    const reaccion = await db.ReaccionComunicado.create({
      comunicado_id: id,
      usuario_id,
      tipo: 'like',
    });

    res.status(201).json(reaccion);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo agregar reacción', details: error.message });
  }
};

// Obtener historial completo (Solo Admin)
exports.obtenerHistorial = async (req, res) => {
  try {
    const comunicados = await db.Comunicado.findAll({
      include: [
        { model: db.Area, as: 'area', attributes: ['id', 'nombre'] },
        { model: db.Usuario, as: 'autor', attributes: ['id'] },
        { model: db.ReaccionComunicado, as: 'reacciones', attributes: ['usuario_id', 'createdAt'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(comunicados);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo obtener el historial', details: error.message });
  }
};

// Obtener reacciones de un comunicado (Solo Admin)
exports.obtenerReacciones = async (req, res) => {
  try {
    const { id } = req.params;

    const reacciones = await db.ReaccionComunicado.findAll({
      where: { comunicado_id: id },
      include: [
        {
          model: db.Usuario,
          as: 'usuario',
          attributes: ['id'],
          include: [
            {
              model: db.Empleado,
              as: 'empleado',
              attributes: ['id', 'nombre'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(reacciones);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener reacciones', details: error.message });
  }
};
