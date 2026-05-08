<template>
  <div>
    <!-- Banner de la empresa -->
    <section class="company-banner">
      <img v-if="bannerUrl" :src="bannerUrl" alt="Banner de la empresa" class="banner-image" />
      <div v-else class="banner-placeholder">Banner de la empresa (pendiente)</div>
    </section>

    <!-- Saludo de bienvenida -->
    <section class="welcome-section">
      <h2>¡Bienvenido, {{ authStore.user?.nombre || 'Usuario' }}!</h2>
    </section>

    <!-- Registro de entrada/salida -->
    <section class="attendance-section">
      <div class="section-heading">
        <div>
          <h3>Registro de Asistencia</h3>
          <p>Controla tu hora de ingreso y salida con alertas claras.</p>
        </div>
        <span class="badge">{{ authStore.user?.rol || 'Colaborador' }}</span>
      </div>

      <div class="attendance-panel">
        <div class="attendance-status">
          <div class="attendance-item">
            <IconSymbol name="door" />
            <div>
              <strong>Entrada</strong>
              <span>{{ dashboardStore.attendance.entryTime || 'Pendiente' }}</span>
            </div>
          </div>
          <div class="attendance-item">
            <IconSymbol name="lock" />
            <div>
              <strong>Salida</strong>
              <span>{{ dashboardStore.attendance.exitTime || 'Pendiente' }}</span>
            </div>
          </div>
        </div>

        <div class="attendance-actions">
          <button class="button-primary" @click="registerEntry">Registrar Entrada</button>
          <button class="button-secondary" @click="registerExit" :disabled="!dashboardStore.attendance.entryTime || dashboardStore.attendance.exitTime">Registrar Salida</button>
        </div>
      </div>

      <div class="attendance-history">
        <h4>Historial de movimientos</h4>
        <ul>
          <li v-for="record in dashboardStore.attendanceHistory" :key="record.id" class="history-record">
            <span>{{ record.date }}</span>
            <span>{{ record.entry }}</span>
            <span>{{ record.exit }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Sección de comunicados -->
    <section class="announcements-section">
      <div class="section-heading">
        <div>
          <h3>Comunicados</h3>
          <p>Revisa los avisos programados y publicados para tu rol.</p>
        </div>
        <span class="badge">{{ activeTab === 'published' ? 'Publicados' : 'Programados' }}</span>
      </div>

      <div class="announcements-tabs">
        <button @click="activeTab = 'published'" :class="{ active: activeTab === 'published' }">Publicados</button>
        <button @click="activeTab = 'scheduled'" :class="{ active: activeTab === 'scheduled' }">Programados</button>
      </div>
      <div class="announcements-list">
        <div v-for="announcement in filteredAnnouncements" :key="announcement.id" class="announcement-card" @click="openAnnouncement(announcement)">
          <div class="announcement-card__meta">
            <span class="announcement-type"><IconSymbol name="file" /> {{ announcement.type || 'Comunicado' }}</span>
            <span class="announcement-date"><IconSymbol name="calendar" /> {{ announcement.date }}</span>
          </div>
          <h4>{{ announcement.title }}</h4>
          <p>{{ announcement.content.slice(0, 80) }}...</p>
          <div class="announcement-footer">
            <span><IconSymbol name="users" /> {{ announcement.likedBy.length }} reacciones</span>
            <span>{{ announcement.audience || 'Todos los colaboradores' }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal para comunicado -->
    <div v-if="selectedAnnouncement" class="announcement-modal" @click="closeAnnouncement">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div>
            <h3>{{ selectedAnnouncement.title }}</h3>
            <p>{{ selectedAnnouncement.date }} · {{ selectedAnnouncement.audience || 'Todos' }}</p>
          </div>
          <button class="button-close" @click="closeAnnouncement">×</button>
        </div>
        <p class="modal-message">{{ selectedAnnouncement.content }}</p>
        <div class="modal-actions">
          <button class="button-primary" @click="likeAnnouncement(selectedAnnouncement)">Me gusta</button>
          <button class="button-secondary" @click="closeAnnouncement">Cerrar</button>
        </div>
        <div class="likes-list">
          <p>Reacciones</p>
          <ul>
            <li v-for="user in selectedAnnouncement.likedBy" :key="user.id">{{ user.name }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="successDialog.visible" class="success-modal" @click="closeSuccessDialog">
      <div class="success-box" @click.stop>
        <div class="success-icon">✓</div>
        <h4>{{ successDialog.title }}</h4>
        <p>{{ successDialog.message }}</p>
        <button class="button-primary" @click="closeSuccessDialog">Aceptar</button>
      </div>
    </div>

    <PageHeader
      eyebrow="Tablero institucional"
      title="Dashboard ejecutivo"
      description="Resumen estratégico de la operación de RH, incidencias, visitantes, pasantes y gestión interna con estilo institucional inspirado en Worky."
    />
    <div v-if="selectedAnnouncement" class="announcement-modal" @click="closeAnnouncement">
      <div class="modal-content" @click.stop>
        <h3>{{ selectedAnnouncement.title }}</h3>
        <p>{{ selectedAnnouncement.content }}</p>
        <button @click="likeAnnouncement(selectedAnnouncement)">Like</button>
        <div class="likes-list">
          <p>Reacciones:</p>
          <ul>
            <li v-for="user in selectedAnnouncement.likedBy" :key="user.id">{{ user.name }}</li>
          </ul>
        </div>
        <button @click="closeAnnouncement">Cerrar</button>
      </div>
    </div>

    <PageHeader
      eyebrow="Tablero institucional"
      title="Dashboard ejecutivo"
      description="Resumen estratégico de la operación de RH, incidencias, visitantes, pasantes y gestión interna con estilo institucional inspirado en Worky."
    />

    <section class="grid grid-4">
      <StatCard v-for="item in dashboardStore.summary" :key="item.label" :item="item" />
    </section>

    <section class="grid grid-3 dashboard-grid">
      <DashboardBarChart
        title="Incidencias del mes"
        subtitle="Distribución por tipo de incidencia registrada."
        :items="dashboardStore.charts.incidentsByType"
      />
      <DashboardDonutChart
        title="Solicitudes por estatus"
        subtitle="Seguimiento al flujo Empleado → Jefe → RH."
        :items="dashboardStore.charts.requestsByStatus"
      />
      <QuickActions :actions="dashboardStore.quickActions" />
    </section>

    <section class="grid grid-3 dashboard-grid">
      <ActivityFeed :items="dashboardStore.recentActivity" />
      <InfoList
        title="Próximos cumpleaños"
        subtitle="Cumplimientos cercanos para planeación institucional."
        :items="birthdayItems"
      />
      <InfoList
        title="Empleados de vacaciones"
        subtitle="Cobertura operativa en curso."
        :items="vacationItems"
      />
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
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

const dashboardStore = useDashboardStore();
const authStore = useAuthStore();

const activeTab = ref('published');
const selectedAnnouncement = ref(null);
const bannerUrl = ref(null); // Cambiar a la URL real cuando se proporcione la imagen
const successDialog = ref({ visible: false, title: '', message: '' });

const filteredAnnouncements = computed(() => {
  return dashboardStore.announcements.filter((a) => {
    return activeTab.value === 'published'
      ? new Date(a.date) <= new Date()
      : new Date(a.date) > new Date();
  });
});

const openAnnouncement = (announcement) => {
  selectedAnnouncement.value = announcement;
};

const closeAnnouncement = () => {
  selectedAnnouncement.value = null;
};

const showSuccess = (title, message) => {
  successDialog.value = { visible: true, title, message };
};

const closeSuccessDialog = () => {
  successDialog.value.visible = false;
};

const likeAnnouncement = (announcement) => {
  if (!authStore.user) return;
  if (!announcement.likedBy.some(u => u.id === authStore.user.id)) {
    announcement.likes++;
    announcement.likedBy.push({ id: authStore.user.id, name: authStore.user.nombre });
    showSuccess('Reacción enviada', 'Tu like se registró correctamente.');
  }
};

const registerEntry = () => {
  if (!dashboardStore.attendance.entryTime) {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    dashboardStore.attendance.entryTime = timeString;
    dashboardStore.attendance.exitTime = null;
    dashboardStore.attendanceHistory.unshift({
      id: Date.now(),
      date: dateString,
      entry: timeString,
      exit: '-'
    });
    showSuccess('Entrada registrada', `¡Hola ${authStore.user?.nombre || 'colaborador'}! Ya puedes ver tu hora de ingreso.`);
  } else {
    showSuccess('Entrada ya registrada', 'Tu ingreso ya se encuentra registrado para hoy.');
  }
};

const registerExit = () => {
  if (!dashboardStore.attendance.entryTime) {
    showSuccess('Falta entrada', 'Antes de salir, por favor registra tu entrada.');
    return;
  }
  if (!dashboardStore.attendance.exitTime) {
    const timeString = new Date().toLocaleTimeString();
    dashboardStore.attendance.exitTime = timeString;
    const todayRecord = dashboardStore.attendanceHistory[0];
    if (todayRecord && todayRecord.exit === '-') {
      todayRecord.exit = timeString;
    }
    showSuccess('Salida registrada', 'Tu hora de salida fue guardada correctamente. ¡Buen trabajo hoy!');
  }
};

const birthdayItems = computed(() =>
  dashboardStore.upcomingBirthdays.map((item) => ({
    name: item.name,
    meta: `${item.date} · ${item.area}`
  }))
);

const vacationItems = computed(() =>
  dashboardStore.employeesOnVacation.map((item) => ({
    name: item.name,
    meta: `${item.period} · ${item.relief}`
  }))
);

onMounted(() => {
  dashboardStore.fetchSummary();
});
</script>

<style scoped>
.dashboard-grid {
  margin-top: 20px;
}

.company-banner {
  margin-bottom: 20px;
}

.banner-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.banner-placeholder {
  width: 100%;
  height: 200px;
  background: var(--color-surface-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--color-border);
  color: var(--color-text-soft);
}

.welcome-section {
  margin-bottom: 20px;
}

.attendance-section, .announcements-section {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.section-heading h3 {
  margin: 0;
}

.section-heading p {
  margin: 6px 0 0;
  color: var(--color-text-soft);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  font-size: 0.85rem;
  color: var(--color-text-soft);
}

.attendance-panel {
  display: grid;
  gap: 18px;
}

.attendance-status {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.attendance-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface-muted);
}

.attendance-item svg {
  width: 24px;
  height: 24px;
}

.attendance-item strong {
  display: block;
  margin-bottom: 4px;
}

.attendance-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.button-primary,
.button-secondary,
.button-close {
  border: none;
  cursor: pointer;
  border-radius: 8px;
  padding: 10px 16px;
}

.button-primary {
  background: var(--color-primary);
  color: white;
}

.button-secondary {
  background: var(--color-surface-muted);
  color: var(--color-text);
}

.button-primary:disabled,
.button-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.attendance-history {
  margin-top: 20px;
}

.history-record {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: 12px;
  border-bottom: 1px solid var(--color-border);
}

.history-record span {
  font-size: 0.95rem;
}

.announcements-tabs {
  margin-bottom: 16px;
}

.announcements-tabs button {
  margin-right: 10px;
  padding: 8px 14px;
  border: 1px solid var(--color-border);
  background: none;
  cursor: pointer;
  border-radius: 8px;
}

.announcements-tabs button.active {
  background: var(--color-surface-muted);
  color: var(--color-text);
}

.announcements-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 14px;
}

.announcement-card {
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.announcement-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.announcement-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

.announcement-type,
.announcement-date {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.announcement-footer {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

.announcement-footer span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.announcement-modal,
.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 20;
}

.modal-content,
.success-box {
  background: white;
  padding: 24px;
  border-radius: 14px;
  width: min(560px, 100%);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 18px;
}

.modal-header h3 {
  margin: 0 0 6px;
}

.modal-header p {
  margin: 0;
  color: var(--color-text-soft);
}

.button-close {
  background: var(--color-surface-muted);
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.modal-message {
  margin: 0 0 20px;
  color: var(--color-text);
}

.modal-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.likes-list p {
  margin: 0 0 10px;
}

.likes-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.likes-list li {
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
}

.success-box {
  text-align: center;
}

.success-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 18px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--color-surface-muted);
  font-size: 1.5rem;
  color: var(--color-primary);
}

.announcements-tabs {
  margin-bottom: 10px;
}

.announcements-tabs button {
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid var(--color-border);
  background: none;
  cursor: pointer;
}

.announcements-tabs button.active {
  background: var(--color-primary);
  color: white;
}

.announcements-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}

.announcement-card {
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
}

.announcement-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}
</style>

