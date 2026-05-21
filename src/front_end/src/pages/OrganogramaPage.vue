<template>
  <div class="organograma-page">
    <PageHeader
      eyebrow="Estructura organizacional"
      title="Organigrama"
      description="Vista jerárquica de la organización basada en relaciones de subordinación."
    />

    <BaseCard>
        <div class="organograma-actions">
        <button
          type="button"
          class="pdf-download"
          @click="descargarPdf"
          :disabled="loading || !arbol.length"
        >
          Descargar PDF
        </button>
      </div>
      <div v-if="loading" class="loading">Cargando organigrama...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="arbol-container" ref="chartRef">
        <ArbolOrganigrama :nodos="arbol" esRaiz />
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
const chartRef = ref(null);

const descargarPdf = async () => {
  if (!chartRef.value) return;

  try {
    const canvas = await html2canvas(chartRef.value, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth() - 40;
    const pageHeight = pdf.internal.pageSize.getHeight() - 40;
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const width = canvas.width * ratio;
    const height = canvas.height * ratio;

    pdf.addImage(imgData, 'PNG', 20, 20, width, height);
    pdf.save('organigrama.pdf');
  } catch (downloadError) {
    console.error('Error al generar PDF del organigrama:', downloadError);
  }
};

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
  padding: 12px;
  overflow-x: auto;
}

.arbol-container > .arbol > .rama > .nodo::before {
  display: none;
}

.organograma-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
}

.pdf-download {
  cursor: pointer;
  padding: 10px 16px;
  font-size: 0.9rem;
  border-radius: 999px;
  border: 1px solid #3b82f6;
  background-color: #2563eb;
  color: #ffffff;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.pdf-download:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background-color: #93c5fd;
  border-color: #93c5fd;
}

.pdf-download:not(:disabled):hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}
</style>