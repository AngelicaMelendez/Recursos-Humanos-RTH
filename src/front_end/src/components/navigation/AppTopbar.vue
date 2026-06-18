<template>
  <header class="topbar">
    <button class="topbar__menu" type="button" @click="$emit('toggle-menu')">
      <IconSymbol name="menu" />
    </button>
    <div>
      <strong class="topbar__title">Sistema Integral de Recursos Humanos</strong>
      <p class="topbar__subtitle">Gestion institucional con manejo administrativo.</p>
    </div>
    <div class="topbar__user">
      <div class="topbar__icons">
        <div ref="notificationsWrap" class="notifications-wrap">
          <button class="icon-button-notifications" type="button" @click.stop="toggleNotifications">
            <span v-if="notificationsStore.unreadCount" class="icon-badge">
              {{ notificationsStore.unreadCount }}
            </span>
            <IconSymbol name="notifications" />
          </button>

          <div v-if="notificationsOpen" class="notifications-panel">
            <div class="notifications-panel__header">
              <strong>Notificaciones</strong>
              <button
                v-if="notificationsStore.unreadCount"
                class="text-button"
                type="button"
                @click="markAllAsRead"
              >
                Marcar todo
              </button>
            </div>

            <div v-if="notificationsStore.loading" class="notifications-empty">
              Cargando...
            </div>
            <div v-else-if="!notificationsStore.items.length" class="notifications-empty">
              No tienes recordatorios pendientes.
            </div>

            <button
              v-for="item in notificationsStore.items"
              :key="item.id"
              class="notification-item"
              :class="{ 'notification-item--unread': !item.leida }"
              type="button"
              @click="openNotification(item)"
            >
              <strong>{{ item.titulo }}</strong>
              <span>{{ item.mensaje }}</span>
              <small>{{ formatDate(item.createdAt) }}</small>
            </button>
          </div>
        </div>

        <button class="icon-button-mail" type="button" @click="showMessages">
          <IconSymbol name="mail" />
        </button>
        <button class="icon-button-data" type="button" @click="showFiles">
          <IconSymbol name="folder" />
        </button>
        <button class="icon-button-help" type="button" @click="showHelp">
          <IconSymbol name="help" />
        </button>
      </div>

      <div class="user-profile">
        <div class="profile-image-container" title="Perfil" @click="verPerfil(usuarioLogueado.id)">{{ usuarioLogueado.nombre }}
          <img src=" " alt="Perfil" class="profile-image" />
        </div>
        
        <input 
          type="file" 
          ref="fileInput" 
          accept="image/*" 
          style="display: none;" 
          @change="handlePhotoChange" 
        />

        <div class="user-info-text" @click="openEditModal" title="Editar datos">
          <strong class="user-name">
            {{ localName || "Usuario" }}
          </strong>
          <span>{{ localDepartment || "Departamento" }}</span>
          <br></br>
          <span>{{ localRole || "Administrador" }}</span>
        </div>
      </div>
      
      <button class="topbar__logout" type="button" @click="$emit('logout')">
        <IconSymbol name="logout" />
      </button>
    </div>
  </header>

  <div v-if="isModalOpen" class="edit-modal-backdrop" @click.self="closeEditModal">
    <div class="edit-modal">
      <h3>Editar Perfil de Usuario</h3>
      <hr />
      <div class="form-group">
        <label for="edit-name">Nombre / Usuario:</label>
        <input type="text" id="edit-name" v-model="editForm.nombre" />
      </div>
       <div class="form-group">
        <label for="edit-area">Área:</label>
        <input type="text" id="edit-area" v-model="editForm.area" />
      </div>
      <div class="form-group">
        <label for="edit-role">Rol / Puesto:</label>
        <input type="text" id="edit-role" v-model="editForm.rol" />
      </div>
      <div class="modal-actions">
        <button class="btn-secondary" @click="closeEditModal">Cancelar</button>
        <button class="btn-primary" @click="saveUserData">Guardar Cambios</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import IconSymbol from "@/components/ui/IconSymbol.vue";
