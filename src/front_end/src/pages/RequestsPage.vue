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
      <div
        v-for="item in summary"
        :key="item.label"
        class="request-summary__item"
      >
        <span>{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
      </div>
    </section>

    <!-- Modal de Aceptación de Normatividades -->
    <ModalNormatividad
  v-if="mostrarModalNormatividad"
  :isOpen="mostrarModalNormatividad"
  :documentos="normatividades"
  @close="mostrarModalNormatividad = false"
  @accepted="onNormatividadAceptada"
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

        <label style="position: relative; display: inline-block; width: 100%">
          Búsqueda
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

          <!-- DROPDOWN DE SUGERENCIAS -->
          <ul
            v-if="showSuggestions && filteredSuggestions.length > 0"
            class="search-suggestions-dropdown"
          >
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
          :class="[
            action.key === 'createRequest'
              ? 'primary-button'
              : 'secondary-button',
          ]"
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

    <!-- Vista alternativa para usuarios sin permisos de administrador -->
    <BaseCard
      v-else
      title="Generar Solicitud"
      subtitle="Tu Solicitud quedará pendiente para Revisión Administrativa."
    >
      <p class="request-access-note">
        La consulta, aprobación y rechazo de solicitudes está disponible solo
        para administradores.
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
          <button
            class="icon-action"
            type="button"
            title="Cerrar"
            @click="closeModal"
          >
            <IconSymbol name="x" />
          </button>
        </header>

        <!-- FORMULARIO ESTÁNDAR: Incidencias comunes -->
        <form
          v-if="modal.mode === 'create' && form.tipo !== 'comision'"
          class="request-form"
          @submit.prevent="submitRequest"
        >
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
                :class="{ 'input-error': fechasInvalidas }"
                required
              />
            </label>
          </div>
          <span v-if="fechasInvalidas" class="error-text-hint">
            La Fecha de Fin no puede ser Anterior a la de Inicio.
          </span>

          <!-- INPUT COMPLEMENTARIO DE PDF DINÁMICO -->
          <label
            class="upload-button"
            v-if="
              ['incapacidad', 'maternidad', 'paternidad'].includes(form.tipo)
            "
          >
            Documento Justificante (PDF)
            <div style="margin-top: 5px">
              <button
                class="primary-button"
                type="button"
                @click="triggerFileInput"
              >
                <IconSymbol name="upload" />
                {{
                  form.archivoBinario ? form.archivoBinario.name : "Cargar PDF"
                }}
              </button>
              <input
                ref="fileInput"
                type="file"
                accept="application/pdf"
                style="display: none"
                @change="manejarArchivo"
              />
            </div>
          </label>

          <label>
            Motivo
            <textarea
              v-model="form.motivo"
              rows="4"
              required
              placeholder="Describe brevemente el motivo de la Solicitud o Incidencia"
            />
          </label>

          <footer class="modal-actions">
            <button class="secondary-button" type="button" @click="closeModal">
              Cancelar
            </button>
            <button
              class="primary-button"
              type="submit"
              :disabled="saving || fechasInvalidas"
            >
              <span v-if="saving" class="spinner-container">
                <span class="spinner-icon"></span>
                Procesando...
              </span>
              <span v-else> Crear Solicitud </span>
            </button>
          </footer>
        </form>

        <!-- SUB-FORMULARIO EXTERNO: Comisiones -->
        <div v-else-if="modal.mode === 'create' && form.tipo === 'comision'">
          <label
            style="
              display: grid;
              gap: 7px;
              margin-bottom: 14px;
              font-weight: 700;
              color: var(--color-text-soft);
            "
          >
            Tipo
            <select
              v-model="form.tipo"
              style="
                width: 100%;
                border: 1px solid var(--color-border);
                border-radius: 12px;
                padding: 11px 12px;
              "
            >
              <option value="vacaciones">Vacaciones</option>
              <option value="permiso">Permiso</option>
              <option value="incapacidad">Incapacidad</option>
              <option value="maternidad">Maternidad</option>
              <option value="paternidad">Paternidad</option>
              <option value="comision">Comisión</option>
              <option value="otro">Otro</option>
            </select>
          </label>

          <FormularioComision
            @success="handleComisionSuccess"
            @cancel="closeModal"
          />
        </div>

        <!-- PANEL DE CONFIRMACIONES DE RESOLUCIÓN -->
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
              <dd>
                {{ modal.row?.fecha_inicio }} / {{ modal.row?.fecha_fin }}
              </dd>
            </div>
          </dl>
          <footer class="modal-actions">
            <button class="secondary-button" type="button" @click="closeModal">
              Cancelar
            </button>
            <button
              class="primary-button"
              type="button"
              :class="{
                'primary-button--danger': ['reject', 'delete'].includes(
                  modal.mode,
                ),
              }"
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

 <!-- Plantilla del PDF (Colócala al final de tu componente, fuera del AppTable) -->
