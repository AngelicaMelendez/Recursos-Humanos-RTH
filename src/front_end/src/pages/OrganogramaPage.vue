<template>
  <div class="organograma-page">
    <PageHeader
      eyebrow="Estructura organizacional"
      title="Organigrama"
      description="Vista jerarquica de la organizacion basada en relaciones de subordinacion."
    >
      <div class="organograma-metrics" v-if="!loading && !error && stats.total">
        <span class="pill primary">{{ stats.total }} Puestos</span>
        <span class="pill neutral">{{ stats.areas }} Áreas</span>
        <span class="pill warning">{{ stats.niveles }} Niveles</span>
      </div>
    </PageHeader>

    <div v-if="selectedEmployeeNumber" class="selected-employee-note">
      <strong>Empleado seleccionado:</strong> {{ selectedEmployeeNumber }}. Se ha cargado el organigrama con enfoque en este empleado.
    </div>

    <BaseCard class="organograma-card">
      <div class="organograma-actions">
        <p class="organograma-hint">Desplazate horizontalmente si el arbol ocupa mas espacio en pantalla.</p>
        <button
          type="button"
          class="pdf-download"
          :disabled="loading || !arbol.length"
          @click="descargarPdf"
        >
          Descargar PDF
        </button>
      </div>

      <div v-if="loading" class="loading">Cargando organigrama...</div>
      <div v-else-if="error" class="error">{{ error }}</div>

      <div v-else class="arbol-shell">
        <div ref="chartRef" class="arbol-container">
          <ArbolOrganigrama :nodos="arbol" es-raiz />
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import ArbolOrganigrama from "@/components/orgchart/ArbolOrganigrama.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import organogramaService from "@/services/organograma.service";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const arbol = ref([]);
const chartRef = ref(null);

const collectNodes = (nodes = []) =>
  nodes.flatMap((node) => [node, ...collectNodes(node.hijos || [])]);

const getMaxDepth = (nodes = [], depth = 1) => {
  if (!nodes.length) return 0;
  return Math.max(...nodes.map((node) => getMaxDepth(node.hijos || [], depth + 1)), depth);
};

const selectedEmployeeId = computed(() => route.query.empleadoId || null);
const selectedEmployeeNumber = computed(() =>
  selectedEmployeeId.value ? `EMP-${String(selectedEmployeeId.value).padStart(3, "0")}` : null
);

const stats = computed(() => {
  const nodes = collectNodes(arbol.value);
  const uniqueAreas = new Set(nodes.map((node) => node.area).filter(Boolean));

  return {
    total: nodes.length,
    areas: uniqueAreas.size,
    niveles: getMaxDepth(arbol.value)
  };
});

const descargarPdf = async () => {
  if (!chartRef.value) return;

  try {
    const canvas = await html2canvas(chartRef.value, {
      backgroundColor: "#fffdf9",
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth() - 40;
    const pageHeight = pdf.internal.pageSize.getHeight() - 40;
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const width = canvas.width * ratio;
    const height = canvas.height * ratio;

    pdf.addImage(imgData, "PNG", 20, 20, width, height);
    pdf.save("organigrama.pdf");
  } catch (downloadError) {
    globalThis.console?.error("Error al generar PDF del organigrama:", downloadError);
  }
};

onMounted(async () => {
  try {
    const response = await organogramaService.obtenerOrganigrama();
    arbol.value = response.data;
  } catch (err) {
    error.value = "Error al cargar el organigrama";
    globalThis.console?.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.organograma-card {
  width: 100%;
}

.organograma-metrics {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.organograma-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.organograma-hint {
  margin: 0;
  color: var(--color-text-soft);
  font-size: 0.92rem;
}

.loading,
.error {
  padding: 20px;
  text-align: center;
}

.error {
  color: var(--color-danger);
}

.arbol-shell {
  overflow-x: auto;
  padding-bottom: 8px;
}

.arbol-container {
  min-width: max-content;
  padding: 20px 18px 8px;
  border: 1px solid rgba(197, 155, 82, 0.18);
  border-radius: 20px;
  background:
    radial-gradient(circle at top, rgba(197, 155, 82, 0.08), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 241, 234, 0.82));
}

.arbol-container > .arbol > .rama > .nodo::before {
  display: none;
}

.pdf-download {
  cursor: pointer;
  padding: 12px 18px;
  border: 1px solid var(--color-accent-strong);
  border-radius: 999px;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-strong));
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(197, 155, 82, 0.24);
  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.pdf-download:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background: #d9c39e;
  border-color: #d9c39e;
  box-shadow: none;
}

.pdf-download:not(:disabled):hover {
  background: linear-gradient(135deg, #d0a960, var(--color-accent-strong));
  transform: translateY(-1px);
  box-shadow: 0 16px 28px rgba(197, 155, 82, 0.32);
}

@media (max-width: 920px) {
  .organograma-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .organograma-metrics {
    justify-content: flex-start;
  }

  .pdf-download {
    width: 100%;
  }
}

.page-header{
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