import { useNotificationsStore } from "@/store/notificaciones";
import {useRouter} from 'vue-router';
import iconoPerfil from "@/assets/icono.png";

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
});

// MODIFICADO: Añadimos un emit para avisar al componente padre cuando los datos cambien
const emit = defineEmits(["toggle-menu", "logout", "update-user"]);

const notificationsStore = useNotificationsStore();
const notificationsOpen = ref(false);
const notificationsWrap = ref(null);

// MODIFICADO: Estados reactivos para el control de edición de usuario
const fileInput = ref(null);
const isModalOpen = ref(false);
const localName = ref("");
const localArea = ref("");
const localRole = ref("");
const editForm = ref({ nombre: "", departamento: "", rol: "" });

// Sincronizar props iniciales con variables locales
watch(() => props.user, (newUser) => {
  if (newUser) {
    localName.value = newUser.nombre || newUser.name || newUser.usuario || "Usuario";
    localDepartment.value = newUser.departamento || "Departamento";
    localRole.value = newUser.rol || "Administrador";
  }
}, { immediate: true });

const formatDate = (value) =>
  new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));

const closeNotifications = () => {
  notificationsOpen.value = false;
};

const handleOutsideClick = (event) => {
  if (!notificationsWrap.value?.contains(event.target)) {
    closeNotifications();
  }
};

const toggleNotifications = async () => {
  notificationsOpen.value = !notificationsOpen.value;

  if (notificationsOpen.value) {
    await notificationsStore.fetchNotifications(true);
  }
};

const markAllAsRead = async () => {
  await notificationsStore.markAllAsRead();
};

const openNotification = async (item) => {
  if (!item.leida) {
    await notificationsStore.markAsRead(item.id);
  }
};

const showMessages = () => { globalThis.alert?.("Mensajes"); };
const showFiles = () => { globalThis.alert?.("Archivos"); };
const showHelp = () => { globalThis.alert?.("Ayuda"); };

const handlePhotoChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Generar previsualización en UI en tiempo real
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);

  // Emitir al componente padre el archivo binario listo para backend
  emit("update-user", { action: "update-avatar", file: file });
};

const openEditModal = () => {
  editForm.value.nombre = localName.value;
  editForm.value.departamento = localDepartment.value;
  editForm.value.rol = localRole.value;
  editForm.value.area = localArea.value;
  isModalOpen.value = true;
};

const closeEditModal = () => {
  isModalOpen.value = false;
};

const saveUserData = () => {
  localName.value = editForm.value.nombre;
  localDepartment.value = editForm.value.departamento;
  localRole.value = editForm.value.rol;

  // Emitir cambios de texto al padre
  emit("update-user", { 
    action: "update-info", 
    nombre: localName.value, 
    rol: localRole.value, 
    departamento: localDepartment.value
  });
  
  closeEditModal();
};

onMounted(() => {
  globalThis.document?.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  globalThis.document?.removeEventListener("click", handleOutsideClick);
});

const usuarioLogueado = ref({
  id: 'id',
  nombre: ''
});

onMounted(() => {
  const datosSesion = localStorage.getItem('usuario_sesion');
  if (datosSesion) {
    const usuarioReal = JSON.parse(datosSesion);
    usuarioLogueado.value = {
      id: usuarioReal.id,
      nombre: usuarioReal.nombre
    };
  }
});

// 3. CORRECCIÓN DEL ERROR: Tu función ya no debe llevar "router.push"
const verPerfil = (id) => {
  if (!id) {
    alert("Error: No se encontró el ID del usuario.");
    return;
  }
};
</script>

<style scoped>
/* TUS ESTILOS EXISTENTES SE MANTIENEN IGUAL */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
  border-bottom: 1px solid var(--color-border);
  background: rgba(255, 253, 249, 0.88);
  backdrop-filter: blur(10px);
}

