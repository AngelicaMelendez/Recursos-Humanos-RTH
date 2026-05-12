<template>
  <div class="card-asistencia">
    <h3 class="titulo">Registro de Asistencia</h3>

    <!-- Estado actual -->
    <div class="estado-actual">
      <div class="item-estado">
        <div class="label">Entrada</div>
        <div v-if="asistenciaHoy?.hora_entrada" class="valor">
          <span class="hora">{{ formatHora(asistenciaHoy.hora_entrada) }}</span>
          <span :class="['estatus', `estatus-${asistenciaHoy.estatus_entrada}`]">
            {{ etiquetaEstatus(asistenciaHoy.estatus_entrada, asistenciaHoy.minutos_retardo) }}
          </span>
        </div>
        <div v-else class="valor sin-registro">Sin registro</div>
      </div>

      <div class="divisor"></div>

      <div class="item-estado">
        <div class="label">Salida</div>
        <div v-if="asistenciaHoy?.hora_salida" class="valor">
          <span class="hora">{{ formatHora(asistenciaHoy.hora_salida) }}</span>
          <span :class="['estatus', `estatus-${asistenciaHoy.estatus_salida}`]">
            {{ etiquetaEstatusSalida(asistenciaHoy.estatus_salida) }}
          </span>
        </div>
        <div v-else class="valor sin-registro">Sin registro</div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="acciones">
      <button
        @click="$emit('entrada')"
        :disabled="yaRegistroEntrada || loading"
        class="btn btn-entrada"
        :class="{ activo: yaRegistroEntrada }"
      >
        <span v-if="loading && ultimoRegistro?.tipo === 'entrada'" class="spinner"></span>
        <span v-else>📍</span>
        {{ yaRegistroEntrada ? "Entrada registrada" : "Registrar entrada" }}
      </button>

      <button
        @click="$emit('salida')"
        :disabled="!yaRegistroEntrada || yaRegistroSalida || loading"
        class="btn btn-salida"
        :class="{ activo: yaRegistroSalida }"
      >
        <span v-if="loading && ultimoRegistro?.tipo === 'salida'" class="spinner"></span>
        <span v-else>👋</span>
        {{ yaRegistroSalida ? "Salida registrada" : "Registrar salida" }}
      </button>
    </div>

    <!-- Último registro -->
    <div v-if="ultimoRegistro" :class="['notificacion', `tipo-${ultimoRegistro.tipo}`]">
      <span class="icono">✓</span>
      {{ ultimoRegistro.mensaje }}
      <span v-if="ultimoRegistro.minutos_retardo > 0" class="detalle">
        ({{ ultimoRegistro.minutos_retardo }} min de retardo)
      </span>
    </div>

    <!-- Error -->
    <div v-if="error" class="notificacion error">
      <span class="icono">✕</span>
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  asistenciaHoy: {
    type: Object,
    default: null,
  },
  ultimoRegistro: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
});

defineEmits(["entrada", "salida"]);

const yaRegistroEntrada = computed(() => props.asistenciaHoy?.hora_entrada);
const yaRegistroSalida = computed(() => props.asistenciaHoy?.hora_salida);

const formatHora = (horaString) => {
  if (!horaString) return "";
  return horaString.slice(0, 5);
};

const etiquetaEstatus = (estatus, minutos_retardo) => {
  if (estatus === "a_tiempo") return "A tiempo";
  if (estatus === "retardo") return `Retardo (${minutos_retardo}m)`;
  if (estatus === "ausente") return "Ausente";
  return estatus;
};

const etiquetaEstatusSalida = (estatus) => {
  if (estatus === "normal") return "Normal";
  if (estatus === "temprano") return "Salida temprana";
  if (estatus === "tarde") return "Horas extra";
  return estatus;
};
</script>

<style scoped>
.card-asistencia {
  background: linear-gradient(135deg, #0f0f1f 0%, #1a1a2e 100%);
  border: 1px solid rgba(176, 142, 93, 0.3);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.card-asistencia::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(176, 142, 93, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.titulo {
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 16px;
  position: relative;
  z-index: 1;
}

.estado-actual {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 16px;
  background: rgba(26, 26, 46, 0.5);
  border-radius: 8px;
  position: relative;
  z-index: 1;
}

.item-estado {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 12px;
  color: rgba(176, 142, 93, 0.8);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.valor {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hora {
  font-size: 20px;
  font-weight: 700;
  color: #b38e5d;
}

.estatus {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.estatus-a_tiempo {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.estatus-retardo {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.estatus-ausente {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.estatus-normal {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.estatus-temprano {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
}

.estatus-tarde {
  background: rgba(176, 142, 93, 0.2);
  color: #b38e5d;
}

.sin-registro {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.divisor {
  width: 1px;
  height: 40px;
  background: rgba(176, 142, 93, 0.2);
}

.acciones {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
}

.btn {
  padding: 12px 16px;
  border: 1px solid rgba(176, 142, 93, 0.3);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-entrada {
  background: rgba(98, 17, 50, 0.2);
  color: #b38e5d;
}

.btn-entrada:hover:not(:disabled) {
  background: rgba(98, 17, 50, 0.3);
  border-color: rgba(98, 17, 50, 0.5);
}

.btn-entrada.activo {
  background: rgba(98, 17, 50, 0.4);
  border-color: rgba(98, 17, 50, 0.7);
}

.btn-salida {
  background: rgba(98, 17, 50, 0.2);
  color: #b38e5d;
}

.btn-salida:hover:not(:disabled) {
  background: rgba(98, 17, 50, 0.3);
  border-color: rgba(98, 17, 50, 0.5);
}

.btn-salida.activo {
  background: rgba(98, 17, 50, 0.4);
  border-color: rgba(98, 17, 50, 0.7);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(179, 142, 93, 0.3);
  border-top: 2px solid #b38e5d;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.notificacion {
  padding: 12px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1;
  margin-top: 8px;
}

.notificacion.tipo-entrada {
  background: rgba(76, 175, 80, 0.15);
  border: 1px solid rgba(76, 175, 80, 0.3);
  color: #4caf50;
}

.notificacion.tipo-salida {
  background: rgba(33, 150, 243, 0.15);
  border: 1px solid rgba(33, 150, 243, 0.3);
  color: #2196f3;
}

.notificacion.error {
  background: rgba(244, 67, 54, 0.15);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
}

.icono {
  display: inline-block;
  font-weight: 700;
}

.detalle {
  opacity: 0.85;
}

@media (max-width: 768px) {
  .estado-actual {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .divisor {
    display: none;
  }

  .acciones {
    grid-template-columns: 1fr;
  }
}
</style>
