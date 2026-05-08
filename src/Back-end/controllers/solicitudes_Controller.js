const db = require('../models');

const tiposIncidencia = ['vacaciones', 'incapacidad', 'maternidad', 'paternidad', 'comision', 'otro'];

function normalizarTipoIncidencia(tipo) {
  const normalizado = String(tipo || '').toLowerCase();
  return tiposIncidencia.includes(normalizado) ? normalizado : 'otro';
}

exports.crear = async (req, res) => {
  const solicitud = await db.Solicitud.create({
    ...req.body,
    empleado_id: req.user.empleado_id,
    estatus: 'pendiente',
  });
  res.status(201).json(solicitud);
};

exports.aprobar = async (req, res) => {
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

  res.json(solicitud);
};
