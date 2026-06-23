<template>
  <div class="page-container">
    
    <!-- VISTA DE LECTURA (Ver Datos) -->
    <div v-if="!interfaceStore.editandoPerfil" class="vista-lectura">
      <h1>Panel Principal</h1>
      <div class="datos-personales">
        <h3>Bienvenido, {{ usuario.nombre }}</h3>
        <p><strong>Email:</strong> {{ usuario.email }}</p>
        <p><strong>CURP:</strong> {{ usuario.curp || 'No registrado' }}</p>
        <!-- Puedes agregar aquí más campos dinámicos de tu BD (ej: nivel, departamento) -->
      </div>
    </div>

    <!-- VISTA DE FORMULARIO (Editar Datos) -->
    <div v-else class="vista-formulario">
      <h2>Editar Perfil Institucional</h2>
      <hr />
      
      <form @submit.prevent="guardarDatos">
        <div class="form-group">
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>
        
        <div class="form-group">
          <label>Email:</label>
          <input v-model="form.email" type="text" />
        </div>

        <div class="form-group">
          <label>CURP:</label>
          <!-- Atamos el nuevo campo con v-model -->
          <input v-model="form.curp" type="text" placeholder="Ingresa tu CURP" maxlength="18" style="text-transform: uppercase;" />
        </div>

        <div class="botones">
          <button type="submit" class="btn-guardar">Guardar Cambios</button>
          <button type="button" class="btn-cancelar" @click="interfaceStore.editandoPerfil = false">
            Cancelar
          </button>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useInterfaceStore } from '@/store/profile';
import axios from 'axios';

const interfaceStore = useInterfaceStore();

// 1. Declaramos todos los campos necesarios vacíos por defecto
const usuario = ref({ id: '', nombre: '', email: '', curp: '' });
const form = ref({ nombre: '', email: '', curp: '' });

// Función para ir a traer los datos reales y actualizados directamente de la BD




// "watch" prepara el formulario copiando los datos del usuario actual al abrir la edición
watch(() => interfaceStore.editandoPerfil, (nuevoValor) => {
  if (nuevoValor === true) {
    form.value = {
      nombre: usuario.value.nombre,
      email: usuario.value.email,
      curp: usuario.value.curp // Copiamos el CURP al formulario
    };
  }
});

const guardarDatos = async () => {
  try {
    // 3. Enviamos el formulario actualizado (incluyendo form.curp) al backend
    await axios.put(`/api/personal/${usuario.value.id}`, form.value);
    
    // Actualizamos la vista local con los nuevos valores guardados
    usuario.value.nombre = form.value.nombre;
    usuario.value.email = form.value.email;
    usuario.value.curp = form.value.curp.toUpperCase(); // Forzamos mayúsculas en el CURP
    
    // Actualizamos el localStorage para que persista el cambio de nombre en el Topbar inmediatamente
    localStorage.setItem('usuario_sesion', JSON.stringify(usuario.value));
    
    alert("¡Datos guardados correctamente!");
    interfaceStore.editandoPerfil = false; 
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    alert("Ocurrió un error al actualizar el perfil.");
  }
};
</script>