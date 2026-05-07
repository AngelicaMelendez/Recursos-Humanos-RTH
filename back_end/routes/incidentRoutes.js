import { Router } from "express";
import { body } from "express-validator";
import {
  createIncident,
  listIncidents,
  updateIncident
} from "../controllers/incidentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware);
router.get("/", asyncHandler(listIncidents));
router.post(
  "/",
  roleMiddleware("Administrador RH", "Jefes de Área"),
  [
    body("empleado_id").isInt(),
    body("tipo").notEmpty(),
    body("fecha_inicio").isISO8601(),
    body("fecha_fin").isISO8601()
  ],
  validateRequest,
  upload.single("documento_pdf"),
  asyncHandler(createIncident)
);
router.put("/:id", roleMiddleware("Administrador RH"), asyncHandler(updateIncident));

export default router;

