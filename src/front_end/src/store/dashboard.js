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
      {
        id: 1,
        title: "Ajuste de guardias operativas",
        content: "Las jefaturas deberan confirmar la cobertura de turnos especiales antes del cierre administrativo del viernes.",
        area: "Recursos Humanos",
        office: "Direccion Administrativa",
        createdAt: "2026-05-12T08:35:00",
        expiresAt: "2026-05-24T18:00:00",
        author: "Administrador RH",
        likedBy: [
          { id: 2, name: "Ana Laura Perez", reactedAt: "2026-05-12T09:04:00" },
          { id: 4, name: "Carlos Ortega", reactedAt: "2026-05-12T09:16:00" }
        ]
      },
      {
        id: 2,
        title: "Mantenimiento preventivo en sistemas",
        content: "El acceso a expedientes digitales puede presentar intermitencias de 18:00 a 19:00 horas por mantenimiento programado.",
        area: "Sistemas",
        office: "Soporte Tecnico",
        createdAt: "2026-05-11T16:15:00",
        expiresAt: "2026-05-18T19:30:00",
        author: "Jefe de Area",
        likedBy: [{ id: 3, name: "Monica Duran", reactedAt: "2026-05-11T16:42:00" }]
      },
      {
        id: 3,
        title: "Cierre de comprobaciones",
        content: "Las comprobaciones pendientes del mes deberan entregarse con soporte documental completo para revision de Finanzas.",
        area: "Finanzas",
        office: "Direccion Administrativa",
        createdAt: "2026-05-09T12:10:00",
        expiresAt: "2026-05-10T15:00:00",
        author: "Administrador RH",
        likedBy: []
      }
    ],
    attendance: {
      entryTime: null,
      exitTime: null
    },
    attendanceHistory: [
      {
        id: 1,
        date: "2026-05-11",
        entry: "08:52:14",
        exit: "17:08:55",
        entryStatus: "A Tiempo",
        exitStatus: "Salida Correcta"
      },
      {
        id: 2,
        date: "2026-05-10",
        entry: "09:18:03",
        exit: "16:42:19",
        entryStatus: "Retardo",
        exitStatus: "Salio Antes"
      }
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

