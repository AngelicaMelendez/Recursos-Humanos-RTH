<template>
  <div>
    <PageHeader
      eyebrow="Vinculación académica"
      title="Pasantes y servicio social"
      description="Administración de convenios, periodos, asesores y áreas asignadas para pasantes y perfiles en formación."
    />
    <BaseCard title="Pasantes activos" subtitle="Seguimiento académico y administrativo.">
      <AppTable :columns="columns" :rows="rows">
        <template #estatus="{ row }">
          <StatusBadge :value="row.estatus" />
        </template>
      </AppTable>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "institucion", label: "Institución" },
  { key: "carrera", label: "Carrera" },
  { key: "periodo_inicio", label: "Inicio" },
  { key: "periodo_fin", label: "Fin" },
  { key: "estatus", label: "Estatus" }
];

const rows = [
  {
    id: "PAS-001",
    nombre: "Ximena Ponce",
    institucion: "Tec de Monterrey",
    carrera: "Comunicación",
    periodo_inicio: "2026-02-01",
    periodo_fin: "2026-07-31",
    estatus: "activa"
  },
  {
    id: "PAS-002",
    nombre: "Arturo León",
    institucion: "UAEH",
    carrera: "Administración",
    periodo_inicio: "2026-03-10",
    periodo_fin: "2026-08-10",
    estatus: "pendiente"
  }
];
</script>

