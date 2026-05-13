<template>
  <div class="dashboard-page">
    <section class="hero-panel">
      <div>
        <span class="hero-panel__eyebrow">Operacion institucional</span>
        <h2>Bienvenido, {{ authStore.user?.nombre || "Usuario" }}</h2>
        <p>Comunicados segmentados, asistencia diaria y resumen operativo en una vista de trabajo clara.</p>
      </div>
      <span class="role-chip">{{ authStore.user?.rol || "Colaborador" }}</span>
    </section>

    <section class="hero-banner">
      <div class="hero-banner__content">
        <span class="hero-banner__eyebrow">Espacio de anuncio</span>
        <h3>Banner personalizado</h3>
        <p>Este es el lugar para mostrar una imagen, un mensaje de bienvenida o un aviso importante al usuario.</p>
      </div>
      <div class="hero-banner__image">
        <!-- Agrega tu imagen aquí -->
        <!-- <img src="/ruta/a/tu-imagen.jpg" alt="Banner de bienvenida" /> -->
        <div class="hero-banner__image-placeholder">Tu imagen va aquí</div>
      </div>
    </section>

    <section class="module-section attendance-module">
      <div class="module-heading">
        <div>
          <span class="module-kicker">Registro de Asistencia</span>
          <h3>Entrada y salida</h3>
          <p>El sistema usa la hora actual del equipo y valida puntualidad contra el horario laboral.</p>
        </div>
        <span class="status-pill" :class="attendanceTone">{{ attendanceMessage }}</span>
      </div>

      <div class="attendance-grid">
        <article class="time-panel">
          <IconSymbol name="door" />
          <span>Entrada</span>
          <strong>{{ dashboardStore.attendance.entryTime || "Pendiente" }}</strong>
        </article>
        <article class="time-panel">
          <IconSymbol name="lock" />
          <span>Salida</span>
          <strong>{{ dashboardStore.attendance.exitTime || "Pendiente" }}</strong>
        </article>
        <div class="attendance-actions">
          <button class="electric-button" type="button" :disabled="Boolean(dashboardStore.attendance.entryTime)" @click="registerEntry">
            Registrar entrada
          </button>
          <button
            class="ghost-button"
            type="button"
            :disabled="!dashboardStore.attendance.entryTime || Boolean(dashboardStore.attendance.exitTime)"
            @click="registerExit"
          >
            Registrar salida
          </button>
        </div>
      </div>

      <div class="history-list">
        <div class="history-list__header">
          <h4>Historial de movimientos</h4>
          <span>Horario base: {{ schedule.entry }} a {{ schedule.exit }}</span>
        </div>
        <ul>
          <li v-for="record in dashboardStore.attendanceHistory" :key="record.id">
            <div>
              <strong>{{ formatLongDate(record.date) }}</strong>
              <span>Entrada {{ record.entry }} | Salida {{ record.exit || "Pendiente" }}</span>
            </div>
            <div class="history-tags">
              <span class="status-pill" :class="statusTone(record.entryStatus)">{{ record.entryStatus }}</span>
              <span class="status-pill" :class="statusTone(record.exitStatus)">{{ record.exitStatus }}</span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="module-section announcements-module">
      <div class="module-heading">
        <div>
          <span class="module-kicker">Comunicados</span>
          <h3>Aviso</h3>
          <p>Apartado en el que encontraras noticias o anuncios importantes referentes a tu area o a todo publico.</p>
        </div>
        <button v-if="canManageAnnouncements" class="electric-button" type="button" @click="startCreateAnnouncement">
          Nuevo comunicado
        </button>
      </div>

      <div v-if="canManageAnnouncements" class="announcement-filters">
        <label>
          Area
          <select v-model="selectedArea">
            <option value="Todas">Todas</option>
            <option v-for="area in availableAreas" :key="area" :value="area">{{ area }}</option>
          </select>
        </label>
        <label>
          Oficina
          <select v-model="selectedOffice">
            <option value="Todas">Todas</option>
            <option v-for="office in availableOffices" :key="office" :value="office">{{ office }}</option>
          </select>
        </label>
      </div>

      <p v-else class="announcement-note">
        La vista publica muestra solo los comunicados asignados por administracion o jefatura.
      </p>

      <article v-if="latestAnnouncement" class="featured-announcement">
        <div class="featured-announcement__top">
          <div>
            <span>{{ latestAnnouncement.area }} | {{ latestAnnouncement.office }}</span>
            <h4>{{ latestAnnouncement.title }}</h4>
          </div>
          <button v-if="remainingAnnouncements.length" class="ghost-button ghost-button--small" type="button" @click="showMoreAnnouncements = !showMoreAnnouncements">
            {{ showMoreAnnouncements ? "Ocultar" : "Ver mas" }}
          </button>
        </div>
        <p>{{ latestAnnouncement.content }}</p>
        <div class="announcement-meta">
          <span>Creado {{ formatDateTime(latestAnnouncement.createdAt) }}</span>
          <span>Vence {{ formatDateTime(latestAnnouncement.expiresAt) }}</span>
        </div>
        <div class="announcement-actions">
          <button class="reaction-button" type="button" :class="{ active: hasLiked(latestAnnouncement) }" @click="likeAnnouncement(latestAnnouncement)">
            <IconSymbol name="check" />
            {{ latestAnnouncement.likedBy.length }} likes
          </button>
          <template v-if="canManageAnnouncements">
            <button class="ghost-button ghost-button--small" type="button" @click="startEditAnnouncement(latestAnnouncement)">Editar</button>
            <button class="danger-button" type="button" @click="deleteAnnouncement(latestAnnouncement.id)">Eliminar</button>
          </template>
        </div>
      </article>
      <div v-else class="empty-state">No hay comunicados activos para los filtros seleccionados.</div>

      <div v-if="showMoreAnnouncements && remainingAnnouncements.length" class="announcement-rail">
        <article v-for="announcement in remainingAnnouncements" :key="announcement.id" class="rail-card">
          <span>{{ formatDateTime(announcement.createdAt) }}</span>
          <strong>{{ announcement.title }}</strong>
          <p>{{ announcement.area }} | {{ announcement.office }}</p>
          <button class="ghost-button ghost-button--small" type="button" @click="openAnnouncementModal(announcement)">Ver detalle</button>
        </article>
      </div>

      <form v-if="canManageAnnouncements && announcementForm.visible" class="announcement-form" @submit.prevent="saveAnnouncement">
        <div class="form-title">
          <h4>{{ announcementForm.id ? "Editar comunicado" : "Crear comunicado" }}</h4>
          <button class="icon-button" type="button" @click="closeAnnouncementForm">x</button>
        </div>
        <label>
          Titulo
          <input v-model.trim="announcementForm.title" required />
        </label>
        <label>
          Mensaje
          <textarea v-model.trim="announcementForm.content" rows="4" required />
        </label>
        <div class="form-grid">
          <label>
            Area
            <select v-model="announcementForm.area" required>
              <option v-for="area in availableAreas" :key="area" :value="area">{{ area }}</option>
            </select>
          </label>
          <label>
            Oficina
            <select v-model="announcementForm.office" required>
              <option v-for="office in availableOffices" :key="office" :value="office">{{ office }}</option>
            </select>
          </label>
          <label>
            Vencimiento
            <input v-model="announcementForm.expiresAt" type="datetime-local" required />
          </label>
        </div>
        <button class="electric-button" type="submit">Guardar comunicado</button>
      </form>

      <section v-if="isAdmin" class="audit-panel">
        <div class="history-list__header">
          <h4>Historial y auditoria</h4>
          <span>{{ dashboardStore.announcements.length }} comunicados guardados</span>
        </div>
        <div class="audit-list">
          <article v-for="announcement in announcementsByDate" :key="`audit-${announcement.id}`">
            <div>
              <span class="status-pill" :class="isExpired(announcement) ? 'danger' : 'success'">
                {{ isExpired(announcement) ? "Vencido" : "Activo" }}
              </span>
              <h5>{{ announcement.title }}</h5>
              <p>{{ announcement.area }} | {{ announcement.office }} | {{ formatDateTime(announcement.createdAt) }}</p>
            </div>
            <details>
              <summary>{{ announcement.likedBy.length }} reacciones</summary>
              <ul>
                <li v-for="user in announcement.likedBy" :key="`${announcement.id}-${user.id}`">
                  {{ user.name }} | {{ formatDateTime(user.reactedAt) }}
                </li>
                <li v-if="!announcement.likedBy.length">Sin reacciones registradas</li>
              </ul>
            </details>
          </article>
        </div>
      </section>
    </section>

    <PageHeader
      eyebrow="Tablero institucional"
      title="Dashboard ejecutivo"
      description="Resumen estrategico de la operacion de RH, incidencias, visitantes y gestion interna."
    />

    <section class="grid grid-4">
      <StatCard v-for="item in dashboardStore.summary" :key="item.label" :item="item" />
    </section>

    <section class="grid grid-3 dashboard-grid">
      <DashboardBarChart
        title="Incidencias del mes"
        subtitle="Distribucion por tipo de incidencia registrada."
        :items="dashboardStore.charts.incidentsByType"
      />
      <DashboardDonutChart
        title="Solicitudes por estatus"
        subtitle="Seguimiento al flujo Empleado a Jefe y RH."
        :items="dashboardStore.charts.requestsByStatus"
      />
      <QuickActions :actions="dashboardStore.quickActions" />
    </section>

    <section class="grid grid-3 dashboard-grid">
      <ActivityFeed :items="dashboardStore.recentActivity" />
      <InfoList title="Proximos cumpleanos" subtitle="Cumplimientos cercanos para planeacion institucional." :items="birthdayItems" />
      <InfoList title="Empleados de vacaciones" subtitle="Cobertura operativa en curso." :items="vacationItems" />
    </section>

    <div v-if="successDialog.visible" class="toast-modal" @click="closeSuccessDialog">
      <div class="toast-box" @click.stop>
        <span class="toast-box__icon"><IconSymbol name="check" /></span>
        <h4>{{ successDialog.title }}</h4>
        <p>{{ successDialog.message }}</p>
        <button class="electric-button" type="button" @click="closeSuccessDialog">Aceptar</button>
      </div>
    </div>

    <div v-if="announcementModal.visible" class="announcement-modal" @click="closeAnnouncementModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h4>{{ announcementModal.announcement.title }}</h4>
          <button class="icon-button" type="button" @click="closeAnnouncementModal">×</button>
        </div>
        <p>{{ announcementModal.announcement.content }}</p>
        <div class="announcement-meta">
          <span>Área: {{ announcementModal.announcement.area }}</span>
          <span>Oficina: {{ announcementModal.announcement.office }}</span>
          <span>Creado: {{ formatDateTime(announcementModal.announcement.createdAt) }}</span>
          <span>Vence: {{ formatDateTime(announcementModal.announcement.expiresAt) }}</span>
        </div>
        <div class="modal-actions">
          <button class="reaction-button" type="button" :class="{ active: hasLiked(announcementModal.announcement) }" @click="likeAnnouncement(announcementModal.announcement)">
            <IconSymbol name="check" />
            {{ announcementModal.announcement.likedBy.length }} likes
          </button>
          <button class="electric-button" type="button" @click="closeAnnouncementModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import StatCard from "@/components/ui/StatCard.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import DashboardBarChart from "@/components/charts/DashboardBarChart.vue";
