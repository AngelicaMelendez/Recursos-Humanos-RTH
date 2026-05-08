<template>
  <div>
    <PageHeader
      eyebrow="Expediente laboral"
      title="Directorio institucional"
      description="Consulta integral de personal activo e histórico, con trazabilidad documental, datos sensibles y movimientos de puesto sin eliminación física."
    />
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
import StatusBadge from "@/components/shared/StatusBadge.vue";

const tabs = [
  "Generales",
  "Dirección",
  "Bancario",
  "Contacto de emergencia",
  "Documentación",
  "Historial laboral"
];

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "area", label: "Área" },
  { key: "puesto", label: "Puesto" },
  { key: "estatus", label: "Estatus" }
];

const formerColumns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "fecha_baja", label: "Fecha de baja" },
  { key: "motivo_baja", label: "Motivo" }
];

const activeEmployees = [
  { id: "EMP-001", nombre: "María López", area: "Recursos Humanos", puesto: "Analista", estatus: "activa" },
  { id: "EMP-002", nombre: "Jorge Valencia", area: "Producción", puesto: "Coordinador", estatus: "activa" }
];

const formerEmployees = [
  { id: "EXP-001", nombre: "Patricia Ramos", fecha_baja: "2025-11-14", motivo_baja: "Jubilación" },
  { id: "EXP-002", nombre: "Pedro Salas", fecha_baja: "2026-01-28", motivo_baja: "Renuncia voluntaria" }
];
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
</style>

