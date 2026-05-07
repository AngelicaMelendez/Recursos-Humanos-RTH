<template>
  <div>
    <PageHeader
      eyebrow="Seguridad"
      title="Control de accesos y roles"
      description="Administración de credenciales, perfiles institucionales y permisos de navegación por módulo."
    />
    <BaseCard title="Usuarios autorizados" subtitle="Modelo base para JWT con roles y empleado asociado.">
      <AppTable :columns="columns" :rows="rows" />
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";

const columns = [
  { key: "id", label: "ID" },
  { key: "empleado_id", label: "Empleado" },
  { key: "rol", label: "Rol" },
  { key: "ultimo_acceso", label: "Último acceso" }
];

const rows = [
  { id: "USR-001", empleado_id: "EMP-001", rol: "Administrador RH", ultimo_acceso: "2026-05-07 08:10" },
  { id: "USR-002", empleado_id: "EMP-002", rol: "Dirección", ultimo_acceso: "2026-05-07 08:22" },
  { id: "USR-003", empleado_id: "EMP-009", rol: "Recepción", ultimo_acceso: "2026-05-07 07:59" }
];
</script>

