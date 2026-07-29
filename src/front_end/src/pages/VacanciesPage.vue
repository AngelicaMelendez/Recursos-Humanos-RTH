<template>
  <div>
    <PageHeader
      eyebrow="Atracción de talento"
      title="Vacantes institucionales"
      description="Seguimiento de puestos abiertos, perfil requerido, tipo de contratación y estatus de cobertura."
    >

    <RoleActionBar 
          :actions="[{ key: 'publishVacancy', label: 'Publicar Vacante', icon: 'plus', operation: 'C' },
 ]"  
          compact
          @select="selectAction($event, row)"
          />
    
    </PageHeader>
    <p v-if="notice" class="notice">{{ notice }}</p>
    <BaseCard title="Vacantes Abiertas" subtitle="Consulta de posiciones por área y prioridad.">
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


import { computed, ref, reactive ,watch } from "vue";
import { getRoleActions } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";





const authStore = useAuthStore();
const notice = ref("");

const actions = computed(() => getRoleActions(authStore.user?.rol, "vacancies"));
const rowActions = computed(() => actions.value.filter((action) => ["R", "U"].includes(action.operation)));




const selectAction = (action, row = null) => {
  if (action.key === "publishVacancy") {
    rows.value.unshift({
      id: `VAC-${String(rows.value.length + 10)}`,
      area: "Recursos Humanos",
      puesto: "Nueva vacante",
      tipo_contrato: "Por definir",
      fecha_publicacion: new Date().toISOString().slice(0, 10),
      estatus: "activa"
    });
    notice.value = "Vacante publicada en la vista demo.";
    return;
  }

  if (action.key === "closeVacancy" && row) {
    row.estatus = "cerrada";
    notice.value = `${row.id} fue cerrada correctamente.`;
    return;
  }

  notice.value = row ? `${row.id}: ${row.puesto}` : "Consulta de vacantes.";
};

const columns = [
  { key: "id", label: "ID" },
  { key: "area", label: "Área" },
  { key: "puesto", label: "Puesto" },
  { key: "tipo_contrato", label: "Contrato" },
  { key: "fecha_publicacion", label: "Publicación" },
  { key: "estatus", label: "Estatus" },
  { key: "acciones", label: "Acciones" }
];

const rows = ref([
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
]);



const props = defineProps({
  datosIniciales: {
    type: Object,
    default: () => ({})
  }
})




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

.role-actions{
  margin-bottom: 20px;
  margin-top: 20px;
}

.page-header{
  margin-bottom: 20px;
  margin-top: 20px;
}



</style>