<div class="pdf-offscreen-container">
  <div ref="reporteRef" class="pdf-document">
    
    <table class="headeer-tablee">
      <tr>
        <td class="header-left">
          <img :src="logoUrl" alt="Logo Hidalgo" class="pdf-logo" />
        </td>
      </tr>
        </table>

        <table class="header-table">
          <tr>
        <td class="header-right">
          <div class="sec-gob">Secretaría de Gobierno</div>
          <div class="rth-text">Radio y Televisión de Hidalgo</div>
          <div class="oficio-title">Oficio de Comisión</div>
          <!-- DINÁMICO -->
          <div class="oficio-num">{{ obtenerOficioFormateado(comisionSeleccionada)}}</div>
        </td>
      </tr>
    </table>

    <div class="date-section">
      Pachuca de Soto, Hgo., a {{ formatearFechaLarga(comisionSeleccionada.fecha_inicio || comisionSeleccionada.created_at)}}
    </div>

    <table class="data-table">
      <tr>
        <td class="label-cell">Nombre del trabajador:</td>
        <td class="value-cell bold-text">{{ comisionSeleccionada.empleado_nombre || comisionSeleccionada.empleado }}</td>
      </tr>
      <tr>
        <td class="label-cell">Adscripción:</td>
        <td class="value-cell">{{ comisionSeleccionada.empleado_adscripcion }}</td>
      </tr>
      <tr>
        <td class="label-cell">Tipo de nombramiento:</td>
        <td class="value-cell">{{ comisionSeleccionada.empleado_nombramiento }}</td>
      </tr>
      <tr>
        <td class="label-cell">No. de Empleado:</td>
        <td class="value-cell">{{ comisionSeleccionada.No_de_empleado || comisionSeleccionada.empleado_id }}</td>
      </tr>
    </table>

    <div class="checkbox-container">
      <table class="checkbox-table">
        <tr>
          <td class="checkbox-item">
            BASE 
            <div class="checkbox-box" :class="{ marked: comisionSeleccionada.tipo_personal === 'BASE' }">
              {{ comisionSeleccionada.tipo_personal === 'BASE' ? 'X' : '' }}
            </div>
          </td>
          <td class="checkbox-item">
            CONFIANZA 
            <div class="checkbox-box" :class="{ marked: comisionSeleccionada.tipo_personal === 'CONFIANZA' }">
              {{ comisionSeleccionada.tipo_personal === 'CONFIANZA' ? 'X' : '' }}
            </div>
          </td>
          <td class="checkbox-item">
            HONORARIOS 
            <div class="checkbox-box" :class="{ marked: comisionSeleccionada.tipo_personal === 'HONORARIOS' }">
              {{ comisionSeleccionada.tipo_personal === 'HONORARIOS' ? 'X' : '' }}
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div class="content-section">
      <p class="content-text">
    Por este conducto me permito informarle que ha sido comisionado para el día 
    <strong>{{ formatearFechaLarga(comisionSeleccionada.fecha_inicio) }}</strong>, 
    para asistir a {{ comisionSeleccionada.lugar || comisionSeleccionada.destino }}
    {{ obtenerMotivoLimpio(comisionSeleccionada) }}.
  </p>
    </div>

    <table class="schedule-table">
      <tr>
        <td class="schedule-cell">
          <strong>Salida:</strong> {{ comisionSeleccionada.hora_salida || comisionSeleccionada.hora_inicio || '09:00' }} hrs.
        </td>
        </tr>
        <tr>
        <td class="schedule-cell">
          <strong>Regreso:</strong> {{ comisionSeleccionada.hora_regreso || comisionSeleccionada.hora_fin || '18:00' }} hrs.
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
          <div class="signature-space"></div> 
          <div class="signature-line"></div>
          <div class="signature-name">Mtra. Isela Guadalupe Espinoza Lopez</div>
          <div class="signature-title">Directora de Administración y Finanzas</div>
        </td>
        <td class="signature-cell">
          <div class="signature-role">Acepto Comisión</div>
          <div class="signature-space"></div> 
          <div class="signature-line"></div>
          <div class="signature-name">{{ comisionSeleccionada.empleado_nombre || comisionSeleccionada.empleado }}</div>
          <div class="signature-title">{{ comisionSeleccionada.empleado_nombramiento }}</div>
        </td>
      </tr>
    </table>

  </div>
</div>



