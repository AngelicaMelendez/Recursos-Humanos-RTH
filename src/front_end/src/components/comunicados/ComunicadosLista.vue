<template>
  <div class="comunicados-lista">
    <div class="titulo-seccion">
      <h3>Mas comunicados</h3>
      <span class="count">{{ comunicados.length }}</span>
    </div>

    <div class="lista-grid">
      <article
        v-for="com in comunicados"
        :key="com.id"
        class="item-comunicado"
        @click="$emit('seleccionar', com)"
      >
        <div class="fecha-hora">{{ formatTime(com.createdAt) }}</div>
        <div class="titulo-item">{{ com.titulo }}</div>
        <div class="resumen">{{ truncate(com.contenido) }}</div>

        <div class="item-footer">
          <span class="count-reacciones">
            {{ com.reacciones?.length || 0 }} reacciones
          </span>
          <span class="leer-mas">Leer comunicado</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comunicados: {
    type: Array,
    default: () => []
  }
});

defineEmits(["seleccionar"]);

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-MX", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

const truncate = (value = "", limit = 110) =>
  value.length > limit ? `${value.slice(0, limit).trim()}...` : value;
</script>

<style scoped>
.comunicados-lista {
  display: grid;
  gap: 16px;
  margin-top: 8px;
}

.titulo-seccion {
  display: flex;
  align-items: center;
  gap: 10px;
}

.titulo-seccion h3 {
  margin: 0;
  color: var(--color-primary-strong);
  font-size: 1rem;
}

.count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(197, 155, 82, 0.16);
  color: var(--color-accent-strong);
  font-size: 0.82rem;
  font-weight: 800;
}

.lista-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.item-comunicado {
  display: grid;
  gap: 8px;
  padding: 18px;
  border: 1px solid rgba(197, 155, 82, 0.18);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 253, 249, 1), rgba(241, 231, 219, 0.82));
  cursor: pointer;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base);
}

.item-comunicado:hover {
  transform: translateY(-2px);
  border-color: rgba(197, 155, 82, 0.38);
  box-shadow: 0 16px 32px rgba(79, 16, 41, 0.08);
}

.fecha-hora {
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
}

.titulo-item {
  color: var(--color-primary-strong);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
}

.resumen {
  color: var(--color-text-soft);
  font-size: 0.9rem;
  line-height: 1.55;
}

.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 6px;
}

.count-reacciones,
.leer-mas {
  font-size: 0.82rem;
  font-weight: 700;
}

.count-reacciones {
  color: var(--color-text-soft);
}

.leer-mas {
  color: var(--color-accent-strong);
}
</style>
