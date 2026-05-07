import { AuditLog } from "../models/index.js";

export const listAuditLogs = async (_req, res) => {
  const logs = await AuditLog.findAll({
    order: [["fecha", "DESC"]],
    limit: 200
  });

  res.json(logs);
};

