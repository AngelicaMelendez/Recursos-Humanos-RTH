<template>
  <BaseCard class="stat-card" :class="`stat-card--${item.tone || 'neutral'}`">
    <div class="stat-card__top">
      <span class="pill" :class="item.tone || 'neutral'">{{ item.label }}</span>
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
.stat-card {
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: "";
  position: absolute;
  inset: auto 0 0 0;
  height: 4px;
  opacity: 0.9;
}

.stat-card--primary::after {
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-soft));
}

.stat-card--accent::after,
.stat-card--warning::after {
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-strong));
}

.stat-card--neutral::after,
.stat-card--success::after,
.stat-card--danger::after {
  background: linear-gradient(90deg, rgba(123, 111, 116, 0.5), rgba(123, 111, 116, 0.85));
}

.stat-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.stat-card__delta {
  color: var(--color-text-soft);
  font-size: 0.62rem;
  font-weight: 700;
}

.stat-card__value {
  margin-top: 18px;
  font-size: clamp(1.9rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-primary);
}
</style>
