<template>
  <div>
    <PageHeader
      eyebrow="Expediente laboral"
      title="Directorio institucional"
      description="Consulta integral de personal activo e histórico, con trazabilidad documental, datos sensibles y movimientos de puesto sin eliminación física."
    >
      <RoleActionBar :actions="actions" @select="selectAction" />
    </PageHeader>
    <p v-if="notice" class="notice">{{ notice }}</p>
    <BaseCard title="Pestañas funcionales" subtitle="Propuesta de secciones del expediente único del empleado.">
      <div class="tabs">
        <button v-for="tab in tabs" :key="tab" type="button" class="tabs__button">{{ tab }}</button>
      </div>
    </BaseCard>
    <div class="grid grid-2 section-gap">
      <BaseCard title="Empleados activos" subtitle="Vista resumida para contacto y control de estatus.">
        <AppTable :columns="columns" :rows="activeEmployees">
          <template #estatus="{ row }">
            <StatusBadge :value="row.estatus" />
          </template>
          <template #acciones="{ row }">
            <RoleActionBar :actions="rowActions" compact @select="selectAction($event, row)" />
          </template>
        </AppTable>
      </BaseCard>
      <BaseCard title="Exempleados" subtitle="Historial laboral preservado para auditoría y consulta.">
        <AppTable :columns="formerColumns" :rows="formerEmployees" />
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import RoleActionBar from "@/components/shared/RoleActionBar.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";
import { computed, ref } from "vue";
import { getRoleActions } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const notice = ref("");

const actions = computed(() => getRoleActions(authStore.user?.rol, "directory"));
const rowActions = computed(() => actions.value.filter((action) => ["R", "U", "D"].includes(action.operation)));

const selectAction = (action, row = null) => {
  if (action.key === "createEmployee") {
    activeEmployees.value.unshift({
      id: `EMP-${String(activeEmployees.value.length + 3).padStart(3, "0")}`,
      nombre: "Nuevo empleado",
      area: "Recursos Humanos",
      puesto: "Por asignar",
      estatus: "activa"
    });
    notice.value = "Empleado agregado en la vista demo.";
    return;
  }

  if (action.key === "editEmployee" && row) {
    row.puesto = row.puesto === "Por asignar" ? "Analista" : `${row.puesto} actualizado`;
    notice.value = `${row.nombre} actualizado.`;
    return;
  }

  if (action.key === "deactivateEmployee" && row) {
    activeEmployees.value = activeEmployees.value.filter((employee) => employee.id !== row.id);
    formerEmployees.value.unshift({
      id: row.id,
      nombre: row.nombre,
      fecha_baja: new Date().toISOString().slice(0, 10),
      motivo_baja: "Baja logica"
    });
    notice.value = `${row.nombre} fue dado de baja logicamente.`;
    return;
  }

  notice.value = row ? `${row.nombre}: ${row.puesto}` : "Consulta de expediente.";
};

const tabs = [
  "Generales",
  "Dirección",
  "Contacto de emergencia",
  "Documentación",
  "Historial laboral"
];

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "area", label: "Área" },
  { key: "puesto", label: "Puesto" },
  { key: "estatus", label: "Estatus" },
  { key: "acciones", label: "Acciones" }
];

const formerColumns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "fecha_baja", label: "Fecha de baja" },
  { key: "motivo_baja", label: "Motivo" }
];

const activeEmployees = ref([
  { id: "EMP-001", nombre: "María López", area: "Recursos Humanos", puesto: "Analista", estatus: "activa" },
  { id: "EMP-002", nombre: "Jorge Valencia", area: "Producción", puesto: "Coordinador", estatus: "activa" }
]);

const formerEmployees = ref([
  { id: "EXP-001", nombre: "Patricia Ramos", fecha_baja: "2025-11-14", motivo_baja: "Jubilación" },
  { id: "EXP-002", nombre: "Pedro Salas", fecha_baja: "2026-01-28", motivo_baja: "Renuncia voluntaria" }
]);
</script>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tabs__button {
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface-muted);
}

.section-gap {
  margin-top: 20px;
}

.notice {
  margin: 0 0 16px;
  padding: 12px 14px;
  border: 1px solid rgba(47, 107, 79, 0.22);
  border-radius: 8px;
  background: rgba(47, 107, 79, 0.1);
  color: var(--color-success);
  font-weight: 700;
}
</style>

