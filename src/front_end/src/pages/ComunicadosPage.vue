<template>
  <div class="comunicados-page">
    <PageHeader
      eyebrow="Comunicacion interna"
      title="Comunicados y Avisos"
      description="Consulta los comunicados activos de tu area. Solo administracion y jefaturas pueden filtrar por area."
    >
      <RoleActionBar :actions="actions" @select="selectAction" />
    </PageHeader>

    <div v-if="notificacion" :class="['notificacion', `tipo-${notificacion.tipo}`]">
      {{ notificacion.mensaje }}
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ editando ? "Editar comunicado" : "Nuevo comunicado" }}</h2>
          <button type="button" class="btn-cerrar" @click="cerrarModal">×</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Titulo</label>
            <input
              v-model="formulario.titulo"
              type="text"
              placeholder="Titulo del comunicado"
              class="input"
            />
          </div>

          <div class="form-group">
            <label>Contenido</label>
            <textarea
              v-model="formulario.contenido"
              placeholder="Contenido del comunicado"
              class="textarea"
              rows="6"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Area</label>
              <select v-model="formulario.area_id" class="select">
                <option :value="null">Todas las areas</option>
                <option v-for="area in areasDisponibles" :key="area.id" :value="area.id">
                  {{ area.nombre }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Fecha de vencimiento</label>
              <input v-model="formulario.fecha_vencimiento" type="date" class="input" />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secundario" @click="cerrarModal">Cancelar</button>
          <button type="button" class="btn btn-primario" :disabled="loading" @click="guardarComunicado">
            {{ editando ? "Actualizar" : "Publicar" }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="canFilterByArea && areasDisponibles.length" class="filtro-panel">
      <label class="filtro-campo">
        <span>Filtrar por area</span>
        <select v-model="selectedAreaId" class="select">
          <option value="">Todas las areas</option>
          <option v-for="area in areasDisponibles" :key="area.id" :value="String(area.id)">
            {{ area.nombre }}
          </option>
        </select>
      </label>
    </div>

    <div class="contenedor">
      <div v-if="masReciente" class="seccion">
        <ComunicadoDestacado
          :comunicado="masReciente"
          :yua-reaccionaste="yaReaccionaste(masReciente.id)"
          @editar="editarComunicado(masReciente)"
          @eliminar="eliminarComunicado(masReciente.id)"
          @toggle-reaccion="toggleReaccion(masReciente.id)"
        />

        <div v-if="otrosComunicados.length" class="mas-acciones">
          <button type="button" class="btn-ver-mas" @click="showMore = !showMore">
            {{ showMore ? "Ocultar" : "Ver mas" }}
          </button>
        </div>

        <ComunicadosLista
          v-if="showMore && otrosComunicados.length > 0"
          :comunicados="otrosComunicados"
          @seleccionar="verDetalle"
        />
      </div>

      <div v-else class="sin-contenido">
        <div class="icono">📢</div>
        <p>No hay comunicados disponibles en este momento</p>
      </div>
    </div>

    <div v-if="isAdmin" class="seccion-admin">
      <h3>Panel de Administracion</h3>

      <div class="tabs">
        <button
          type="button"
          class="tab"
          :class="{ activo: tabActual === 'historial' }"
          @click="tabActual = 'historial'"
        >
          Historial de Comunicados
        </button>
        <button
          type="button"
          class="tab"
          :class="{ activo: tabActual === 'reacciones' }"
          @click="tabActual = 'reacciones'"
        >
          Detalle de Reacciones
        </button>
      </div>

      <div v-if="tabActual === 'historial'" class="contenido-tab">
        <div v-if="comunicadosStore.historial.length === 0" class="vacio">
          No hay comunicados en el historial
        </div>

        <div v-else class="tabla-historial">
          <div class="encabezado">
            <div class="col-titulo">Titulo</div>
            <div class="col-fecha">Publicacion</div>
            <div class="col-estatus">Estatus</div>
            <div class="col-reacciones">Reacciones</div>
          </div>

          <div v-for="com in comunicadosStore.historial" :key="com.id" class="fila">
            <div class="col-titulo">{{ com.titulo }}</div>
            <div class="col-fecha">{{ formatDate(com.createdAt) }}</div>
            <div class="col-estatus">
              <span :class="['badge', `estatus-${estatusHistorial(com)}`]">
                {{ estatusHistorial(com) }}
              </span>
            </div>
            <div class="col-reacciones">
              <span class="count">{{ com.reacciones?.length || 0 }} 👍</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="tabActual === 'reacciones'" class="contenido-tab">
        <div class="selector-comunicado">
          <select v-model="comunicadoSeleccionadoId" class="select">
            <option :value="null">Selecciona un comunicado</option>
            <option v-for="com in comunicadosStore.historial" :key="com.id" :value="com.id">
              {{ com.titulo }}
            </option>
          </select>
        </div>

        <div v-if="reaccionesDetalle.length === 0" class="vacio">
          Selecciona un comunicado para ver las reacciones
        </div>

        <div v-else class="tabla-reacciones">
          <div class="encabezado">
            <div class="col-usuario">Usuario</div>
            <div class="col-fecha">Fecha y Hora</div>
          </div>

          <div v-for="reac in reaccionesDetalle" :key="reac.id" class="fila">
            <div class="col-usuario">{{ reac.usuario?.empleado?.nombre || "Desconocido" }}</div>
            <div class="col-fecha">{{ formatDate(reac.createdAt) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import RoleActionBar from "@/components/shared/RoleActionBar.vue";
import ComunicadoDestacado from "@/components/comunicados/ComunicadoDestacado.vue";
import ComunicadosLista from "@/components/comunicados/ComunicadosLista.vue";
import { useComunicadosStore } from "@/store/comunicados";
import { useAuthStore } from "@/store/auth";
import comunicadosService from "@/services/comunicados.service";
import { getRoleActions, hasAnyRole, ROLE_KEYS } from "@/utils/permissions";

const comunicadosStore = useComunicadosStore();
const authStore = useAuthStore();

const showModal = ref(false);
const editando = ref(false);
const loading = ref(false);
const notificacion = ref(null);
const tabActual = ref("historial");
const comunicadoSeleccionadoId = ref(null);
const reaccionesDetalle = ref([]);
const selectedAreaId = ref("");
const showMore = ref(false);

const formulario = ref({
  titulo: "",
  contenido: "",
  area_id: null,
  fecha_vencimiento: null
});

const formularioOriginal = ref(null);

const isAdmin = computed(() => hasAnyRole(authStore.user, [ROLE_KEYS.ADMIN_RH]));
const canManageAnnouncements = computed(() =>
  hasAnyRole(authStore.user, ROLE_GROUPS.ANNOUNCEMENT_MANAGERS)
);
const canFilterByArea = computed(() => canManageAnnouncements.value);

const actions = computed(() => getRoleActions(authStore.user, "comunicados"));
const masReciente = computed(() => comunicadosStore.masReciente?.id ? comunicadosStore.masReciente : null);

const areasDisponibles = computed(() => {
  const mapa = new Map();
  [masReciente.value, ...comunicadosStore.comunicados, ...comunicadosStore.historial].forEach((com) => {
    if (com?.area?.id) {
      mapa.set(com.area.id, com.area);
    }
  });
  return [...mapa.values()].sort((a, b) => a.nombre.localeCompare(b.nombre));
});

const otrosComunicados = computed(() =>
  comunicadosStore.comunicados.filter((c) => c.id !== masReciente.value?.id)
);

const areaFiltroActual = computed(() =>
  canFilterByArea.value && selectedAreaId.value ? selectedAreaId.value : null
);

const yaReaccionaste = (comunicadoId) => {
  const comunicado = comunicadosStore.comunicados.find((c) => c.id === comunicadoId) || masReciente.value;
  return comunicado?.reacciones?.some((r) => r.usuario_id === authStore.user?.id) || false;
};

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

const estatusHistorial = (comunicado) => {
  if (!comunicado?.fecha_vencimiento) {
    return comunicado?.estatus || "activo";
  }

  const vencio = new Date(`${comunicado.fecha_vencimiento}T23:59:59`).getTime() < Date.now();
  return vencio ? "vencido" : comunicado?.estatus || "activo";
};

const selectAction = (action) => {
  if (action.key === "crearComunicado") {
    abrirModal();
  }
};

const abrirModal = () => {
  editando.value = false;
  formularioOriginal.value = null;
  formulario.value = {
    titulo: "",
    contenido: "",
    area_id: selectedAreaId.value ? Number(selectedAreaId.value) : null,
    fecha_vencimiento: null
  };
  showModal.value = true;
};

const cerrarModal = () => {
  showModal.value = false;
};

const editarComunicado = (comunicado) => {
  editando.value = true;
  formularioOriginal.value = comunicado.id;
  formulario.value = {
    titulo: comunicado.titulo,
    contenido: comunicado.contenido,
    area_id: comunicado.area_id,
    fecha_vencimiento: comunicado.fecha_vencimiento
  };
  showModal.value = true;
};

const cargarHistorial = async () => {
  if (!isAdmin.value) {
    return;
  }

  await comunicadosStore.obtenerHistorial();
};

const cargarReacciones = async () => {
  if (!comunicadoSeleccionadoId.value) {
    reaccionesDetalle.value = [];
    return;
  }

  try {
    reaccionesDetalle.value = await comunicadosService.getReactions(comunicadoSeleccionadoId.value);
  } catch (error) {
    reaccionesDetalle.value = [];
  }
};

const cargarComunicados = async () => {
  await comunicadosStore.obtenerMasReciente(areaFiltroActual.value);
  await comunicadosStore.obtenerComunicados(areaFiltroActual.value);
  await cargarHistorial();
};

const guardarComunicado = async () => {
  loading.value = true;

  try {
    if (editando.value) {
      await comunicadosStore.editarComunicado(formularioOriginal.value, formulario.value);
      mostrarNotificacion("Comunicado actualizado correctamente", "exito");
    } else {
      await comunicadosStore.crearComunicado(formulario.value);
      mostrarNotificacion("Comunicado publicado correctamente", "exito");
    }

    cerrarModal();
    await cargarComunicados();
  } catch (error) {
    mostrarNotificacion(error.response?.data?.error || error.message, "error");
  } finally {
    loading.value = false;
  }
};

const eliminarComunicado = async (id) => {
  if (!confirm("¿Estas seguro de que deseas eliminar este comunicado?")) {
    return;
  }

  try {
    await comunicadosStore.eliminarComunicado(id);
    mostrarNotificacion("Comunicado eliminado correctamente", "exito");
    showMore.value = false;
    await cargarComunicados();
  } catch (error) {
    mostrarNotificacion(error.response?.data?.error || error.message, "error");
  }
};

const toggleReaccion = async (comunicadoId) => {
  try {
    await comunicadosStore.toggleReaction(comunicadoId, authStore.user?.id);
    await cargarHistorial();
  } catch (error) {
    mostrarNotificacion(error.response?.data?.error || error.message, "error");
  }
};

const verDetalle = (comunicado) => {
  comunicadosStore.masReciente = comunicado;
  showMore.value = false;
};

const mostrarNotificacion = (mensaje, tipo) => {
  notificacion.value = { mensaje, tipo };
  window.setTimeout(() => {
    notificacion.value = null;
  }, 4000);
};

watch(selectedAreaId, async () => {
  showMore.value = false;
  await cargarComunicados();
});

watch(comunicadoSeleccionadoId, cargarReacciones);

onMounted(async () => {
  await cargarComunicados();
});
</script>

<style scoped>
.comunicados-page {
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

.filtro-panel {
  padding: 16px 18px;
  border: 1px solid rgba(176, 142, 93, 0.18);
  border-radius: 10px;
  background: rgba(26, 26, 46, 0.5);
}

.filtro-campo {
  display: grid;
  gap: 8px;
  max-width: 340px;
}

.filtro-campo span,
label {
  color: #b38e5d;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: linear-gradient(135deg, #0f0f1f 0%, #1a1a2e 100%);
  border: 1px solid rgba(176, 142, 93, 0.3);
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid rgba(176, 142, 93, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.btn-cerrar {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.form-group {
  margin-bottom: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.input,
.textarea,
.select {
  width: 100%;
  background: rgba(26, 26, 46, 0.8);
  border: 1px solid rgba(176, 142, 93, 0.3);
  color: #ffffff;
  padding: 10px 12px;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
}

.input:focus,
.textarea:focus,
.select:focus {
  outline: none;
  border-color: #b38e5d;
  background: rgba(26, 26, 46, 1);
}

.textarea {
  resize: vertical;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(176, 142, 93, 0.2);
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.btn-primario {
  background: #621132;
  color: #ffffff;
}

.btn-primario:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secundario {
  background: rgba(176, 142, 93, 0.15);
  color: #b38e5d;
  border: 1px solid rgba(176, 142, 93, 0.3);
}

.contenedor {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.seccion {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mas-acciones {
  display: flex;
  justify-content: flex-end;
}

.btn-ver-mas {
  padding: 8px 14px;
  border: 1px solid rgba(176, 142, 93, 0.3);
  border-radius: 999px;
  background: rgba(176, 142, 93, 0.12);
  color: #b38e5d;
  cursor: pointer;
  font-weight: 700;
}

.sin-contenido {
  text-align: center;
  padding: 48px 24px;
  color: rgba(255, 255, 255, 0.5);
}

.sin-contenido .icono {
  font-size: 64px;
  margin-bottom: 16px;
}

.seccion-admin {
  margin-top: 24px;
}

.seccion-admin > h3 {
  color: #b38e5d;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
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

.vacio {
  text-align: center;
  padding: 32px 16px;
  color: rgba(255, 255, 255, 0.5);
}

.tabla-historial,
.tabla-reacciones {
  background: rgba(26, 26, 46, 0.5);
  border: 1px solid rgba(176, 142, 93, 0.2);
  border-radius: 8px;
  overflow: hidden;
}

.encabezado {
  display: grid;
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

.tabla-historial .encabezado,
.tabla-historial .fila {
  grid-template-columns: 2fr 1fr 1fr 1fr;
}

.tabla-reacciones .encabezado,
.tabla-reacciones .fila {
  grid-template-columns: 2fr 1fr;
}

.fila {
  display: grid;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(176, 142, 93, 0.15);
  color: rgba(255, 255, 255, 0.8);
}

.fila:last-child {
  border-bottom: none;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
}

.estatus-activo {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.estatus-vencido {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.estatus-archivado {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

.count {
  font-weight: 700;
  color: #b38e5d;
}

.selector-comunicado {
  margin-bottom: 16px;
}

.selector-comunicado .select {
  width: 100%;
}

@media (max-width: 768px) {
  .modal {
    width: 95%;
    max-height: 95vh;
  }

  .form-row,
  .tabla-historial .encabezado,
  .tabla-historial .fila,
  .tabla-reacciones .encabezado,
  .tabla-reacciones .fila {
    grid-template-columns: 1fr;
  }
}
</style>
