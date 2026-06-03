<template>
  <div class="dashboard-page">
    <PageHeader
      eyebrow="Tablero institucional"
      title="Dashboard Ejecutivo"
      description="Resumen estrategico de la operacion diaria, comunicados y seguimiento operativo de Recursos Humanos."
    >
      <div class="header-pills">
        <span class="pill primary">{{ authStore.user?.rol || "Colaborador" }}</span>
        <span class="pill neutral">{{ todayLabel }}</span>
      </div>
    </PageHeader>

    <section class="overview-grid">
      <article class="welcome-panel">
        <span class="welcome-panel__eyebrow">Operacion institucional</span>
        <h2>
          Bienvenid(a),
          {{ authStore.user?.nombre || authStore.user?.name || authStore.user?.usuario || authStore.user?.rol || 'Usuario' }}
        </h2>
        <p>
          Consulta el estado general del dia, revisa avisos vigentes y usa los accesos del tablero
          segun tu ritmo de trabajo.
        </p>
      </article>
    </section>

    <section class="module-section attendance-module">
      <div class="module-heading">
        <div>
          <span class="module-kicker">Registro de asistencia</span>
          <h3>Entrada y Salida</h3>
          <p>Tu estatus se actualiza en tiempo real usando la hora actual del equipo.</p>
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
      </div>

      <div class="attendance-actions">
        <button
          class="electric-button"
          type="button"
          :disabled="Boolean(dashboardStore.attendance.entryTime)"
          @click="registerEntry"
        >
          Registrar Entrada
        </button>
        <button
          class="ghost-button"
          type="button"
          :disabled="!dashboardStore.attendance.entryTime || Boolean(dashboardStore.attendance.exitTime)"
          @click="registerExit"
        >
          Registrar Salida
        </button>
      </div>

      <div class="history-list">
        <div class="history-list__header">
          <h4>Historial de Movimientos</h4>
          <span>Horario base: {{ schedule.entry }} a {{ schedule.exit }}</span>
        </div>

        <ul>
          <li v-for="record in dashboardStore.attendanceHistory" :key="record.id">
            <div>
              <strong>{{ formatLongDate(record.date) }}</strong>
              <span>Entrada {{ record.entry }} | Salida {{ record.exit || "Pendiente" }}</span>
            </div>

            <div class="history-tags">
              <span class="status-pill" :class="statusTone(record.entryStatus)">
                {{ record.entryStatus }}
              </span>
              <span class="status-pill" :class="statusTone(record.exitStatus)">
                {{ record.exitStatus }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="module-section summary-container">
      <div class="summary-grid">
        <StatCard v-for="item in visibleSummary" :key="item.label" :item="item" />
      </div>
    </section>

    <section class="module-section announcements-section">
      <div class="announcements-module">
        <div class="core-orden-vertical">
          <div class="module-heading">
            <div>
              <span class="module-kicker">Comunicados</span>
              <h3>Avisos activos</h3>
              <p>
                Revisa rapidamente los anuncios vigentes y abre el detalle completo cuando lo
                necesites.
              </p>
            </div>

            <div class="module-tools">
              <router-link class="ghost-button" to="/comunicados">Ver todos</router-link>
              <button
                v-if="canManageAnnouncements"
                class="electric-button"
                type="button"
                @click="startCreateAnnouncement"
              >
                Nuevo comunicado
              </button>
            </div>
          </div>

          <p v-if="!canManageAnnouncements" class="announcement-note">
            Esta vista muestra solo los comunicados vigentes para consulta rapida.
          </p>

          <article v-if="latestAnnouncement" class="featured-announcement">
            <div class="featured-announcement__top">
              <div>
                <span class="featured-announcement__meta">
                  {{ latestAnnouncement.area }} | {{ latestAnnouncement.office }}
                </span>
                <h4>{{ latestAnnouncement.title }}</h4>
              </div>

              <button
                v-if="remainingAnnouncements.length"
                class="ghost-button ghost-button--small"
                type="button"
                @click="showMoreAnnouncements = !showMoreAnnouncements"
              >
                {{ showMoreAnnouncements ? "Ocultar" : "Ver mas" }}
              </button>
            </div>

            <p>{{ latestAnnouncement.content }}</p>

            <div class="announcement-meta">
              <span>Publicado {{ formatDateTime(latestAnnouncement.createdAt) }}</span>
              <span>Vence {{ formatDateTime(latestAnnouncement.expiresAt) }}</span>
            </div>

            <div class="announcement-actions">
              <button
                class="reaction-button"
                type="button"
                :class="{ active: hasLiked(latestAnnouncement) }"
                @click="likeAnnouncement(latestAnnouncement)"
              >
                <IconSymbol name="check" />
                {{ latestAnnouncement.likedBy.length }} reacciones
              </button>

              <button
                class="ghost-button ghost-button--small"
                type="button"
                @click="openAnnouncementModal(latestAnnouncement)"
              >
                Ver detalle
              </button>

              <template v-if="canManageAnnouncements">
                <button
                  class="ghost-button ghost-button--small"
                  type="button"
                  @click="startEditAnnouncement(latestAnnouncement)"
                >
                  Editar
                </button>
                <button
                  class="danger-button"
                  type="button"
                  @click="deleteAnnouncement(latestAnnouncement.id)"
                >
                  Eliminar
                </button>
              </template>
            </div>
          </article>

          <div v-else class="empty-state">
            No hay comunicados activos en este momento.
          </div>

          <div
            v-if="showMoreAnnouncements && remainingAnnouncements.length"
            class="announcement-rail"
          >
            <article
              v-for="announcement in remainingAnnouncements"
              :key="announcement.id"
              class="rail-card"
            >
              <span>{{ formatDateTime(announcement.createdAt) }}</span>
              <strong>{{ announcement.title }}</strong>
              <p>{{ announcement.area }} | {{ announcement.office }}</p>
              <button
                class="ghost-button ghost-button--small"
                type="button"
                @click="openAnnouncementModal(announcement)"
              >
                Ver detalle
              </button>
            </article>
          </div>

          <form
            v-if="canManageAnnouncements && announcementForm.visible"
            class="announcement-form"
            @submit.prevent="saveAnnouncement"
          >
            <div class="form-title">
              <h4>{{ announcementForm.id ? "Editar comunicado" : "Crear comunicado" }}</h4>
              <button class="icon-button icon-button--plain" type="button" @click="closeAnnouncementForm">
                x
              </button>
            </div>

            <label>
              Titulo
              <input v-model.trim="announcementForm.title" required />
            </label>

            <label>
              Mensaje
              <textarea v-model.trim="announcementForm.content" rows="4" required></textarea>
            </label>

            <div class="form-grid">
              <label>
                Area
                <select v-model="announcementForm.area" required>
                  <option v-for="area in announcementAreaOptions" :key="area" :value="area">
                    {{ area }}
                  </option>
                </select>
              </label>

              <label>
                Oficina
                <select v-model="announcementForm.office" required>
                  <option v-for="office in announcementOfficeOptions" :key="office" :value="office">
                    {{ office }}
                  </option>
                </select>
              </label>

              <label>
                Vencimiento
                <input v-model="announcementForm.expiresAt" type="datetime-local" required />
              </label>
            </div>

            <button class="electric-button" type="submit">Guardar comunicado</button>
          </form>
        </div>
      </div>
    </section>

    <section class="widgets-grid">
      <div class="module-section widget-card">
        <DashboardBarChart
          title="Incidencias del Mes"
          subtitle="Distribucion por tipo de incidencia registrada."
          :items="dashboardStore.charts.incidentsByType"
        />
      </div>

      <div class="module-section widget-card">
        <DashboardDonutChart
          title="Solicitudes por Estatus"
          subtitle="Seguimiento al flujo de aprobacion institucional."
          :items="dashboardStore.charts.requestsByStatus"
        />
      </div>

      <div class="module-section widget-card quick-actions-card">
        <QuickActions :actions="dashboardStore.quickActions" />
      </div>

      <div class="module-section widget-card">
        <ActivityFeed :items="dashboardStore.recentActivity" />
      </div>

      <div class="module-section widget-card">
        <InfoList
          title="Proximos Cumpleaños"
          subtitle="Personal con fechas cercanas para seguimiento interno."
          :items="birthdayItems"
        />
      </div>

      <div class="module-section widget-card">
        <InfoList
          title="Empleados de Vacaciones"
          subtitle="Cobertura operativa actual por area."
          :items="vacationItems"
        />
      </div>
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
          <h4>{{ announcementModal.announcement?.title }}</h4>
          <button class="icon-button icon-button--plain" type="button" @click="closeAnnouncementModal">
            x
          </button>
        </div>

        <p>{{ announcementModal.announcement?.content }}</p>

        <div class="announcement-meta">
          <span>Area: {{ announcementModal.announcement?.area }}</span>
          <span>Oficina: {{ announcementModal.announcement?.office }}</span>
          <span>Creado: {{ formatDateTime(announcementModal.announcement?.createdAt) }}</span>
          <span>Vence: {{ formatDateTime(announcementModal.announcement?.expiresAt) }}</span>
        </div>

        <div class="modal-actions">
          <button
            class="reaction-button"
            type="button"
            :class="{ active: hasLiked(announcementModal.announcement) }"
            @click="likeAnnouncement(announcementModal.announcement)"
          >
            <IconSymbol name="check" />
            {{ announcementModal.announcement?.likedBy?.length || 0 }} reacciones
          </button>
          <button class="electric-button" type="button" @click="closeAnnouncementModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import ActivityFeed from "@/components/shared/ActivityFeed.vue";
import DashboardBarChart from "@/components/charts/DashboardBarChart.vue";
import DashboardDonutChart from "@/components/charts/DashboardDonutChart.vue";
import IconSymbol from "@/components/ui/IconSymbol.vue";
import InfoList from "@/components/shared/InfoList.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import QuickActions from "@/components/shared/QuickActions.vue";
import StatCard from "@/components/ui/StatCard.vue";
import { useAuthStore } from "@/store/auth";
import { useDashboardStore } from "@/store/dashboard";
import { formatDateTime } from "@/utils/formatters";

const dashboardStore = useDashboardStore();
const authStore = useAuthStore();

const schedule = { entry: "09:00", exit: "17:00" };
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

const visibleSummary = computed(() =>
  dashboardStore.summary.filter((item) => !String(item.label || "").toLowerCase().includes("pasantes"))
);

const announcementAreaOptions = computed(() => {
  const values = [...new Set(dashboardStore.announcements.map((item) => item.area).filter(Boolean))];
  return values.length ? values : ["Recursos Humanos"];
});

const announcementOfficeOptions = computed(() => {
  const values = [...new Set(dashboardStore.announcements.map((item) => item.office).filter(Boolean))];
  return values.length ? values : ["Direccion Administrativa"];
});

const announcementsByDate = computed(() =>
  [...dashboardStore.announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
);

const activeAnnouncements = computed(() =>
  announcementsByDate.value.filter((announcement) => !isExpired(announcement))
);

const latestAnnouncement = computed(() => {
  const focused = activeAnnouncements.value.find((item) => item.id === focusedAnnouncementId.value);
  return focused || activeAnnouncements.value[0] || null;
});

const remainingAnnouncements = computed(() =>
  activeAnnouncements.value.filter((item) => item.id !== latestAnnouncement.value?.id)
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

const todayLabel = computed(() =>
  new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long"
  }).format(new Date())
);

const showSuccess = (title, message) => {
  successDialog.value = { visible: true, title, message };
};

const closeSuccessDialog = () => {
  successDialog.value.visible = false;
};

const openAnnouncementModal = (announcement) => {
  if (!announcement) return;
  focusedAnnouncementId.value = announcement.id;
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

const hasLiked = (announcement) => {
  if (!announcement?.likedBy) return false;
  return announcement.likedBy.some((user) => user.id === currentUserId.value);
};

const likeAnnouncement = (announcement) => {
  if (!authStore.user || !announcement) return;
  if (hasLiked(announcement)) {
    showSuccess("Reaccion registrada", "Tu reaccion ya estaba guardada.");
    return;
  }

  announcement.likedBy.push({
    id: currentUserId.value,
    name: authStore.user.nombre || "Usuario",
    reactedAt: new Date().toISOString()
  });

  if (announcementModal.value.announcement?.id === announcement.id) {
    announcementModal.value = { ...announcementModal.value, announcement };
  }

  showSuccess("Reaccion enviada", "Tu reaccion se registro correctamente.");
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
    area: announcementAreaOptions.value[0] || "Recursos Humanos",
    office: announcementOfficeOptions.value[0] || "Direccion Administrativa",
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
    showSuccess("Comunicado actualizado", "Los cambios ya estan visibles para consulta.");
  } else {
    dashboardStore.announcements.unshift({
      id: Date.now(),
      ...payload,
      createdAt: new Date().toISOString(),
      author: authStore.user?.nombre || "Administrador",
      likedBy: []
    });
    showSuccess("Comunicado creado", "El aviso quedo publicado correctamente.");
  }

  closeAnnouncementForm();
};

const deleteAnnouncement = (id) => {
  dashboardStore.announcements = dashboardStore.announcements.filter((item) => item.id !== id);
  if (focusedAnnouncementId.value === id) {
    focusedAnnouncementId.value = null;
  }
  if (announcementModal.value.announcement?.id === id) {
    closeAnnouncementModal();
  }
  showSuccess("Comunicado eliminado", "El aviso dejo de mostrarse en el tablero.");
};

onMounted(() => {
  dashboardStore.fetchSummary();
});
</script>

<style scoped>
.dashboard-page {
  display: grid;
  gap: 20px;
}

.header-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.overview-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.welcome-panel,
.module-section {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: 0 14px 36px var(--color-shadow);
}

.welcome-panel {
  padding: 24px 28px;
  min-height: 0;
  background:
    radial-gradient(circle at top right, rgba(197, 155, 82, 0.14), transparent 28%),
    linear-gradient(180deg, rgba(255, 253, 249, 1), rgba(246, 241, 234, 0.96));
}

.welcome-panel__eyebrow,
.module-kicker {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
 
}

.welcome-panel h2,
.module-heading h3,
.history-list h4,
.announcement-form h4,
.modal-header h4,
.toast-box h4 {
  margin: 0;
}

.welcome-panel p,
.module-heading p,
.featured-announcement p {
  margin: 10px 0 0;
  color: var(--color-text-soft);
  line-height: 1.7;
}
.announcement-meta,
.history-list__header span,
.history-list li span,
.rail-card span,
.rail-card p {
  color: var(--color-text-soft);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
}

.core-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(320px, 0.95fr);
  gap: 18px;
  align-items: start;
}

