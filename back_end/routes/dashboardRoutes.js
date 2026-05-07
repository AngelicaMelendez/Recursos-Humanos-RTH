import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", authMiddleware, asyncHandler(getDashboard));

export default router;

