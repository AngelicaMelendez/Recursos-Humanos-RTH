<template>
  <div>
    <PageHeader
      eyebrow="Flujo de autorizaciones"
      title="Solicitudes e Incidencias"
      description="Todos pueden generar solicitudes. La consulta, aprobacion y rechazo queda restringida a administracion."
    >
      <RoleActionBar :actions="headerActions" @select="selectAction" />
    </PageHeader>

    <div v-if="toast.visible" class="toast" :class="`toast--${toast.tone}`">
      <strong>{{ toast.title }}</strong>
      <span>{{ toast.message }}</span>
    </div>

    <section v-if="canManageRequests" class="request-summary">
      <div v-for="item in summary" :key="item.label" class="request-summary__item">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </section>

    <BaseCard
      v-if="canManageRequests"
      title="Solicitudes activas"
      subtitle="Crea, consulta y da seguimiento al flujo operativo."
    >
      <template #header-actions>
        <button class="ghost-button" type="button" @click="loadRequests">
          <IconSymbol name="activity" />
          Actualizar
        </button>
      </template>

      <AppTable :columns="columns" :rows="rows">
        <template #estatus="{ row }">
          <StatusBadge :value="row.estatus" />
        </template>
        <template #acciones="{ row }">
          <div class="table-actions">
            <button
              v-for="action in actionsForRow(row)"
              :key="`${row.id}-${action.key}`"
              type="button"
              class="icon-action"
              :class="`icon-action--${action.key}`"
              :title="action.label"
              @click="selectAction(action, row)"
            >
              <IconSymbol :name="action.icon" />
            </button>
          </div>
        </template>
      </AppTable>
    </BaseCard>

    <BaseCard
      v-else
      title="Generar solicitud"
      subtitle="Tu solicitud quedara pendiente para revision administrativa."
    >
      <p class="request-access-note">
        La consulta, aprobacion y rechazo de solicitudes esta disponible solo para administradores.
      </p>
      <button class="primary-button" type="button" @click="openCreateModal">
        <IconSymbol name="plus" />
        Nueva solicitud
      </button>
    </BaseCard>

    <div v-if="modal.visible" class="modal-backdrop" @click="closeModal">
      <section class="request-modal" @click.stop>
        <header class="request-modal__header">
          <div>
            <span>{{ modal.eyebrow }}</span>
            <h3>{{ modal.title }}</h3>
          </div>
          <button class="icon-action" type="button" title="Cerrar" @click="closeModal">
            <IconSymbol name="x" />
          </button>
        </header>

        <form v-if="modal.mode === 'create'" class="request-form" @submit.prevent="submitRequest">
          <label>
            Tipo
            <select v-model="form.tipo" required>
              <option value="vacaciones">Vacaciones</option>
              <option value="permiso">Permiso</option>
              <option value="incapacidad">Incapacidad</option>
              <option value="maternidad">Maternidad</option>
              <option value="paternidad">Paternidad</option>
              <option value="comision">Comision</option>
              <option value="otro">Otro</option>
            </select>
          </label>
          <div class="form-grid">
            <label>
              Inicio
              <input v-model="form.fecha_inicio" type="date" :min="today" required />
            </label>
            <label>
              Fin
              <input v-model="form.fecha_fin" type="date" :min="form.fecha_inicio || today" required />
            </label>
          </div>
          <label>
            Motivo
            <textarea v-model="form.motivo" rows="4" required placeholder="Describe brevemente el motivo de la solicitud o incidencia" />
          </label>
          <footer class="modal-actions">
            <button class="secondary-button" type="button" @click="closeModal">Cancelar</button>
            <button class="primary-button" type="submit" :disabled="saving">
              {{ saving ? "Guardando..." : "Crear solicitud" }}
            </button>
          </footer>
        </form>

        <div v-else class="confirm-panel">
          <p>
            {{ modal.message }}
            <strong>{{ modal.row?.id }}</strong>
          </p>
          <dl>
            <div>
              <dt>Empleado</dt>
              <dd>{{ modal.row?.empleado_id }}</dd>
            </div>
            <div>
              <dt>Periodo</dt>
              <dd>{{ modal.row?.fecha_inicio }} / {{ modal.row?.fecha_fin }}</dd>
            </div>
          </dl>
          <footer class="modal-actions">
            <button class="secondary-button" type="button" @click="closeModal">Cancelar</button>
            <button
              class="primary-button"
              type="button"
              :class="{ 'primary-button--danger': ['reject', 'delete'].includes(modal.mode) }"
              :disabled="saving"
              @click="confirmResolution"
            >
              {{ saving ? "Procesando..." : modal.confirmLabel }}
            </button>
          </footer>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import IconSymbol from "@/components/ui/IconSymbol.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import RoleActionBar from "@/components/shared/RoleActionBar.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";
