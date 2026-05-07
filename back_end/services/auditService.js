import { AuditLog } from "../models/index.js";

export const registerAudit = async ({
  usuario,
  accion,
  modulo,
  ip = "0.0.0.0",
  metadata = null
}) => {
  try {
    await AuditLog.create({
      usuario,
      accion,
      modulo,
      fecha: new Date(),
      ip,
      metadata
    });
  } catch (error) {
    console.warn("No fue posible registrar la auditoría.", error.message);
  }
};

