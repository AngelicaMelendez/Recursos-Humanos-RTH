import { Intern } from "../models/index.js";

export const listInterns = async (_req, res) => {
  const interns = await Intern.findAll({
    order: [["periodo_inicio", "DESC"]]
  });

  res.json(interns);
};

export const createIntern = async (req, res) => {
  const intern = await Intern.create({
    ...req.body,
    documento_convenio: req.file?.path || null
  });

  res.status(201).json(intern);
};

export const updateIntern = async (req, res) => {
  const intern = await Intern.findByPk(req.params.id);
  await intern.update(req.body);
  res.json(intern);
};