import requestsService from "@/services/requests.service";
// ✅ Corregido: Importamos ROLE_KEYS y ROLE_GROUPS para las validaciones
import { getRoleActions, hasAnyRole, ROLE_KEYS, ROLE_GROUPS } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const rows = ref([]);

const saving = ref(false);
const toast = reactive({ visible: false, title: "", message: "", tone: "success" });
const modal = reactive({
  visible: false,
  mode: "",
  title: "",
  eyebrow: "",
  message: "",
  confirmLabel: "",
  row: null
});
const form = reactive({
  tipo: "vacaciones",
  fecha_inicio: "",
  fecha_fin: "",
  motivo: ""
});

const formatDateInputValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const today = formatDateInputValue(new Date());

const columns = [
  { key: "id", label: "Folio" },
  { key: "empleado_id", label: "Empleado" },
  { key: "tipo", label: "Tipo" },
  { key: "fecha_inicio", label: "Inicio" },
  { key: "fecha_fin", label: "Fin" },
  { key: "estatus", label: "Estatus" },
  { key: "aprobado_por", label: "Revision" },
  { key: "acciones", label: "Acciones" }
];

const roleActions = computed(() => getRoleActions(authStore.user, "requests"));
const headerActions = computed(() =>
  roleActions.value.filter((action) => ["createRequest", "viewRequests"].includes(action.key))
);
const currentEmployeeId = computed(() =>
  authStore.user?.empleado_id ? `EMP-${String(authStore.user.empleado_id).padStart(3, "0")}` : null
);

// ✅ Corregido: Quienes pueden autorizar/rechazar solicitudes (Grupo APPROVERS de permissions.js)
const canApproveRequests = computed(() =>
  hasAnyRole(authStore.user, ROLE_GROUPS.APPROVERS)
);

// ✅ Corregido: Quienes pueden gestionar o ver el panel administrativo general de solicitudes
const canManageRequests = computed(() => 
  hasAnyRole(authStore.user, ROLE_GROUPS.APPROVERS)
);

const summary = computed(() => [
  { label: "Pendientes", value: rows.value.filter((row) => row.estatus === "pendiente").length },
  { label: "Aprobadas", value: rows.value.filter((row) => row.estatus === "aprobada" || row.estatus === "aprobado").length },
  { label: "Rechazadas", value: rows.value.filter((row) => row.estatus === "rechazada" || row.estatus === "rechazado").length }
]);

const showToast = (title, message, tone = "success") => {
  toast.visible = true;
  toast.title = title;
  toast.message = message;
  toast.tone = tone;
  globalThis.setTimeout(() => {
    toast.visible = false;
  }, 3200);
};

const getRequestErrorMessage = (error) =>
  error.response?.data?.details ||
  error.response?.data?.error ||
  error.message ||
  "Verifica conexion con el servidor/BD.";

