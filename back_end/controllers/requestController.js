import { Request, Employee } from "../models/index.js";
import { registerAudit } from "../services/auditService.js";

export const listRequests = async (_req, res) => {
  const requests = await Request.findAll({
    include: [{ model: Employee, as: "empleado" }],
    order: [["created_at", "DESC"]]
  });

  res.json(requests);
};

export const createRequest = async (req, res) => {
  const request = await Request.create({
    ...req.body,
    documento_adjunto: req.file?.path || null
  });

  await registerAudit({
    usuario: req.user.email,
    accion: `Creó solicitud ${request.tipo}`,
    modulo: "Solicitudes",
    ip: req.ip
  });

  res.status(201).json(request);
};

export const resolveRequest = async (req, res) => {
  const request = await Request.findByPk(req.params.id);

  await request.update({
    estatus: req.body.estatus,
    aprobado_por: req.user.email,
    fecha_resolucion: new Date()
  });

  await registerAudit({
    usuario: req.user.email,
    accion: `Resolución de solicitud ${request.id}: ${request.estatus}`,
    modulo: "Solicitudes",
    ip: req.ip
  });

  res.json(request);
};

