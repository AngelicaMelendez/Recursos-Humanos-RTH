<template>
  <div>
    <PageHeader
      eyebrow="Agenda institucional"
      title="Calendario de incidencias"
      description="Planeación anual y seguimiento visual de vacaciones, incapacidades, comisiones, eventos y fechas relevantes."
    />
    <div class="grid grid-2">
      <IncidenceCalendar :events="events" />
      <BaseCard title="Incidencias registradas" subtitle="Vista tabular para seguimiento administrativo.">
        <AppTable :columns="columns" :rows="incidents">
          <template #estatus="{ row }">
            <StatusBadge :value="row.estatus" />
          </template>
        </AppTable>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/shared/PageHeader.vue";
import IncidenceCalendar from "@/components/calendar/IncidenceCalendar.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";

const incidents = [
  {
    id: 1,
    empleado_id: "EMP-015",
    tipo: "Vacaciones",
    fecha_inicio: "2026-05-06",
    fecha_fin: "2026-05-10",
    estatus: "aprobada"
  },
  {
    id: 2,
    empleado_id: "EMP-032",
    tipo: "Incapacidad",
    fecha_inicio: "2026-05-08",
    fecha_fin: "2026-05-12",
    estatus: "pendiente"
  },
  {
    id: 3,
    empleado_id: "EMP-044",
    tipo: "Comisión",
    fecha_inicio: "2026-05-14",
    fecha_fin: "2026-05-15",
    estatus: "aprobada"
  }
];

const columns = [
  { key: "id", label: "ID" },
  { key: "empleado_id", label: "Empleado" },
  { key: "tipo", label: "Tipo" },
  { key: "fecha_inicio", label: "Inicio" },
  { key: "fecha_fin", label: "Fin" },
  { key: "estatus", label: "Estatus" }
];

const events = [
  { title: "Vacaciones · Carlos Ortega", start: "2026-05-06", end: "2026-05-11", color: "#621132" },
  { title: "Incapacidad · Laura Mendoza", start: "2026-05-08", end: "2026-05-13", color: "#b38e5d" },
  { title: "Cumpleaños · Ana Laura Pérez", start: "2026-05-09", color: "#2f6b4f" },
  { title: "Comisión · José Miguel Vargas", start: "2026-05-14", end: "2026-05-16", color: "#7d2342" }
];
</script>

