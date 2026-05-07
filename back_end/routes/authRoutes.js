import { Router } from "express";
import { body } from "express-validator";
import { login, me, register } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("El correo debe ser válido."),
    body("password").isLength({ min: 8 }).withMessage("La contraseña es obligatoria.")
  ],
  validateRequest,
  asyncHandler(login)
);

router.get("/me", authMiddleware, asyncHandler(me));

router.post(
  "/register",
  authMiddleware,
  roleMiddleware("Administrador RH"),
  [
    body("email").isEmail(),
    body("rol").notEmpty(),
    body("password").isLength({ min: 8 })
  ],
  validateRequest,
  asyncHandler(register)
);

export default router;

