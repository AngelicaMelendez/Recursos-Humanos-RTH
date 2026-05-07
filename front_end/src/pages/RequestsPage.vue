<template>
  <div>
    <PageHeader
      eyebrow="Flujo de autorizaciones"
      title="Solicitudes e incidencias"
      description="Motor de solicitudes para vacaciones, permisos, incapacidades, maternidad, paternidad, comisiones y reposiciones con flujo Empleado → Jefe → RH."
    />
    <BaseCard title="Solicitudes activas" subtitle="Ejemplo del tablero operativo de aprobación.">
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
  { key: "id", label: "Folio" },
  { key: "empleado_id", label: "Empleado" },
  { key: "tipo", label: "Tipo" },
  { key: "fecha_inicio", label: "Inicio" },
  { key: "fecha_fin", label: "Fin" },
  { key: "estatus", label: "Estatus" },
  { key: "aprobado_por", label: "Última revisión" }
];

const rows = [
  {
    id: "SOL-201",
    empleado_id: "EMP-015",
    tipo: "Vacaciones",
    fecha_inicio: "2026-06-01",
    fecha_fin: "2026-06-05",
    estatus: "pendiente",
    aprobado_por: "Jefatura pendiente"
  },
  {
    id: "SOL-202",
    empleado_id: "EMP-009",
    tipo: "Comisión",
    fecha_inicio: "2026-05-15",
    fecha_fin: "2026-05-16",
    estatus: "aprobada",
    aprobado_por: "RH"
  }
];
</script>