.core-orden-vertical {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.module-section {
  padding: 24px;
  gap: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.announcements-module,
.attendance-module {
  width: 100%; /* Asegura que ocupen todo el ancho disponible */
  
  /* CAMBIO AQUÍ: Cambiado de block a flex por si tienen etiquetas adentro */
  display: flex;
  flex-direction: column;
  gap: 8px; /* Separación interna para las cosas que estén dentro de cada módulo */
  
  margin-bottom: 0;
}

.module-heading,
.featured-announcement__top,
.history-list__header,
.form-title,
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.module-tools,
.announcement-actions,
.modal-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.announcement-note {
  margin: 16px 0 0;
  color: var(--color-text-soft);
}

.featured-announcement,
.rail-card,
.announcement-form,
.time-panel,
.history-list {
  border: 1px solid rgba(197, 155, 82, 0.16);
  border-radius: var(--radius-md);
  background: linear-gradient(180deg, rgba(255, 253, 249, 1), rgba(241, 231, 219, 0.82));
}

.featured-announcement {
  display: grid;
  gap: 16px;
  margin-top: 18px;
  padding: 22px;
}

.featured-announcement__meta {
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 700;
}

.featured-announcement h4 {
  margin: 8px 0 0;
  font-size: 1.45rem;
  color: var(--color-primary-strong);
}

.announcement-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.9rem;
}

.announcement-rail {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.rail-card {
  display: grid;
  gap: 8px;
  padding: 16px;
}

.announcement-form {
  display: grid;
  gap: 14px;
  margin-top: 18px;
  padding: 18px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.attendance-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.time-panel {
  display: grid;
  gap: 8px;
  padding: 18px;
}

.time-panel strong {
  color: var(--color-primary);
  font-size: 1.35rem;
}

.time-panel svg {
  color: var(--color-accent-strong);
}

.attendance-actions {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.history-list {
  margin-top: 18px;
  padding: 18px;
}

.history-list ul {
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
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 30px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 800;
  white-space: nowrap;
  border: 1px solid rgba(123, 111, 116, 0.2);
  background: rgba(123, 111, 116, 0.12);
  color: var(--color-neutral);
}

.status-pill.success {
  border-color: rgba(47, 107, 79, 0.2);
  background: rgba(47, 107, 79, 0.12);
  color: var(--color-success);
}

.status-pill.warning {
  border-color: rgba(178, 123, 44, 0.24);
  background: rgba(178, 123, 44, 0.12);
  color: var(--color-warning);
}

.status-pill.danger {
  border-color: rgba(157, 45, 62, 0.2);
  background: rgba(157, 45, 62, 0.12);
  color: var(--color-danger);
}

.status-pill.accent {
  border-color: rgba(197, 155, 82, 0.22);
  background: rgba(197, 155, 82, 0.16);
  color: var(--color-accent-strong);
}

.electric-button,
.ghost-button,
.danger-button,
.reaction-button,
.icon-button {
  min-height: 40px;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 700;
  transition:
    box-shadow var(--transition-base),
    border-color var(--transition-base),
    background var(--transition-base);
}

.electric-button {
  padding: 10px 16px;
  background: linear-gradient(135deg, var(--color-primary-soft), var(--color-primary));
  color: #fff;
  box-shadow: 0 10px 22px rgba(107, 24, 57, 0.18);
}

.ghost-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-color: rgba(107, 24, 57, 0.14);
  background: rgba(107, 24, 57, 0.06);
  color: var(--color-primary);
}

.reaction-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-color: rgba(197, 155, 82, 0.22);
  background: rgba(197, 155, 82, 0.16);
  color: var(--color-accent-strong);
}

.reaction-button.active {
  background: var(--color-accent);
  color: #fff;
}

.danger-button {
  padding: 8px 14px;
  border-color: rgba(157, 45, 62, 0.18);
  background: rgba(157, 45, 62, 0.1);
  color: var(--color-danger);
}

.ghost-button--small,
.danger-button {
  min-height: 36px;
  font-size: 0.85rem;
}

.icon-button {
  min-width: 40px;
  padding: 0 12px;
  border-radius: 12px;
  background: rgba(107, 24, 57, 0.08);
  color: var(--color-primary);
}

.icon-button--plain {
  min-height: 36px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

button:not(:disabled):hover,
.ghost-button:hover,
.electric-button:hover,
.reaction-button:hover,
.danger-button:hover {
  box-shadow: 0 10px 22px rgba(79, 16, 41, 0.08);
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
  padding: 11px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
}

textarea {
  resize: vertical;
}

.empty-state {
  margin-top: 18px;
  padding: 18px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-soft);
}

.dashboard-grid {
  margin-top: 2px;
}

.widgets-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(2, minmax(360px, 1fr));
  align-items: stretch;
}

.widget-card {
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 340px;
}

.widget-card > * {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.quick-actions-card {
  min-height: 340px;
}

@media (max-width: 900px) {
  .widgets-grid {
    grid-template-columns: 1fr;
  }
}

.announcements-section {
  padding: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 18px;
}

.toast-modal,
.announcement-modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(47, 38, 48, 0.44);
}

.toast-modal {
  z-index: 40;
}

.announcement-modal {
  z-index: 50;
}

.toast-box,
.modal-content {
  width: min(620px, 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: 0 24px 70px var(--color-shadow);
}

.toast-box {
  width: min(420px, 100%);
  padding: 22px;
  text-align: center;
}

.toast-box__icon {
  display: inline-grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(107, 24, 57, 0.1);
  color: var(--color-primary);
}

.modal-content {
  padding: 24px;
}

.modal-actions {
  justify-content: flex-end;
  margin-top: 20px;
}

@media (max-width: 1200px) {
  .summary-grid,
  .core-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 920px) {
  .form-grid,
  .attendance-grid {
    grid-template-columns: 1fr;
  }

  .module-heading,
  .featured-announcement__top,
  .history-list__header,
  .history-list li,
  .modal-header,
  .modal-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .history-tags {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .summary-grid,
  .announcement-rail {
    grid-template-columns: 1fr;
  }

  .header-pills {
    justify-content: flex-start;
  }
}
</style>
