import { Router } from "express";
import { body } from "express-validator";
import {
  createArea,
  createPosition,
  listAreas,
  listPositions,
  updateArea,
  updatePosition
} from "../controllers/organizationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware);

router.get("/areas", asyncHandler(listAreas));
router.post(
  "/areas",
  roleMiddleware("Administrador RH", "Dirección"),
  [body("nombre").notEmpty()],
  validateRequest,
  asyncHandler(createArea)
);
router.put("/areas/:id", roleMiddleware("Administrador RH", "Dirección"), asyncHandler(updateArea));

router.get("/puestos", asyncHandler(listPositions));
router.post(
  "/puestos",
  roleMiddleware("Administrador RH", "Dirección"),
  [body("nombre").notEmpty(), body("nivel").notEmpty(), body("area_id").isInt()],
  validateRequest,
  asyncHandler(createPosition)
);
router.put(
  "/puestos/:id",
  roleMiddleware("Administrador RH", "Dirección"),
  asyncHandler(updatePosition)
);

export default router;