.topbar__menu,
.topbar__logout {
  border: 1px solid rgba(107, 24, 57, 0.08);
  border-radius: 14px;
  background: var(--color-surface-muted);
  color: var(--color-primary);
  cursor: pointer;
}
.topbar__menu { display: none; }
.topbar__title { display: block; font-size: 1.1rem; color: var(--color-primary-strong); }
.topbar__subtitle,
.topbar__user span { margin: 4px 0 0; color: var(--color-text-soft); font-size: 0.9rem; gap: 18px; }
.topbar__user { display: flex; align-items: center; gap: 12px; margin-right: 12px; }
.user-name { display: block; gap: 12px; margin-right: 6px; }
.topbar__icons { display: flex; gap: 8px; }
.notifications-wrap { position: relative; }
.icon-button-data,
.icon-button-mail,
.icon-button-help,
.icon-button-notifications {
  position: relative;
  border: 1px solid rgba(107, 24, 57, 0.08);
  background: rgba(107, 24, 57, 0.04);
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  margin-right: 15px;
  color: var(--color-primary);
}

.icon-button-data:hover,
.icon-button-mail:hover,
.icon-button-help:hover,
.icon-button-notifications:hover { background: rgba(197, 155, 82, 0.16); }
.icon-badge {
  position: absolute;
  top: 0; right: 0; min-width: 18px; height: 18px; padding: 0 5px;
  border-radius: 999px; background: var(--color-accent); color: #fff;
  font-size: 0.7rem; font-weight: 800; line-height: 18px;
}

.notifications-panel {
  position: absolute; top: calc(100% + 10px); right: 0; z-index: 25;
  display: grid; gap: 10px; width: min(360px, calc(100vw - 32px));
  max-height: 420px; overflow-y: auto; padding: 14px;
  border: 1px solid var(--color-border); border-radius: 14px;
  background: rgba(79, 16, 41, 0.98); box-shadow: 0 18px 48px rgba(79, 16, 41, 0.24);
}
.notifications-panel__header { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #eef5ff; }
.text-button { border: none; background: none; color: var(--color-accent-soft); cursor: pointer; font-weight: 700; }
.notifications-empty { padding: 10px 0; color: #9fb2d7; font-size: 0.9rem; }
.notification-item {
  display: grid; gap: 4px; padding: 12px; border: 1px solid rgba(197, 155, 82, 0.16);
  border-radius: 12px; background: rgba(255, 255, 255, 0.03); color: #eef5ff; text-align: left; cursor: pointer;
}
.notification-item span, .notification-item small { color: #9fb2d7; }
.notification-item--unread { border-color: rgba(197, 155, 82, 0.34); background: rgba(197, 155, 82, 0.12); }
.user-profile { display: flex; align-items: center; gap: 8px; }
.topbar__logout { display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px; }

/* ESTILOS PARA LA INTERACCIÓN Y MODAL */
.profile-image-container {
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  cursor: pointer;
}

.profile-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(197, 155, 82, 0.4);
  transition: transform 0.2s ease;
  
}

.profile-image-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(79, 16, 41, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.profile-image-container:hover .profile-image-overlay {
  opacity: 1;
}

.profile-image-container:hover .profile-image {
  transform: scale(1.05);
}

.overlay-icon {
  color: #fff;
  font-size: 0.8rem;
}

.user-info-text {
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.user-info-text:hover {
  background-color: rgba(197, 155, 82, 0.08);
}

/* Estilos de la Ventana Modal */
.edit-modal-backdrop {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-modal {
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  border: 1px solid var(--color-border);
}

.edit-modal h3 {
  margin: 0 0 10px 0;
  color: var(--color-primary-strong);
}

.edit-modal hr {
  border: 0;
  border-top: 1px solid var(--color-border);
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-soft);
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
}

.form-group input:focus {
  border-color: var(--color-primary);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn-primary, .btn-secondary {
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
}

.btn-primary {
  background: var(--color-primary);
  color: #fff;
  border: none;
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-soft);
}

@media (max-width: 920px) {
  .topbar { padding: 18px; }
  .topbar__menu, .topbar__logout { display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px; }
}
</style>
