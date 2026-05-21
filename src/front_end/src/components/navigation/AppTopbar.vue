<template>
  <header class="topbar">
    <button class="topbar__menu" type="button" @click="$emit('toggle-menu')">
      <IconSymbol name="menu" />
    </button>
    <div>
      <strong class="topbar__title">Sistema Integral de Recursos Humanos</strong>
      <p class="topbar__subtitle">Gestion institucional con manejo administrativa.</p>
    </div>
    <div class="topbar__user">
      <div class="topbar__icons">
        <div ref="notificationsWrap" class="notifications-wrap">
          <button class="icon-button" type="button" @click.stop="toggleNotifications">
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

        <button class="icon-button" type="button" @click="showMessages">
          <IconSymbol name="mail" />
        </button>
        <button class="icon-button" type="button" @click="showFiles">
          <IconSymbol name="folder" />
        </button>
        <button class="icon-button" type="button" @click="showHelp">
          <IconSymbol name="help" />
        </button>
      </div>
      <div class="user-profile">
        <img :src="user?.avatar || iconoPerfil" alt="Perfil" class="profile-image" />
        <div>
          <strong class= "user-name">{{ user?.nombre || "Usuario institucional" }}</strong>
          <span>{{ user?.rol || "Administrador" }}</span>
        </div>
      </div>
      <button class="topbar__logout" type="button" @click="$emit('logout')">
        <IconSymbol name="logout" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import IconSymbol from "@/components/ui/IconSymbol.vue";
import { useNotificationsStore } from "@/store/notificaciones";
import iconoPerfil from "@/assets/icono.png";

defineProps({
  user: {
    type: Object,
    default: null
  }
});

defineEmits(["toggle-menu", "logout"]);

const notificationsStore = useNotificationsStore();
const notificationsOpen = ref(false);
const notificationsWrap = ref(null);

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

const showMessages = () => {
  globalThis.alert?.("Mensajes");
};

const showFiles = () => {
  globalThis.alert?.("Archivos");
};

const showHelp = () => {
  globalThis.alert?.("Ayuda");
};

onMounted(() => {
  globalThis.document?.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  globalThis.document?.removeEventListener("click", handleOutsideClick);
});
</script>

<style scoped>
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

.topbar__menu {
  display: none;
}

.topbar__title {
  display: block;
  font-size: 1.1rem;
  color: var(--color-primary-strong);
}

.topbar__subtitle,
.topbar__user span {
  margin: 4px 0 0;
  color: var(--color-text-soft);
  font-size: 0.9rem;
  gap: 18px;
}

.topbar__user {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-right: 12px;

}

.user-name {
  display: block;
  gap: 12px;
  margin-right: 6px;
}

.topbar__icons {
  display: flex;
  gap: 8px;

}

.notifications-wrap {
  position: relative;
}

.icon-button {
  position: relative;
  border: 1px solid rgba(107, 24, 57, 0.08);
  background: rgba(107, 24, 57, 0.04);
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  margin-right: 15px;
  color: var(--color-primary);
}

.icon-button:hover {
  background: rgba(197, 155, 82, 0.16);
}

.icon-badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--color-accent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  line-height: 18px;
}

.notifications-panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 25;
  display: grid;
  gap: 10px;
  width: min(360px, calc(100vw - 32px));
  max-height: 420px;
  overflow-y: auto;
  padding: 14px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: rgba(79, 16, 41, 0.98);
  box-shadow: 0 18px 48px rgba(79, 16, 41, 0.24);
}

.notifications-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #eef5ff;
}

.text-button {
  border: none;
  background: none;
  color: var(--color-accent-soft);
  cursor: pointer;
  font-weight: 700;
}

.notifications-empty {
  padding: 10px 0;
  color: #9fb2d7;
  font-size: 0.9rem;
}

.notification-item {
  display: grid;
  gap: 4px;
  padding: 12px;
  border: 1px solid rgba(197, 155, 82, 0.16);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  color: #eef5ff;
  text-align: left;
  cursor: pointer;
}

.notification-item span,
.notification-item small {
  color: #9fb2d7;
}

.notification-item--unread {
  border-color: rgba(197, 155, 82, 0.34);
  background: rgba(197, 155, 82, 0.12);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  border: 2px solid rgba(197, 155, 82, 0.4);
}

.topbar__logout {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
}

@media (max-width: 920px) {
  .topbar {
    padding: 18px;
  }

  .topbar__menu,
  .topbar__logout {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
  }
}
</style>
