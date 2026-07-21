<template>
  <div>
    <!-- Encabezado dinámico de la sección -->
    <PageHeader
      eyebrow="Flujo de autorizaciones"
      title="Solicitudes e Incidencias"
      description="Las solicitudes se muestran según el rol asignado. Administración puede aprobar o rechazar."
    />

    <!-- Alertas globales (Toasts) del sistema -->
    <div v-if="toast.visible" class="toast" :class="`toast--${toast.tone}`">
      <strong>{{ toast.title }}</strong>
      <span>{{ toast.message }}</span>
    </div>

    <!-- Panel de contadores rápidos (Sólo visible para personal autorizado) -->
    <section v-if="canViewRequests" class="request-summary">
      <div v-for="item in summary" :key="item.label" class="request-summary__item">
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </section>

    <!-- Modal de Aceptación de Normatividades -->
    <!-- Modal para términos, condiciones y normatividad vigente -->
    <ModalNormatividad

    
      :isOpen="isNormativityModalOpen"
      :documentos="normatividades"
      @close="isNormativityModalOpen = false"

      
      @accepted="procederAlFormularioCreacion" 
    />

    <!-- Bloque principal con filtros y tabla de datos -->
    <BaseCard v-if="canViewRequests">
      <form class="request-filters" @submit.prevent="applySearch">
        <label>
          Filtro
          <select v-model="filters.type">
            <option value="folio">Folio</option>
            <option value="empleado">No. empleado</option>
            <option value="rfc">RFC</option>
          </select>
        </label>
        
        <label style="position: relative;">
          Búsqueda
          <!-- INPUT INTERACTIVO: Escucha eventos de navegación por teclado y auto-detección inteligente -->
          <input
            ref="searchInputRef"
            v-model.trim="filters.term"
            type="search"
            :placeholder="searchPlaceholder"
            @input="onSearchInput"
            @keydown="onSearchKeyDown"
            @focus="showSuggestions = true"
            @blur="closeSuggestionsWithDelay"
          />
          
          <!-- DROPDOWN DE SUGERENCIAS INTEGRADAS (Control por CSS y Teclado) -->
          <ul v-if="showSuggestions && filteredSuggestions.length > 0" class="search-suggestions-dropdown">
            <li 
              v-for="(suggestion, index) in filteredSuggestions" 
              :key="suggestion.id"
              :class="{ 'suggestion-active': index === activeSuggestionIndex }"
              @mousedown="selectSuggestion(suggestion)"
            >
              {{ suggestion.text }}
            </li>
          </ul>
        </label>
        
        <div class="request-filters__actions">
          <button class="primary-button" type="submit">
            <IconSymbol name="search" />
            Buscar
          </button>
          <button class="secondary-button" type="button" @click="clearSearch">
            <IconSymbol name="clear" />
            Limpiar 
          </button>
          <button class="ghost-button" type="button" @click="loadRequests">
            <IconSymbol name="reset" />
            Actualizar
          </button>
        </div>
      </form>

      <!-- Botones de acciones principales basados en permisos -->
      <div class="request-actions-below-filter">
        <button
          v-for="action in headerActions"
          :key="action.key"
          type="button"
          :class="[action.key === 'createRequest' ? 'primary-button' : 'secondary-button']"
          @click="selectAction(action)"
        >
          <IconSymbol :name="action.icon" />
          {{ action.label }}
        </button>
      </div>

      <!-- Tabla general de Solicitudes -->
      <AppTable :columns="columns" :rows="rows">
        <template #estatus="{ row }">
          <StatusBadge :value="row.estatus" />
        </template>
        <template #acciones="{ row }">
          <div class="table-actions">
            <button
              v-for="action in actionsForRow(row)"
              :key="`${row.id}-${action.key}`"
              type="button"
              class="icon-action"
              :class="`icon-action--${action.key}`"
              :title="action.label"
              @click="selectAction(action, row)"
            >
              <IconSymbol :name="action.icon" />
            </button>
          </div>
        </template>
      </AppTable>
    </BaseCard>

    <!-- Vista alternativa para usuarios sin permisos de administrador (Rol Empleado) -->
    <BaseCard 
      v-else
      title="Generar Solicitud"    
      subtitle="Tu Solicitud quedará pendiente para Revisión Administrativa."    
    >
      <p class="request-access-note">
        La consulta, aprobación y rechazo de solicitudes está disponible solo para administradores.
      </p>
      <button class="primary-button" type="button" @click="evaluarNormatividad">
        <IconSymbol name="plus" />
        Nueva Solicitud
      </button>
    </BaseCard>

    <!-- MODAL DINÁMICO: Altas, Aprobaciones, Rechazos y Eliminaciones -->
    <div v-if="modal.visible" class="modal-backdrop" @click="closeModal">
      <section class="request-modal" @click.stop>
        <header class="request-modal__header">
          <div>
            <span>{{ modal.eyebrow }}</span>
            <h3>{{ modal.title }}</h3>
          </div>
          <button class="icon-action" type="button" title="Cerrar" @click="closeModal">
            <IconSymbol name="x" />
          </button>
        </header>

        <!-- FORMULARIO ESTÁNDAR: Incidencias comunes -->
        <form v-if="modal.mode === 'create' && form.tipo !== 'comision'" class="request-form" @submit.prevent="submitRequest">
          <label>
            Tipo
            <select v-model="form.tipo" required>
              <option value="vacaciones">Vacaciones</option>
              <option value="permiso">Permiso</option>
              <option value="incapacidad">Incapacidad</option>
              <option value="maternidad">Maternidad</option>
              <option value="paternidad">Paternidad</option>
              <option value="comision">Comisión</option>
              <option value="otro">Otro</option>
            </select>
          </label>
          
          <div class="form-grid">
            <label>
              Inicio
              <input 
                v-model="form.fecha_inicio" 
                type="date" 
                :min="today" 
                required 
              />
            </label>

            <label>
              Fin
              <input 
                v-model="form.fecha_fin" 
                type="date" 
                :min="form.fecha_inicio || today" 
                :class="{ 'input-error': fechasInvalidas}"
                required 
              />
            </label>
          </div>
          <span v-if="fechasInvalidas" class="error-text-hint">
            La Fecha de Fin no puede ser Anterior a la de Inicio.
          </span>

          <!-- INPUT COMPLEMENTARIO DE PDF DINÁMICO (Médicos, Oficiales, etc.) -->
          <label class="upload-button" v-if="['incapacidad', 'maternidad', 'paternidad'].includes(form.tipo)">
            Documento Justificante (PDF)
            <div style="margin-top: 5px;">
              <button class="primary-button" type="button" @click="fileInput.click()">
                <IconSymbol name="upload" />
                {{ form.archivoBinario ? form.archivoBinario.name : 'Cargar PDF' }}
              </button>
              <input 
                ref="fileInput"
                type="file" 
                accept="application/pdf" 
                style="display: none;" 
                @change="manejarArchivo" 
              />
            </div>
          </label>
          
          <label>
            Motivo
            <textarea v-model="form.motivo" rows="4" required placeholder="Describe brevemente el motivo de la Solicitud o Incidencia" />
          </label>

          <footer class="modal-actions">
            <button class="secondary-button" type="button" @click="closeModal">Cancelar</button>
            <button class="primary-button" type="submit" :disabled="saving || fechasInvalidas">
              <span v-if="saving" class="spinner-container">
                <span class="spinner-icon"></span>
                Procesando...
              </span>
              <span v-else>
                Crear Solicitud
              </span>
            </button>
          </footer>
        </form>

        <!-- SUB-FORMULARIO EXTERNO: Redirección condicional para Comisiones Oficiales -->
        <div v-else-if="modal.mode === 'create' && form.tipo === 'comision'">
          <label style="display: grid; gap: 7px; margin-bottom: 14px; font-weight: 700; color: var(--color-text-soft);">
            Tipo
            <select v-model="form.tipo" style="width: 100%; border: 1px solid var(--color-border); border-radius: 12px; padding: 11px 12px;">
              <option value="vacaciones">Vacaciones</option>
              <option value="permiso">Permiso</option>
              <option value="incapacidad">Incapacidad</option>
              <option value="maternidad">Maternidad</option>
              <option value="paternidad">Paternidad</option>
              <option value="comision">Comisión</option>
              <option value="otro">Otro</option>
            </select>
          </label>
          
          <FormularioComision @success="handleComisionSuccess" @cancel="closeModal" />
        </div>

        <!-- PANEL DE CONFIRMACIONES DE RESOLUCIÓN (Flujos de Aprobación / Rechazo / Borrado) -->
        <div v-else class="confirm-panel">
          <p>
            {{ modal.message }}
            <strong>{{ modal.row?.id }}</strong>
          </p>
          <dl>
            <div>
              <dt>Empleado</dt>
              <dd>{{ modal.row?.empleado_id }}</dd>
            </div>
            <div>
              <dt>Periodo</dt>
              <dd>{{ modal.row?.fecha_inicio }} / {{ modal.row?.fecha_fin }}</dd>
            </div>
          </dl>
          <footer class="modal-actions">
            <button class="secondary-button" type="button" @click="closeModal">Cancelar</button>
            <button
              class="primary-button"
              type="button"
              :class="{ 'primary-button--danger': ['reject', 'delete'].includes(modal.mode) }"
              :disabled="saving"
              @click="confirmResolution"
            >
              {{ saving ? "Procesando..." : modal.confirmLabel }}
            </button>
          </footer>
        </div>
      </section>
    </div>

  </div>


   <div class="test-container">
    <div class="control-panel">
      <h2>Generador de Oficios de Comisión (Hidalgo)</h2>
      <p>Vista previa del documento oficial. Haz clic en el botón para descargar el PDF limpio.</p>
      
      <div class="button-group">
        <button @click="exportarPDF" class="btn btn-primary">
          Descargar Oficio en PDF
        </button>
      </div>
    </div>

    <div class="preview-box">
      <div ref="reporteRef" class="pdf-document">
        
        <table class="header-table">
          <tr>
            <td class="header-left">
              <img 
              :src="logoUrl" 
              alt="Logo Hidalgo" 
              class="pdf-logo" />
            </td>
            <td class="header-right">
              <div class="sec-gob">Secretaría de Gobierno</div>
              <div class="rth-text">Radio y Televisión de Hidalgo</div>
              <div class="oficio-title">Oficio de Comisión</div>
              <div class="oficio-num">RTH/DAF/TI/051/2026</div>
            </td>
          </tr>
        </table>

        <div class="date-section">
          Pachuca de Soto, Hgo., a 20 de julio de 2026
        </div>

        <table class="data-table">
          <tr>
            <td class="label-cell">Nombre del trabajador:</td>
            <td class="value-cell bold-text">Omar Efrén Vázquez Moreno</td>
          </tr>
          <tr>
            <td class="label-cell">Adscripción:</td>
            <td class="value-cell">Dirección de Administración y Finanzas</td>
          </tr>
          <tr>
            <td class="label-cell">Tipo de nombramiento:</td>
            <td class="value-cell">Jefe de Área A</td>
          </tr>
          <tr>
            <td class="label-cell">No. de Empleado:</td>
            <td class="value-cell">029333</td>
          </tr>
        </table>

        <div class="checkbox-container">
          <table class="checkbox-table">
            <tr>
              <td class="checkbox-item">
                BASE <div class="checkbox-box"></div>
              </td>
              <td class="checkbox-item">
                CONFIANZA <div class="checkbox-box marked">X</div>
              </td>
              <td class="checkbox-item">
                HONORARIOS <div class="checkbox-box"></div>
              </td>
            </tr>
          </table>
        </div>

        <div class="content-section">
          <p class="content-text">
            Por este conducto me permito informarle que ha sido comisionado para el día <strong>viernes, 20 de julio del año en curso</strong>, para asistir a la <strong>Dirección de Innovación</strong> para revisar las credenciales del portal CyberArk que no permite el acceso para la carga de información en el servidor de transparencia.
          </p>
        </div>

        <table class="schedule-table">
          <tr>
            <td class="schedule-cell">
              <strong>Salida:</strong> 16:30 hrs.
            </td>
            <td class="schedule-cell">
              <strong>Regreso:</strong> 18:00 hrs. Aproximadamente.
            </td>
          </tr>
        </table>

        <div class="farewell-text">
          Agradeciendo de antemano su apoyo, quedo de usted.
        </div>

        <table class="signature-table">
          <tr>
            <td class="signature-cell">
              <div class="signature-role">Autorizó</div>
              <div class="signature-space"></div> <div class="signature-line"></div>
              <div class="signature-name">Mtra. Isela Guadalupe Espinosa López</div>
              <div class="signature-title">Directora de Administración y Finanzas</div>
            </td>
            <td class="signature-cell">
              <div class="signature-role">Acepto Comisión</div>
              <div class="signature-space"></div> <div class="signature-line"></div>
              <div class="signature-name">Omar Efrén Vázquez Moreno</div>
              <div class="signature-title">Jefe de Área A</div>
            </td>
          </tr>
        </table>

      </div>
    </div>
  </div>


 
