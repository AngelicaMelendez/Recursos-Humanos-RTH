import { Router } from "express";
import authRoutes from "./authRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import organizationRoutes from "./organizationRoutes.js";
import directoryRoutes from "./directoryRoutes.js";
import incidentRoutes from "./incidentRoutes.js";
import requestRoutes from "./requestRoutes.js";
import normativityRoutes from "./normativityRoutes.js";
import vacancyRoutes from "./vacancyRoutes.js";
import visitorRoutes from "./visitorRoutes.js";
import internRoutes from "./internRoutes.js";
import accessRoutes from "./accessRoutes.js";
import auditRoutes from "./auditRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/organization", organizationRoutes);
router.use("/directory", directoryRoutes);
router.use("/incidents", incidentRoutes);
router.use("/requests", requestRoutes);
router.use("/normativity", normativityRoutes);
router.use("/vacancies", vacancyRoutes);
router.use("/visitors", visitorRoutes);
router.use("/interns", internRoutes);
router.use("/access", accessRoutes);
router.use("/audit", auditRoutes);

export default router;