<div style="display: none; " >
  <div id="pdf-formato-1" class="pdf-container">
    <div class="header-right">
      <p><strong>Pachuca de Soto, Hgo., a {{ form.fecha_solicitud }}</strong></p>
      <p><strong>Asunto:</strong> Solicitud de Autorización de Vacaciones</p>
    </div>

    <div class="recipient-block">
      <p><strong>Mtra Isela Guadalupe Espinosa López</strong></p>
      <p>Directora de Administración y Finanzas</p>
      <p><strong>PRESENTE</strong></p>
      <p class="attn">Atn. LASC. Lorena Barrera Soto <br>Subdirectora Adjunta de Recursos Humanos</p>
    </div>

    <div class="body-text">
      <p>
        Por medio del presente, aprovecho la ocasión para saludarlo coordialmente y a la vez,
        solicitar su autorización para que me sea otorgado <strong>{{ form.dias_solicitados }}</strong>,
        a cuenta de mi {{ form.periodo }} periodo vacacional del ejercicio 2026,
        reanudando mis actividades el dia <strong>{{ form.fecha_reanudacion }}</strong>.
      </p>
      <p>
        Esta solicitud se formula conforme a lo señalado en los numerales 96, Inciso II (julio-octubre) y el 101 del acuerdo
        que contiene las politicas, Bases y Lineamientos para la administración de los recursos humanos al servicio del Poder Ejecutivo del Estado de Hidalgo.
      </p>
      <p>
        Agradezco de antemano su atención y quedo a su disposición para cualquier aclaración.
      </p>
    </div>

    <div class="signatures-section">
      <div class="signature-row single">
        <div class="signature-box">
          <p class="role-title">Solicito</p>
          <p class="name">{{ form.empleado_nombre }}</p>
          <p class="position">{{ form.empleado_puesto }}</p>
        </div>

      </div>


      <div class="signature_row dual">
        <div class="signature-box">
          <p class="role-title">Autorizó</p>
          <p class="name">{{ form.director_area_nombre }}</p>
          <p class="position">{{ form.director_area_puesto }}</p>
        </div>

        <div class="signature_row dual">
          <div class="signature_box">
            <p class="role-title">Vo. Bo.</p>
            <p class="name">LASC. Lorena Barrera Soto</p>
            <p class="position">Subdirectora de adjunta de Recursos Humanos </p>
          </div>

          <div class="signature-box">
            <p class="role-title">Vo. Bo.</p>
            <p class="name">Mtra. Isela Guadalupe Espinosa Soto</p>
            <p class="position"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>


  


 
</template>



<script setup>
import { computed, onMounted, reactive, ref } from "vue"; //Importación de funciones reactivas de Vue3
import { watch } from "vue"; //Importación de función para observar cambios en variables reactivas
import axios from "axios"; // Axios importado para traer las normatividades
import { nextTick } from "vue";//Funcion reactiva de Vue3
import html2pdf from "html2pdf.js"; //Para generar Pdfs
import logopdf from "@/assets/logopdf.png"//Imagen que se usa en el Pdf del formato de Comision

import BaseCard from "@/components/ui/BaseCard.vue";//Componente de targeta madre para mostrar contenido en secciones
import AppTable from "@/components/ui/AppTable.vue";//Componente de tabla para mostrar datos en formato tabular
import IconSymbol from "@/components/ui/IconSymbol.vue";//Componente para mostrar iconos de botones

import PageHeader from "@/components/shared/PageHeader.vue";//Componente de encabezado de pagina con titulo y subtitulos

import StatusBadge from "@/components/shared/StatusBadge.vue";//Componente para mostrar el estatus de un registro con un badge visual
import requestsService from "@/services/requests.service";//Servicio para gestionar las solicitudes
import { getRoleActions, hasAnyRole, ROLE_GROUPS } from "@/utils/permissions";//Manejo de permisos, accesos a botones y acciones según el rol del usuario
import { useAuthStore } from "@/store/auth";//Acceso al store de autenticación para obtener el token y rol del usuario
import ModalNormatividad from "@/components/shared/ModalNormatividad.vue";//Importación del componente del modal para Leer y aceptar las Normatividades
import FormularioComision from "@/components/shared/FormularioComision.vue";// Importacion del Componente del Formulario especifico para Comisiones

const logoUrl = logopdf
const reporteRef = ref(null);
import BaseCard from "@/components/ui/BaseCard.vue"; //Componente de targeta madre para mostrar contenido en secciones
import AppTable from "@/components/ui/AppTable.vue"; //Componente de tabla para mostrar datos en formato tabular
import IconSymbol from "@/components/ui/IconSymbol.vue"; //Componente para mostrar iconos de botones
import PageHeader from "@/components/shared/PageHeader.vue"; //Componente de encabezado de pagina con titulo y subtitulos
import RoleActionBar from "@/components/shared/RoleActionBar.vue"; //Componente para botones de acción según el rol del usuario
import StatusBadge from "@/components/shared/StatusBadge.vue"; //Componente para mostrar el estatus de un registro con un badge visual
import requestsService from "@/services/requests.service"; //Servicio para gestionar las solicitudes
import { getRoleActions, hasAnyRole, ROLE_GROUPS } from "@/utils/permissions"; //Manejo de permisos, accesos a botones y acciones según el rol del usuario
import { useAuthStore } from "@/store/auth"; //Acceso al store de autenticación para obtener el token y rol del usuario
import ModalNormatividad from "@/components/shared/ModalNormatividad.vue"; //Importación del componente del modal para Leer y aceptar las Normatividades
import FormularioComision from "@/components/shared/FormularioComision.vue"; // Importacion del Componente del Formulario especifico para Comisiones

