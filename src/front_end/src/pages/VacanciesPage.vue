<template>
  <div>
    <PageHeader
      eyebrow="Atracción de talento"
      title="Vacantes institucionales"
      description="Seguimiento de puestos abiertos, perfil requerido, tipo de contratación y estatus de cobertura."
    />
    <BaseCard title="Vacantes abiertas" subtitle="Consulta de posiciones por área y prioridad.">
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
  { key: "area", label: "Área" },
  { key: "puesto", label: "Puesto" },
  { key: "tipo_contrato", label: "Contrato" },
  { key: "fecha_publicacion", label: "Publicación" },
  { key: "estatus", label: "Estatus" }
];

const rows = [
  {
    id: "VAC-10",
    area: "Producción TV",
    puesto: "Editor de video",
    tipo_contrato: "Honorarios",
    fecha_publicacion: "2026-04-21",
    estatus: "activa"
  },
  {
    id: "VAC-11",
    area: "Recursos Humanos",
    puesto: "Auxiliar documental",
    tipo_contrato: "Base",
    fecha_publicacion: "2026-05-02",
    estatus: "pendiente"
  }
];
</script>