const normalizeRow = (row) => ({
  ...row,
  id: row.id?.startsWith?.("SOL-") ? row.id : `SOL-${row.id}`,
  tipo: row.tipo ? row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1) : "Otro",
  estatus: row.estatus === "aprobado" ? "aprobada" : row.estatus === "rechazado" ? "rechazada" : row.estatus,
  aprobado_por: row.aprobado_por || "Pendiente"
});

const loadRequests = async () => {
  if (!canManageRequests.value) {
    rows.value = [];
    return;
  }

  try {
    const data = await requestsService.list();
    rows.value = data.map(normalizeRow);
    showToast("Solicitudes actualizadas", "Se cargo la informacion mas reciente.");
  } catch (error) {
    rows.value = [];
    showToast("No se pudo cargar el modulo", getRequestErrorMessage(error), "warning");
  }
};

const actionsForRow = (row) => {
  const pending = row.estatus === "pendiente";
  const isOwner = row.empleado_id === currentEmployeeId.value;

  return roleActions.value.filter((action) => {
    if (action.key === "createRequest" || action.key === "viewRequests") return false;
    if (action.key === "deleteRequest") return pending && isOwner;
    if (["approveRequest", "rejectRequest"].includes(action.key)) return pending && canApproveRequests.value;
    return action.key === "manageIncident" && canApproveRequests.value;
  });
};

const selectAction = (action, row = null) => {
  if (action.key === "createRequest") {
    openCreateModal();
    return;
  }

  if (action.key === "approveRequest") {
    openResolutionModal("approve", row);
    return;
  }

  if (action.key === "rejectRequest") {
    openResolutionModal("reject", row);
    return;
  }

  if (action.key === "deleteRequest") {
    openResolutionModal("delete", row);
    return;
  }

  showToast(action.label, row ? `Seleccionaste ${row.id}.` : "Consulta disponible en la tabla.");
};

const openCreateModal = () => {
  Object.assign(form, { tipo: "vacaciones", fecha_inicio: "", fecha_fin: "", motivo: "" });
  Object.assign(modal, {
    visible: true,
    mode: "create",
    eyebrow: "Captura",
    title: "Nueva solicitud",
    row: null
  });
};

const openResolutionModal = (mode, row) => {
  const config = {
    approve: {
      eyebrow: "Autorizacion",
      title: "Aprobar solicitud",
      message: "Vas a aprobar la solicitud",
      confirmLabel: "Aprobar"
    },
    reject: {
      eyebrow: "Resolucion",
      title: "Rechazar solicitud",
      message: "Vas a rechazar la solicitud",
      confirmLabel: "Rechazar"
    },
    delete: {
      eyebrow: "Eliminacion",
      title: "Eliminar solicitud",
      message: "Vas a eliminar la solicitud",
      confirmLabel: "Eliminar"
    }
  };

  Object.assign(modal, {
    visible: true,
    mode,
    row,
    ...config[mode]
  });
};

const closeModal = () => {
  modal.visible = false;
};

const submitRequest = async () => {
  if (form.fecha_inicio < today || form.fecha_fin < today) {
    showToast("Fecha no permitida", "Selecciona el dia actual o una fecha posterior.", "warning");
    return;
  }

  if (form.fecha_fin < form.fecha_inicio) {
    showToast("Periodo no valido", "La fecha final no puede ser anterior a la fecha de inicio.", "warning");
    return;
  }

  saving.value = true;
  const payload = { ...form };

  try {
    const created = await requestsService.create(payload);
    rows.value.unshift(normalizeRow(created));
    showToast("Solicitud creada", "La solicitud quedo pendiente de revision.");
  } catch (error) {
    showToast(
      "No se pudo crear la solicitud",
      getRequestErrorMessage(error),
      "warning"
    );
  } finally {
    saving.value = false;
    closeModal();
  }
};

