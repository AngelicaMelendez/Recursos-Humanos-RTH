<template>
  <div class="comunicado-destacado">
    <div class="header">
      <div class="meta">
        <span class="area" v-if="comunicado.area">{{ comunicado.area.nombre }}</span>
        <time :datetime="comunicado.createdAt" class="fecha">
          {{ formatDate(comunicado.createdAt) }}
        </time>
      </div>
      <div v-if="canManage" class="acciones">
        <button class="btn-icon" type="button" @click="$emit('editar')" title="Editar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
        <button class="btn-icon btn-danger" type="button" @click="$emit('eliminar')" title="Eliminar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>

    <h2 class="titulo">{{ comunicado.titulo }}</h2>

    <div class="contenido">{{ comunicado.contenido }}</div>

    <div class="footer">
      <button
        class="btn-reaccion"
        :class="{ activa: yuaReaccionaste }"
        type="button"
        @click="$emit('toggle-reaccion')"
      >
        <span class="icono">👍</span>
        <span class="count">{{ comunicado.reacciones?.length || 0 }}</span>
      </button>
      <span v-if="comunicado.fecha_vencimiento" class="vencimiento">
        Vence: {{ formatDate(comunicado.fecha_vencimiento) }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/store/auth";
import { hasAnyRole, ROLE_GROUPS } from "@/utils/permissions";

defineEmits(["editar", "eliminar", "toggle-reaccion"]);

defineProps({
  comunicado: {
    type: Object,
    required: true
  },
  yuaReaccionaste: {
    type: Boolean,
    default: false
  }
});

const authStore = useAuthStore();

const canManage = computed(() =>
  hasAnyRole(authStore.user, ROLE_GROUPS.ANNOUNCEMENT_MANAGERS)
);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};
</script>

<style scoped>
.comunicado-destacado {
  background: linear-gradient(135deg, #0f0f1f 0%, #1a1a2e 100%);
  border: 1px solid rgba(176, 142, 93, 0.3);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
}

.comunicado-destacado::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(176, 142, 93, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.area {
  display: inline-block;
  background: rgba(176, 142, 93, 0.2);
  color: #b38e5d;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fecha {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.acciones {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: rgba(176, 142, 93, 0.15);
  border: 1px solid rgba(176, 142, 93, 0.3);
  color: #b38e5d;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-icon:hover {
  background: rgba(176, 142, 93, 0.25);
  border-color: rgba(176, 142, 93, 0.5);
}

.btn-icon.btn-danger {
  color: #e74c3c;
  border-color: rgba(231, 76, 60, 0.3);
}

.btn-icon.btn-danger:hover {
  background: rgba(231, 76, 60, 0.15);
  border-color: rgba(231, 76, 60, 0.5);
}

.titulo {
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.3;
  position: relative;
  z-index: 1;
}

.contenido {
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.footer {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(176, 142, 93, 0.2);
  position: relative;
  z-index: 1;
}

.btn-reaccion {
  background: rgba(176, 142, 93, 0.15);
  border: 1px solid rgba(176, 142, 93, 0.3);
  color: #b38e5d;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.btn-reaccion:hover {
  background: rgba(176, 142, 93, 0.25);
  border-color: rgba(176, 142, 93, 0.5);
}

.btn-reaccion.activa {
  background: #b38e5d;
  color: #000;
  border-color: #b38e5d;
}

.icono {
  display: inline-block;
  font-size: 16px;
}

.count {
  min-width: 20px;
}

.vencimiento {
  font-size: 12px;
  color: rgba(231, 149, 101, 0.8);
  margin-left: auto;
}

@media (max-width: 768px) {
  .comunicado-destacado {
    padding: 16px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .acciones {
    align-self: flex-end;
  }

  .titulo {
    font-size: 20px;
  }

  .footer {
    flex-wrap: wrap;
  }

  .vencimiento {
    margin-left: 0;
    width: 100%;
    text-align: right;
  }
}
</style>
