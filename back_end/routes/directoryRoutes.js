import { Router } from "express";
import { body } from "express-validator";
import {
  createEmployee,
  listActiveEmployees,
  listEmployeeDocuments,
  listEmployeeHistory,
  listFormerEmployees,
  updateEmployeeStatus,
  uploadEmployeeDocument
} from "../controllers/directoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authMiddleware);

router.get("/employees", asyncHandler(listActiveEmployees));
router.get("/employees/former", asyncHandler(listFormerEmployees));
router.post(
  "/employees",
  roleMiddleware("Administrador RH"),
  [
    body("numero_empleado").notEmpty(),
    body("nombres").notEmpty(),
    body("apellidos").notEmpty(),
    body("email").isEmail(),
    body("fecha_ingreso").isISO8601(),
    body("puesto_id").isInt()
  ],
  validateRequest,
  asyncHandler(createEmployee)
);
router.patch(
  "/employees/:id/status",
  roleMiddleware("Administrador RH"),
  asyncHandler(updateEmployeeStatus)
);
router.get("/employees/:id/documents", asyncHandler(listEmployeeDocuments));
router.post(
  "/employees/:id/documents",
  roleMiddleware("Administrador RH"),
  upload.single("archivo"),
  asyncHandler(uploadEmployeeDocument)
);
router.get("/employees/:id/history", asyncHandler(listEmployeeHistory));

export default router;

