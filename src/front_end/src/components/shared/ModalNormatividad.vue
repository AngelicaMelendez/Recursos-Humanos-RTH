<template>
  <div v-if="isOpen" class="modal-backdrop">
    <div class="modal-content normatividad-modal">
      <div class="modal-header">
        <h3>Antes de continuar...</h3>
      </div>

      <div class="modal-body">
        <p class="instrucciones">
          Para habilitar el sistema de solicitudes, es indispensable que consultes y revises los siguientes documentos normativos oficiales de la institución:
        </p>

        <!-- LISTA DE DOCUMENTOS CON CONTROL DE LECTURA -->
        <div class="lista-normas">
          <div 
            v-for="doc in normatividadesObligatorias" 
            :key="doc.id" 
            class="norma-item"
            :class="{ 'leido': documentosCliqueados.has(doc.id) }"
          >
            <span class="documento-nombre">{{ doc.nombre }}</span>
            
            <button 
              @click="abrirYRegistrarLectura(doc)" 
              class="btn-leer"
              type="button"
            >
            
              <span class="norm-leidos" v-if="documentosCliqueados.has(doc.id)"> 
                <IconSymbol
                class="icon"
                name="check"
              />  
              Consultado</span>
              <span class="leer-norm" v-else> <IconSymbol class="icon" name="eye" /> Abrir y Leer Documento</span>
              
            </button>
          </div>
        </div>

        <p v-if="!todosLosDocumentosLeidos" class="advertencia-texto">
          * Debes abrir y consultar todos los documentos de la lista anterior para poder continuar.
        </p>
      </div>

      <div class="modal-actions">
        <button 
          @click="habilitarSolicitudesYContinuar"
          :disabled="!todosLosDocumentosLeidos"
          :class="['btn-confirmar', { 'btn-deshabilitado': !todosLosDocumentosLeidos }]"
        >
          Entendido y Aceptar Normativas
        </button>
      </div>
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
  }
});

const emit = defineEmits(['close', 'accepted']);

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
  },
]);

const documentosCliqueados = ref(new Set());

// Reiniciar el Set cuando se vuelve a abrir el modal
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    documentosCliqueados.value = new Set();
  }
});

// Registrar la lectura DENTRO de la función
const abrirYRegistrarLectura = (documento) => {
  if (!documento.archivo_pdf) return;

  // 1. Abrir PDF
  window.open(encodeURI(`http://localhost:8000/${documento.archivo_pdf}`), '_blank');

  // 2. Agregar ID al Set manteniendo reactividad en Vue 3
  const nuevoSet = new Set(documentosCliqueados.value);
  nuevoSet.add(documento.id);
  documentosCliqueados.value = nuevoSet;
};

// Computada que valida la lectura de todos los PDFs
const todosLosDocumentosLeidos = computed(() => {
  return documentosCliqueados.value.size === normatividadesObligatorias.value.length;
});

const cerrarModal = () => {
  emit('close');
};

// Emitir evento de aceptación
const habilitarSolicitudesYContinuar = () => {
  if (!todosLosDocumentosLeidos.value) return;
  emit('accepted');
  cerrarModal();
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.normatividad-modal {
  background: white;
  width: 90%;
  max-width: 650px;
  max-height: 85vh;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  overflow: hidden;
}

.modal-header {
  background: #691B31; 
  color: white;
  padding: 16px;
  font-size: 1.1rem;
  text-align: center;
}

.modal-header h3 {
  margin: 0;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.instrucciones {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 16px;
}

.lista-normas {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.norma-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-left: 5px solid #A02142;
  border-radius: 6px;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.documento-nombre {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
  padding-right: 10px;
}

/* Estilo cuando el documento ya fue cliqueado */
.norma-item.leido {
  border-color: #2ecc71;
  border-left-color: #2ecc71;
  background-color: #ebfaf0;
}

.btn-leer {
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  background-color: #691B31;
  color: white;
  font-size: 0.90rem;
  font-weight: 600;
  white-space: nowrap;
  transition: background-color 0.2s;
  text-align:center;
  justify-content:center;
  align-items: center;

  
}

.btn-leer:hover {
  background-color: #A02142;
}

.norma-item.leido .btn-leer {
  background-color: #96475c;
}

.advertencia-texto {
  margin-top: 16px;
  color: #A02142;
  background: #fffbeb;

  padding: 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  
}

.modal-actions {
  padding: 16px;
  background: #f3f4f6;
  border-top: 1px solid #e5e7eb;

  display: flex;
  justify-content: flex-end;

}

.btn-confirmar {
  padding: 10px 20px;
  background: #691B31;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-confirmar:hover:not(:disabled) {
  background: #A02142;
}

.btn-confirmar:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.7;
}

.icon {
  height: 20px;
  margin-right: 2px;
  margin-top: 2px;
  
}

.icon-hover .icon {
  stroke: var(--color-primary);
}  



</style>