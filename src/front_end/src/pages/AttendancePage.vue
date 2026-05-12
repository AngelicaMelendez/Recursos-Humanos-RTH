<template>
  <div class="asistencia-page">
    <PageHeader
      eyebrow="Gestion de personal"
      title="Registro de Asistencia"
      description="Controla tu entrada y salida del dia. El sistema valida automaticamente la puntualidad."
    />

    <div v-if="notificacion" :class="['notificacion', `tipo-${notificacion.tipo}`]">
      {{ notificacion.mensaje }}
    </div>

    <CheckInCheckOut
      :asistencia-hoy="asistenciaStore.asistenciaHoy"
      :ultimo-registro="asistenciaStore.ultimoRegistro"
      :loading="asistenciaStore.loading"
      :error="asistenciaStore.error"
      @entrada="registrarEntrada"
      @salida="registrarSalida"
    />

    <div class="seccion-historial">
      <h3>Mi historial de asistencia</h3>

      <HistoricoAsistencia
        :historico-asistencia="asistenciaStore.historicoAsistencia"
        :loading="asistenciaStore.loading"
        @filtrar="aplicarFiltros"
      />
    </div>

    <div v-if="canReviewAttendance" class="seccion-admin">
      <h3>Panel de supervision</h3>

      <div class="tabs">
        <button
          type="button"
          class="tab"
          :class="{ activo: tabAdmin === 'resumen' }"
          @click="tabAdmin = 'resumen'"
        >
          Resumen Mensual
        </button>
        <button
          type="button"
          class="tab"
          :class="{ activo: tabAdmin === 'empleados' }"
          @click="tabAdmin = 'empleados'"
        >
          Asistencia por Empleado
        </button>
      </div>

      <div v-if="tabAdmin === 'resumen'" class="contenido-tab">
        <div class="filtro-resumen">
          <button type="button" class="btn-recargar" @click="cargarResumenMes">
            ↻ Recargar resumen del mes
          </button>
        </div>

        <div v-if="resumenMesAgrupado.length === 0" class="vacio">
          No hay registros para el mes actual
        </div>

        <div v-else class="tabla-resumen">
          <div class="encabezado">
            <div class="col-empleado">Empleado</div>
            <div class="col-area">Area</div>
            <div class="col-fecha">Fecha</div>
            <div class="col-entrada">Entrada</div>
            <div class="col-salida">Salida</div>
            <div class="col-estatus">Estatus</div>
          </div>

          <div
            v-for="registro in resumenMesAgrupado"
            :key="registro.id"
            class="fila"
            :class="{ [`fila-${registro.estatus_entrada}`]: true }"
          >
            <div class="col-empleado">{{ registro.empleado?.nombre }}</div>
            <div class="col-area">{{ registro.empleado?.area?.nombre || "-" }}</div>
            <div class="col-fecha">{{ formatFecha(registro.fecha) }}</div>
            <div class="col-entrada">
              {{ registro.hora_entrada ? formatHora(registro.hora_entrada) : "-" }}
            </div>
            <div class="col-salida">
              {{ registro.hora_salida ? formatHora(registro.hora_salida) : "-" }}
            </div>
            <div class="col-estatus">
              <span :class="['badge', `estatus-${registro.estatus_entrada}`]">
                {{ etiquetaEstatus(registro.estatus_entrada, registro.minutos_retardo) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="tabAdmin === 'empleados'" class="contenido-tab">
        <div class="selector-empleado">
          <input
            v-model="empleadoBuscado"
            type="text"
            placeholder="Buscar por nombre de empleado"
            class="input-buscar"
          />
        </div>

        <div v-if="empleadosFiltrados.length === 0" class="vacio">
          No hay empleados disponibles
        </div>

        <div v-else class="lista-empleados">
          <div
            v-for="empleado in empleadosFiltrados"
            :key="empleado.empleado_id"
            class="item-empleado"
            :class="{ activo: empleadoSeleccionadoId === empleado.empleado_id }"
            @click="verAsistenciaEmpleado(empleado.empleado_id)"
          >
            <div class="nombre">{{ empleado.nombre }}</div>
            <div class="area">{{ empleado.area?.nombre || "Sin area" }}</div>
            <div class="fecha-ultima">
              Ultima entrada: {{ empleado.ultima_entrada || "Sin registros" }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import CheckInCheckOut from "@/components/asistencia/CheckInCheckOut.vue";
import HistoricoAsistencia from "@/components/asistencia/HistoricoAsistencia.vue";
import { useAsistenciaStore } from "@/store/asistencia";
import { useAuthStore } from "@/store/auth";
import { hasAnyRole, ROLE_KEYS } from "@/utils/permissions";

const asistenciaStore = useAsistenciaStore();
const authStore = useAuthStore();

const notificacion = ref(null);
const tabAdmin = ref("resumen");
const empleadoBuscado = ref("");
const empleadoSeleccionadoId = ref(null);

const canReviewAttendance = computed(() =>
  hasAnyRole(authStore.user, [ROLE_KEYS.ADMIN_RH, ROLE_KEYS.JEFE_AREA])
);

const resumenMesAgrupado = computed(() => asistenciaStore.resumenMes);

const empleadosFiltrados = computed(() => {
  if (!empleadoBuscado.value) {
    return asistenciaStore.resumenMes;
  }

  return asistenciaStore.resumenMes.filter((e) =>
    e.empleado?.nombre?.toLowerCase().includes(empleadoBuscado.value.toLowerCase())
  );
});

const formatFecha = (fechaString) => {
  const fecha = new Date(fechaString);
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short"
  }).format(fecha);
};

const formatHora = (horaString) => horaString.slice(0, 5);

const etiquetaEstatus = (estatus, minutosRetardo) => {
  if (estatus === "a_tiempo") return "A tiempo";
  if (estatus === "retardo") return `Llego tarde (${minutosRetardo}m)`;
  if (estatus === "ausente") return "Ausente";
  if (estatus === "licencia") return "Licencia";
  return estatus;
};

const mostrarNotificacion = (mensaje, tipo) => {
  notificacion.value = { mensaje, tipo };
  window.setTimeout(() => {
    notificacion.value = null;
  }, 4000);
};

const registrarEntrada = async () => {
  try {
    const resultado = await asistenciaStore.registrarEntrada();
    mostrarNotificacion(resultado.mensaje, "exito");
    await asistenciaStore.obtenerMiAsistencia();
  } catch (error) {
    mostrarNotificacion(error.response?.data?.error || error.message, "error");
  }
};

const registrarSalida = async () => {
  try {
    const resultado = await asistenciaStore.registrarSalida();
    mostrarNotificacion(resultado.mensaje, "exito");
    await asistenciaStore.obtenerMiAsistencia();
  } catch (error) {
    mostrarNotificacion(error.response?.data?.error || error.message, "error");
  }
};

const aplicarFiltros = async ({ fecha_inicio, fecha_fin }) => {
  try {
    await asistenciaStore.obtenerMiAsistencia(fecha_inicio, fecha_fin);
  } catch (error) {
    mostrarNotificacion(error.message, "error");
  }
};

const cargarResumenMes = async () => {
  try {
    await asistenciaStore.obtenerResumenMes();
    mostrarNotificacion("Resumen del mes actualizado", "exito");
  } catch (error) {
    mostrarNotificacion(error.message, "error");
  }
};

const verAsistenciaEmpleado = async (empleadoId) => {
  empleadoSeleccionadoId.value = empleadoId;
  try {
    await asistenciaStore.obtenerAsistenciaEmpleado(empleadoId);
  } catch (error) {
    mostrarNotificacion(error.message, "error");
  }
};

onMounted(async () => {
  try {
    await asistenciaStore.obtenerMiAsistencia();
  } catch (error) {
    console.error("Error cargando asistencia:", error);
  }

  if (canReviewAttendance.value) {
    try {
      await asistenciaStore.obtenerResumenMes();
    } catch (error) {
      console.error("Error cargando resumen:", error);
    }
  }
});
</script>

<style scoped>
.asistencia-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.notificacion {
  padding: 14px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  animation: slideDown 0.3s ease;
}

.notificacion.tipo-exito {
  background: rgba(76, 175, 80, 0.15);
  border: 1px solid rgba(76, 175, 80, 0.3);
  color: #4caf50;
}

.notificacion.tipo-error {
  background: rgba(244, 67, 54, 0.15);
  border: 1px solid rgba(244, 67, 54, 0.3);
  color: #f44336;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.seccion-historial {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.seccion-historial > h3,
.seccion-admin > h3 {
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.seccion-admin {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(176, 142, 93, 0.2);
}

.tabs {
  display: flex;
  gap: 8px;
  margin: 16px 0;
  border-bottom: 1px solid rgba(176, 142, 93, 0.2);
}

.tab {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab.activo {
  color: #b38e5d;
  border-bottom-color: #b38e5d;
}

.contenido-tab {
  margin-top: 16px;
}

.filtro-resumen,
.selector-empleado {
  margin-bottom: 16px;
}

.btn-recargar {
  background: rgba(98, 17, 50, 0.3);
  border: 1px solid rgba(176, 142, 93, 0.3);
  color: #b38e5d;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}

.input-buscar {
  width: 100%;
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid rgba(176, 142, 93, 0.3);
  color: #ffffff;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 14px;
}

.input-buscar:focus {
  outline: none;
  border-color: #b38e5d;
  background: rgba(26, 26, 46, 1);
}

.vacio {
  text-align: center;
  padding: 32px 16px;
  color: rgba(255, 255, 255, 0.5);
}

.tabla-resumen {
  background: rgba(26, 26, 46, 0.5);
  border: 1px solid rgba(176, 142, 93, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.encabezado {
  display: grid;
  grid-template-columns: 150px 120px 100px 100px 100px 120px;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(26, 26, 46, 0.8);
  border-bottom: 1px solid rgba(176, 142, 93, 0.3);
  font-weight: 700;
  font-size: 12px;
  color: #b38e5d;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.fila {
  display: grid;
  grid-template-columns: 150px 120px 100px 100px 100px 120px;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(176, 142, 93, 0.15);
  color: rgba(255, 255, 255, 0.8);
}

.fila:last-child {
  border-bottom: none;
}

.fila-retardo {
  background: rgba(255, 193, 7, 0.05);
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
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

.lista-empleados {
  display: grid;
  gap: 8px;
}

.item-empleado {
  background: rgba(26, 26, 46, 0.6);
  border: 1px solid rgba(176, 142, 93, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
}

.item-empleado.activo {
  background: rgba(98, 17, 50, 0.2);
  border-color: #b38e5d;
}

.nombre {
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 4px;
}

.area {
  font-size: 12px;
  color: #b38e5d;
  margin-bottom: 4px;
}

.fecha-ultima {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 1024px) {
  .encabezado,
  .fila {
    grid-template-columns: 120px 100px 80px 80px 80px 100px;
  }
}

@media (max-width: 768px) {
  .encabezado,
  .fila {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .encabezado {
    display: none;
  }

  .fila {
    background: rgba(26, 26, 46, 0.6);
    border: 1px solid rgba(176, 142, 93, 0.2);
    border-radius: 8px;
    margin-bottom: 8px;
    padding: 12px;
  }
}
</style>