import DashboardDonutChart from "@/components/charts/DashboardDonutChart.vue";
import QuickActions from "@/components/shared/QuickActions.vue";
import ActivityFeed from "@/components/shared/ActivityFeed.vue";
import InfoList from "@/components/shared/InfoList.vue";
import IconSymbol from "@/components/ui/IconSymbol.vue";
import { useDashboardStore } from "@/store/dashboard";
import { useAuthStore } from "@/store/auth";
import { formatDateTime } from "@/utils/formatters";

const dashboardStore = useDashboardStore();
const authStore = useAuthStore();

const schedule = { entry: "09:00", exit: "17:00" };
const selectedArea = ref("Todas");
const selectedOffice = ref("Todas");
const showMoreAnnouncements = ref(false);
const focusedAnnouncementId = ref(null);
const attendanceMessage = ref("Listo para registrar");
const attendanceTone = ref("neutral");
const successDialog = ref({ visible: false, title: "", message: "" });
const announcementModal = ref({ visible: false, announcement: null });

const announcementForm = reactive({
  visible: false,
  id: null,
  title: "",
  content: "",
  area: "Recursos Humanos",
  office: "Direccion Administrativa",
  expiresAt: ""
});

const currentUserId = computed(() => authStore.user?.id || authStore.user?.empleado_id || 0);
const normalizedRole = computed(() => String(authStore.user?.rol || "").toLowerCase());
const isAdmin = computed(() => normalizedRole.value.includes("admin"));
const isAreaLead = computed(() => normalizedRole.value.includes("jefe"));
const canManageAnnouncements = computed(() => isAdmin.value || isAreaLead.value);

