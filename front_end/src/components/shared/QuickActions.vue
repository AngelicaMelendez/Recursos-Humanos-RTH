<template>
  <BaseCard title="Accesos rápidos" subtitle="Atajos operativos para tareas recurrentes.">
    <div class="quick-actions">
      <router-link
        v-for="action in actions"
        :key="action.title"
        :to="action.route"
        class="quick-actions__item"
      >
        <span>{{ action.title }}</span>
        <span>Ir</span>
      </router-link>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";

defineProps({
  actions: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.quick-actions {
  display: grid;
  gap: 12px;
}

.quick-actions__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition:
    transform var(--transition-base),
    border-color var(--transition-base);
}

.quick-actions__item:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
}
</style>

