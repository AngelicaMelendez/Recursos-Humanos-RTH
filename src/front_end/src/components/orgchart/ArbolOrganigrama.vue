<template>
  <ul :class="['arbol', { raiz: esRaiz }]">
    <li
      v-for="nodo in nodos"
      :key="nodo.id"
      :class="['rama', { 'tiene-hijos': nodo.hijos && nodo.hijos.length }]"
    >
      <div class="nodo">
        <strong class="nombre">{{ nodo.nombre }}</strong>
        <span class="area">{{ nodo.area }}</span>
      </div>
      <ArbolOrganigrama v-if="nodo.hijos && nodo.hijos.length" :nodos="nodo.hijos" />
    </li>
  </ul>
</template>

<script setup>
defineProps({
  nodos: {
    type: Array,
    required: true
  },
  esRaiz: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
/* --- CONTENEDOR PRINCIPAL --- */
.arbol,
.arbol ul {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}

.arbol ul {
  padding-top: 18px;
}

/* --- ESTRUCTURA DE LA RAMA (li) --- */
.rama {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 18px;
}

.rama::before,
.rama::after {
  content: '';
  position: absolute;
  top: 0;
  width: 50%;
  height: 18px;
  border-top: 2px solid #64748b;
}

.rama::before {
  left: 0;
}

.rama::after {
  right: 0;
}

.rama:only-child::before,
.rama:only-child::after {
  display: none;
}

.rama:first-child::before,
.rama:last-child::after {
  display: none;
}

/* --- DISEÑO DE LAS TARJETAS (Cards) --- */
.nodo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 14px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  min-width: 150px;
  max-width: 180px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(15, 23, 42, 0.08);
  position: relative;
  z-index: 10;
  margin-bottom: 16px;
}

.nodo::before {
  content: '';
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 2px solid #64748b;
  width: 0;
  height: 18px;
}

/* --- LÍNEA VERTICAL DE ENTRADA (Por arriba del nodo raíz) --- */
.arbol.raiz > .rama > .nodo::before {
  display: none;
}

/* --- LÍNEA VERTICAL DE SALIDA (Por abajo de la card si tiene hijos) --- */
.rama.tiene-hijos > .nodo::after {
  content: '';
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 2px solid #64748b;
  width: 0;
  height: 18px;
}

/* Ocultar la línea de salida para nodos que no tienen hijos */
.rama:not(.tiene-hijos) > .nodo::after {
  display: none;
}

.nombre {
  display: block;
  font-size: 0.86rem;
  color: #0f172a;
  font-weight: 700;
  line-height: 1.2;
}

.area {
  display: block;
  font-size: 0.75rem;
  color: #475569;
  margin-top: 4px;
}

.nodo:hover {
  border-color: #2563eb;
  box-shadow: 0 12px 18px rgba(15, 23, 42, 0.1);
}
</style>