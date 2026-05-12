<template>
  <div class="historico-asistencia">
    <div class="filtros">
      <input
        v-model="fecha_inicio"
        type="date"
        class="input-fecha"
        placeholder="Fecha inicio"
      />
      <span class="separador">a</span>
      <input
        v-model="fecha_fin"
        type="date"
        class="input-fecha"
        placeholder="Fecha fin"
      />
      <button @click="$emit('filtrar', { fecha_inicio, fecha_fin })" class="btn-filtrar">
        Filtrar
      </button>
    </div>

    <div v-if="loading" class="cargando">Cargando registros...</div>

    <div v-else-if="historicoAsistencia.length === 0" class="vacio">
      No hay registros de asistencia
    </div>

    <div v-else class="tabla-asistencia">
      <div class="encabezado">
        <div class="col-fecha">Fecha</div>
        <div class="col-entrada">Entrada</div>
        <div class="col-estatus">Estatus Entrada</div>
        <div class="col-salida">Salida</div>
        <div class="col-estatus">Estatus Salida</div>
      </div>

      <div
        v-for="registro in historicoAsistencia"
        :key="registro.id"
        class="fila-registro"
      >
        <div class="col-fecha">
          <span class="fecha">{{ formatFecha(registro.fecha) }}</span>
        </div>
        <div class="col-entrada">
          <span v-if="registro.hora_entrada" class="hora">
            {{ formatHora(registro.hora_entrada) }}
          </span>
          <span v-else class="sin-dato">-</span>
        </div>
        <div class="col-estatus">
          <span :class="['badge', `estatus-${registro.estatus_entrada}`]">
            {{ etiquetaEstatus(registro.estatus_entrada, registro.minutos_retardo) }}
          </span>
        </div>
        <div class="col-salida">
          <span v-if="registro.hora_salida" class="hora">
            {{ formatHora(registro.hora_salida) }}
          </span>
          <span v-else class="sin-dato">-</span>
        </div>
        <div class="col-estatus">
          <span :class="['badge', `estatus-${registro.estatus_salida}`]">
            {{ etiquetaEstatusSalida(registro.estatus_salida) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  historicoAsistencia: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["filtrar"]);

const fecha_inicio = ref("");
const fecha_fin = ref("");

const formatFecha = (fechaString) => {
  const fecha = new Date(fechaString);
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  }).format(fecha);
};

const formatHora = (horaString) => {
  return horaString.slice(0, 5);
};

const etiquetaEstatus = (estatus, minutos_retardo) => {
  if (estatus === "a_tiempo") return "A tiempo";
  if (estatus === "retardo") return `Retardo (${minutos_retardo}m)`;
  if (estatus === "ausente") return "Ausente";
  if (estatus === "licencia") return "Licencia";
  return estatus;
};

const etiquetaEstatusSalida = (estatus) => {
  if (estatus === "normal") return "Normal";
  if (estatus === "temprano") return "Temprano";
  if (estatus === "tarde") return "Horas extra";
  if (estatus === "sin_registro") return "Sin registro";
  return estatus;
};
</script>

<style scoped>
.historico-asistencia {
  background: linear-gradient(135deg, #0f0f1f 0%, #1a1a2e 100%);
  border: 1px solid rgba(176, 142, 93, 0.3);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.historico-asistencia::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(176, 142, 93, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.filtros {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.input-fecha {
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid rgba(176, 142, 93, 0.3);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
}

.input-fecha:focus {
  outline: none;
  border-color: #b38e5d;
  background: rgba(26, 26, 46, 1);
}

.separador {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}

.btn-filtrar {
  background: rgba(98, 17, 50, 0.3);
  border: 1px solid rgba(176, 142, 93, 0.3);
  color: #b38e5d;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-filtrar:hover {
  background: rgba(98, 17, 50, 0.4);
  border-color: #b38e5d;
}

.cargando,
.vacio {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  padding: 32px 16px;
  font-size: 14px;
  position: relative;
  z-index: 1;
}

.tabla-asistencia {
  position: relative;
  z-index: 1;
  overflow-x: auto;
}

.encabezado {
  display: grid;
  grid-template-columns: 140px 100px 140px 100px 140px;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(26, 26, 46, 0.8);
  border-bottom: 2px solid rgba(176, 142, 93, 0.3);
  border-radius: 8px 8px 0 0;
  font-weight: 700;
  font-size: 12px;
  color: #b38e5d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fila-registro {
  display: grid;
  grid-template-columns: 140px 100px 140px 100px 140px;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(176, 142, 93, 0.15);
  align-items: center;
}

.fila-registro:hover {
  background: rgba(26, 26, 46, 0.5);
}

.fila-registro:last-child {
  border-bottom: none;
  border-radius: 0 0 8px 8px;
}

.col-fecha {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fecha {
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
}

.hora,
.sin-dato {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.sin-dato {
  color: rgba(255, 255, 255, 0.4);
}

.col-entrada,
.col-salida {
  text-align: center;
}

.col-estatus {
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
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

.estatus-licencia {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
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

.estatus-sin_registro {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 1024px) {
  .encabezado,
  .fila-registro {
    grid-template-columns: 100px 80px 100px 80px 100px;
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .filtros {
    flex-wrap: wrap;
  }

  .encabezado,
  .fila-registro {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .encabezado {
    display: none;
  }

  .fila-registro {
    background: rgba(26, 26, 46, 0.6);
    border: 1px solid rgba(176, 142, 93, 0.2);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 8px;
    position: relative;
  }

  .fila-registro::before {
    content: attr(data-label);
    font-weight: 600;
    font-size: 12px;
    color: #b38e5d;
    text-transform: uppercase;
  }
}
</style>
