import bcrypt from "bcryptjs";
import { User, Employee } from "../models/index.js";

export const listUsers = async (_req, res) => {
  const users = await User.findAll({
    include: [{ model: Employee, as: "empleado" }],
    order: [["email", "ASC"]]
  });

  res.json(users);
};

export const createUser = async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    empleado_id: req.body.empleado_id || null,
    email: req.body.email,
    rol: req.body.rol,
    password_hash: passwordHash
  });

  res.status(201).json(user);
};

export const updateUserRole = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.update({ rol: req.body.rol });
  res.json(user);
};