</template>



<script setup>
import { computed, onMounted, reactive, ref } from "vue";//Importación de funciones reactivas de Vue3
import { watch } from "vue";//Importación de función para observar cambios en variables reactivas
import axios from "axios"; // Axios importado para traer las normatividades
import BaseCard from "@/components/ui/BaseCard.vue";//Componente de targeta madre para mostrar contenido en secciones
import AppTable from "@/components/ui/AppTable.vue";//Componente de tabla para mostrar datos en formato tabular
import IconSymbol from "@/components/ui/IconSymbol.vue";//Componente para mostrar iconos de botones
import html2pdf from "html2pdf.js";
import logopdf from "@/assets/logopdf.png"
import PageHeader from "@/components/shared/PageHeader.vue";//Componente de encabezado de pagina con titulo y subtitulos
import RoleActionBar from "@/components/shared/RoleActionBar.vue";//Componente para botones de acción según el rol del usuario
import StatusBadge from "@/components/shared/StatusBadge.vue";//Componente para mostrar el estatus de un registro con un badge visual
import requestsService from "@/services/requests.service";//Servicio para gestionar las solicitudes
import { getRoleActions, hasAnyRole, ROLE_GROUPS } from "@/utils/permissions";//Manejo de permisos, accesos a botones y acciones según el rol del usuario
import { useAuthStore } from "@/store/auth";//Acceso al store de autenticación para obtener el token y rol del usuario
import ModalNormatividad from "@/components/shared/ModalNormatividad.vue";//Importación del componente del modal para Leer y aceptar las Normatividades
import FormularioComision from "@/components/shared/FormularioComision.vue";// Importacion del Componente del Formulario especifico para Comisiones

