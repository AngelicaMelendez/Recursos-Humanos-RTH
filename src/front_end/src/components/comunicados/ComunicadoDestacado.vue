<template>
  <article class="comunicado-destacado">
    <div class="header">
      <div class="meta">
        <span class="area">{{ areaName }}</span>
        <time :datetime="comunicado.createdAt" class="fecha">
          {{ formatDate(comunicado.createdAt) }}
        </time>
      </div>

      <div v-if="canManage" class="acciones">
        <button class="btn-icon" type="button" title="Editar" @click="$emit('editar')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>

        <button class="btn-icon btn-danger" type="button" title="Eliminar" @click="$emit('eliminar')">
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
      <div class="footer__meta">
        <span class="badge">Comunicado vigente</span>
        <span v-if="comunicado.fecha_vencimiento" class="vencimiento">
          Vence: {{ formatDate(comunicado.fecha_vencimiento) }}
        </span>
      </div>

      <button
        class="btn-reaccion"
        :class="{ activa: yaReaccionaste }"
        type="button"
        @click="$emit('toggle-reaccion')"
      >
        <span class="icono">+</span>
        <span>{{ comunicado.reacciones?.length || 0 }} reacciones</span>
      </button>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/store/auth";
import { hasAnyRole, ROLE_GROUPS } from "@/utils/permissions";

defineEmits(["editar", "eliminar", "toggle-reaccion"]);

const props = defineProps({
  comunicado: {
    type: Object,
    required: true
  },
  yaReaccionaste: {
    type: Boolean,
    default: false
  }
});

const authStore = useAuthStore();

const canManage = computed(() =>
  hasAnyRole(authStore.user, ROLE_GROUPS.ANNOUNCEMENT_MANAGERS)
);

const areaName = computed(() => props.comunicado.area?.nombre || "General");

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
  position: relative;
  overflow: hidden;
  padding: 28px;
  border: 1px solid rgba(197, 155, 82, 0.2);
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(197, 155, 82, 0.16), transparent 26%),
    linear-gradient(180deg, rgba(255, 253, 249, 1), rgba(241, 231, 219, 0.94));
  box-shadow: 0 18px 40px rgba(79, 16, 41, 0.08);
}

.header,
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.meta,
.footer__meta,
.acciones {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.area,
.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(107, 24, 57, 0.08);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
}

.fecha,
.vencimiento {
  color: var(--color-text-soft);
  font-size: 0.88rem;
}

.titulo {
  margin: 16px 0 10px;
  color: var(--color-primary-strong);
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.15;
}

.contenido {
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.8;
}

.footer {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(221, 207, 191, 0.92);
}

.btn-icon,
.btn-reaccion {
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    background var(--transition-base);
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(107, 24, 57, 0.08);
  color: var(--color-primary);
}

.btn-icon:hover,
.btn-reaccion:hover {
  transform: translateY(-1px);
}

.btn-icon.btn-danger {
  background: rgba(157, 45, 62, 0.08);
  color: var(--color-danger);
}

.btn-reaccion {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  border-color: rgba(197, 155, 82, 0.22);
  background: rgba(197, 155, 82, 0.14);
  color: var(--color-accent-strong);
  font-weight: 700;
}

.btn-reaccion.activa {
  background: var(--color-accent);
  color: #fff;
}

.icono {
  font-size: 1rem;
  font-weight: 800;
}

@media (max-width: 768px) {
  .comunicado-destacado {
    padding: 20px;
  }

  .header,
  .footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
