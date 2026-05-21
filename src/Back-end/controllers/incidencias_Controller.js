const db = require('../models');

async function obtenerIncidencias() {
  return db.Incidencia.findAll({
    include: [{ association: 'empleado', required: false }],
    order: [['createdAt', 'DESC']],
  });
}

function toFrontendIncidencia(row) {
  if (!row) return null;
  return {
    id: row.id,
    empleado_id: row.empleado_id,
    empleado_nombre: row.empleado?.nombre || 'Desconocido',
    tipo: row.tipo,
    fecha_inicio: row.fecha_inicio,
    fecha_fin: row.fecha_fin,
    estatus: row.estatus,
    documento_pdf: row.documento_pdf,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

exports.listar = async (req, res) => {
  try {
    const incidencias = await obtenerIncidencias();
    res.json(incidencias.map(toFrontendIncidencia));
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las incidencias', details: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const { empleado_id, tipo, fecha_inicio, fecha_fin, documento_pdf } = req.body;
    const incidencia = await db.Incidencia.create({
      empleado_id,
      tipo,
      fecha_inicio,
      fecha_fin,
      documento_pdf,
      estatus: 'aprobado',
    });
    res.status(201).json(toFrontendIncidencia(incidencia));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear la incidencia', details: error.message });
  }
};

exports.obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const incidencia = await db.Incidencia.findByPk(id, {
      include: [{ association: 'empleado', required: false }],
    });
    if (!incidencia) {
      return res.status(404).json({ error: 'Incidencia no encontrada' });
    }
    res.json(toFrontendIncidencia(incidencia));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo obtener la incidencia', details: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, fecha_inicio, fecha_fin, estatus, documento_pdf } = req.body;
    const incidencia = await db.Incidencia.findByPk(id);
    if (!incidencia) {
      return res.status(404).json({ error: 'Incidencia no encontrada' });
    }
    await incidencia.update({
      tipo: tipo || incidencia.tipo,
      fecha_inicio: fecha_inicio || incidencia.fecha_inicio,
      fecha_fin: fecha_fin || incidencia.fecha_fin,
      estatus: estatus || incidencia.estatus,
      documento_pdf: documento_pdf || incidencia.documento_pdf,
    });
    res.json(toFrontendIncidencia(incidencia));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo actualizar la incidencia', details: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const incidencia = await db.Incidencia.findByPk(id);
    if (!incidencia) {
      return res.status(404).json({ error: 'Incidencia no encontrada' });
    }
    await incidencia.destroy();
    res.json({ mensaje: 'Incidencia eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar la incidencia', details: error.message });
  }
};

exports.obtenerPorEmpleado = async (req, res) => {
  try {
    const { empleado_id } = req.params;
    const incidencias = await db.Incidencia.findAll({
      where: { empleado_id },
      include: [{ association: 'empleado', required: false }],
      order: [['fecha_inicio', 'DESC']],
    });
    res.json(incidencias.map(toFrontendIncidencia));
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las incidencias', details: error.message });
  }
};

exports.toFrontendIncidencia = toFrontendIncidencia;
