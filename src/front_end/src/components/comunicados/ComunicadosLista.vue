<template>
  <div class="comunicados-lista">
    <div class="titulo-seccion">
      <h3>Más comunicados</h3>
      <span class="count">{{ comunicados.length }}</span>
    </div>

    <div class="scroll-container">
      <div class="lista-horizontal">
        <div
          v-for="com in comunicados"
          :key="com.id"
          class="item-comunicado"
          @click="$emit('seleccionar', com)"
        >
          <div class="fecha-hora">
            {{ formatTime(com.createdAt) }}
          </div>
          <div class="titulo-item">{{ com.titulo }}</div>
          <div class="resumen">{{ com.contenido.substring(0, 50) }}...</div>
          <div class="reacciones" v-if="com.reacciones?.length">
            <span class="count-reacciones">👍 {{ com.reacciones.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comunicados: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["seleccionar"]);

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-MX", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
</script>

<style scoped>
.comunicados-lista {
  margin-top: 24px;
}

.titulo-seccion {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(176, 142, 93, 0.3);
}

.titulo-seccion h3 {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.count {
  background: rgba(176, 142, 93, 0.2);
  color: #b38e5d;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.scroll-container {
  overflow-x: auto;
  padding-bottom: 8px;
  margin: 0 -24px;
  padding-left: 24px;
  padding-right: 24px;

  /* Estilos para scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(176, 142, 93, 0.3) rgba(15, 15, 31, 0.3);
}

.scroll-container::-webkit-scrollbar {
  height: 6px;
}

.scroll-container::-webkit-scrollbar-track {
  background: rgba(15, 15, 31, 0.3);
  border-radius: 3px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: rgba(176, 142, 93, 0.3);
  border-radius: 3px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: rgba(176, 142, 93, 0.5);
}

.lista-horizontal {
  display: flex;
  gap: 12px;
  min-width: min-content;
}

.item-comunicado {
  flex-shrink: 0;
  width: 280px;
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid rgba(176, 142, 93, 0.2);
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-comunicado:hover {
  background: rgba(26, 26, 46, 1);
  border-color: rgba(176, 142, 93, 0.4);
  transform: translateY(-2px);
}

.fecha-hora {
  font-size: 12px;
  color: rgba(176, 142, 93, 0.8);
  font-weight: 500;
}

.titulo-item {
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
}

.resumen {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  line-height: 1.4;
}

.reacciones {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.count-reacciones {
  display: inline-block;
  background: rgba(176, 142, 93, 0.15);
  color: #b38e5d;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .item-comunicado {
    width: 250px;
  }
}
</style>