const authStore = useAuthStore(); //Acceso al store de Autenticación para obtener el token y el rol del usuario

const rows = ref([]);//Inicializa vacío para llenar desde la API

const mostrarModalNormatividad = ref(true); // Se muestra al inicio
const solicitudesHabilitadas = ref(false);  // Controla el acceso a las solicitude

const saving = ref(false);// Controla el estado de guardado para deshabilitar el botón y mostrar un mensaje de carga
const fileInput = ref(null);
const showSuggestions = ref(false);
const activeSuggestionIndex = ref(-1);
let debounceTimeout = null;

// Variables reactivas para las Normatividades
const isNormativityModalOpen = ref(false);

// Variable reactiva para almacenar las normatividades obtenidas desde la API
const normatividades = ref([]);

// Variable reactiva para el Toast de notificaciones - el toast es un mensaje emergente que aparece temporalmente para informar al usuario sobre el resultado de una acción.
const toast = reactive({ visible: false, title: "", message: "", tone: "success" });



//info react del user-Prueba_PDF
const comision = ref({
  oficio_num: 'RTH/DAF/TI/051/2026',
  nombre: '',
  puesto: '',
  motivo: '',
  fecha_comision: '',
  hora_salida: '',
  hora_regreso: ''
})

const comisionSeleccionada = ref({});
const pdfArea = ref(null)

const descargarPDFComision = async (row) => {
  // 1. Inyectamos la información de la fila seleccionada
  comisionSeleccionada.value = row;

  // 2. Esperamos a que Vue actualice el DOM de la plantilla oculta
  await nextTick();

  // 3. Generamos el PDF con html2pdf.js
  const element = reporteRef.value;
  const opciones = {
    margin:       [2,0,0,0],
    filename:     `Oficio_Comision_${row.id || RTH || 'documento'}.pdf`,
    image:        { type: 'jpeg', quality: 0.60 },
    html2canvas:  { scale: 3, useCORS: true, letterRendering: true, dpi:300 },
    jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opciones).from(element).save();
};



const formatearFechaLarga = (fechaStr) => {
  if (!fechaStr) return '';
  const [year, month, day] = fechaStr.split('T')[0].split('-');
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return `${parseInt(day, 10)} de ${meses[parseInt(month, 10) - 1]} de ${year}`;
};

// Genera el número de oficio con formato (ej: RTH/DAF/TI/015/2026)
const obtenerOficioFormateado = (comision) => {
  if (comision.oficio_num || comision.oficio) return comision.oficio_num || comision.oficio;
  const numPad = String(comision.id || 1).padStart(3, '0');
  const anio = comision.fecha_inicio ? comision.fecha_inicio.split('-')[0] : '2026';
  return `RTH/DAF/TI/${numPad}/${anio}`;
};


const obtenerMotivoLimpio = (comision) => {
  let texto = comision.motivo || comision.actividad || comision.descripcion || '';
  
  // Si el texto incluye "Hora de salida", cortamos el texto justo antes de esa frase
  if (texto.includes('Hora de salida:')) {
    texto = texto.split('Hora de salida:')[0];
  }
  
  return texto.trim();
};

/**
 * ESCUCHA DE FORMULARIO DE COMISIÓN EXTERNO:
 * Se activa mediante el callback emitido por el subcomponente <FormularioComision>.
 */

const handleComisionSuccess = (nuevaComision) => {
  // 1. Agregas la nueva comisión a la tabla
  rows.value.unshift(normalizeRow(nuevaComision));
  
  // 2. Muestras la notificación de éxito
  showToast("Comisión Creada", "El formato de comisión fue registrado.");
  
  // 3. Cierras el modal
  closeModal();
};



const toast = reactive({
  visible: false,
  title: "",
  message: "",
  tone: "success",
});

// Variable reactiva para el modal de creación y resolución de solicitudes
const modal = reactive({
  visible: false,
  mode: "",
  title: "",
  eyebrow: "",
  message: "",
  confirmLabel: "",
  row: null,
});

// Variables reactivas para el formulario de creación de solicitudes
const form = reactive({
  tipo: "vacaciones",
  oficio: "",
  fecha_inicio: "",
  fecha_fin: "",
  motivo: "",
  archivoBinario: null
});

