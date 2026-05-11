const db = require('../models');

const tiposIncidencia = ['vacaciones', 'incapacidad', 'maternidad', 'paternidad', 'comision', 'otro'];

function normalizarTipoIncidencia(tipo) {
  const normalizado = String(tipo || '').toLowerCase();
  return tiposIncidencia.includes(normalizado) ? normalizado : 'otro';
}

exports.crear = async (req, res) => {
  try {
    const solicitud = await db.Solicitud.create({
      ...req.body,
      empleado_id: req.user.empleado_id,
      estatus: 'pendiente',
    });
    res.status(201).json(toFrontendSolicitud(solicitud));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo crear la solicitud' });
  }
};

exports.aprobar = async (req, res) => {
  try {
    const { id } = req.params;
    const solicitud = await db.Solicitud.findByPk(id);
    if (!solicitud) return res.status(404).json({ error: 'No existe' });
    if (solicitud.estatus !== 'pendiente') {
      return res.status(400).json({ error: 'Solo se puede aprobar una pendiente' });
    }

    solicitud.estatus = 'aprobado';
    solicitud.aprobado_por = req.user.empleado_id;
    solicitud.fecha_resolucion = new Date();
    await solicitud.save();

    await db.Incidencia.create({
      empleado_id: solicitud.empleado_id,
      tipo: normalizarTipoIncidencia(solicitud.tipo),
      fecha_inicio: solicitud.fecha_inicio,
      fecha_fin: solicitud.fecha_fin,
      estatus: 'aprobado',
      documento_pdf: solicitud.documento_adjunto,
    });

    res.json(toFrontendSolicitud(solicitud));
  } catch (error) {
    res.status(400).json({ error: 'No se pudo aprobar la solicitud' });
  }
};

exports.rechazar = async (req, res) => {
  const { id } = req.params;
  const solicitud = await db.Solicitud.findByPk(id);
  if (!solicitud) return res.status(404).json({ error: 'No existe' });
  if (solicitud.estatus !== 'pendiente') {
    return res.status(400).json({ error: 'Solo se puede rechazar una pendiente' });
  }

  solicitud.estatus = 'rechazado';
  solicitud.aprobado_por = req.user.empleado_id;
  solicitud.fecha_resolucion = new Date();
  await solicitud.save();

  res.json(toFrontendSolicitud(solicitud));
};

function toFrontendSolicitud(row) {
  return {
    id: `SOL-${row.id}`,
    raw_id: row.id,
    empleado_id: `EMP-${String(row.empleado_id).padStart(3, '0')}`,
    tipo: row.tipo,
    fecha_inicio: row.fecha_inicio,
    fecha_fin: row.fecha_fin,
    motivo: row.motivo,
    documento_adjunto: row.documento_adjunto,
    estatus: row.estatus === 'aprobado' ? 'aprobada' : row.estatus,
    aprobado_por: row.aprobado_por || 'Pendiente',
    fecha_resolucion: row.fecha_resolucion,
  };
}

exports.toFrontendSolicitud = toFrontendSolicitud;
