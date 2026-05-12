<template>
  <BaseCard title="Accesos rápidos" subtitle="Atajos operativos para tareas recurrentes.">
    <div class="quick-actions">
      <router-link
        v-for="action in visibleActions"
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
import { computed } from "vue";
import { canAccessModule } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";

const props = defineProps({
  actions: {
    type: Array,
    required: true
  }
});

const moduleByRoute = {
  "/visitantes": "visitors",
  "/solicitudes": "requests",
  "/normatividad": "normativity",
  "/vacantes": "vacancies",
  "/directorio": "directory"
};

const authStore = useAuthStore();

const visibleActions = computed(() =>
  props.actions.filter((action) => canAccessModule(authStore.user?.rol, action.module || moduleByRoute[action.route]))
);
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