const logoUrl = logopdf
const reporteRef = ref(null);

const authStore = useAuthStore();//Acceso al store de Autenticación para obtener el token y el rol del usuario

const rows = ref([]);//Inicializa vacío para llenar desde la API

const saving = ref(false);// Controla el estado de guardado para deshabilitar el botón y mostrar un mensaje de carga

// Variables reactivas para las Normatividades
const isNormativityModalOpen = ref(false);

// Variable reactiva para almacenar las normatividades obtenidas desde la API
const normatividades = ref([]);

// Variable reactiva para el Toast de notificaciones - el toast es un mensaje emergente que aparece temporalmente para informar al usuario sobre el resultado de una acción.
const toast = reactive({ visible: false, title: "", message: "", tone: "success" });

// Variable reactiva para el modal de creación y resolución de solicitudes
const modal = reactive({
  visible: false,
  mode: "",
  title: "",
  eyebrow: "",
  message: "",
  confirmLabel: "",
  row: null
});

// Variables reactivas para el formulario de creación de solicitudes
const form = reactive({
  tipo: "vacaciones",
  oficio: "",
  fecha_inicio: "",
  fecha_fin: "",
  motive: "",
  archivoBinario: null
});

// Variables reactivas para los filtros de búsqueda
const filters = reactive({
  type: "empleado", 
  term: ""
});


