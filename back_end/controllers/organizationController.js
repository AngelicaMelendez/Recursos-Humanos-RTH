import { Area, Position } from "../models/index.js";
import { registerAudit } from "../services/auditService.js";

export const listAreas = async (_req, res) => {
  const areas = await Area.findAll({
    include: [{ model: Area, as: "subareas" }],
    order: [["nombre", "ASC"]]
  });

  res.json(areas);
};

export const createArea = async (req, res) => {
  const area = await Area.create(req.body);

  await registerAudit({
    usuario: req.user.email,
    accion: `Creó el área ${area.nombre}`,
    modulo: "Organigrama",
    ip: req.ip
  });

  res.status(201).json(area);
};

export const updateArea = async (req, res) => {
  const area = await Area.findByPk(req.params.id);
  await area.update(req.body);
  res.json(area);
};

export const listPositions = async (_req, res) => {
  const positions = await Position.findAll({
    include: [{ association: "area" }],
    order: [["nombre", "ASC"]]
  });

  res.json(positions);
};

export const createPosition = async (req, res) => {
  const position = await Position.create(req.body);
  res.status(201).json(position);
};

export const updatePosition = async (req, res) => {
  const position = await Position.findByPk(req.params.id);
  await position.update(req.body);
  res.json(position);
};

