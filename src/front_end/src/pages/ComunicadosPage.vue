<template>
  <div class="comunicados-page">
    <PageHeader
      eyebrow="Comunicacion interna"
      title="Comunicados y avisos"
      description="Consulta anuncios activos, reacciona a los avisos vigentes y gestiona publicaciones segun tu rol."
    >
      <RoleActionBar :actions="actions" @select="selectAction" />
    </PageHeader>

    <section class="stats-strip">
      <article class="stats-chip">
        <span>Activos</span>
        <strong>{{ totalActivos }}</strong>
      </article>
      <article class="stats-chip">
        <span>Areas visibles</span>
        <strong>{{ areasDisponibles.length || 1 }}</strong>
      </article>
      <article class="stats-chip" v-if="isAdmin">
        <span>Historial</span>
        <strong>{{ comunicadosStore.historial.length }}</strong>
      </article>
    </section>

    <div v-if="notificacion" :class="['notificacion', `tipo-${notificacion.tipo}`]">
      {{ notificacion.mensaje }}
    </div>

    <section v-if="canFilterByArea && areasDisponibles.length" class="filter-row">
      <label class="filtro-campo">
        <span>Filtrar por area</span>
        <select v-model="selectedAreaId" class="select">
          <option value="">Todas las areas</option>
          <option v-for="area in areasDisponibles" :key="area.id" :value="String(area.id)">
            {{ area.nombre }}
          </option>
        </select>
      </label>
    </section>

    <div v-if="showModal" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ editando ? "Editar comunicado" : "Nuevo comunicado" }}</h2>
          <button type="button" class="btn-cerrar" @click="cerrarModal">x</button>
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

    <section class="content-card">
      <div v-if="masReciente" class="seccion">
        <ComunicadoDestacado
          :comunicado="masReciente"
          :ya-reaccionaste="yaReaccionaste(masReciente.id)"
          @editar="editarComunicado(masReciente)"
          @eliminar="eliminarComunicado(masReciente.id)"
          @toggle-reaccion="toggleReaccion(masReciente.id)"
        />

        <div v-if="otrosComunicados.length" class="mas-acciones">
          <button type="button" class="btn-ver-mas" @click="showMore = !showMore">
            {{ showMore ? "Ocultar comunicados secundarios" : "Ver mas comunicados" }}
          </button>
        </div>

        <ComunicadosLista
          v-if="showMore && otrosComunicados.length > 0"
          :comunicados="otrosComunicados"
          @seleccionar="verDetalle"
        />
      </div>

      <div v-else class="sin-contenido">
        <div class="sin-contenido__icon">Avisos</div>
        <p>No hay comunicados disponibles en este momento.</p>
      </div>
    </section>

    <section v-if="isAdmin" class="admin-panel">
      <div class="admin-panel__header">
        <div>
          <span class="section-kicker">Administracion</span>
          <h3>Historial y reacciones</h3>
        </div>
      </div>

      <div class="tabs">
        <button
          type="button"
          class="tab"
          :class="{ activo: tabActual === 'historial' }"
          @click="tabActual = 'historial'"
        >
          Historial
        </button>
        <button
          type="button"
          class="tab"
          :class="{ activo: tabActual === 'reacciones' }"
          @click="tabActual = 'reacciones'"
        >
          Reacciones
        </button>
      </div>

      <div v-if="tabActual === 'historial'" class="contenido-tab">
        <div v-if="comunicadosStore.historial.length === 0" class="vacio">
          No hay comunicados registrados en el historial.
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
              <span class="count">{{ com.reacciones?.length || 0 }}</span>
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
          Selecciona un comunicado para consultar sus reacciones.
        </div>

        <div v-else class="tabla-reacciones">
          <div class="encabezado">
            <div class="col-usuario">Usuario</div>
            <div class="col-fecha">Fecha y hora</div>
          </div>

          <div v-for="reac in reaccionesDetalle" :key="reac.id" class="fila">
            <div class="col-usuario">{{ reac.usuario?.empleado?.nombre || "Desconocido" }}</div>
            <div class="col-fecha">{{ formatDate(reac.createdAt) }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import ComunicadoDestacado from "@/components/comunicados/ComunicadoDestacado.vue";
import ComunicadosLista from "@/components/comunicados/ComunicadosLista.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import RoleActionBar from "@/components/shared/RoleActionBar.vue";
import { useAuthStore } from "@/store/auth";
import { useComunicadosStore } from "@/store/comunicados";
import comunicadosService from "@/services/comunicados.service";
import { getRoleActions, hasAnyRole, ROLE_GROUPS } from "@/utils/permissions";

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

const isAdmin = computed(() => hasAnyRole(authStore.user, ROLE_GROUPS.ANNOUNCEMENT_MANAGERS));
const canManageAnnouncements = computed(() =>
  hasAnyRole(authStore.user, ROLE_GROUPS.ANNOUNCEMENT_MANAGERS)
);
const canFilterByArea = computed(() => canManageAnnouncements.value);
const actions = computed(() => getRoleActions(authStore.user, "comunicados"));
const masReciente = computed(() => (comunicadosStore.masReciente?.id ? comunicadosStore.masReciente : null));
const totalActivos = computed(() => (masReciente.value ? 1 : 0) + otrosComunicados.value.length);

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
  } catch {
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
  if (!globalThis.confirm?.("Estas seguro de que deseas eliminar este comunicado?")) {
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
  globalThis.setTimeout(() => {
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
  display: grid;
  gap: 24px;
}

.stats-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.stats-chip {
  display: grid;
  gap: 4px;
  min-width: 160px;
  padding: 14px 16px;
  border: 1px solid rgba(197, 155, 82, 0.18);
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 253, 249, 1), rgba(241, 231, 219, 0.85));
}

.stats-chip span {
  color: var(--color-text-soft);
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stats-chip strong {
  color: var(--color-primary);
  font-size: 1.4rem;
}

.notificacion {
  padding: 14px 16px;
  border-radius: 16px;
  font-weight: 700;
  font-size: 0.92rem;
  animation: slideDown 0.3s ease;
}

.notificacion.tipo-exito {
  background: rgba(47, 107, 79, 0.12);
  border: 1px solid rgba(47, 107, 79, 0.2);
  color: var(--color-success);
}

.notificacion.tipo-error {
  background: rgba(157, 45, 62, 0.12);
  border: 1px solid rgba(157, 45, 62, 0.2);
  color: var(--color-danger);
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

.content-card,
.admin-panel,
.modal {
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: var(--color-surface);
  box-shadow: 0 16px 38px var(--color-shadow);
}

.section-kicker {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.filter-row {
  display: flex;
  justify-content: flex-end;
}

.filtro-campo {
  display: grid;
  gap: 8px;
  min-width: min(100%, 300px);
}

.filtro-campo span,
.form-group label {
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.84rem;
}

.content-card,
.admin-panel {
  padding: 22px;
}

.seccion {
  display: grid;
  gap: 16px;
}

.mas-acciones {
  display: flex;
  justify-content: flex-end;
}

.btn-ver-mas,
.btn,
.tab,
.btn-cerrar {
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    background var(--transition-base);
}

.btn-ver-mas {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(107, 24, 57, 0.06);
  border-color: rgba(107, 24, 57, 0.14);
  color: var(--color-primary);
  font-weight: 700;
}

.btn-ver-mas:hover,
.btn:hover,
.tab:hover {
  transform: translateY(-1px);
}

.sin-contenido {
  display: grid;
  place-items: center;
  gap: 12px;
  min-height: 220px;
  text-align: center;
  color: var(--color-text-soft);
}

.sin-contenido__icon {
  display: inline-grid;
  place-items: center;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background: rgba(107, 24, 57, 0.08);
  color: var(--color-primary);
  font-weight: 800;
}

.admin-panel__header h3 {
  margin: 8px 0 0;
  color: var(--color-primary-strong);
}

.tabs {
  display: flex;
  gap: 10px;
  margin: 18px 0;
}

.tab {
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(107, 24, 57, 0.06);
  color: var(--color-primary);
  font-weight: 700;
}

.tab.activo {
  background: linear-gradient(135deg, var(--color-primary-soft), var(--color-primary));
  color: #fff;
}

.vacio {
  padding: 28px 16px;
  text-align: center;
  color: var(--color-text-soft);
}

.tabla-historial,
.tabla-reacciones {
  border: 1px solid rgba(197, 155, 82, 0.18);
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255, 253, 249, 1), rgba(241, 231, 219, 0.78));
}

.encabezado,
.fila {
  display: grid;
  gap: 12px;
  padding: 14px 16px;
}

.encabezado {
  background: rgba(107, 24, 57, 0.06);
  border-bottom: 1px solid rgba(197, 155, 82, 0.18);
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.tabla-historial .encabezado,
.tabla-historial .fila {
  grid-template-columns: 2fr 1fr 1fr 0.8fr;
}

.tabla-reacciones .encabezado,
.tabla-reacciones .fila {
  grid-template-columns: 1.5fr 1fr;
}

.fila {
  color: var(--color-text);
  border-bottom: 1px solid rgba(221, 207, 191, 0.92);
}

.fila:last-child {
  border-bottom: none;
}

.badge,
.count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 34px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 800;
}

.estatus-activo {
  background: rgba(47, 107, 79, 0.12);
  color: var(--color-success);
}

.estatus-vencido {
  background: rgba(178, 123, 44, 0.12);
  color: var(--color-warning);
}

.estatus-archivado {
  background: rgba(123, 111, 116, 0.12);
  color: var(--color-neutral);
}

.count {
  background: rgba(197, 155, 82, 0.16);
  color: var(--color-accent-strong);
}

.selector-comunicado {
  margin-bottom: 16px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(47, 38, 48, 0.44);
}

.modal {
  width: min(560px, 100%);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header,
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 22px;
}

.modal-header {
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  margin: 0;
  color: var(--color-primary-strong);
  font-size: 1.2rem;
}

.btn-cerrar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(107, 24, 57, 0.08);
  color: var(--color-primary);
  font-size: 1.1rem;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 22px;
}

.form-group {
  display: grid;
  gap: 8px;
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
  padding: 11px 12px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-surface);
  color: var(--color-text);
  font-family: inherit;
  font-size: 0.95rem;
}

.input:focus,
.textarea:focus,
.select:focus {
  outline: none;
  border-color: var(--color-accent);
}

.textarea {
  resize: vertical;
}

.modal-footer {
  justify-content: flex-end;
  border-top: 1px solid var(--color-border);
}

.btn {
  padding: 10px 18px;
  border-radius: 999px;
  font-weight: 700;
}

.btn-primario {
  background: linear-gradient(135deg, var(--color-primary-soft), var(--color-primary));
  color: #fff;
}

.btn-primario:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secundario {
  background: rgba(107, 24, 57, 0.06);
  border-color: rgba(107, 24, 57, 0.14);
  color: var(--color-primary);
}

@media (max-width: 900px) {
  .modal-header,
  .modal-footer,
  .tabla-historial .encabezado,
  .tabla-historial .fila,
  .tabla-reacciones .encabezado,
  .tabla-reacciones .fila {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .tabs {
    flex-wrap: wrap;
  }

  .stats-strip {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
