import { Router } from "express";
import { body } from "express-validator";
import {
  createUser,
  listUsers,
  updateUserRole
} from "../controllers/accessController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware, roleMiddleware("Administrador RH"));
router.get("/", asyncHandler(listUsers));
router.post(
  "/",
  [body("email").isEmail(), body("rol").notEmpty(), body("password").isLength({ min: 8 })],
  validateRequest,
  asyncHandler(createUser)
);
router.patch("/:id/role", [body("rol").notEmpty()], validateRequest, asyncHandler(updateUserRole));

export default router;

