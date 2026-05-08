import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import LoginPage from "@/pages/LoginPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import CalendarPage from "@/pages/CalendarPage.vue";
import OrganigramPage from "@/pages/OrganigramPage.vue";
import DirectoryPage from "@/pages/DirectoryPage.vue";
import RequestsPage from "@/pages/RequestsPage.vue";
import NormativityPage from "@/pages/NormativityPage.vue";
import VacanciesPage from "@/pages/VacanciesPage.vue";
import VisitorsPage from "@/pages/VisitorsPage.vue";
import InternsPage from "@/pages/InternsPage.vue";
import AccessControlPage from "@/pages/AccessControlPage.vue";
import AuditPage from "@/pages/AuditPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import { useAuthStore } from "@/store/auth";

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
      { path: "", name: "dashboard", component: DashboardPage },
      { path: "calendario", name: "calendar", component: CalendarPage },
      { path: "organigrama", name: "organigram", component: OrganigramPage },
      { path: "directorio", name: "directory", component: DirectoryPage },
      { path: "solicitudes", name: "requests", component: RequestsPage },
      { path: "normatividad", name: "normativity", component: NormativityPage },
      { path: "vacantes", name: "vacancies", component: VacanciesPage },
      { path: "visitantes", name: "visitors", component: VisitorsPage },
      { path: "pasantes", name: "interns", component: InternsPage },
      {
        path: "control-accesos",
        name: "access-control",
        component: AccessControlPage
      },
      { path: "auditoria", name: "audit", component: AuditPage }
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
    authStore.initialize();
  }

  if (!to.meta.public && !authStore.isAuthenticated) {
    return { name: "login" };
  }

  if (to.name === "login" && authStore.isAuthenticated) {
    return { name: "dashboard" };
  }

  return true;
});

export default router;

