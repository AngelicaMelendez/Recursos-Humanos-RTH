<template>

<div v-if="isOpen" class="modal-overlay">
    <div class="modal-container">
        <header class="modal-header">
            <h2>Compromiso de Normatividad Institucional</h2>
        </header>


        <main class="modal-content" @scroll="manejarScroll"->
            <p class="intro-text">
                Para Poder Procesar tu SOLICITUD, es OBLIGATORIO Revisar y Aceptar las Normatividades y Lineamientos Internos Vigentes de **Radio y Television de Hidalgo**
            </p>
            <hr />


            <div v-for="doc in documentos" :key="doc.id" class="document-item">
                <h3>{{ doc.nombre }} (v{{ doc.version }})</h3>
                <p><strong>Tipo: </strong>{{ doc.tipo }} | <strong>Publicación: </strong> {{ doc.fecha_piblicacion }} </p>
                <a :href="`http://localhost:8000/${doc.archivo_pdf}`" target="_blank" class="view-link">
                    Hacer Clic Aqui para leer documento completo
                </a>
            </div>


            <div v-if="!completoScroll" class="scroll-warning" >
                Por favor, desliza hacia abajo hasta el final del contenido para habilitar la Aceptación
            </div>
            

            <footer class="modal-footer">
                <label class="checkbox-container">
                    <input 
                    type="checkbox"
                    v-model="aceptado"
                    :disabled="!completoScroll"
                    />
                    <span class="{ `disabled-text`: !completoScroll}">
                        He leído, Comprendo y Estoy de Acuerdo con cumplir con los Lineamientos Institucionales
                    </span>
                </label>


                <div class="modal-buttons">
                    <button class="btn-cancelar" @click="cerrarModal"> Cancelar </button>
                    <button 
                    class="btn-aceptar"
                    :disabled="!aceptado"
                    @click="confirmarAceptacion"
                    >  

                    Continuar con la Solicitud

                </button>
                </div>
            </footer>
        </main> 
    </div>
</div>

</template>

<script setup>

import { ref, watch } from 'vue';


const props = defineProps({
    isOpen: Boolean,
    documentos: Array
});


const emit = defineEmits(['close', 'accepted']);


const aceptado = ref(false);
const completoScroll = ref(false);


watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        aceptado.value = false;
        completoScroll.value = false;
    }

});


const manejarScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollHeight - scrollTop <= clientHeight + 5) {
        completoScroll.value = true;
    }
};


const cerrarModal = () => {
    if (aceptado.value) {
        emit('accepted');
    }
};


const confirmarAceptacion = () => {
    if (aceptado.value) {
        emit('accepted')
    }
};

</script>


<style scoped> 

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

}

.modal-contanier {
    background: white;
    width: 90%;
    max-width: 650px;
    max-height: 85vh;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 25px  rgba(0, 0, 0, 0.3);
    overflow: hidden;

}


.modal-header {
    background: #2f6b4f;
    color: white;
    padding: 16px;
    font-size: 1.1rem;

}


.modal-content {
    padding: 20px;
    overflow-y: auto;
    flex: 1;

}


.intro-text {
    color: #555;
    font-size: 0.95rem;
    line-height: 1.5;

}


.document-item {
    background: #f9f9f9;
    padding: 12px;
    border-left: 4px solid #2f6b4f;
    margin-top: 14px;
    border-radius: 4px;

}


.document-item h3 {
    margin: 0 0 6px 0;
    font-size: 1rem;
}


.view-link {
color: #1d4ed8;
text-decoration: underline;
  font-size: 0.9rem;
  display: inline-block;
  margin-top: 6px;
}


.scroll-warning {
  margin-top: 15px;
  background: #fffbeb;
  color: #b45309;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}


.modal-footer {
  padding: 16px;
  background: #f3f4f6;
  border-top: 1px solid #e5e7eb;
}


.checkbox-container {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 16px;
}


.disabled-text {
  color: #9ca3af;
}


.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}


.btn-cancelar {
  padding: 8px 16px;
  background: #e5e7eb;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}


.btn-aceptar {
  padding: 8px 16px;
  background: #2f6b4f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}


.btn-aceptar:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}


</style>


















