<template>
  <header class="topbar">
    <button class="topbar__menu" type="button" @click="$emit('toggle-menu')">
      <IconSymbol name="menu" />
    </button>
    <div>
      <strong class="topbar__title">Sistema Integral de RH</strong>
      <p class="topbar__subtitle">Gestión institucional con trazabilidad administrativa.</p>
    </div>
    <div class="topbar__user">
      <div class="topbar__icons">
        <button class="icon-button" @click="showNotifications">
          <IconSymbol name="notifications" />
        </button>
        <button class="icon-button" @click="showMessages">
          <IconSymbol name="mail" />
        </button>
        <button class="icon-button" @click="showFiles">
          <IconSymbol name="folder" />
        </button>
        <button class="icon-button" @click="showHelp">
          <IconSymbol name="help" />
        </button>
      </div>
      <div class="user-profile">
        <img :src="user?.avatar || '/default-avatar.png'" alt="Perfil" class="profile-image" />
        <div>
          <strong>{{ user?.nombre || "Usuario institucional" }}</strong>
          <span>{{ user?.rol || "Administrador RH" }}</span>
        </div>
      </div>
      <button class="topbar__logout" type="button" @click="$emit('logout')">
        <IconSymbol name="logout" />
      </button>
    </div>
  </header>
</template>

<script setup>
import IconSymbol from "@/components/ui/IconSymbol.vue";

defineProps({
  user: {
    type: Object,
    default: null
  }
});

defineEmits(["toggle-menu", "logout"]);

const showNotifications = () => {
  // Lógica para mostrar notificaciones
  alert('Notificaciones');
};

const showMessages = () => {
  // Lógica para mostrar mensajes
  alert('Mensajes');
};

const showFiles = () => {
  // Lógica para mostrar archivos
  alert('Archivos');
};

const showHelp = () => {
  // Lógica para mostrar ayuda
  alert('Ayuda');
};
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
  border-bottom: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);
}

.topbar__menu,
.topbar__logout {
  border: none;
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
}

.topbar__subtitle,
.topbar__user span {
  margin: 4px 0 0;
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

.topbar__user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topbar__icons {
  display: flex;
  gap: 8px;
}

.icon-button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
}

.icon-button:hover {
  background: var(--color-surface-muted);
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

