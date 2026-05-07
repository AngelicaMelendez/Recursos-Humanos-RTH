import { Normativity } from "../models/index.js";

export const listNormativity = async (_req, res) => {
  const records = await Normativity.findAll({
    order: [["fecha_publicacion", "DESC"]]
  });

  res.json(records);
};

export const createNormativity = async (req, res) => {
  const record = await Normativity.create({
    ...req.body,
    archivo_pdf: req.file?.path || null
  });

  res.status(201).json(record);
};

export const updateNormativity = async (req, res) => {
  const record = await Normativity.findByPk(req.params.id);
  await record.update(req.body);
  res.json(record);
};