// Función para formatear la fecha en formato YYYY-MM-DD para los inputs de tipo date
const formatDateInputValue = (date) => {

  // Asegurarse de que la fecha sea un objeto Date válido
  const year = date.getFullYear();

  // Obtener el mes y el día, asegurándose de que tengan dos dígitos
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Devolver la fecha en formato YYYY-MM-DD
  return `${year}-${month}-${day}`;
};

// Obtener la fecha de hoy en formato YYYY-MM-DD para usarla como mínimo en los inputs de fecha
const today = formatDateInputValue(new Date());

//Formato de la tabla en que se muestra la información de Solicitudes - esto de acuerdo a la migración y modelo de solicitudes
const columns = [
  { key: "id", label: "Folio" },
  { key: "No_de_empleado", label: "No. empleado" },
  { key: "empleado_nombre", label: "Nombre" },
  { key: "empleado_rfc", label: "RFC" },
  { key: "tipo", label: "Tipo" },
  { key: "fecha_inicio", label: "Inicio" },
  { key: "fecha_fin", label: "Fin" },
  { key: "estatus", label: "Estatus" },
  { key: "aprobado_por", label: "Revisión" },
  { key: "acciones", label: "Acciones" }
];

/**
 * TEXTO DE AYUDA (PLACEHOLDER):
 * Modifica dinámicamente el placeholder del buscador según el tipo de filtro activo.
 */
const searchPlaceholder = computed(() => {
  if (filters.type === "rfc") return "Ej. GAAL850101AB1";
  if (filters.type === "folio") return "Ej. FOL-001";
  return "Ej. 042 o Juan Pérez";
});

/**
 * LÓGICA FILTRADO DE AUTOCOMPLETADO (SUGERENCIAS):
 * Filtra en caliente (memoria) el arreglo completo de filas buscando coincidencias.
 * Retorna objetos estandarizados con `{ id, text, value }` listos para ser renderizados.
 */
const filteredSuggestions = computed(() => {
  const term = filters.term.toLowerCase().trim();
  
  // Si no hay texto, extrae las primeras 5 filas generales como sugerencia rápida
  if (!term) { 
    return rows.value.slice(0, 5).map(row => ({ 
      id: row.id,
      text: filters.type === 'rfc' ? row.empleado_rfc : filters.type === 'folio' ? row.id : row.empleado_nombre,
      value: filters.type === 'rfc' ? row.empleado_rfc : filters.type === 'folio' ? row.id : row.No_de_empleado
    }));
  }

  // Filtra la colección con base en la opción del selector principal
  return rows.value
    .filter((row) => {
      if (filters.type === "rfc") return String(row.empleado_rfc).toLowerCase().includes(term);
      if (filters.type === "folio") return String(row.id).toLowerCase().includes(term);
      
      const nombreCoincide = String(row.empleado_nombre).toLowerCase().includes(term);
      const numeroCoincide = String(row.No_de_empleado).toLowerCase().includes(term);
      return nombreCoincide || numeroCoincide;
    })
    .slice(0, 8) // Capa de rendimiento: máximo 8 opciones simultáneas en pantalla
    .map((row) => {
      let text = row.empleado_nombre;
      let value = row.No_de_empleado;

      if (filters.type === "rfc") {
        text = row.empleado_rfc;
        value = row.empleado_rfc;
      } else if (filters.type === "folio") {
        text = row.id;
        value = row.id;
      } else if (filters.type === "empleado") {
        const numeroString = String(row.No_de_empleado).toLowerCase();
        if (numeroString.includes(term)) {
          text = `${row.No_de_empleado} - ${row.empleado_nombre}`;
        }
      }

      return { id: row.id, text, value };
    });
});

// --- SEGURIDAD Y PERMISOS COMPUTADOS ---
const roleActions = computed(() => getRoleActions(authStore.user, "requests"));
const headerActions = computed(() => roleActions.value.filter((action) => ["createRequest", "viewRequests"].includes(action.key)));
const canViewRequests = computed(() => roleActions.value.some((action) => action.key === "viewRequests"));
const currentEmployeeId = computed(() => authStore.user?.empleado_id ? `EMP-${String(authStore.user.No_de_empleado).padStart(3, "0")}` : null);
const canApproveRequests = computed(() => hasAnyRole(authStore.user, ROLE_GROUPS.APPROVERS));

/**
 * CONTADORES RÁPIDOS: Agrupa la suma total por estatus para renderizar tarjetas en el dashboard.
 */
const summary = computed(() => [
  { label: "Pendientes", value: rows.value.filter((row) => row.estatus === "pendiente").length },
  { label: "Aprobadas", value: rows.value.filter((row) => row.estatus === "aprobada" || row.estatus === "aprobado").length },
  { label: "Rechazadas", value: rows.value.filter((row) => row.estatus === "rechazada" || row.estatus === "rechazado").length }
]);

