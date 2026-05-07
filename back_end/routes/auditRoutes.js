import { Router } from "express";
import { listAuditLogs } from "../controllers/auditController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware, roleMiddleware("Administrador RH", "Dirección"));
router.get("/", asyncHandler(listAuditLogs));

export default router;

