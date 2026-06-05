<template>
  <div class="page-header">
    <div>
      <p v-if="description" class="page-header__description">{{ description }}</p>

      <slot>
        <h2 v-if="star" class="header-star-welcome">
          <img :src="star" alt="Estrella" />
        </h2>
      </slot>
    </div>

    <slot name="actions" />
  </div>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  star: { type: String, default: "" }
});
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 18px;
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