/**
 * VALIDACIÓN DE REGLAS DE NEGOCIO EN TIEMPO REAL:
 * Retorna true si la fecha de finalización es menor a la de inicio (Bloquea botones de envío).
 */
const fechasInvalidas = computed(() => {
  if (!form.fecha_inicio || !form.fecha_fin) return false;
  return form.fecha_fin < form.fecha_inicio;
});

// ============================================================================
// MÉTODOS Y MANEJADORES DE OPERACIONES (METHDOOLOGÍA Y FUNCIONES)
// ============================================================================

/**
 * EJECUTOR DE BÚSQUEDA MANUAL: Disparado al presionar Enter o dar clic al botón de buscar.
 */
const applySearch = () => {
  loadRequests();
};

/**
 * VALIDADOR Y CARGADOR DE ADJUNTOS BINARIOS:
 * Captura el evento nativo onChange del file input y restringe que sea estrictamente PDF.
 */
const manejarArchivo = (event) => {

  //Obtiene el primer archivo seleccionado por el usuario
  const archivo = event.target.files[0];

  //Si no hay un archivo seleccionado, se limpia el campo de ArchivoBinario en el formulario
  if (archivo) {
  
  //  
  if (archvio.type !== "application/pdf")  {

    //Mensaje en caso de cargar un formato distinto al requerido o al intentar subir más de un archivo 
    showToast("Archivo Invalido: ", "Por Favor suba únicamente un archivo PDF.", "warning");

    //
    return;

    //
  }
  form.archivoBinario.archivo
  }
};

/**
 * ESCUCHA DE FORMULARIO DE COMISIÓN EXTERNO:
 * Se activa mediante el callback emitido por el subcomponente <FormularioComision>.
 */
const handleComisionSuccess = (nuevaComision) => {
  rows.value.unshift(normalizeRow(nuevaComision));
  showToast("Comisión Creada", "El formato de Comisión fue registrado exitosamente.");
};

/**
 * DISPARADOR DE NOTIFICACIONES TOAST: Muestra un banner temporal auto-ocultable en UI.
 */
const showToast = (title, message, tone = "success") => {
  toast.visible = true;
  toast.title = title;
  toast.message = message;
  toast.tone = tone;
  globalThis.setTimeout(() => {
    toast.visible = false;
  }, 3200);
};

/**
 * DESTRUPTOR / PARSER DE ERRORES HTTP:
 * Extrae el mensaje de error real devuelto por la API de Laravel/Node, evitando el clásico "[object Object]".
 */
const getRequestErrorMessage = (error) =>
  error.response?.data?.details ||
  error.response?.data?.error ||
  error.message ||
  "Verifica la conexión con el servidor/BD.";

/**
 * NORMALIZADOR DE SOLICITUDES:
 * Homologa la estructura que viene de BD (campos null, folios sin prefijo, variaciones de strings) 
 * para garantizar consistencia total dentro de los slots de la tabla.
 */
const normalizeRow = (row) => ({
  ...row,
  id: row.id?.startsWith?.("FOL-") ? row.id : `FOL-${row.id}`,
  No_de_empleado: row.No_de_empleado || row.empleado_id || "Sin empleado",
  empleado_nombre: row.empleado_nombre || row.nombre || "Sin nombre",
  empleado_rfc: row.empleado_rfc || "Sin RFC",
  tipo: row.tipo ? row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1) : "Otro",
  estatus: row.estatus === "aprobado" ? "aprobada" : row.estatus === "rechazado" ? "rechazada" : row.estatus,
  aprobado_por: row.aprobado_por || "Pendiente"
});

/**
 * CONSUMIDOR DE API (LISTADO): Envía términos de búsqueda al endpoint central de solicitudes.
 */
const loadRequests = async () => {
  if (!canViewRequests.value) {
    rows.value = [];
    return;
  }

  try {
    const params = filters.term ? { buscar: filters.term, filtro: filters.type } : {};
    const data = await requestsService.list(params);
    rows.value = data.map(normalizeRow);
  } catch (error) { 
    rows.value = [];
    showToast("No se pudo cargar el módulo", getRequestErrorMessage(error), "warning");
  }
};

/**
 * CONSUMIDOR DE API (NORMATIVA VIGENTE): Obtiene los reglamentos para su posterior lectura obligatoria.
 */
const fetchNormatividadesVigentes = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/normatividad");
    normatividades.value = response.data;
  } catch (error) {
    console.error("Error al obtener normatividades para solicitudes:", error);
  }
};

/**
 * EVALUADOR LEGAL PREVIO A LA ACCIÓN:
 * Si existen lineamientos legales cargados, obliga al usuario a visualizarlos. Si no, salta al formulario.
 */
const evaluarNormatividad = () => {
  if (normatividades.value.length > 0) {
    isNormativityModalOpen.value = true;
  } else {
    openCreateModal();
  }
};

const procederAlFormularioCreacion = () => {
  isNormativityModalOpen.value = false;
  openCreateModal();
};

