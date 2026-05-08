import { defineStore } from "pinia";
import api from "@/services/api";
import { dashboardFallback } from "@/utils/constants";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    summary: dashboardFallback.summary,
    charts: dashboardFallback.charts,
    recentActivity: dashboardFallback.recentActivity,
    upcomingBirthdays: dashboardFallback.upcomingBirthdays,
    employeesOnVacation: dashboardFallback.employeesOnVacation,
    quickActions: dashboardFallback.quickActions,
    modules: [
      { name: 'Directorio', description: 'Gestión de empleados' },
      { name: 'Incidencias', description: 'Reportes de incidentes' },
      { name: 'Solicitudes', description: 'Gestión de peticiones' },
      // Agregar más módulos según sea necesario
    ],
    announcements: [
      { id: 1, title: 'Comunicado 1', content: 'Contenido del comunicado', date: '2023-10-01', likes: 5, likedBy: [{ id: 1, name: 'Usuario1' }] },
      // Mock data
    ],
    attendance: {
      entryTime: '08:00',
      exitTime: null
    },
    attendanceHistory: [
      { id: 1, date: '2023-10-01', entry: '08:00', exit: '17:00' },
      // Mock data
    ],
    loading: false
  }),
  actions: {
    async fetchSummary() {
      this.loading = true;

      try {
        const { data } = await api.get("/dashboard");
        this.summary = data.summary;
        this.charts = data.charts;
        this.recentActivity = data.recentActivity;
        this.upcomingBirthdays = data.upcomingBirthdays;
        this.employeesOnVacation = data.employeesOnVacation;
        this.quickActions = data.quickActions;
      } catch (error) {
        console.warn("Se usó información demo del dashboard.", error);
      } finally {
        this.loading = false;
      }
    }
  }
});

