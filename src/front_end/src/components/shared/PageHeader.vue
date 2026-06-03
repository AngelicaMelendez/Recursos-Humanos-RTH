<template>
  <div class="page-header">
    <div>
      <span v-if="eyebrow" class="page-header__eyebrow">{{ eyebrow }}</span>

    </div>
    <div class="page-header__actions">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, required: true }
});
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 24px;
}

.page-header__eyebrow {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 8px 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--color-primary-faint), rgba(197, 155, 82, 0.16));
  color: var(--color-primary);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-header__title {
  margin: 0 0 10px;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.1;
}

.page-header__description {
  margin: 0;
  max-width: 760px;
  color: var(--color-text-soft);
  line-height: 1.6;
}

@media (max-width: 920px) {
  .page-header {
    flex-direction: column;
    align-items: start;
  }
}
</style>

