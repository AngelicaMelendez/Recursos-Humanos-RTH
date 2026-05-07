<template>
  <div>
    <PageHeader
      eyebrow="Control de ingreso"
      title="Visitantes"
      description="Registro de accesos institucionales, motivo de visita, persona de destino y control de gafetes."
    />
    <BaseCard title="Bitácora de visitantes" subtitle="Seguimiento en tiempo real de entradas y salidas.">
      <AppTable :columns="columns" :rows="rows">
        <template #hora_salida="{ row }">
          {{ row.hora_salida || "En sitio" }}
        </template>
      </AppTable>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "institucion", label: "Institución" },
  { key: "motivo", label: "Motivo" },
  { key: "persona_a_visitar", label: "Destino" },
  { key: "hora_entrada", label: "Entrada" },
  { key: "hora_salida", label: "Salida" }
];

const rows = [
  {
    id: "VIS-001",
    nombre: "Daniela Flores",
    institucion: "UAEH",
    motivo: "Convenio",
    persona_a_visitar: "Dirección General",
    hora_entrada: "09:15",
    hora_salida: ""
  },
  {
    id: "VIS-002",
    nombre: "Luis Ríos",
    institucion: "Contraloría",
    motivo: "Entrega documental",
    persona_a_visitar: "RH",
    hora_entrada: "10:40",
    hora_salida: "11:05"
  }
];
</script>

