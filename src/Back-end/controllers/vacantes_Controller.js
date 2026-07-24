const db = require('../models');
const { registrarAuditoria } = require('../utils/audit');

function normalizeId(id) {
  return String(id || '').replace(/^VAC-/i, '');
}

function toFrontendVacante(row) {
  if (!row) return null;
  const plain = row.get ? row.get({ plain: true }) : row;

  return {
    id: `VAC-${plain.id}`,
    raw_id: plain.id,
    area: plain.departamento?.nombre || 'Sin unidad',
    departamento_id: plain.departamento_id,
    puesto: plain.puesto,
    tipo_contrato: plain.tipo_contrato,
    perfil_requerido: plain.perfil_requerido,
    fecha_publicacion: plain.fecha_publicacion,
    estatus: plain.estatus === 'abierta' ? 'activa' : plain.estatus,
  };
}

exports.listar = async (req, res) => {
  try {
    const vacantes = await db.Vacante.findAll({
      include: [{ model: db.Departamento, as: 'departamento', required: false }],
      order: [['createdAt', 'DESC']],
    });

    res.json(vacantes.map(toFrontendVacante));
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las vacantes', details: error.message });
  }
};

exports.crear = async (req, res) => {
  try {
    const {
      departamento_id,
      puesto,
      tipo_contrato,
      perfil_requerido,
      fecha_publicacion,
      estatus,
    } = req.body;

    if (!puesto) {
      return res.status(400).json({ error: 'El puesto es obligatorio' });
    }

    const vacante = await db.Vacante.create({
      departamento_id: departamento_id || null,
      puesto,
      tipo_contrato: tipo_contrato || 'Por definir',
      perfil_requerido: perfil_requerido || null,
      fecha_publicacion: fecha_publicacion || new Date().toISOString().slice(0, 10),
      estatus: estatus === 'cerrada' ? 'cerrada' : 'abierta',
    });

    const nuevaVacante = await db.Vacante.findByPk(vacante.id, {
      include: [{ model: db.Departamento, as: 'departamento', required: false }],
    });

    await registrarAuditoria(req, {
      modulo: 'Vacantes',
      accion: `Creo vacante VAC-${vacante.id}`,
    });

    res.status(201).json(toFrontendVacante(nuevaVacante));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear la vacante', details: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const id = normalizeId(req.params.id);
    const vacante = await db.Vacante.findByPk(id);

    if (!vacante) {
      return res.status(404).json({ error: 'Vacante no encontrada' });
    }

    const payload = {
      departamento_id: req.body.departamento_id ?? vacante.departamento_id,
      puesto: req.body.puesto || vacante.puesto,
      tipo_contrato: req.body.tipo_contrato || vacante.tipo_contrato,
      perfil_requerido: req.body.perfil_requerido ?? vacante.perfil_requerido,
      fecha_publicacion: req.body.fecha_publicacion || vacante.fecha_publicacion,
      estatus: req.body.estatus === 'activa' ? 'abierta' : req.body.estatus || vacante.estatus,
    };

    await vacante.update(payload);

    const actualizada = await db.Vacante.findByPk(vacante.id, {
      include: [{ model: db.Departamento, as: 'departamento', required: false }],
    });

    await registrarAuditoria(req, {
      modulo: 'Vacantes',
      accion: `Actualizo vacante VAC-${vacante.id}`,
    });

    res.json(toFrontendVacante(actualizada));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo actualizar la vacante', details: error.message });
  }
};

exports.cerrar = async (req, res) => {
  try {
    const id = normalizeId(req.params.id);
    const vacante = await db.Vacante.findByPk(id);

    if (!vacante) {
      return res.status(404).json({ error: 'Vacante no encontrada' });
    }

    await vacante.update({ estatus: 'cerrada' });

    const cerrada = await db.Vacante.findByPk(vacante.id, {
      include: [{ model: db.Departamento, as: 'departamento', required: false }],
    });

    await registrarAuditoria(req, {
      modulo: 'Vacantes',
      accion: `Cerro vacante VAC-${vacante.id}`,
    });

    res.json(toFrontendVacante(cerrada));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo cerrar la vacante', details: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const id = normalizeId(req.params.id);
    const vacante = await db.Vacante.findByPk(id);

    if (!vacante) {
      return res.status(404).json({ error: 'Vacante no encontrada' });
    }

    await vacante.destroy();
    await registrarAuditoria(req, {
      modulo: 'Vacantes',
      accion: `Elimino vacante VAC-${id}`,
    });

    res.json({ mensaje: 'Vacante eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'No se pudo eliminar la vacante', details: error.message });
  }
};