// Variables reactivas para los filtros de búsqueda
const filters = reactive({
  type: "empleado",
  term: "",
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
  { key: "acciones", label: "Acciones" },
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

  // --- CASO 1: EL BUSCADOR ESTÁ VACÍO (Dió click al input sin escribir) ---
  if (!term) {
    return rows.value.slice(0, 5).map((row) => {
      const folioNormalizado = row.id?.startsWith?.("FOL-")
        ? row.id
        : `FOL-${row.id}`;
      return {
        id: row.id,
        text:
          filters.type === "rfc"
            ? `${row.empleado_rfc || "Sin RFC"} - ${row.empleado_nombre || "Sin nombre"}`
            : filters.type === "folio"
              ? folioNormalizado
              : `${row.No_de_empleado || "S/N"} - ${row.empleado_nombre || "Sin nombre"}`,
        value:
          filters.type === "rfc"
            ? row.empleado_rfc
            : filters.type === "folio"
              ? folioNormalizado
              : row.No_de_empleado,
      };
    });
  }

  // --- CASO 2: EL USUARIO YA ESTÁ ESCRIBIENDO ---

  // 1. Convertimos los términos para hacer comparaciones limpias sin importar si son números o letras
  const esNumeroBuscado = /^\d+$/.test(term);
  const terminoLimpioDeFolio = term.replace("fol-", "").trim(); // Si escribió "FOL-1", extrae solo el "1"

  const sugerenciasFiltradas = rows.value.filter((row) => {
    const rfc = String(row.empleado_rfc || "").toLowerCase();
    const nombre = String(row.empleado_nombre || "").toLowerCase();
    const numeroEmp = String(row.No_de_empleado || "").toLowerCase();

    // Obtenemos el ID numérico puro (ej: 1) y el string normalizado (ej: "fol-1")
    const idStringOriginal = String(row.id || "")
      .toLowerCase()
      .replace("fol-", "");
    const folioCompletoStr = String(
      row.id?.startsWith?.("FOL-") ? row.id : `FOL-${row.id}`,
    ).toLowerCase();

    // Filtro estricto para Folios
    if (filters.type === "folio") {
      if (esNumeroBuscado) {
        // Si buscas "1", el ID original debe ser exactamente "1", o empezar con "1" (ej: 1, 10, 11... pero NUNCA el 2 o el 3)
        return idStringOriginal.startsWith(term);
      }
      // Si escribió letras (ej: "fol-1"), lo busca en el string completo
      return (
        folioCompletoStr.includes(term) ||
        idStringOriginal.includes(terminoLimpioDeFolio)
      );
    }

    // Filtro para RFC
    if (filters.type === "rfc") {
      return rfc.includes(term);
    }

    // Filtro para Empleado
    return nombre.includes(term) || numeroEmp.includes(term);
  });

  // 2. Ordenamiento inteligente (Prioriza que flote hasta arriba la coincidencia exacta)
  return sugerenciasFiltradas
    .sort((a, b) => {
      const idA = String(a.id || "")
        .toLowerCase()
        .replace("fol-", "");
      const idB = String(b.id || "")
        .toLowerCase()
        .replace("fol-", "");

      if (filters.type === "folio") {
        // Si uno es la coincidencia exacta del número (ej: escribió "1" e ID es "1"), va primero
        if (idA === term) return -1;
        if (idB === term) return 1;
        return idA.localeCompare(idB, undefined, { numeric: true });
      }

      const valA =
        filters.type === "rfc"
          ? String(a.empleado_rfc || "")
          : String(a.No_de_empleado || "");
      const valB =
        filters.type === "rfc"
          ? String(b.empleado_rfc || "")
          : String(b.No_de_empleado || "");

      return (
        valB.toLowerCase().startsWith(term) -
        valA.toLowerCase().startsWith(term)
      );
    })
    .slice(0, 8) // Cortamos los mejores 8 resultados ya ordenados correctamente
    .map((row) => {
      const folioNormalizado = row.id?.startsWith?.("FOL-")
        ? row.id
        : `FOL-${row.id}`;

      let text = row.empleado_nombre;
      let value = row.No_de_empleado;

      if (filters.type === "rfc") {
        text = `${row.empleado_rfc} - ${row.empleado_nombre}`;
        value = row.empleado_rfc;
      } else if (filters.type === "folio") {
        text = folioNormalizado;
        value = folioNormalizado; // Se inyectará "FOL-1" completito al input al dar click
      } else if (filters.type === "empleado") {
        text = `${row.No_de_empleado} - ${row.empleado_nombre}`;
        value = row.No_de_empleado;
      }

      return { id: row.id, text, value };
    });
});

// --- SEGURIDAD Y PERMISOS COMPUTADOS ---
const roleActions = computed(() => getRoleActions(authStore.user, "requests"));
const headerActions = computed(() =>
  roleActions.value.filter((action) =>
    ["createRequest", "viewRequests"].includes(action.key),
  ),
);
const canViewRequests = computed(() =>
  roleActions.value.some((action) => action.key === "viewRequests"),
);
const currentEmployeeId = computed(() =>
  authStore.user?.empleado_id
    ? `EMP-${String(authStore.user.No_de_empleado).padStart(3, "0")}`
    : null,
);
const canApproveRequests = computed(() =>
  hasAnyRole(authStore.user, ROLE_GROUPS.APPROVERS),
);
const showSuggestions = ref(false); // Controla si se muestra el menú flotante de sugerencias
const activeSuggestionIndex = ref(-1); // Controla la sugerencia seleccionada con el teclado (flechas)
let debounceTimeout = null; // Almacena el temporizador para no saturar al servidor al escribir

