<template>
  <div>
    <PageHeader
      eyebrow="Gestión documental"
      title="Normatividad y repositorio PDF"
      description="Biblioteca institucional versionada para manuales, lineamientos, reglamentos y documentos oficiales."
    />
    <BaseCard title="Repositorio normativo" subtitle="Documentos controlados con vigencia, versión y estatus.">
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
  { key: "nombre", label: "Documento" },
  { key: "tipo", label: "Tipo" },
  { key: "version", label: "Versión" },
  { key: "fecha_publicacion", label: "Publicación" },
  { key: "estatus", label: "Estatus" }
];

const rows = [
  {
    id: 1,
    nombre: "Manual de Procedimientos RH",
    tipo: "Manual",
    version: "2.1",
    fecha_publicacion: "2026-02-11",
    estatus: "activa"
  },
  {
    id: 2,
    nombre: "Lineamientos de Control de Asistencia",
    tipo: "Lineamiento",
    version: "1.3",
    fecha_publicacion: "2025-12-20",
    estatus: "activa"
  }
];
</script>

