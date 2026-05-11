<template>
  <div>
    <PageHeader
      eyebrow="Control de ingreso"
      title="Visitantes"
      description="Registro de accesos institucionales, motivo de visita, persona de destino y control de gafetes."
    >
      <RoleActionBar :actions="actions" @select="selectAction" />
    </PageHeader>

    <p v-if="notice" class="notice">{{ notice }}</p>

    <BaseCard title="Bitacora de visitantes" subtitle="Seguimiento en tiempo real de entradas, salidas y gafetes.">
      <AppTable :columns="columns" :rows="rows">
        <template #hora_salida="{ row }">
          <StatusBadge :value="row.hora_salida ? 'salida' : 'activo'" />
        </template>
        <template #acciones="{ row }">
          <div class="table-actions">
            <button v-for="action in rowActions(row)" :key="action.key" class="icon-action" type="button" :title="action.label" @click="selectAction(action, row)">
              <IconSymbol :name="action.icon" />
            </button>
          </div>
        </template>
      </AppTable>
    </BaseCard>

    <div v-if="modal.visible" class="modal-backdrop" @click="closeModal">
      <section class="action-modal" @click.stop>
        <header>
          <h3>{{ modal.title }}</h3>
          <button class="icon-action" type="button" @click="closeModal"><IconSymbol name="x" /></button>
        </header>

        <form v-if="modal.mode === 'create'" class="modal-form" @submit.prevent="registerVisitor">
          <label>Nombre<input v-model="form.nombre" required /></label>
          <label>Institucion<input v-model="form.institucion" /></label>
          <label>Motivo<input v-model="form.motivo" required /></label>
          <label>Destino<input v-model="form.persona_a_visitar" required /></label>
          <label>Gafete<input v-model="form.gafete" placeholder="Ej. G-014" /></label>
          <footer>
            <button class="secondary-button" type="button" @click="closeModal">Cancelar</button>
            <button class="primary-button" type="submit">Registrar</button>
          </footer>
        </form>

        <div v-else class="confirm-panel">
          <p>{{ modal.message }} <strong>{{ modal.row?.nombre }}</strong></p>
          <footer>
            <button class="secondary-button" type="button" @click="closeModal">Cancelar</button>
            <button class="primary-button" type="button" @click="confirmAction">Confirmar</button>
          </footer>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import IconSymbol from "@/components/ui/IconSymbol.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import RoleActionBar from "@/components/shared/RoleActionBar.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";
import { getRoleActions } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const notice = ref("");
const rows = ref([
  {
    id: "VIS-001",
    nombre: "Daniela Flores",
    institucion: "UAEH",
    motivo: "Convenio",
    persona_a_visitar: "Direccion General",
    hora_entrada: "09:15",
    hora_salida: "",
    gafete: "G-001"
  },
  {
    id: "VIS-002",
    nombre: "Luis Rios",
    institucion: "Contraloria",
    motivo: "Entrega documental",
    persona_a_visitar: "RH",
    hora_entrada: "10:40",
    hora_salida: "11:05",
    gafete: "G-002"
  }
]);

const modal = reactive({ visible: false, mode: "", title: "", message: "", row: null });
const form = reactive({ nombre: "", institucion: "", motivo: "", persona_a_visitar: "", gafete: "" });

const actions = computed(() => getRoleActions(authStore.user?.rol, "visitors"));

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "institucion", label: "Institucion" },
  { key: "motivo", label: "Motivo" },
  { key: "persona_a_visitar", label: "Destino" },
  { key: "gafete", label: "Gafete" },
  { key: "hora_entrada", label: "Entrada" },
  { key: "hora_salida", label: "Salida" },
  { key: "acciones", label: "Acciones" }
];

const rowActions = (row) => actions.value.filter((action) => {
  if (action.key === "registerVisitor") return false;
  if (action.key === "registerVisitorExit") return !row.hora_salida;
  return ["assignBadge", "viewVisitors"].includes(action.key);
});

const selectAction = (action, row = null) => {
  if (action.key === "registerVisitor") {
    Object.assign(form, { nombre: "", institucion: "", motivo: "", persona_a_visitar: "", gafete: "" });
    Object.assign(modal, { visible: true, mode: "create", title: "Registrar visitante", row: null });
    return;
  }

  if (action.key === "registerVisitorExit") {
    Object.assign(modal, { visible: true, mode: "exit", title: "Registrar salida", message: "Registrar salida de", row });
    return;
  }

  if (action.key === "assignBadge") {
    Object.assign(modal, { visible: true, mode: "badge", title: "Asignar gafete", message: "Asignar nuevo gafete a", row });
    return;
  }

  notice.value = row ? `${row.nombre}: ${row.motivo}` : "Consulta de visitantes activos.";
};

const registerVisitor = () => {
  const now = new Date();
  rows.value.unshift({
    id: `VIS-${String(rows.value.length + 1).padStart(3, "0")}`,
    ...form,
    gafete: form.gafete || `G-${String(rows.value.length + 1).padStart(3, "0")}`,
    hora_entrada: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    hora_salida: ""
  });
  notice.value = "Visitante registrado correctamente.";
  closeModal();
};

const confirmAction = () => {
  if (!modal.row) return;
  if (modal.mode === "exit") {
    modal.row.hora_salida = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    notice.value = "Salida registrada.";
  }
  if (modal.mode === "badge") {
    modal.row.gafete = `G-${String(Math.floor(Math.random() * 900) + 100)}`;
    notice.value = `Gafete ${modal.row.gafete} asignado.`;
  }
  closeModal();
};

const closeModal = () => {
  modal.visible = false;
};
</script>

<style scoped>
.notice {
  margin: 0 0 16px;
  padding: 12px 14px;
  border: 1px solid rgba(47, 107, 79, 0.22);
  border-radius: 8px;
  background: rgba(47, 107, 79, 0.1);
  color: var(--color-success);
  font-weight: 700;
}

.table-actions,
.action-modal footer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.icon-action,
.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
}

.icon-action {
  width: 38px;
  height: 38px;
  background: var(--color-surface-muted);
  color: var(--color-primary);
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

.action-modal {
  width: min(520px, 100%);
  padding: 22px;
  border-radius: 10px;
  background: var(--color-surface);
}

.action-modal header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.action-modal h3 {
  margin: 0;
}

.modal-form {
  display: grid;
  gap: 12px;
}

.modal-form label {
  display: grid;
  gap: 6px;
  color: var(--color-text-soft);
  font-weight: 700;
}

.modal-form input {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 12px;
  font: inherit;
}

.primary-button,
.secondary-button {
  min-height: 40px;
  padding: 9px 14px;
}

.primary-button {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: #fff;
}

.secondary-button {
  background: var(--color-surface-muted);
  color: var(--color-text);
}
</style>
