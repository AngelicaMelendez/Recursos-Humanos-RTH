<template>
  <div>
    <PageHeader
      eyebrow="Gestión documental"
      title="Normatividad y repositorio PDF"
      description="Biblioteca institucional versionada para manuales, lineamientos, reglamentos y documentos oficiales."
    >
      <RoleActionBar :actions="actions" @select="selectAction" />
    </PageHeader>
    <p v-if="notice" class="notice">{{ notice }}</p>
    <BaseCard title="Repositorio normativo" subtitle="Documentos controlados con vigencia, versión y estatus.">
      <AppTable :columns="columns" :rows="rows">
        <template #estatus="{ row }">
          <StatusBadge :value="row.estatus" />
        </template>
        <template #acciones="{ row }">
          <RoleActionBar :actions="rowActions" compact @select="selectAction($event, row)" />
        </template>
      </AppTable>
    </BaseCard>
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

const actions = computed(() => getRoleActions(authStore.user?.rol, "normativity"));
const rowActions = computed(() => actions.value.filter((action) => ["R", "U", "D"].includes(action.operation)));

const selectAction = (action, row = null) => {
  if (action.key === "uploadNormativity") {
    rows.value.unshift({
      id: rows.value.length + 1,
      nombre: "Nuevo documento normativo",
      tipo: "Documento",
      version: "1.0",
      fecha_publicacion: new Date().toISOString().slice(0, 10),
      estatus: "activa"
    });
    notice.value = "Documento agregado al repositorio demo.";
    return;
  }

  if (action.key === "updateNormativity" && row) {
    row.version = `${Number.parseFloat(row.version || "1") + 0.1}`.slice(0, 3);
    notice.value = `${row.nombre} actualizado a version ${row.version}.`;
    return;
  }

  if (action.key === "deactivateNormativity" && row) {
    row.estatus = "inactiva";
    notice.value = `${row.nombre} marcado como inactivo.`;
    return;
  }

  notice.value = row ? row.nombre : "Consulta de repositorio normativo.";
};

const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Documento" },
  { key: "tipo", label: "Tipo" },
  { key: "version", label: "Versión" },
  { key: "fecha_publicacion", label: "Publicación" },
  { key: "estatus", label: "Estatus" },
  { key: "acciones", label: "Acciones" }
];

const rows = ref([
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
]);
</script>

<style scoped>
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

