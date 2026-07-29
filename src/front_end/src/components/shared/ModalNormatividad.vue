<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal-card">
      <header class="modal-card__header">
        <h2>Normatividad Institucional</h2>
      </header>

      <main class="modal-card__body">
        <p class="instrucciones">
          {{ mensaje }}
        </p>

        <div class="lista-documentos">
          <div
            v-for="doc in normatividadesObligatorias"
            :key="doc.id"
            class="documento-item"
            :class="{ 'leido': documentosCliqueados.has(doc.id) }"
          >
            <span class="documento-nombre">{{ doc.nombre }}</span>
            <button
              type="button"
              class="btn-leer"
              @click="abrirYRegistrarLectura(doc)"
            >
              <span v-if="documentosCliqueados.has(doc.id)"> <IconSymbol name="check"/> Consultado</span>
              <span v-else>Consultar PDF</span>
            </button>
          </div>
        </div>

        <p v-if="!todosLosDocumentosLeidos" class="nota-advertencia">
          * Debes abrir y consultar todos los documentos de la lista para poder continuar.
        </p>
      </main>

      <footer class="modal-card__footer">
        <button
          type="button"
          class="btn-aceptar"
          :disabled="!todosLosDocumentosLeidos"
          @click="confirmarAceptacion"
        >
          Entendido y Aceptar Normativas
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import IconSymbol from '../ui/IconSymbol.vue';


const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  // Permite personalizar el texto según la pantalla si lo deseas
  mensaje: {
    type: String,
    default: 'Es indispensable consultar y revisar los siguientes documentos normativos oficiales de la institución para continuar:'
  }
});

const emit = defineEmits(['close', 'accepted']);

// Lista fija de normatividades
const normatividadesObligatorias = ref([
  {
    id: 1,
    nombre: 'Ley de Responsabilidades Administrativas del Estado de Hidalgo',
    archivo_pdf: 'uploads/Ley de Responsabilidades Administrativas del Estado de Hidalgo.pdf'
  },
  {
    id: 2,
    nombre: 'Pobalines',
    archivo_pdf: 'uploads/Pobalines.pdf'
  }
]);

const documentosCliqueados = ref(new Set());

// Reiniciar las lecturas cada vez que se abre el modal
watch(() => props.isOpen, (nuevoEstado) => {
  if (nuevoEstado) {
    documentosCliqueados.value = new Set();
  }
});


const abrirYRegistrarLectura = (documento) => {
  if (!documento.archivo_pdf) return;

  // Abrir PDF en nueva pestaña
  window.open(encodeURI(`http://localhost:8000/${documento.archivo_pdf}`), '_blank');

  // Registrar en el Set reactivo
  const nuevoSet = new Set(documentosCliqueados.value);
  nuevoSet.add(documento.id);
  documentosCliqueados.value = nuevoSet;
};

// Comprobar que se hayan abierto ambos documentos
const todosLosDocumentosLeidos = computed(() => {
  return documentosCliqueados.value.size === normatividadesObligatorias.value.length;
});

const confirmarAceptacion = () => {
  if (!todosLosDocumentosLeidos.value) return;
  emit('accepted');

};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.modal-card {
  width: min(90%, 550px);
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;

}

.modal-card__header {
  padding: 20px 24px;
  background: var(--color-primary, #621132);
  color: #fff;
}

.modal-card__header h2 {
  margin: 0;
  font-size: 1.25rem;
  text-align: center;
}

.modal-card__body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.instrucciones {
  margin: 0;
  color: #4a5568;
  font-size: 0.95rem;
  line-height: 1.5;

}

.lista-documentos {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-color: #A02142;
}

.documento-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
  transition: border-color 0.2s ease;
  border-left: 4px solid #A02142;
}

.documento-item.leido {
  border-color: #98989A;
  background: #f0fdf4;
}

.documento-nombre {
  font-weight: 600;

  font-size: 0.9rem;
  color: #1a202c;
  max-width: 65%;
}

.btn-leer {
  padding: 8px 14px;

  border: none;
  border-radius: 8px;
  background: #A02142;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.documento-item.leido .btn-leer {
  background: #98989A;
}

.nota-advertencia {
  margin: 0;
  color: #e53e3e;
  font-size: 0.8rem;
}

.modal-card__footer {
  padding: 16px 24px;
  background: #f7fafc;
  border-top: 1px solid #edf2f7;
  display: flex;
  justify-content: flex-end;

}

.btn-aceptar {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: var(--color-primary, #621132);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-aceptar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>