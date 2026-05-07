<template>
  <BaseCard :title="title" :subtitle="subtitle">
    <canvas ref="chartRef"></canvas>
  </BaseCard>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Chart from "chart.js/auto";
import BaseCard from "@/components/ui/BaseCard.vue";

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  items: { type: Array, required: true }
});

const chartRef = ref(null);
let chartInstance;

const renderChart = () => {
  if (!chartRef.value) {
    return;
  }

  chartInstance?.destroy();
  chartInstance = new Chart(chartRef.value, {
    type: "bar",
    data: {
      labels: props.items.map((item) => item.label),
      datasets: [
        {
          data: props.items.map((item) => item.value),
          borderRadius: 8,
          backgroundColor: ["#621132", "#7d2342", "#b38e5d", "#d8c2a0"]
        }
      ]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: "#efe6dd" } }
      }
    }
  });
};

onMounted(renderChart);
watch(() => props.items, renderChart, { deep: true });
onBeforeUnmount(() => chartInstance?.destroy());
</script>

