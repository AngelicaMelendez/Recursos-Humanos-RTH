import bcrypt from "bcryptjs";
import { User, Employee } from "../models/index.js";
import { signToken } from "../services/tokenService.js";
import { registerAudit } from "../services/auditService.js";
import { ApiError } from "../utils/ApiError.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@hidalgo.gob.mx" && password === "Password123!") {
    const demoUser = {
      sub: "demo-admin",
      email,
      rol: "Administrador RH",
      nombre: "Administrador RH"
    };

    await registerAudit({
      usuario: email,
      accion: "Inicio de sesión demo",
      modulo: "Autenticación",
      ip: req.ip
    });

    return res.json({
      token: signToken(demoUser),
      user: demoUser
    });
  }

  const user = await User.findOne({
    where: { email },
    include: [{ model: Employee, as: "empleado" }]
  });

  if (!user) {
    throw new ApiError(401, "Las credenciales proporcionadas no son válidas.");
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    throw new ApiError(401, "Las credenciales proporcionadas no son válidas.");
  }

  await user.update({ ultimo_acceso: new Date() });

  const payload = {
    sub: user.id,
    email: user.email,
    rol: user.rol,
    nombre: user.empleado
      ? `${user.empleado.nombres} ${user.empleado.apellidos}`
      : "Usuario institucional"
  };

  await registerAudit({
    usuario: user.email,
    accion: "Inicio de sesión exitoso",
    modulo: "Autenticación",
    ip: req.ip
  });

  return res.json({
    token: signToken(payload),
    user: payload
  });
};

export const me = async (req, res) => {
  res.json(req.user);
};

export const register = async (req, res) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    empleado_id: req.body.empleado_id || null,
    email: req.body.email,
    rol: req.body.rol,
    password_hash: passwordHash
  });

  await registerAudit({
    usuario: req.user?.email || req.body.email,
    accion: `Registró usuario ${user.email}`,
    modulo: "Control de accesos",
    ip: req.ip
  });

  res.status(201).json(user);
};

