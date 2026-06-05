<template>
  <div class="page-header">
    <div>
      <h1 class="page-header__title">{{ title }}</h1>
      <p class="page-header__description">{{ description }}</p>
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
  padding-left:18px
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

.page-header__actions {
  display: none; /* ocultar botones de acciones en header */
}

@media (max-width: 920px) {
  .page-header {
    flex-direction: column;
    align-items: start;
  }
}
</style>

