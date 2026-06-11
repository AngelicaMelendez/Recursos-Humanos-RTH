<template>
  <div class="role-actions" :class="{ 'role-actions--compact': compact }">
    <button
      v-for="action in actions"
      :key="action.key"
      type="button"
      class="role-actions__button"
      :class="`role-actions__button--${action.operation.toLowerCase()}`"
      @click="$emit('select', action)"
      :title="action.label"
    >
      <span class="role-actions__icon">
        <IconSymbol :name="action.icon" />
      </span>
      <span>{{ action.label }}</span>
    </button>
  </div>
</template>

<script setup>
import IconSymbol from "@/components/ui/IconSymbol.vue";

defineProps({
  actions: {
    type: Array,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
});

defineEmits(["select"]);
</script>

<style scoped>
.role-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.role-actions__button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  font-weight: 700;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    background var(--transition-base);
}

.role-actions__button:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
  box-shadow: 0 10px 24px rgba(98, 17, 50, 0.08);
}

.role-actions__icon {
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(98, 17, 50, 0.08);
  color: var(--color-primary);
}

.role-actions__button--c {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.role-actions__button--c .role-actions__icon {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.role-actions__button--d {
  color: var(--color-danger);
}

.role-actions--compact {
  gap: 8px;
}

.role-actions--compact .role-actions__button {
  min-height: 36px;
  padding: 8px 10px;
  font-size: 0.86rem;
}

@media (max-width: 680px) {
  .role-actions__button {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