/**
 * CONTADORES RÁPIDOS: Agrupa la suma total por estatus para renderizar tarjetas en el dashboard.
 */
const summary = computed(() => [
  {
    label: "Pendientes",
    value: rows.value.filter((row) => row.estatus === "pendiente").length,
  },
  {
    label: "Aprobadas",
    value: rows.value.filter(
      (row) => row.estatus === "aprobada" || row.estatus === "aprobado",
    ).length,
  },
  {
    label: "Rechazadas",
    value: rows.value.filter(
      (row) => row.estatus === "rechazada" || row.estatus === "rechazado",
    ).length,
  },
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

// VALIDADOR Y CARGADOR DE ADJUNTOS BINARIOS:
// Captura el evento nativo onChange del file input y restringe que sea estrictamente PDF.
const manejarArchivo = (event) => {
  const archivo = event.target.files[0];

  if (archivo) {
  if (archivo.type !== "application/pdf")  {

    //Mensaje en caso de cargar un formato distinto al requerido o al intentar subir más de un archivo 
    showToast("Archivo Invalido: ", "Por Favor suba únicamente un archivo PDF.", "warning");
    form.archivoBinario = null;
    event.target.value = "";

    //
    return;

    //
  }
  form.archivoBinario = archivo;
  }
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
  tipo: row.tipo
    ? row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1)
    : "Otro",
  estatus:
    row.estatus === "aprobado"
      ? "aprobada"
      : row.estatus === "rechazado"
        ? "rechazada"
        : row.estatus,
  aprobado_por: row.aprobado_por || "Pendiente",
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
    let terminoLimpio = filters.term;

    // Si estás buscando por folio, le mochamos el "FOL-" para que el backend reciba el número limpio
    if (filters.term && filters.type === "folio") {
      terminoLimpio = filters.term.toLowerCase().replace("fol-", "").trim();
    }

    const params = filters.term
      ? { buscar: terminoLimpio, filtro: filters.type } // Usamos terminoLimpio aquí
      : {};

    const data = await requestsService.list(params);
    rows.value = data.map(normalizeRow);
  } catch (error) {
    rows.value = [];
    showToast(
      "No se pudo cargar el módulo",
      getRequestErrorMessage(error),
      "warning",
    );
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
    mostrarModalNormatividad.value = true;
  } else {
    openCreateModal();
  }
};

const onNormatividadAceptada = async () => {

  mostrarModalNormatividad.value = false;
  solicitudesHabilitadas.value = true;
  await nextTick();
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

  // Si escribe "f", "fol" o un número que coincide exactamente con un ID de folio existente
  const esNumeroPuro = /^\d+$/.test(cleanTerm);
  const coincideConAlgunFolio =
    esNumeroPuro && rows.value.some((r) => String(r.id) === cleanTerm);

  if (
    filters.type === "empleado" &&
    (cleanTerm.startsWith("f") ||
      cleanTerm.startsWith("fol") ||
      coincideConAlgunFolio)
  ) {
    filters.type = "folio";
  }

  const rfcPattern = /^[a-z]{4}\d/;
  if (filters.type === "empleado" && rfcPattern.test(cleanTerm)) {
    filters.type = "rfc";
  }

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
    activeSuggestionIndex.value =
      (activeSuggestionIndex.value + 1) % filteredSuggestions.value.length;
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    activeSuggestionIndex.value =
      (activeSuggestionIndex.value - 1 + filteredSuggestions.value.length) %
      filteredSuggestions.value.length;
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (
      activeSuggestionIndex.value >= 0 &&
      activeSuggestionIndex.value < filteredSuggestions.value.length
    ) {
      selectSuggestion(filteredSuggestions.value[activeSuggestionIndex.value]);
    }
  } else if (event.key === "Escape") {
    showSuggestions.value = false;
    activeSuggestionIndex.value = -1;
  }
};

const selectSuggestion = (suggestion) => {
  // En lugar de recortar cadenas con split, usamos directamente el "value"
  // que ya viene procesado con el dato exacto para la búsqueda (RFC, Folio o No. Empleado)
  filters.term = String(suggestion.value);

  showSuggestions.value = false;
  activeSuggestionIndex.value = -1;
  loadRequests(); // Dispara la búsqueda real
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
    if (action.key === "createRequest" || action.key === "viewRequests")
      return false;
    if (action.key === "deleteRequest") return pending && isOwner;
    if (["approveRequest", "rejectRequest"].includes(action.key))
      return pending && canApproveRequests.value;
    if (action.key === "manageIncident") return canApproveRequests.value;
    if (action.key === "downloadRequestDocument")
      return canApproveRequests.value || isOwner;
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
    gestionarDescargarDocumento(row);//Esto permite que descargue el pdf donde corresponda
    return;
  }
  showToast(
    action.label,
    row ? `Seleccionaste ${row.id}.` : "Consulta disponible en la tabla.",
  );
};


