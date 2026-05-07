import { Router } from "express";
import { body } from "express-validator";
import {
  createRequest,
  listRequests,
  resolveRequest
} from "../controllers/requestController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware);
router.get("/", asyncHandler(listRequests));
router.post(
  "/",
  [
    body("empleado_id").isInt(),
    body("tipo").notEmpty(),
    body("fecha_inicio").isISO8601(),
    body("fecha_fin").isISO8601(),
    body("motivo").notEmpty()
  ],
  validateRequest,
  upload.single("documento_adjunto"),
  asyncHandler(createRequest)
);
router.patch(
  "/:id/resolve",
  roleMiddleware("Administrador RH", "Dirección", "Jefes de Área"),
  [body("estatus").notEmpty()],
  validateRequest,
  asyncHandler(resolveRequest)
);

export default router;

