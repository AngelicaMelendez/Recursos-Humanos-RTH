<template>
  <div class="page-container">
    
    <div v-if="!interfaceStore.editandoPerfil" class="vista-lectura">
      <h1>Panel Principal</h1>
      <div class="datos-personales">
        <h3>Bienvenido, {{ usuario.nombre }}</h3>
        <p>Email: {{ usuario.email }}</p>
      </div>
    </div>

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

        <div class="botones">
          <button type="submit" class="btn-guardar">Guardar</button>
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

import axios from 'axios';

// Conectamos la página a la misma tienda que usa el Topbar
const interfaceStore = useInterfaceStore();

const usuario = ref({ id: null, nombre: '', email: '' });
const form = ref({ nombre: '', email: '' });

onMounted(() => {
  const datosSesion = localStorage.getItem('usuario_sesion');
  if (datosSesion) {
    const usuarioReal = JSON.parse(datosSesion);
    usuario.value = usuarioReal;
  }
});

// "watch" vigila cuando cambia el botón del topbar para preparar los campos del formulario
watch(() => interfaceStore.editandoPerfil, (nuevoValor) => {
  if (nuevoValor === true) {
    form.value = {
      nombre: usuario.value.nombre,
      email: usuario.value.email
    };
  }
});

const guardarDatos = async () => {
  try {
    await axios.put(`/api/personal/${usuario.value.id}`, form.value);
    
    // Actualizamos la vista local
    usuario.value.nombre = form.value.nombre;
    usuario.value.email = form.value.email;
    
    // Actualizamos el localStorage
    localStorage.setItem('usuario_sesion', JSON.stringify(usuario.value));
    
    alert("¡Datos guardados!");
    interfaceStore.editandoPerfil = false; // Cerramos la edición
  } catch (error) {
    console.error(error);
  }
};
</script>