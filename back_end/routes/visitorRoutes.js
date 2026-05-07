import { Router } from "express";
import { body } from "express-validator";
import {
  checkoutVisitor,
  createVisitor,
  listVisitors
} from "../controllers/visitorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware);
router.get("/", asyncHandler(listVisitors));
router.post(
  "/",
  roleMiddleware("Administrador RH", "Recepción"),
  [
    body("nombre").notEmpty(),
    body("institucion").notEmpty(),
    body("motivo").notEmpty(),
    body("persona_a_visitar").notEmpty(),
    body("hora_entrada").notEmpty()
  ],
  validateRequest,
  asyncHandler(createVisitor)
);
router.patch(
  "/:id/checkout",
  roleMiddleware("Administrador RH", "Recepción"),
  asyncHandler(checkoutVisitor)
);

export default router;

