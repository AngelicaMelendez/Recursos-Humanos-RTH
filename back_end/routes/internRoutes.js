import { Router } from "express";
import { body } from "express-validator";
import {
  createIntern,
  listInterns,
  updateIntern
} from "../controllers/internController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware);
router.get("/", asyncHandler(listInterns));
router.post(
  "/",
  roleMiddleware("Administrador RH"),
  [
    body("nombre").notEmpty(),
    body("institucion").notEmpty(),
    body("carrera").notEmpty(),
    body("periodo_inicio").isISO8601(),
    body("periodo_fin").isISO8601()
  ],
  validateRequest,
  upload.single("documento_convenio"),
  asyncHandler(createIntern)
);
router.put("/:id", roleMiddleware("Administrador RH"), asyncHandler(updateIntern));

export default router;

