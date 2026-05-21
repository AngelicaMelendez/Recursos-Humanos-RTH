<template>
  <ul :class="['arbol', { raiz: esRaiz }]">
    <li
      v-for="nodo in nodos"
      :key="nodo.id"
      :class="['rama', { 'tiene-hijos': nodo.hijos && nodo.hijos.length }]"
    >
      <div class="nodo">
        <span class="nodo__accent"></span>
        <strong class="nombre">{{ nodo.nombre }}</strong>
        <span class="area">{{ nodo.area }}</span>
      </div>

      <ArbolOrganigrama
        v-if="nodo.hijos && nodo.hijos.length"
        :nodos="nodo.hijos"
      />
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
.arbol,
.arbol ul {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}

.arbol ul {
  padding-top: 18px;
}

.rama {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 18px;
}

.rama::before,
.rama::after {
  content: "";
  position: absolute;
  top: 0;
  width: 50%;
  height: 18px;
  border-top: 2px solid rgba(107, 24, 57, 0.32);
}

.rama::before {
  left: 0;
}

.rama::after {
  right: 0;
}

.rama:only-child::before,
.rama:only-child::after,
.rama:first-child::before,
.rama:last-child::after {
  display: none;
}

.nodo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  min-width: 180px;
  max-width: 220px;
  margin-bottom: 18px;
  padding: 16px 16px 14px;
  border: 1px solid rgba(221, 207, 191, 0.92);
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255, 253, 249, 1), rgba(248, 241, 232, 0.94));
  box-shadow: 0 16px 28px rgba(79, 16, 41, 0.08);
  position: relative;
  z-index: 10;
  text-align: center;
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base),
    border-color var(--transition-base);
}

.nodo::before {
  content: "";
  position: absolute;
  top: -18px;
  left: 50%;
  width: 0;
  height: 18px;
  transform: translateX(-50%);
  border-left: 2px solid rgba(107, 24, 57, 0.32);
}

.arbol.raiz > .rama > .nodo::before {
  display: none;
}

.rama.tiene-hijos > .nodo::after {
  content: "";
  position: absolute;
  bottom: -18px;
  left: 50%;
  width: 0;
  height: 18px;
  transform: translateX(-50%);
  border-left: 2px solid rgba(107, 24, 57, 0.32);
}

.rama:not(.tiene-hijos) > .nodo::after {
  display: none;
}

.nodo__accent {
  width: 46px;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}

.nombre {
  display: block;
  color: var(--color-primary-strong);
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.2;
}

.area {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(107, 24, 57, 0.08);
  color: var(--color-primary);
  font-size: 0.74rem;
}

.nodo:hover {
  border-color: rgba(197, 155, 82, 0.7);
  box-shadow: 0 18px 34px rgba(79, 16, 41, 0.14);
  transform: translateY(-2px);
}

@media (max-width: 920px) {
  .arbol,
  .arbol ul {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }

  .rama {
    padding-top: 0;
  }

  .rama::before,
  .rama::after,
  .nodo::before,
  .rama.tiene-hijos > .nodo::after {
    display: none;
  }

  .nodo {
    width: 100%;
    max-width: none;
    margin-bottom: 0;
  }
}
</style>