const availableAreas = computed(() => [...new Set(dashboardStore.announcements.map((item) => item.area))]);
const availableOffices = computed(() => [...new Set(dashboardStore.announcements.map((item) => item.office))]);

const announcementsByDate = computed(() =>
  [...dashboardStore.announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
);

const publicAnnouncements = computed(() =>
  announcementsByDate.value.filter((announcement) => {
    const matchesArea = selectedArea.value === "Todas" || announcement.area === selectedArea.value;
    const matchesOffice = selectedOffice.value === "Todas" || announcement.office === selectedOffice.value;
    return matchesArea && matchesOffice && !isExpired(announcement);
  })
);

const latestAnnouncement = computed(() => {
  const focused = publicAnnouncements.value.find((item) => item.id === focusedAnnouncementId.value);
  return focused || publicAnnouncements.value[0] || null;
});

const remainingAnnouncements = computed(() =>
  publicAnnouncements.value.filter((item) => item.id !== latestAnnouncement.value?.id)
);

const birthdayItems = computed(() =>
  dashboardStore.upcomingBirthdays.map((item) => ({
    name: item.name,
    meta: `${item.date} | ${item.area}`
  }))
);

const vacationItems = computed(() =>
  dashboardStore.employeesOnVacation.map((item) => ({
    name: item.name,
    meta: `${item.period} | ${item.relief}`
  }))
);

const showSuccess = (title, message) => {
  successDialog.value = { visible: true, title, message };
};

const closeSuccessDialog = () => {
  successDialog.value.visible = false;
};

const openAnnouncementModal = (announcement) => {
  announcementModal.value = { visible: true, announcement };
};

const closeAnnouncementModal = () => {
  announcementModal.value.visible = false;
};

const isExpired = (announcement) => new Date(announcement.expiresAt).getTime() <= Date.now();

const statusTone = (status = "") => {
  const value = status.toLowerCase();
  if (value.includes("tiempo") || value.includes("correcta")) return "success";
  if (value.includes("retardo") || value.includes("despues")) return "warning";
  if (value.includes("antes") || value.includes("anomalia")) return "danger";
  return "neutral";
};

const formatLongDate = (value) =>
  new Intl.DateTimeFormat("es-MX", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00`));

const toTime = (date) =>
  date.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

const minutesFromTime = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const evaluateEntry = (time) => (minutesFromTime(time) <= minutesFromTime("09:10") ? "A tiempo" : "Retardo");

const evaluateExit = (time) => {
  const minutes = minutesFromTime(time);
  if (minutes < minutesFromTime(schedule.exit)) return "Salio antes";
  if (minutes > minutesFromTime("18:30")) return "Salio despues";
  return "Salida correcta";
};

const registerEntry = () => {
  if (dashboardStore.attendance.entryTime) {
    showSuccess("Entrada ya registrada", "Tu ingreso ya se encuentra registrado para hoy.");
    return;
  }

  const now = new Date();
  const entry = toTime(now);
  const entryStatus = evaluateEntry(entry);
  dashboardStore.attendance.entryTime = entry;
  dashboardStore.attendance.exitTime = null;
  dashboardStore.attendanceHistory.unshift({
    id: Date.now(),
    date: now.toISOString().slice(0, 10),
    entry,
    exit: "",
    entryStatus,
    exitStatus: "Salida pendiente"
  });
  attendanceMessage.value = entryStatus;
  attendanceTone.value = statusTone(entryStatus);
  showSuccess("Entrada registrada", `Tu registro fue marcado como ${entryStatus}.`);
};

const registerExit = () => {
  if (!dashboardStore.attendance.entryTime) {
    showSuccess("Falta entrada", "Antes de salir, registra tu entrada.");
    return;
  }

  const now = new Date();
  const exit = toTime(now);
  const exitStatus = evaluateExit(exit);
  dashboardStore.attendance.exitTime = exit;

  const todayRecord = dashboardStore.attendanceHistory[0];
  if (todayRecord && !todayRecord.exit) {
    todayRecord.exit = exit;
    todayRecord.exitStatus = exitStatus;
  }

  attendanceMessage.value = exitStatus;
  attendanceTone.value = statusTone(exitStatus);
  showSuccess("Salida registrada", `Tu salida fue marcada como ${exitStatus}.`);
};

const hasLiked = (announcement) =>
  announcement.likedBy.some((user) => user.id === currentUserId.value);

const likeAnnouncement = (announcement) => {
  if (!authStore.user) return;
  if (hasLiked(announcement)) {
    showSuccess("Like registrado", "Tu reaccion ya estaba guardada.");
    return;
  }

  announcement.likedBy.push({
    id: currentUserId.value,
    name: authStore.user.nombre || "Usuario",
    reactedAt: new Date().toISOString()
  });
  showSuccess("Reaccion enviada", "Tu like se registro correctamente.");
};

const toDateTimeLocal = (value) => {
  const date = new Date(value);
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 16);
};

const defaultExpiration = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return toDateTimeLocal(date);
};

const startCreateAnnouncement = () => {
  Object.assign(announcementForm, {
    visible: true,
    id: null,
    title: "",
    content: "",
    area: selectedArea.value === "Todas" ? availableAreas.value[0] || "Recursos Humanos" : selectedArea.value,
    office: selectedOffice.value === "Todas" ? availableOffices.value[0] || "Direccion Administrativa" : selectedOffice.value,
    expiresAt: defaultExpiration()
  });
};

const startEditAnnouncement = (announcement) => {
  Object.assign(announcementForm, {
    visible: true,
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    area: announcement.area,
    office: announcement.office,
    expiresAt: toDateTimeLocal(announcement.expiresAt)
  });
};

const closeAnnouncementForm = () => {
  announcementForm.visible = false;
};

const saveAnnouncement = () => {
  const payload = {
    title: announcementForm.title,
    content: announcementForm.content,
    area: announcementForm.area,
    office: announcementForm.office,
    expiresAt: new Date(announcementForm.expiresAt).toISOString()
  };

  if (announcementForm.id) {
    const target = dashboardStore.announcements.find((item) => item.id === announcementForm.id);
    if (target) Object.assign(target, payload);
    showSuccess("Comunicado actualizado", "Los cambios ya estan visibles para el segmento correspondiente.");
  } else {
    dashboardStore.announcements.unshift({
      id: Date.now(),
      ...payload,
      createdAt: new Date().toISOString(),
      author: authStore.user?.nombre || "Administrador",
      likedBy: []
    });
    showSuccess("Comunicado creado", "El aviso quedo publicado hasta su fecha de vencimiento.");
  }

  closeAnnouncementForm();
};

const deleteAnnouncement = (id) => {
  dashboardStore.announcements = dashboardStore.announcements.filter((item) => item.id !== id);
  showSuccess("Comunicado eliminado", "El aviso dejo de mostrarse en la vista publica.");
};

const focusAnnouncement = (announcement) => {
  focusedAnnouncementId.value = announcement.id;
  showMoreAnnouncements.value = false;
};

onMounted(() => {
  dashboardStore.fetchSummary();
});
</script>

<style scoped>
.dashboard-page {
  display: grid;
  gap: 24px;
}

.dashboard-grid {
  margin-top: 0;
}

.hero-panel,
.module-section {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: 0 12px 40px var(--color-shadow);
}

.hero-panel {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  padding: 28px;
}

.hero-banner {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(220px, 0.8fr);
  gap: 18px;
  align-items: center;
  padding: 24px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: 0 12px 40px var(--color-shadow);
}

.hero-banner__content {
  display: grid;
  gap: 10px;
}

.hero-banner__eyebrow {
  color: #621132;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 2;
}

.hero-banner__image {
  min-height: 160px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
  padding: 18px;
}

.hero-banner__image-placeholder {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-soft);
  padding: 18px;
  text-align: center;
}

.hero-panel h2,
.module-heading h3,
.history-list h4,
.audit-panel h4,
.announcement-form h4 {
  margin: 0;
  letter-spacing: 0;
}

.hero-panel p,
.module-heading p {
  margin: 8px 0 0;
  color: #0c0b0b;
  line-height: 1.5
  ;
}

.hero-panel__eyebrow,
.module-kicker {
  color: #621132;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  line-height: 2;
}

.role-chip,
.status-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 28px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #621132;
  background: #7d2342;
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 800;
  white-space: nowrap;
}
.status-pill.neutral {
  border-color: #6f7271;
  background: #98989A;
  color: #ffffff;
} 

.status-pill.success {
  border-color: #BC955B;
  background: #DDC9A3;
  color: #ffffff;
}

.status-pill.warning {
  border-color: #6f7271;
  background: #98989A;
  color: #ffffff;
}

.status-pill.danger {
  border-color: #6f7271;
  background: #98989A;
  color: #ffffff;
}

.module-section {
  padding: 24px;
}

.module-heading,
.featured-announcement__top,
.history-list__header,
.form-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.attendance-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) minmax(220px, 0.8fr);
  gap: 14px;
  margin-top: 18px;
}

.time-panel,
.featured-announcement,
.rail-card,
.announcement-form,
.audit-panel,
.history-list {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
}

.time-panel {
  display: grid;
  gap: 8px;
  padding: 18px;
}

.time-panel svg {
  color: var(--color-primary);
}

.time-panel span,
.announcement-meta,
.rail-card span,
.rail-card p,
.audit-list p,
.history-list__header span,
.history-list li span {
  color: var(--color-text-soft);
}

.time-panel strong {
  font-size: 1.4rem;
}

.attendance-actions {
  display: grid;
  gap: 10px;
  align-content: center;
}

.electric-button,
.ghost-button,
.danger-button,
.reaction-button,
.icon-button {
  min-height: 40px;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 800;
  transition: transform var(--transition-base), border-color var(--transition-base), background var(--transition-base);
}

.electric-button {
  background: var(--color-primary);
  color: white;
}

.electric-button:hover {
  background: var(--color-primary-soft);
}

.ghost-button {
  background: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.ghost-button:hover {
  background: rgba(98, 17, 50, 0.1);
}

.danger-button {
  background: var(--color-danger);
  color: white;
}

.danger-button:hover {
  background: #6d6c6c;
}

.reaction-button {
  background: transparent;
  border-color: var(--color-text-soft);
  color: var(--color-text-soft);
}

.reaction-button:hover {
  background: rgba(106, 90, 99, 0.1);
}

.reaction-button.active {
  background: var(--color-primary);
  color: white;
}

.electric-button {
  background: linear-gradient(135deg, #7d2342), #621132;
  color: #ffffff;
  padding: 10px 16px;
}

.ghost-button{
  background: #7d2342;
  border-color: #621132;
  color: #ffffff;
  padding: 10px 14px;

}
.reaction-button{
  background: #BC955B;
  border-color: #DDC9A3;
  color: #ffffff;
  padding: 10px 14px;
}
.icon-button {
  background: #621132;
  border-color: #7d2342;
  color: #ffffff;
  padding: 10px 14px;
}

.ghost-button--small,
.danger-button {
  min-height: 34px;
  padding: 7px 10px;
  font-size: 0.84rem;
}

.danger-button {
  background: #7d2342 ;
  border-color: #621132;
  color: #ffffff;
}

.reaction-button {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.reaction-button.active {
  border-color: #BC955B;
  color: #ffffff;
}

button:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  transform: translateY(-1px);
}

.history-list {
  margin-top: 18px;
  padding: 18px;
}

.history-list ul,
.audit-panel ul {
  list-style: none;
  padding: 0;
  margin: 14px 0 0;
}

.history-list li {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 0;
  border-top: 1px solid var(--color-border);
}

.history-list li strong {
  display: block;
  margin-bottom: 4px;
}

.history-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.announcement-filters,
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.announcement-note {
  margin: 18px 0 0;
  color: var(--color-text-soft);
}

label {
  display: grid;
  gap: 7px;
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 11px 12px;
}

textarea {
  resize: vertical;
}

.featured-announcement {
  margin-top: 18px;
  padding: 22px;
}

.featured-announcement h4 {
  margin: 6px 0 0;
  font-size: 1.5rem;
}

.featured-announcement p {
  color: var(--color-text-soft);
  line-height: 1.7;
}

.announcement-meta,
.announcement-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.announcement-actions {
  margin-top: 16px;
}

.announcement-rail {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding: 16px 0 4px;
  scroll-snap-type: x mandatory;
}

.rail-card {
  flex: 0 0 min(320px, 86vw);
  padding: 16px;
  scroll-snap-align: start;
}

.rail-card strong {
  display: block;
  margin: 8px 0;
}

.announcement-form {
  display: grid;
  gap: 14px;
  margin-top: 18px;
  padding: 18px;
}

.form-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 0;
}

.icon-button {
  min-width: 36px;
  padding: 0 10px;
}

.audit-panel {
  margin-top: 18px;
  padding: 18px;
}

.audit-list {
  display: grid;
  gap: 12px;
  margin-top: 14px;
}

.audit-list article {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 0.7fr);
  gap: 16px;
  padding: 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.audit-list h5 {
  margin: 10px 0 6px;
  font-size: 1rem;
}

details {
  color: var(--color-text-soft);
}

summary {
  cursor: pointer;
  font-weight: 800;
}

.empty-state {
  margin-top: 18px;
  padding: 18px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-soft);
}

.toast-modal {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.54);
}

.toast-box {
  width: min(420px, 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 22px;
  text-align: center;
  box-shadow: 0 24px 70px var(--color-shadow);
}

.toast-box__icon {
  display: inline-grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(98, 17, 50, 0.1);
  color: var(--color-primary);
}

.announcement-modal {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  width: min(600px, 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  padding: 24px;
  box-shadow: 0 24px 70px var(--color-shadow);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.modal-header h4 {
  margin: 0;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
}

@media (max-width: 1100px) {
  .attendance-grid,
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .hero-panel,
  .module-heading,
  .featured-announcement__top,
  .history-list__header,
  .history-list li,
  .audit-list article {
    display: grid;
    grid-template-columns: 1fr;
  }

  .announcement-filters {
    grid-template-columns: 1fr;
  }

  .history-tags {
    justify-content: flex-start;
  }
}
</style>
