import { getDashboardSummary } from "../services/dashboardService.js";

export const getDashboard = async (_req, res) => {
  const dashboard = await getDashboardSummary();
  res.json(dashboard);
};

