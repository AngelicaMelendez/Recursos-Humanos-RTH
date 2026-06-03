<template>
  <BaseCard title="Actividad Reciente" subtitle="Trazabilidad de eventos relevantes del día.">
    <div class="activity-list">
      <article v-for="entry in items" :key="entry.title" class="activity-item">
        <h4>{{ entry.title }}</h4>
        <p>{{ entry.description }}</p>
        <span>{{ entry.time }}</span>
      </article>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";

defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.activity-list {
  display: grid;
  gap: 14px;
}

.activity-item {
  padding-bottom: 14px;
  border-bottom: 1px solid var(--color-border);
}

.activity-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.activity-item h4 {
  margin: 0 0 6px;
}

.activity-item p,
.activity-item span {
  margin: 0;
  color: var(--color-text-soft);
  line-height: 1.5;
}

.activity-item span {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.84rem;
}
</style>

