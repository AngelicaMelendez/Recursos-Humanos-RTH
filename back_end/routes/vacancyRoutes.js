import { Router } from "express";
import { body } from "express-validator";
import {
  createVacancy,
  listVacancies,
  updateVacancy
} from "../controllers/vacancyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware);
router.get("/", asyncHandler(listVacancies));
router.post(
  "/",
  roleMiddleware("Administrador RH", "Dirección"),
  [
    body("area_id").isInt(),
    body("puesto").notEmpty(),
    body("tipo_contrato").notEmpty(),
    body("perfil_requerido").notEmpty(),
    body("fecha_publicacion").isISO8601()
  ],
  validateRequest,
  asyncHandler(createVacancy)
);
router.put("/:id", roleMiddleware("Administrador RH", "Dirección"), asyncHandler(updateVacancy));

export default router;

