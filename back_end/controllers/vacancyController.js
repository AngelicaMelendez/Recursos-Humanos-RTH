import { Vacancy, Area } from "../models/index.js";

export const listVacancies = async (_req, res) => {
  const vacancies = await Vacancy.findAll({
    include: [{ model: Area, as: "area" }],
    order: [["fecha_publicacion", "DESC"]]
  });

  res.json(vacancies);
};

export const createVacancy = async (req, res) => {
  const vacancy = await Vacancy.create(req.body);
  res.status(201).json(vacancy);
};

export const updateVacancy = async (req, res) => {
  const vacancy = await Vacancy.findByPk(req.params.id);
  await vacancy.update(req.body);
  res.json(vacancy);
};

