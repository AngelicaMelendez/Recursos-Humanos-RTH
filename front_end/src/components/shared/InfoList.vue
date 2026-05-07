<template>
  <BaseCard :title="title" :subtitle="subtitle">
    <div class="info-list">
      <div v-for="item in items" :key="item.name" class="info-list__item">
        <strong>{{ item.name }}</strong>
        <span>{{ item.meta }}</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  items: { type: Array, required: true }
});
</script>

<style scoped>
.info-list {
  display: grid;
  gap: 14px;
}

.info-list__item {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

.info-list__item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.info-list__item span {
  color: var(--color-text-soft);
  text-align: right;
}
</style>

