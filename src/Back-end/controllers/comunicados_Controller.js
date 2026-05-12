const db = require('../models');
const { Op } = require('sequelize');

const rolesGestores = ['admin_rh', 'jefe_area'];

function esGestorComunicados(rol) {
  return rolesGestores.includes(rol);
}

async function obtenerUsuarioConArea(usuarioId) {
  return db.Usuario.findByPk(usuarioId, {
    include: [
      {
        model: db.Empleado,
        as: 'empleado',
        attributes: ['id', 'area_id'],
      },
    ],
  });
}

async function construirFiltroVisibilidad(req) {
  const where = {
    estatus: 'activo',
    [Op.or]: [
      { fecha_vencimiento: { [Op.gte]: new Date() } },
      { fecha_vencimiento: null },
    ],
  };

  if (esGestorComunicados(req.user.rol)) {
    if (req.query.area_id) {
      where.area_id = req.query.area_id;
    }

    return where;
  }

  const usuario = await obtenerUsuarioConArea(req.user.id);
  const areaId = usuario?.empleado?.area_id || null;
  where[Op.and] = [
    {
      [Op.or]: [
        { area_id: null },
        ...(areaId ? [{ area_id: areaId }] : []),
      ],
    },
  ];

  return where;
}

// Obtener comunicados activos segmentados por area
exports.obtenerComunicados = async (req, res) => {
  try {
    const where = await construirFiltroVisibilidad(req);

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

// Obtener mas reciente por area
exports.obtenerMasReciente = async (req, res) => {
  try {
    const where = await construirFiltroVisibilidad(req);

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

// Crear comunicado (Admin/Jefe de Area)
exports.crearComunicado = async (req, res) => {
  try {
    const { titulo, contenido, area_id, fecha_vencimiento } = req.body;
    const usuario_id = req.user.id;

    if (!titulo || !contenido) {
      return res.status(400).json({ error: 'Titulo y contenido son requeridos' });
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

// Editar comunicado (Admin/Jefe de Area)
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

// Eliminar comunicado (Admin/Jefe de Area)
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

// Agregar reaccion (Like)
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
      return res.json({ mensaje: 'Reaccion removida' });
    }

    const reaccion = await db.ReaccionComunicado.create({
      comunicado_id: id,
      usuario_id,
      tipo: 'like',
    });

    res.status(201).json(reaccion);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo agregar reaccion', details: error.message });
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