const confirmResolution = async () => {
  if (!modal.row) return;
  saving.value = true;

  try {
    if (modal.mode === "approve") {
      const updated = await requestsService.approve(modal.row.id);
      replaceRow(normalizeRow(updated));
      showToast("Solicitud actualizada", `${modal.row.id} fue aprobada.`);
    } else if (modal.mode === "reject") {
      const updated = await requestsService.reject(modal.row.id);
      replaceRow(normalizeRow(updated));
      showToast("Solicitud actualizada", `${modal.row.id} fue rechazada.`);
    } else if (modal.mode === "delete") {
      await requestsService.remove(modal.row.id);
      rows.value = rows.value.filter((row) => row.id !== modal.row.id);
      showToast("Solicitud eliminada", `${modal.row.id} fue eliminada correctamente.`);
    }
  } catch (error) {
    showToast(
      "No se pudo completar la accion",
      getRequestErrorMessage(error),
      "warning"
    );
  } finally {
    saving.value = false;
    closeModal();
  }
};

const replaceRow = (updated) => {
  rows.value = rows.value.map((row) => (row.id === updated.id ? { ...row, ...updated } : row));
};

onMounted(loadRequests);
</script>

<style scoped>
.request-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.request-summary__item {
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
}

.request-summary__item span {
  display: block;
  color: var(--color-text-soft);
  font-size: 0.86rem;
}

.request-summary__item strong {
  display: block;
  margin-top: 8px;
  font-size: 1.7rem;
}

.request-access-note {
  margin: 0 0 16px;
  color: var(--color-text-soft);
  line-height: 1.6;
}

.table-actions,
.modal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ghost-button,
.icon-action,
.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
}

.ghost-button {
  min-height: 38px;
  padding: 9px 12px;
  background: var(--color-surface);
  color: var(--color-text);
}

.icon-action {
  width: 38px;
  height: 38px;
  background: var(--color-surface-muted);
  color: var(--color-text);
}

.icon-action--approveRequest {
  background: rgba(47, 107, 79, 0.12);
  color: var(--color-success);
}

.icon-action--rejectRequest,
.icon-action--deleteRequest {
  background: rgba(157, 45, 62, 0.12);
  color: var(--color-danger);
}

.toast {
  display: grid;
  gap: 4px;
  margin-bottom: 16px;
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid rgba(47, 107, 79, 0.22);
  background: rgba(47, 107, 79, 0.1);
  color: var(--color-success);
}

.toast--warning {
  border-color: rgba(178, 123, 44, 0.3);
  background: rgba(178, 123, 44, 0.12);
  color: var(--color-warning);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(47, 38, 48, 0.45);
}

.request-modal {
  width: min(560px, 100%);
  padding: 22px;
  border-radius: 10px;
  background: var(--color-surface);
  box-shadow: 0 18px 50px rgba(47, 38, 48, 0.18);
}

.request-modal__header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.request-modal__header span {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.request-modal__header h3 {
  margin: 5px 0 0;
}

.request-form {
  display: grid;
  gap: 14px;
}

.request-form label {
  display: grid;
  gap: 7px;
  color: var(--color-text-soft);
  font-weight: 700;
}

.request-form input,
.request-form select,
.request-form textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 11px 12px;
  color: var(--color-text);
  font: inherit;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.confirm-panel {
  display: grid;
  gap: 18px;
}

.confirm-panel p {
  margin: 0;
  color: var(--color-text-soft);
  line-height: 1.6;
}

.confirm-panel dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
}

.confirm-panel dl div {
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface-muted);
}

.confirm-panel dt {
  color: var(--color-text-soft);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.confirm-panel dd {
  margin: 6px 0 0;
}

.primary-button,
.secondary-button {
  min-height: 42px;
  padding: 10px 16px;
}

.primary-button {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: #fff;
}

.primary-button--danger {
  border-color: var(--color-danger);
  background: var(--color-danger);
}

.secondary-button {
  background: var(--color-surface-muted);
  color: var(--color-text);
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

@media (max-width: 680px) {
  .request-summary,
  .form-grid,
  .confirm-panel dl {
    grid-template-columns: 1fr;
  }
}
</style>