/**
 * AUTO-CAMBIO DE FILTROS (DETECCIÓN PREDICTIVA INTELIGENTE):
 * Analiza en tiempo real los caracteres introducidos por el usuario:
 * - Si escribe "FOL-" o inicia con "F", cambia el combo automáticamente a búsqueda por Folio.
 * - Si coincide con un formato inicial de RFC (4 letras consecutivas y un número), cambia el combo a RFC.
 */
const onSearchInput = () => {
  showSuggestions.value = true;
  activeSuggestionIndex.value = -1; 
  const cleanTerm = filters.term.toLowerCase().trim();

  if (filters.type === "empleado" && (cleanTerm.startsWith("f") || cleanTerm.startsWith("fol"))) {
    filters.type = "folio";
    return; 
  }
  
  const rfcPattern = /^[a-z]{4}\d/;
  if (filters.type === "empleado" && rfcPattern.test(cleanTerm)) {
    filters.type = "rfc";
    return;
  }

  // Lógica Debounce: Cancela la petición previa y espera 300ms de calma en el teclado para no saturar el servidor
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    loadRequests();
  }, 300);
};

/**
 * ACCESIBILIDAD POR TECLADO (ACCIONES KEYDOWN):
 * Permite moverse con la flecha de arriba/abajo por la lista flotante, 
 * seleccionar con 'Enter' y cerrar con 'Esc' sin necesidad de quitar las manos del teclado.
 */
const onSearchKeyDown = (event) => {
  if (!showSuggestions.value || filteredSuggestions.value.length === 0) return;

  if (event.key === "ArrowDown") {
    event.preventDefault(); // Detiene el scroll natural de la página web
    activeSuggestionIndex.value = (activeSuggestionIndex.value + 1) % filteredSuggestions.value.length;
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    activeSuggestionIndex.value = (activeSuggestionIndex.value - 1 + filteredSuggestions.value.length) % filteredSuggestions.value.length;
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (activeSuggestionIndex.value >= 0 && activeSuggestionIndex.value < filteredSuggestions.value.length) {
      selectSuggestion(filteredSuggestions.value[activeSuggestionIndex.value]);
    }
  } else if (event.key === "Escape") {
    showSuggestions.value = false;
    activeSuggestionIndex.value = -1;
  }
};

/**
 * ASIGNADOR DE SUGERENCIA SELECCIONADA:
 * Toma la sugerencia elegida (clic o teclado), la inyecta al input y refresca el listado principal.
 */
const selectSuggestion = (suggestion) => {
  if (filters.type === "empleado" && suggestion.text.includes(" - ")) {
    filters.term = suggestion.text.split(" - ")[0]; // Limpia la cadena y extrae solo el número de empleado
  } else {
    filters.term = suggestion.text;
  }
  showSuggestions.value = false;
  activeSuggestionIndex.value = -1;
  loadRequests();
};

/**
 * BOTÓN DE LIMPIEZA TOTAL: Resetea el buscador y restaura el estado inicial.
 */
const clearSearch = () => {
  filters.term = "";
  filters.type = "empleado";
  showSuggestions.value = false;
  activeSuggestionIndex.value = -1;
  loadRequests();
};

/**
 * CIERRE CON RETRASO CONTROLADO:
 * Evita que el dropdown desaparezca instantáneamente al perder el foco (onBlur), 
 * dando margen de tiempo para procesar los clics de selección rápidos.
 */
const closeSuggestionsWithDelay = () => {
  setTimeout(() => {
    showSuggestions.value = false;
    activeSuggestionIndex.value = -1;
  }, 250);
};

/**
 * MOTOR DINÁMICO DE ACCIONES POR FILA:
 * Evalúa los permisos del usuario logueado en combinación con las reglas de negocio
 * (Ej: solo se borran solicitudes si están 'pendientes' y pertenecen al creador original).
 */
const actionsForRow = (row) => {
  const pending = row.estatus === "pendiente";
  const isOwner = row.empleado_id === currentEmployeeId.value;

  return roleActions.value.filter((action) => {
    if (action.key === "createRequest" || action.key === "viewRequests") return false;
    if (action.key === "deleteRequest") return pending && isOwner;
    if (["approveRequest", "rejectRequest"].includes(action.key)) return pending && canApproveRequests.value;
    if (action.key === "manageIncident") return canApproveRequests.value;
    if (action.key === "downloadRequestDocument") return canApproveRequests.value || isOwner;
  });
};

/**
 * ENRUTADOR DE ACCIONES PRINCIPALES:
 * Intercepta los clics de botones de acción y los redirige al modal o función correspondiente.
 */
const selectAction = (action, row = null) => {
  if (action.key === "createRequest") {
    evaluarNormatividad();
    return;
  }
  if (action.key === "approveRequest") {
    openResolutionModal("approve", row);
    return;
  }
  if (action.key === "rejectRequest") {
    openResolutionModal("reject", row);
    return;
  }
  if (action.key === "deleteRequest") {
    openResolutionModal("delete", row);
    return;
  }
  if (action.key === "downloadRequestDocument") {
    showToast("Descargar", `Descargando documento de ${row.id}.`);
    return;
  }
  showToast(action.label, row ? `Seleccionaste ${row.id}.` : "Consulta disponible en la tabla.");
};

/**
 * CONSTRUCTOR DEL MODAL DE ALTA: Inicializa los estados del formulario a sus valores por defecto.
 */
