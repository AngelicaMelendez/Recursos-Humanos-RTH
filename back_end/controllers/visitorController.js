import { Visitor } from "../models/index.js";

export const listVisitors = async (_req, res) => {
  const visitors = await Visitor.findAll({
    order: [["hora_entrada", "DESC"]]
  });

  res.json(visitors);
};

export const createVisitor = async (req, res) => {
  const visitor = await Visitor.create(req.body);
  res.status(201).json(visitor);
};

export const checkoutVisitor = async (req, res) => {
  const visitor = await Visitor.findByPk(req.params.id);
  await visitor.update({ hora_salida: req.body.hora_salida || new Date() });
  res.json(visitor);
};

