import { Incident, Employee } from "../models/index.js";
import { registerAudit } from "../services/auditService.js";

export const listIncidents = async (_req, res) => {
  const incidents = await Incident.findAll({
    include: [{ model: Employee, as: "empleado" }],
    order: [["fecha_inicio", "DESC"]]
  });

  res.json(incidents);
};

export const createIncident = async (req, res) => {
  const incident = await Incident.create({
    ...req.body,
    documento_pdf: req.file?.path || null
  });

  await registerAudit({
    usuario: req.user.email,
    accion: `Registró incidencia ${incident.tipo}`,
    modulo: "Calendario",
    ip: req.ip
  });

  res.status(201).json(incident);
};

export const updateIncident = async (req, res) => {
  const incident = await Incident.findByPk(req.params.id);
  await incident.update(req.body);
  res.json(incident);
};