const gestionarDescargarDocumento = async (row) => {
  // Convertimos el tipo a minúsculas para evitar problemas con Mayúsculas/Acentos
  const tipoSolicitud = (row.tipo || '').toLowerCase();

  // 1. Si es comisión -> Genera el PDF de comisión
  if (tipoSolicitud.includes('comisi')) {
    descargarPDFComision(row);
    return;
  } 
  
  // 2. Si tiene un archivo subido/adjunto -> Abre el archivo en una pestaña nueva
  if (row.archivo_url || row.documento_path || row.adjunto) {
    const fileUrl = row.archivo_url || row.documento_path || row.adjunto;
    window.open(fileUrl, '_blank');
    return; 
  } 

  // 3. Si no tiene nada -> Solo muestra el aviso y NO descarga nada
  showToast(
    "Aviso", 
    `La solicitud de tipo "${row.tipo}" no cuenta con un documento para descargar.`
  );
  return; 
};


/**
 * CONSTRUCTOR DEL MODAL DE ALTA: Inicializa los estados del formulario a sus valores por defecto.
 */
const openCreateModal = () => {
  Object.assign(form, {
    tipo: "vacaciones",
    oficio: "",
    fecha_inicio: "",
    fecha_fin: "",
    motivo: "",
    archivoBinario: null,
  });
  if (fileInput.value) fileInput.value.value = "";
  Object.assign(modal, {
    visible: true,
    mode: "create",
    eyebrow: "Captura",
    title: "Nueva solicitud",
    row: null,
  });
};

/**
 * CONSTRUCTOR DEL MODAL DE RESOLUCIÓN (APROBACIONES/RECHAZOS/ELIMINACIÓN):
 * Centraliza las etiquetas de texto según la acción crítica seleccionada.
 */
const openResolutionModal = (mode, row) => {
  const config = {
    approve: {
      eyebrow: "Autorización",
      title: "Aprobar solicitud",
      message: "Vas a aprobar la solicitud",
      confirmLabel: "Aprobar",
    },
    reject: {
      eyebrow: "Resolución",
      title: "Rechazar solicitud",
      message: "Vas a rechazar la solicitud",
      confirmLabel: "Rechazar",
    },
    delete: {
      eyebrow: "Eliminación",
      title: "Eliminar solicitud",
      message: "Vas a eliminar la solicitud",
      confirmLabel: "Eliminar",
    },
  };

  Object.assign(modal, {
    visible: true,
    mode,
    row,
    ...config[mode],
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
    showToast(
      "Fecha no permitida",
      "Selecciona el día actual o una fecha posterior.",
      "warning",
    );
    return;
  }
  if (form.fecha_fin < form.fecha_inicio) {
    showToast(
      "Periodo no válido",
      "La fecha final no puede ser anterior a la fecha de inicio.",
      "warning",
    );
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
    showToast(
      "La Solicitud ha sido creada",
      "La Solicitud queda pendiente a revisión",
    );
  } catch (error) {
    showToast(
      "No se pudo crear la Solicitud",
      getRequestErrorMessage(error),
      "warning",
    );
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
      showToast(
        "Solicitud eliminada",
        `${modal.row.id} fue eliminada correctamente.`,
      );
    }
  } catch (error) {
    showToast(
      "No se pudo completar la acción",
      getRequestErrorMessage(error),
      "warning",
    );
  } finally {
    saving.value = false;
    closeModal();
  }
};


const replaceRow = (updated) => {
  rows.value = rows.value.map((row) => (row.id === updated.id ? updated : row));
};


