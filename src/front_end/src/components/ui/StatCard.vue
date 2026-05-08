<template>
  <BaseCard class="stat-card">
    <div class="stat-card__top">
      <span class="pill" :class="item.tone">{{ item.label }}</span>
      <strong class="stat-card__delta">{{ item.delta }}</strong>
    </div>
    <div class="stat-card__value">{{ item.value }}</div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "./BaseCard.vue";

defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.stat-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.stat-card__delta {
  color: var(--color-text-soft);
  font-size: 0.92rem;
}

.stat-card__value {
  margin-top: 18px;
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary);
}
</style>

