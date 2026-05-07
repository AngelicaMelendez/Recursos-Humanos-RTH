import { Router } from "express";
import { body } from "express-validator";
import {
  createNormativity,
  listNormativity,
  updateNormativity
} from "../controllers/normativityController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware);
router.get("/", asyncHandler(listNormativity));
router.post(
  "/",
  roleMiddleware("Administrador RH", "Dirección"),
  [
    body("nombre").notEmpty(),
    body("tipo").notEmpty(),
    body("version").notEmpty(),
    body("fecha_publicacion").isISO8601()
  ],
  validateRequest,
  upload.single("archivo_pdf"),
  asyncHandler(createNormativity)
);
router.put("/:id", roleMiddleware("Administrador RH", "Dirección"), asyncHandler(updateNormativity));

export default router;

