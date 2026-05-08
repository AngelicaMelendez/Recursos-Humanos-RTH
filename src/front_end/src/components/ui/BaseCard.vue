<template>
  <section class="card base-card">
    <header v-if="title || subtitle" class="base-card__header">
      <div>
        <h3 v-if="title" class="base-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="base-card__subtitle">{{ subtitle }}</p>
      </div>
      <slot name="header-actions" />
    </header>
    <div class="base-card__content">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ""
  },
  subtitle: {
    type: String,
    default: ""
  }
});
</script>

<style scoped>
.base-card {
  padding: 22px;
}

.base-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.base-card__title {
  margin: 0 0 6px;
  font-size: 1.05rem;
}

.base-card__subtitle {
  margin: 0;
  color: var(--color-text-soft);
  line-height: 1.5;
}
</style>

