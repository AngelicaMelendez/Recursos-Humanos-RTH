<template>
  <ul class="arbol">
    <li v-for="nodo in nodos" :key="nodo.id">
      <div class="nodo">
        <strong>{{ nodo.nombre }}</strong>
        <span>{{ nodo.puesto }}</span>
      </div>
      <ArbolOrganigrama class="nosenose", v-if="nodo.hijos && nodo.hijos.length" :nodos="nodo.hijos" />
    </li>
  </ul>
</template>

<script setup>
defineProps({
  nodos: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.arbol {
  list-style: none;
  padding-left: 24px;
  margin: 0;
}

.arbol .arbol {
  padding-left: 20px;
}

.nodo {
  padding: 10px 16px;
  margin: 4px 0;
  background: var(--color-surface-muted);
  border-radius: 8px;
  border-left: 4px solid var(--color-primary);
}

.nodo strong {
  display: block;
  color: var(--color-text);
}

.nodo span {
  font-size: 0.85em;
  color: var(--color-text-secondary);
}

li:last-child > .nodo {
  border-left-color: var(--color-success);
}
</style>