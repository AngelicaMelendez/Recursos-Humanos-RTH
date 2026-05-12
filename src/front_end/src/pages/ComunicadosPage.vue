<template>
  <div class="comunicados-page">
    <PageHeader
      eyebrow="Comunicación interna"
      title="Comunicados y Avisos"
      description="Mantente informado con los últimos comunicados de tu área."
    >
      <RoleActionBar :actions="actions" @select="selectAction" />
    </PageHeader>

    <!-- Notificación de éxito -->
    <div v-if="notificacion" :class="['notificacion', `tipo-${notificacion.tipo}`]">
      {{ notificacion.mensaje }}
    </div>

    <!-- Diálogo para crear/editar -->
    <div v-if="showModal" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ editando ? "Editar comunicado" : "Nuevo comunicado" }}</h2>
          <button @click="cerrarModal" class="btn-cerrar">✕</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label>Título</label>
            <input
              v-model="formulario.titulo"
              type="text"
              placeholder="Título del comunicado"
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
              <label>Área (Opcional)</label>
              <select v-model="formulario.area_id" class="select">
                <option :value="null">Todas las áreas</option>
                <option v-for="area in areas" :key="area.id" :value="area.id">
                  {{ area.nombre }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Fecha de vencimiento (Opcional)</label>
              <input
                v-model="formulario.fecha_vencimiento"
                type="date"
                class="input"
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="cerrarModal" class="btn btn-secundario">Cancelar</button>
          <button @click="guardarComunicado" class="btn btn-primario" :disabled="loading">
            {{ editando ? "Actualizar" : "Publicar" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="contenedor">
      <!-- Más reciente destacado -->
      <div v-if="masReciente" class="seccion">
        <ComunicadoDestacado
          :comunicado="masReciente"
          :yu-a-reaccionaste="yuaReaccionaste(masReciente.id)"
          @editar="editarComunicado(masReciente)"
          @eliminar="eliminarComunicado(masReciente.id)"
          @toggle-reaccion="toggleReaccion(masReciente.id)"
        />

        <ComunicadosLista
          v-if="otrosComunicados.length > 0"
          :comunicados="otrosComunicados"
          @seleccionar="verDetalle"
        />
      </div>

      <!-- Sin comunicados -->
      <div v-else class="sin-contenido">
        <div class="icono">📢</div>
        <p>No hay comunicados disponibles en este momento</p>
      </div>
    </div>

    <!-- Panel de administrador (historial y reacciones) -->
    <div v-if="isAdmin" class="seccion-admin">
      <h3>Panel de Administración</h3>

      <div class="tabs">
        <button
          @click="tabActual = 'historial'"
          :class="{ activo: tabActual === 'historial' }"
          class="tab"
        >
          Historial de Comunicados
        </button>
        <button
          @click="tabActual = 'reacciones'"
          :class="{ activo: tabActual === 'reacciones' }"
          class="tab"
        >
          Detalle de Reacciones
        </button>
      </div>

      <!-- Historial -->
      <div v-if="tabActual === 'historial'" class="contenido-tab">
        <div v-if="comunicadosStore.historial.length === 0" class="vacio">
          No hay comunicados en el historial
        </div>

        <div v-else class="tabla-historial">
          <div class="encabezado">
            <div class="col-titulo">Título</div>
            <div class="col-fecha">Publicación</div>
            <div class="col-estatus">Estatus</div>
            <div class="col-reacciones">Reacciones</div>
          </div>

          <div v-for="com in comunicadosStore.historial" :key="com.id" class="fila">
            <div class="col-titulo">{{ com.titulo }}</div>
            <div class="col-fecha">{{ formatDate(com.createdAt) }}</div>
            <div class="col-estatus">
              <span :class="['badge', `estatus-${com.estatus}`]">{{ com.estatus }}</span>
            </div>
            <div class="col-reacciones">
              <span class="count">{{ com.reacciones?.length || 0 }} 👍</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Reacciones -->
      <div v-if="tabActual === 'reacciones'" class="contenido-tab">
        <div class="selector-comunicado">
          <select v-model="comunicadoSeleccionadoId" class="select">
            <option :value="null">Selecciona un comunicado</option>
            <option
              v-for="com in comunicadosStore.historial"
              :key="com.id"
              :value="com.id"
            >
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
import { ref, computed, onMounted } from "vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import RoleActionBar from "@/components/shared/RoleActionBar.vue";
import ComunicadoDestacado from "@/components/comunicados/ComunicadoDestacado.vue";
import ComunicadosLista from "@/components/comunicados/ComunicadosLista.vue";
import { useComunicadosStore } from "@/store/comunicados";
import { useAuthStore } from "@/store/auth";
import { getRoleActions } from "@/utils/permissions";
import comunicadosService from "@/services/comunicados.service";

const comunicadosStore = useComunicadosStore();
const authStore = useAuthStore();

const showModal = ref(false);
const editando = ref(false);
const loading = ref(false);
const notificacion = ref(null);
const tabActual = ref("historial");
const comunicadoSeleccionadoId = ref(null);
const reaccionesDetalle = ref([]);
const areas = ref([]);

const formulario = ref({
  titulo: "",
  contenido: "",
  area_id: null,
  fecha_vencimiento: null,
});

const formularioOriginal = ref(null);

const isAdmin = computed(() => authStore.user?.rol === "Administrador");

const actions = computed(() => getRoleActions(authStore.user?.rol, "comunicados"));

const masReciente = computed(() => comunicadosStore.masReciente);

const otrosComunicados = computed(() => {
  return comunicadosStore.comunicados.filter((c) => c.id !== masReciente.value?.id);
});

const yuaReaccionaste = (comunicadoId) => {
  const comunicado = comunicadosStore.comunicados.find((c) => c.id === comunicadoId);
  return comunicado?.reacciones?.some((r) => r.usuario_id === authStore.user?.id) || false;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const selectAction = (action) => {
  if (action.key === "crearComunicado") {
    abrirModal();
  }
};

const abrirModal = () => {
  editando.value = false;
  formulario.value = {
    titulo: "",
    contenido: "",
    area_id: null,
    fecha_vencimiento: null,
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
    fecha_vencimiento: comunicado.fecha_vencimiento,
  };
  showModal.value = true;
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
    await comunicadosStore.obtenerMasReciente();
    await comunicadosStore.obtenerComunicados();
  } catch (error) {
    mostrarNotificacion(error.message, "error");
  } finally {
    loading.value = false;
  }
};

const eliminarComunicado = async (id) => {
  if (confirm("¿Estás seguro de que deseas eliminar este comunicado?")) {
    try {
      await comunicadosStore.eliminarComunicado(id);
      mostrarNotificacion("Comunicado eliminado correctamente", "exito");
      await comunicadosStore.obtenerMasReciente();
      await comunicadosStore.obtenerComunicados();
    } catch (error) {
      mostrarNotificacion(error.message, "error");
    }
  }
};

const toggleReaccion = async (comunicadoId) => {
  try {
    await comunicadosStore.toggleReaction(comunicadoId, authStore.user?.id);
  } catch (error) {
    mostrarNotificacion(error.message, "error");
  }
};

const verDetalle = (comunicado) => {
  // Podría abrir un modal con el detalle
  console.log("Ver detalle:", comunicado);
};

const mostrarNotificacion = (mensaje, tipo) => {
  notificacion.value = { mensaje, tipo };
  setTimeout(() => {
    notificacion.value = null;
  }, 4000);
};

const cargarHistorial = async () => {
  try {
    await comunicadosStore.obtenerHistorial();
  } catch (error) {
    console.error("Error cargando historial:", error);
  }
};

const cargarReacciones = async () => {
  if (!comunicadoSeleccionadoId.value) {
    reaccionesDetalle.value = [];
    return;
  }

  try {
    reaccionesDetalle.value = await comunicadosService.getReactions(
      comunicadoSeleccionadoId.value
    );
  } catch (error) {
    console.error("Error cargando reacciones:", error);
    reaccionesDetalle.value = [];
  }
};

onMounted(async () => {
  await comunicadosStore.obtenerMasReciente();
  await comunicadosStore.obtenerComunicados();

  if (isAdmin.value) {
    await cargarHistorial();
  }
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
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  transition: color 0.2s ease;
}

.btn-cerrar:hover {
  color: #ffffff;
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

label {
  display: block;
  color: #b38e5d;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  transition: all 0.2s ease;
  border: none;
}

.btn-primario {
  background: #621132;
  color: #ffffff;
}

.btn-primario:hover:not(:disabled) {
  background: #7a1640;
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

.btn-secundario:hover {
  background: rgba(176, 142, 93, 0.25);
  border-color: #b38e5d;
}

.contenedor {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.seccion {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  transition: all 0.2s ease;
}

.tab:hover {
  color: #b38e5d;
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

.tabla-historial .encabezado {
  grid-template-columns: 2fr 1fr 1fr 1fr;
}

.tabla-reacciones .encabezado {
  grid-template-columns: 2fr 1fr;
}

.fila {
  display: grid;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(176, 142, 93, 0.15);
  color: rgba(255, 255, 255, 0.8);
}

.tabla-historial .fila {
  grid-template-columns: 2fr 1fr 1fr 1fr;
}

.tabla-reacciones .fila {
  grid-template-columns: 2fr 1fr;
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

  .form-row {
    grid-template-columns: 1fr;
  }

  .tabla-historial .encabezado,
  .tabla-historial .fila,
  .tabla-reacciones .encabezado,
  .tabla-reacciones .fila {
    grid-template-columns: 1fr;
  }
}
</style>
