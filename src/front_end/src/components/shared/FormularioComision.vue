<template>

<form class="comision-form" @submit.prevent="enviarComision">
    <p class="info-note"> Formato Requerido para Comisiones. </p>


    <div class="form-grid-comision">
        <label>
            Lugar o Destino de la Comisión
            <input class="input-lugar" v-model="comision.lugar" type="text" required placeholder="Ej. Pachuca" />
        </label>

        <label>
            No. de Oficio de la Comisión
            <input 
            class="input-oficio" 
            v-model="comision.oficio_num" 
            type="text" 
            required 
            placeholder="Ej. RTH-COM-2026-06" 
            @input="formatearOficio"
            />
        </label>

    </div>

    <div class="form-grid-comision">
        <label>
            Fecha y Hora de Salida
            <input class="input-fecha" v-model="comision.fecha_inicio" type="date" required />
        </label>

        <label>
            Fecha Estimada de Retorno
            <input class="input-fecha" v-model="comision.fecha_fin" type="date" :min="comision.fecha_inicio" required />
        </label>
    </div>

        <label>
            Objetivos y Actividades a Desarrollar o Desempeñar:
        <textarea class="input-actividad" v-model="comision.motivo" rows="4" required placeholder="Especificar Detalladamente la Agenda de Trabajo..."> </textarea>
        </label>

        <footer class="modal-actions" style="margin-top: 18px; display: flex; gap: 8px; justify-content: flex-end;">
      <button class="secondary-button" type="button" @click="$emit('cancel')">Cancelar</button>
      <button class="primary-button" type="submit" :disabled="loading">
        {{ loading ? 'Procesando...' : 'Registrar Comisión' }}
      </button>
    </footer>
  </form>
</template>


<script setup>

import { reactive, ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';


const emit = defineEmits (['success', 'cancel']);
const authStore = useAuthStore;
const loading = ref(false);


const comision = reactive ({
    tipo: 'comision',
    lugar: '',
    oficio_num: '',
    fecha_inicio: '',
    fecha_fin: '',
    motivo: ''
});


const enviarComision = async () => {
    loading.value = true;
    try {
        const response = await axios.post('http://localhost:8000/api/solicitudes', comision, {
            headers: {
                'Authorization': `Bearer ${authStore.token}` 
            }
        });
        emit('success', response.data);
    } catch (error) {
        alert("Error al Guardar la Comision: " + (error.response?.data?.error || error.message));
    } finally {
        loading.value = false;
    }
};
</script>


<style scoped>

.comision-form {
    display: grid;
    gap: 14px;

}


.info-note {
    font-size: 0.84rem;
    color: var(--color primary,  #6b1839);
    background: rgba(107, 24, 67, 0.08);
    padding: 12px;
    border-radius: 8px;
    margin: 0;
    line-height: 1.5;
    font-weight: 500;
    text-align: center;
    justify-content: center;

}


.form-grid-comision {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    border-radius: 12px;

}
label{
    display: grid;
    gap: 7px;
    color: var(--color-text-soft);
    font-weight: 700;
}


.input-lugar {
    border-radius: 12px;
    border: 1px solid var(--color-border);
    padding: 8px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
}


.input-oficio {
    border-radius: 12px;
    border: 1px solid var(--color-border);
    padding: 8px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
}


.input-fecha {
    border-radius: 12px;
    border: 1px solid var(--color-border);
    padding: 8px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
}


.input-actividad {
    border-radius: 12px;
    border: 1px solid var(--color-border);
    padding: 8px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
}


.primary-button,
.secondary-button {
  min-height: 42px;
  padding: 10px 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}


.primary-button {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: #fff;
  
}


.primary-button--danger {
  border-color: var(--color-danger);
  background: var(--color-danger);
}


.primary-button:hover {
  transform: translateY(-1px);
}


.secondary-button {
  background: #fff ;
  color: var(--color-text);
  border: 1px solid#1c1c1c;
}


.secondary-button:hover {
  transform: translateY(-1px);
}


button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}


@media (max-width: 480px) {
    .form-grid-comision {
        grid-template-columns: 1fr;
    }
}





















</style>



        
        











































