// src/stores/interface.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useInterfaceStore = defineStore('interface', () => {
  // Esta variable global dirá si estamos editando el perfil o no
  const editandoPerfil = ref(false);

  return {
    editandoPerfil
  };
});
