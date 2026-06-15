<template>
  <div>
    <PageHeader
      eyebrow="Trazabilidad"
      title="Auditoría de acciones"
      description="Bitácora de seguridad y operación con registro de logins, cambios, aprobaciones, modificaciones y cargas documentales."
    />
    <BaseCard title="Eventos recientes" subtitle="Modelo de tabla para auditoría institucional.">
      <AppTable :columns="columns" :rows="rows" />
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";

const columns = [
  { key: "usuario", label: "Usuario" },
  { key: "accion", label: "Acción" },
  { key: "fecha", label: "Fecha" },
  { key: "modulo", label: "Módulo" },
  { key: "ip", label: "IP" }
];

const rows = [
  {
    usuario: "admin@hidalgo.gob.mx",
    accion: "Aprobó solicitud SOL-202",
    fecha: "2026-05-07 08:16",
    modulo: "Solicitudes",
    ip: "10.10.5.22"
  },
  {
    usuario: "recepcion@hidalgo.gob.mx",
    accion: "Registró visitante VIS-001",
    fecha: "2026-05-07 09:15",
    modulo: "Visitantes",
    ip: "10.10.7.11"
  }
];
</script>

<style scoped>

.page-header{
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