const openCreateModal = () => {
  Object.assign(form, { tipo: "vacaciones", oficio: "", fecha_inicio: "", fecha_fin: "", motivo: "", archivoBinario: null });
  if (fileInput.value) fileInput.value.value = "";
  Object.assign(modal, {
    visible: true,
    mode: "create",
    eyebrow: "Captura",
    title: "Nueva solicitud",
    row: null
  });
};

/**
 * CONSTRUCTOR DEL MODAL DE RESOLUCIÓN (APROBACIONES/RECHAZOS/ELIMINACIÓN):
 * Centraliza las etiquetas de texto según la acción crítica seleccionada.
 */
const openResolutionModal = (mode, row) => {
  const config = {
    approve: { eyebrow: "Autorización", title: "Aprobar solicitud", message: "Vas a aprobar la solicitud", confirmLabel: "Aprobar" },
    reject: { eyebrow: "Resolución", title: "Rechazar solicitud", message: "Vas a rechazar la solicitud", confirmLabel: "Rechazar" },
    delete: { eyebrow: "Eliminación", title: "Eliminar solicitud", message: "Vas a eliminar la solicitud", confirmLabel: "Eliminar" }
  };

  Object.assign(modal, {
    visible: true,
    mode,
    row,
    ...config[mode]
  });
};

const closeModal = () => {
  modal.visible = false;
};

/**
 * PROCESADOR DE ENVÍO (HTTP POST):
 * Construye una instancia multipart/form-data (FormData) necesaria para adjuntar
 * archivos binarios (PDF) y campos planos hacia la API de backend.
 */
const submitRequest = async () => {
  if (form.fecha_inicio < today || form.fecha_fin < today) {
    showToast("Fecha no permitida", "Selecciona el día actual o una fecha posterior.", "warning");
    return;
  }
  if (form.fecha_fin < form.fecha_inicio) {
    showToast("Periodo no válido", "La fecha final no puede ser anterior a la fecha de inicio.", "warning");
    return;
  }

  saving.value = true;
  const formData = new FormData();
  formData.append("tipo", form.tipo);
  formData.append("oficio", form.oficio);
  formData.append("fecha_inicio", form.fecha_inicio);
  formData.append("fecha_fin", form.fecha_fin);
  formData.append("motivo", form.motivo);
  if (form.archivoBinario) {
    formData.append("archivo_pdf", form.archivoBinario);
  }

  try {
    const created = await requestsService.create(formData);
    rows.value.unshift(normalizeRow(created)); // Inyecta la nueva solicitud al inicio de la tabla en caliente
    showToast("La Solicitud ha sido creada", "La Solicitud queda pendiente a revisión");
  } catch (error) {
    showToast("No se pudo crear la Solicitud", getRequestErrorMessage(error), "warning");
  } finally {
    saving.value = false;
    closeModal();
  }
};

/**
 * PROCESADOR DE RESOLUCIONES (HTTP PATCH/DELETE):
 * Ejecuta la actualización de estatus a nivel de base de datos e impacta localmente
 * el arreglo en memoria para evitar llamadas innecesarias de refresco completo.
 */
const confirmResolution = async () => {
  if (!modal.row) return;
  saving.value = true;

  try {
    if (modal.mode === "approve") {
      const updated = await requestsService.approve(modal.row.id);
      replaceRow(normalizeRow(updated));
      showToast("Solicitud actualizada", `${modal.row.id} fue aprobada.`);
    } else if (modal.mode === "reject") {
      const updated = await requestsService.reject(modal.row.id);
      replaceRow(normalizeRow(updated));
      showToast("Solicitud actualizada", `${modal.row.id} fue rechazada.`);
    } else if (modal.mode === "delete") {
      await requestsService.remove(modal.row.id);
      rows.value = rows.value.filter((row) => row.id !== modal.row.id); // Remueve la fila eliminada
      showToast("Solicitud eliminada", `${modal.row.id} fue eliminada correctamente.`);
    }
  } catch (error) {
    showToast("No se pudo completar la acción", getRequestErrorMessage(error), "warning");
  } finally {
    saving.value = false;
    closeModal();
  }
};

/**
 * ACTUALIZADOR INTERNO: Intercambia los datos viejos de una fila por su respuesta actualizada.
 */
const replaceRow = (updated) => {
  rows.value = rows.value.map((row) => (row.id === updated.id ? updated : row));
};

// --- CICLO DE VIDA ---
onMounted(() => {
  loadRequests();               // Al arrancar, monta las solicitudes iniciales.
  fetchNormatividadesVigentes(); // Trae las normatividades desde la base de datos de manera asíncrona.
});

</script>

<style scoped>
/* Contenedor flotante para el autocompletado */
.search-suggestions-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--color-bg-card, #ffffff);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 50;
  list-style: none;
  padding: 4px 0;
  margin: 4px 0 0 0;
  max-height: 240px;
  overflow-y: auto;
}

