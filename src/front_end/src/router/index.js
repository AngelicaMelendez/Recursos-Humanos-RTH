import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import LoginPage from "@/pages/LoginPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import CalendarPage from "@/pages/CalendarPage.vue";
import DirectoryPage from "@/pages/DirectoryPage.vue";
import OrganogramaPage from "@/pages/OrganogramaPage.vue";
import RequestsPage from "@/pages/RequestsPage.vue";
import NormativityPage from "@/pages/NormativityPage.vue";
import VacanciesPage from "@/pages/VacanciesPage.vue";
import VisitorsPage from "@/pages/VisitorsPage.vue";
import AccessControlPage from "@/pages/AccessControlPage.vue";
import AuditPage from "@/pages/AuditPage.vue";
import ComunicadosPage from "@/pages/ComunicadosPage.vue";
import AttendancePage from "@/pages/AttendancePage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import { useAuthStore } from "@/store/auth";
import { canAccessModule } from "@/utils/permissions";

const routes = [
  {
    path: "/login",
    component: AuthLayout,
    meta: { public: true },
    children: [{ path: "", name: "login", component: LoginPage }]
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name: "dashboard", component: DashboardPage, meta: { module: "dashboard" } },
      { path: "calendario", name: "calendar", component: CalendarPage, meta: { module: "calendar" } },
            { path: "directorio", name: "directory", component: DirectoryPage, meta: { module: "directory" } },
      { path: "organigrama", name: "organograma", component: OrganogramaPage, meta: { module: "organograma" } },
      { path: "solicitudes", name: "requests", component: RequestsPage, meta: { module: "requests" } },
      { path: "normatividad", name: "normativity", component: NormativityPage, meta: { module: "normativity" } },
      { path: "vacantes", name: "vacancies", component: VacanciesPage, meta: { module: "vacancies" } },
      { path: "visitantes", name: "visitors", component: VisitorsPage, meta: { module: "visitors" } },
      {
        path: "control-accesos",
        name: "access-control",
        component: AccessControlPage,
        meta: { module: "accessControl" }
      },
      { path: "auditoria", name: "audit", component: AuditPage, meta: { module: "audit" } },
      { path: "comunicados", name: "comunicados", component: ComunicadosPage, meta: { module: "comunicados" } },
      { path: "asistencia", name: "attendance", component: AttendancePage, meta: { module: "attendance" } }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundPage,
    meta: { public: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.initialized) {
    await authStore.initialize();
  }

  if (!to.meta.public && !authStore.isAuthenticated) {
    return { name: "login" };
  }

  if (to.meta.module && !canAccessModule(authStore.user?.rol, to.meta.module)) {
    return { name: "dashboard" };
  }

  if (to.name === "login" && authStore.isAuthenticated) {
    return { name: "dashboard" };
  }

  return true;
});

export default router;

