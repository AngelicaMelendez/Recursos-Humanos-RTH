<template>
  <div class="organograma-page">
    <PageHeader
      eyebrow="Estructura organizacional"
      title="Organigrama"
      description="Vista jerárquica de la organización basada en relaciones de subordinación."
    />

    <BaseCard>
      <div v-if="loading" class="loading">Cargando organigrama...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="arbol-container">
        <ArbolOrganigrama :nodos="arbol" />
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PageHeader from '@/components/shared/PageHeader.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import ArbolOrganigrama from '@/components/orgchart/ArbolOrganigrama.vue';
import organogramaService from '@/services/organograma.service';

const loading = ref(true);
const error = ref(null);
const arbol = ref([]);

onMounted(async () => {
  try {
    const response = await organogramaService.obtenerOrganigrama();
    arbol.value = response.data;
  } catch (err) {
    error.value = 'Error al cargar el organigrama';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.loading, .error {
  padding: 20px;
  text-align: center;
}

.error {
  color: var(--color-error);
}

.arbol-container {
  padding: 16px;
  overflow-x: auto;
}
</style>