.search-suggestions-dropdown li {
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
  color: var(--color-text, #334155);
  transition: background-color 0.15s ease;
}

/* Estado activo/hover de las filas del dropdown */
.search-suggestions-dropdown li:hover,
.search-suggestions-dropdown li.suggestion-active {
  background-color: var(--color-bg-hover, #f1f5f9);
  color: var(--color-primary, #6b1839);
  font-weight: 600;
}

.request-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.request-summary__item {
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
}

.request-summary__item span {
  display: block;
  color: var(--color-text-soft);
  font-size: 0.86rem;
}

.request-summary__item strong {
  display: block;
  margin-top: 8px;
  font-size: 1.7rem;
}

.request-access-note {
  margin: 0 0 16px;
  color: var(--color-text-soft);
  line-height: 1.6;
}

.request-filters {
  display: grid;
  grid-template-columns: minmax(150px, 0.35fr) minmax(220px, 1fr) auto;
  align-items: end;
  gap: 12px;
  margin-bottom: 18px;
  padding: 14px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface-muted);
  margin-top: 18px;
}

.request-filters label {
  display: grid;
  gap: 7px;
  color: var(--color-text-soft);
  font-weight: 700;
}

.request-filters input,
.request-filters select {
  width: 100%;
  min-height: 42px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 10px 12px;
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
}

.request-filters__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.request-actions-below-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 18px 0 24px;
  padding: 0;
}

.request-actions-below-filter .primary-button,
.request-actions-below-filter .secondary-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.request-actions-below-filter .primary-button {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-soft));
  color: #fff;
  box-shadow: 0 8px 16px rgba(107, 24, 57, 0.16);
}

.request-actions-below-filter .primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(107, 24, 57, 0.22);
}

.request-actions-below-filter .secondary-button {
  background: var(--color-surface);
  color: var(--color-primary);
  border: 2px solid var(--color-primary-faint);
}

.request-actions-below-filter .secondary-button:hover {
  background: var(--color-primary-faint);
  transform: translateY(-1px);
}

.table-actions,
.modal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ghost-button,
.icon-action,
.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
}

.ghost-button {
  min-height: 38px;
  padding: 9px 12px;
  background: var(--color-surface);
  color: var(--color-text);
}

.ghost-button:hover {
  transform: translateY(-1px);
}

.icon-action {
  width: 38px;
  height: 38px;
  background: var(--color-surface-muted);
  color: var(--color-text);
}

.icon-action--approveRequest {
  background: rgba(47, 107, 79, 0.12);
  color: var(--color-success);
}

.icon-action--rejectRequest,
.icon-action--deleteRequest {
  background: rgba(157, 45, 62, 0.12);
  color: var(--color-danger);
}

.input-error {
  border-color: var(--color-danger) !important;
  background-color: rgba(157, 45, 62, 0.05) !important;
}

.error-text-hint {
  font-size: 0.8rem;
  color: var(--color-danger);
  margin-top: -6px;
  display: block;
  font-weight: 500;
}

.spinner-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner-icon {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg);}
}

.toast {
  display: grid;
  gap: 4px;
  margin-bottom: 16px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(47, 107, 79, 0.22);
  background: rgba(47, 107, 79, 0.1);
  color: var(--color-success);
}

.toast--warning {
  border-color: rgba(178, 123, 44, 0.3);
  background: rgba(178, 123, 44, 0.12);
  color: var(--color-warning);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(47, 38, 48, 0.45);
}

.request-modal {
  width: min(560px, 100%);
  padding: 22px;
  border-radius: 12px;
  background: var(--color-surface);
  box-shadow: 0 18px 50px rgba(47, 38, 48, 0.18);
}

.request-modal__header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.request-modal__header span {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.request-modal__header h3 {
  margin: 5px 0 0;
}

.request-form {
  display: grid;
  gap: 14px;
}

.request-form label {
  display: grid;
  gap: 7px;
  color: var(--color-text-soft);
  font-weight: 700;
}

.request-form input,
.request-form select,
.request-form textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 11px 12px;
  color: var(--color-text);
  font: inherit;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.confirm-panel {
  display: grid;
  gap: 18px;
}

.confirm-panel p {
  margin: 0;
  color: var(--color-text-soft);
  line-height: 1.6;
}

.confirm-panel dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
}

.confirm-panel dl div {
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface-muted);
}

.confirm-panel dt {
  color: var(--color-text-soft);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.confirm-panel dd {
  margin: 6px 0 0;
}

.primary-button {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: #fff;
}

.primary-button--danger {
  border-color: var(--color-danger);
  background: var(--color-danger);
}

.primary-button:hover,
.secondary-button:hover {
  transform: translateY(-1px);
}

.secondary-button {
  background: var(--color-surface);
  color: var(--color-text);
}

.upload-button {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.page-header {
  margin-bottom: 20px;
  margin-top: 20px;
  margin-right: 5px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.role-actions {
  margin-bottom: 20px;
  margin-top: 20px;
}

/* Ajustes Responsivos (Soporte Mobile) */
@media (max-width: 680px) {
  .request-summary,
  .request-filters,
  .form-grid,
  .confirm-panel dl {
    grid-template-columns: 1fr;
  }

  .request-filters {
    margin-bottom: 50px;
    padding: 14px 10px;
  }

  .request-filters__actions {
    width: 100%;
  }

  .request-actions-below-filter {
    flex-direction: column;
  }

  .request-actions-below-filter .primary-button,
  .request-actions-below-filter .secondary-button {
    width: 100%;
    justify-content: center;
  }

  .request-filters__actions .primary-button,
  .request-filters__actions .secondary-button {
    flex: 1 1 140px;
  }
}
</style>