onMounted(() => {
  loadRequests(); // Al arrancar, monta las solicitudes iniciales.
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
  background: linear-gradient(
    135deg,
    var(--color-primary),
    var(--color-primary-soft)
  );
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
  to {
    transform: rotate(360deg);
  }
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



/*si*/
.test-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background-color: #f3f4f6;
  min-height: 100vh;
}

/* Panel superior de control */
.control-panel {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  margin-bottom: 25px;
  text-align: center;
}

.control-panel h2 {
  margin: 0 0 10px 0;
  color: #1e293b;
}

.btn {
  padding: 12px 24px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary {
  background-color: #691c32; /* Guinda institucional */
  color: white;
}

.btn-primary:hover {
  background-color: #4c1222;
}

/* Área gris de fondo para simular una hoja real */
.preview-box {
  display: flex;
  justify-content: center;
  background-color: #525659;
  padding: 40px 20px;
  border-radius: 8px;
  overflow-x: auto;
}

/* HOJA DE DISEÑO EXACTO (Tamaño Carta real) */
.pdf-document {
  width: 215.9mm;
  min-height: 279.4mm;
  padding: 20mm 15mm;
  background-color: white;
  box-sizing: border-box;
  color: #2b2b2b;
  font-size: 11pt;
  line-height: 1.6;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

/* Encabezado */
.header-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.header-tablee {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
  margin-top: 20px;
}

.headeer-tablee {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
  margin-top: 20px;
}

.header-left {
  width: 45%;
  vertical-align: top;
  text-align: left;
  justify-content: left;

}

.pdf-logo {
  max-height: 240px;
  width: 240px;
  vertical-align: top;
  text-align: center;
  margin-bottom: 5px;
  justify-content: left;
  text-align: left;
  object-fit: contain;
  margin-left: 70% ;
}

.gob-title {
  font-size: 15pt;
  font-weight: bold;
  color: #691c32; /* Guinda Hidalgo */
  letter-spacing: 0.8px;
  line-height: 1.1;
}

.gob-subtitle {
  font-size: 10pt;
  font-weight: 600;
  color: #bc955c; /* Dorado Hidalgo */
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.header-right {
  width: 55%;
  vertical-align: middle;
  text-align: center;
  padding-left: 15px;
}

.sec-gob {
  font-weight: bold;
  font-size: 11pt;
  color: #444444;
}

.secc-goob {
  font-weight: bold;
  font-size: 11pt;
  color: #444444;
}

.rth-text {
  font-size: 11pt;
  color: #666666;
  font-weight: bold;
}


.rth-texxt {
  font-size: 11pt;
  color: #666666;
  font-weight: bold;
}

.oficio-title {
  font-size: 11.5pt;
  font-weight: bold;
  color: #2b2b2b;
}

.oficio-num {
  font-size: 11pt;
  font-weight: bold;
  color: #000;
}

/* Fecha */
.date-section {
  text-align: right;
  font-size: 10pt;
  color: #555555;
  margin-bottom: 25px;
  font-weight: 600;
  margin-left: 20px;
}

/* Tabla de datos del trabajador */
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table td {
  padding: 6px 0;
  vertical-align: middle;
}

.dataa-tablee td {
  vertical-align: middle;
}

.label-cell {
  font-weight: bold;
  color: #444444;
  width: 28%;
  font-size: 10pt;
}

.value-cell {
  color: #111111;
  font-size: 11pt;
}

.bold-text {
  font-weight: bold;
}

/* Checkboxes (Base, Confianza, Honorarios) */
.checkbox-container {
  width: 100%;
  margin: 15px 0 25px 0;
  padding: 10px;
  border-radius: 4px;
}

.checkbox-table {
  width: 100%;
  border-collapse: collapse;
}

.checkbox-item {
  width: 33.33%;
  text-align: center;
  vertical-align: middle;
  font-size: 10pt;
  font-weight: bold;
  color: #444444;
}

.checkbox-box {
  display: inline-block;
  width: 35px;
  height: 35px;
  border: 2px solid #000;
  margin-left: 8px;
  vertical-align: middle;
  text-align: center;
  line-height: 14px;
  font-weight: bold;
  color: #691c32;
}

.checkbox-box.marked {
  background-color: #691c32;
  color: white;
}

/* Cuerpo del oficio */
.content-section {
  margin-bottom: 25px;
  text-align: justify;
}

.content-text {
  font-size: 11pt;
  text-indent: 30px; /* Sangría inicial idéntica al original */
}

/* Horarios */
.schedule-table {
  width: 100%;
  margin-bottom: 30px;
  border-collapse: collapse;
}

.schedule-cell {
  width: 50%;
  font-size: 11pt;
}


.farewell-text {
  font-size: 11pt;
  margin-bottom: 50px;
}

/* Sección de Firmas */
.signature-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 40px;
}

.signature-cell {
  width: 50%;
  text-align: center;
  vertical-align: top;
  padding: 0 15px;
}

.signature-role {
  font-size: 10.5pt;
  font-weight: bold;
  text-transform: uppercase;
}

.signature-space {
  height: 65px; /* Espacio exacto para plasmar la firma */
}


.signature-name {
  font-size: 10pt;
  font-weight: bold;
  color: #2b2b2b;
}

.signature-title {
  font-size: 9pt;
  color: #666666;
  margin-top: 2px;
}



/* Oculta la plantilla visualmente de la pantalla sin desactivar su renderizado */
.pdf-offscreen-container {
  position: absolute;
  left: -9999px;
  top: 0;
}

/* Hoja Carta para el PDF */
.pdf-document {
  width: 215mm;
  min-height: 279mm;
  padding: 10mm;
  background-color: white;
  color: black;
  font-family: Arial, sans-serif;
}

/* Control de espacios en el encabezado */
.header-center {
  text-align: center;
}

.txt-secretaria {
  margin: 0;
  font-size: 14pt;
  font-weight: bold;
}

.txt-institucion {
  margin: 0;
  font-size: 12pt;
  color: #555;
}

.txt-titulo {
  margin-top: 4px; /* Espacio mínimo para evitar el hueco grande */
  margin-bottom: 2px;
  font-size: 16pt;
  font-weight: bold;
}

.txt-folio {
  margin: 0;
  font-size: 11pt;
  font-weight: bold;
}

.body-content {
  margin-top: 20px;
  line-height: 1.5;
}





</style>

