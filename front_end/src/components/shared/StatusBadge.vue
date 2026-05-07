<template>
  <span class="pill" :class="tone">{{ label }}</span>
</template>

<script setup>
import { computed } from "vue";
import { requestStatusColors } from "@/utils/constants";
import { capitalize } from "@/utils/formatters";

const props = defineProps({
  value: {
    type: String,
    required: true
  }
});

const tone = computed(() => requestStatusColors[props.value.toLowerCase()] || "neutral");
const label = computed(() => capitalize(props.value));
</script>

