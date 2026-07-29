<template>
  <div>
    <PageHeader
      class="header-summary"
      title="Directorio"
      description="Consulta de personal datos generales y datos empresariales ."
    />

    <p v-if="notice" class="notice">{{ notice }}</p>

    <BaseCard class="headd" title="Busqueda">
      <form class="filter-grid" @submit.prevent="resetPaginationAndFetch">
        <label class="field">
          <span> NO. de Empleado o Nombre</span>
          <input
            ref="searchInputRef"
            v-model="searchTerm"
            @change="resolveEmployeeSelection"
            list="employeeSuggestions"
            placeholder="EMP-001 / Nombre"
          />
          <datalist id="employeeSuggestions">
            <option
              v-for="option in employeeSuggestions"
              :key="option"
              :value="option"
            />
          </datalist>
        </label>

        <template v-if="showDepartamentoPuesto">
          <label class="field">
            <span>Departamento</span>
            <input
              v-model="departamentoName"
              @change="resolveDepartamentoSelection"
              :list="filteredDepartamentos.length ? 'departamentoList' : null"
              :disabled="!filteredDepartamentos.length"
              placeholder="Selecciona o Escribe Departamento"
            />
            <datalist id="departamentoList">
              <option
                v-for="dep in filteredDepartamentos"
                :key="dep.id"
                :value="dep.nombre"
              />
            </datalist>
          </label>
          <label class="field">
            <span>Dirección</span>
            <input
              v-model="direccionName"
              @change="resolveDireccionSelection"
              list="direccionList"
              placeholder="Selecciona o Escribe Dirección"
            />
            <datalist id="direccionList">
              <option
                v-for="dir in direcciones"
                :key="dir.id"
                :value="dir.nombre"
              />
            </datalist>
          </label>

          <label class="field">
            <span>Puesto</span>
            <input
              v-model="puestoName"
              @change="resolvePuestoSelection"
              :list="filteredPuestos.length ? 'puestoList' : null"
              :disabled="!filteredPuestos.length"
              placeholder="Selecciona o Escribe Puesto"
            />
            <datalist id="puestoList">
              <option
                v-for="puesto in filteredPuestos"
                :key="puesto.id"
                :value="puesto.nombre"
              />
            </datalist>
          </label>
        </template>

        <div class="filter-actions">
          <button
            type="button"
            class="secondary"
            @click="showDepartamentoPuesto = !showDepartamentoPuesto"
          >
            <IconSymbol name="filter" /> Filtros
          </button>
          <button type="submit" class="primary-button">
            <IconSymbol name="search" /> Buscar
          </button>
          <button type="button" class="secondary" @click="clearFilters">
            <IconSymbol name="clear" /> Limpiar
          </button>
          <button type="button" class="ghost-button" @click="loadDirectory">
            <IconSymbol name="reset" /> Actualizar
          </button>
        </div>
      </form>
    </BaseCard>

    <div class="section-gap">
      <BaseCard
        title="Resultados"
        subtitle="Lista de empleados que cumplen los criterios de búsqueda."
      >
        <AppTable :columns="columns" :rows="employees" idField="id">
          <template #estatus="{ row }">
            <StatusBadge :value="row.estatus" />
          </template>
          <template #acciones="{ row }">
            <div class="row-actions">
              <button
                type="button"
                class="link-button"
                @click="selectEmployee(row)"
              >
                Ver Datos
              </button>
              <button
                type="button"
                class="link-button"
                @click="viewOrganigrama(row)"
              >
                Ver Organigrama
              </button>
            </div>
          </template>
        </AppTable>
        <p v-if="!employees.length && !loading" class="empty-state">
          No se encontraron empleados con esos filtros.
        </p>

        <div v-if="employees.length" class="pagination-container">
          <button
            type="button"
            class="pagination-button"
            :disabled="currentPage == 1 || loading"
            @click="changePage(-1)"
          >
            Anterior
          </button>

          <span class="pagination-info"
            >Pagina <strong> {{ currentPage }}</strong> De
            <strong> {{ totalPages }} </strong>
          </span>

          <button
            type="button"
            class="pagination-button"
            :disabled="currentPage >= totalPages || loading"
            @click="changePage(1)"
          >
            Siguiente
          </button>
        </div>
      </BaseCard>
    </div>

    <div class="section-gap" ref="employeeDetailsRef">
      <BaseCard
        title="Datos Generales"
        subtitle="Información del empleado seleccionado para consulta inmediata."
      >
        <div v-if="selectedEmployee" class="employee-details">
          <div class="details-grid">
            <section class="personal-data">
              <h3>Datos Personales</h3>
              <dl>
                <dt class="field-title-data">No. de Empleado:</dt>
                <dd class="field-data">
                  {{
                    selectedEmployee.No_de_empleado ||
                    "No se encontró el número del empleado"
                  }}
                </dd>
                <dt class="field-title-data">Nombre:</dt>
                <dd class="field-data">
                  {{
                    selectedEmployee.nombreCompleto || "Nombre no disponible"
                  }}
                </dd>
                <dt class="field-title-data">CURP:</dt>
                <dd class="field-data">
                  {{ selectedEmployee.curp || "CURP no disponible" }}
                </dd>
                <dt class="field-title-data">RFC:</dt>
                <dd class="field-data">
                  {{ selectedEmployee.rfc || "RFC no disponible" }}
                </dd>
                <dt class="field-title-data">Tipo de Sangre:</dt>
                <dd class="field-data">
                  {{
                    selectedEmployee.tipo_sangre ||
                    selectedEmployee.tipo_Sanguineo ||
                    "Tipo de sangre no disponible"
                  }}
                </dd>
                <dt class="field-title-data">Fecha de Nacimiento:</dt>
                <dd class="field-data">
                  {{ formatDate(selectedEmployee.fecha_nacimiento) }}
                </dd>
                <dt class="field-title-data">Edad:</dt>
                <dd class="field-data">
                  {{ selectedEmployee.edad || "Edad no disponible" }}
                </dd>
                <dt class="field-title-data">Sexo:</dt>
                <dd class="field-data">
                  {{ selectedEmployee.sexo || "Sexo no disponible" }}
                </dd>
                <dt class="field-title-data">Correo Electrónico:</dt>
                <dd class="field-data">
                  {{
                    selectedEmployee.email ||
                    selectedEmployee.correo_electronico ||
                    "Correo no disponible"
                  }}
                </dd>
                <dt class="field-title-data">Teléfono:</dt>
                <dd class="field-data">
                  {{
                    selectedEmployee.telefono ||
                    selectedEmployee.numero_telefono ||
                    "Teléfono no disponible"
                  }}
                </dd>
              </dl>

              <!-- ========================================================== -->
              <!-- BOTONES Y BLOQUES DE EMERGENCIAS CORREGIDOS -->
              <!-- ========================================================== -->

              <div class="emergency-toggle-container">
                <button
                  type="button"
                  class="emergency-toggle-btn"
                  @click="showEmergencyData = !showEmergencyData"
                >
                  {{
                    showEmergencyData
                      ? "Ocultar Datos de Emergencia"
                      : "Ver Datos de Emergencia"
                  }}
                </button>

                <button
                  type="button"
                  class="register-emergency-data-btn"
                  @click="toggleRegisterEmergency"
                >
                  {{
                    showRegisterEmergencyData
                      ? "Ocultar registro de datos de emergencia"
                      : "Registro de Datos de Emergencia"
                  }}
                </button>
              </div>

              <!-- BLOQUE DESPLEGABLE: VISTA DE DATOS -->
              <transition name="fade-slide">
                <div v-if="showEmergencyData" class="emergency-data-panel">
                  <h4>Contacto de Emergencia</h4>
                  <dl class="emergency-dl">
                    <dt class="field-title-data">Nombre de Contacto:</dt>
                    <dd class="field-data">
                      {{ selectedEmployee.contacto_nombre || "No registrado" }}
                    </dd>

                    <dt class="field-title-data">Parentesco / Relación:</dt>
                    <dd class="field-data">
                      {{
                        selectedEmployee.contacto_parentesco ||
                        selectedEmployee.parentesco_emergencia ||
                        "No especificado"
                      }}
                    </dd>

                    <dt class="field-title-data">Teléfono de Contacto:</dt>
                    <dd
                      class="field-data"
                      style="
                        color: var(--color-danger, #9d2d3e);
                        font-weight: bold;
                      "
                    >
                      {{
                        selectedEmployee.contacto_telefono ||
                        selectedEmployee.telefono_emergencia ||
                        "No disponible"
                      }}
                    </dd>

                    <dt class="field-title-data">Teléfono Alternativo:</dt>
                    <dd
                      class="field-data"
                      style="
                        color: var(--color-danger, #9d2d3e);
                        font-weight: bold;
                      "
                    >
                      {{
                        selectedEmployee.contacto_telefono_alternativo ||
                        "No disponible"
                      }}
                    </dd>

                    <dt class="field-title-data">Direccion:</dt>
                    <dd
                      class="field-data"
                      style="
                        color: var(--color-danger, #9d2d3e);
                        font-weight: bold;
                      "
                    >
                      {{
                        selectedEmployee.contacto_direccion || "No disponible"
                      }}
                    </dd>
                  </dl>
                </div>
              </transition>

              <!-- BLOQUE DESPLEGABLE: FORMULARIO DE REGISTRO / EDICIÓN -->
              <transition name="fade-slide">
                <div v-if="showRegisterEmergencyData" class="emergency-data-panel">
                  <h4>Registro de Contacto de Emergencia</h4>

                  <form
                    @submit.prevent="saveEmergencyData"
                    class="emergency-form"
                  >
                    <dl class="emergency-dl">
                      <dt class="field-title-data">Nombre de Contacto:</dt>
                      <dd class="field-data">
                        <input
                          v-model="formEmergency.contacto_nombre"
                          type="text"
                          placeholder="Ej. Maria Lopez"
                          required
                        />
                      </dd>

                      <dt class="field-title-data">Parentesco / Relación:</dt>
                      <dd class="field-data">
                        <input
                          v-model="formEmergency.contacto_parentesco"
                          type="text"
                          placeholder="Ej. Esposa, Hermano"
                          required
                        />
                      </dd>

                      <dt class="field-title-data">Teléfono de Contacto:</dt>
                      <dd class="field-data">
                        <input
                          v-model="formEmergency.contacto_telefono"
                          type="tel"
                          placeholder="Ej. 5551234567"
                          required
                        />
                      </dd>

                      <dt class="field-title-data">Teléfono Alternativo:</dt>
                      <dd class="field-data">
                        <input
                          v-model="formEmergency.contacto_telefono_alternativo"
                          type="tel"
                          placeholder="Ej. 5559876543"
                        />
                      </dd>

                      <dt class="field-title-data">Dirección:</dt>
                      <dd class="field-data">
                        <input
                          v-model="formEmergency.contacto_direccion"
                          type="text"
                          placeholder="Ej. Av. Principal #123"
                        />
                      </dd>
                    </dl>

                    <button type="submit" class="save-btn" :disabled="loading">
                      {{ loading ? "Guardando..." : "Guardar Cambios" }}
                    </button>
                  </form>
                </div>
              </transition>
            </section>

            <section class="business-data">
              <h3>Datos Empresariales</h3>
              <dl>
                <dt class="field-title-data">No. de Empleado</dt>
                <dd class="field-data">
                  {{ selectedEmployee.No_de_empleado }}
                </dd>
                <dt class="field-title-data">Nivel</dt>
                <dd class="field-data">{{ selectedEmployee.nivel }}</dd>
                <dt class="field-title-data">
                  Constancia de Vigencia de Derechos
                </dt>
                <dd class="field-data">
                  {{
                    String(selectedEmployee.estatus).toLowerCase() === "activo"
                      ? "Alta"
                      : "Baja"
                  }}
                </dd>
                <dt class="field-title-data">NSS</dt>
                <dd class="field-data">{{ selectedEmployee.nss || "-" }}</dd>
                <dt class="field-title-data">Departamento:</dt>
                <dd class="field-data">
                  {{
                    selectedEmployee.departamento?.nombre || "Sin Departamento"
                  }}
                </dd>
                <dt class="field-title-data">Direccion:</dt>
                <dd class="field-data">
                  {{ selectedEmployee.direccion?.nombre || "Sin Direccion" }}
                </dd>
                <dt class="field-title-data">Puesto</dt>
                <dd class="field-data">
                  {{ selectedEmployee.puesto?.nombre || "Sin Puesto" }}
                </dd>
                <dt class="field-title-data">Horario laboral:</dt>
                <dd class="field-data">
                  {{ selectedEmployee.horario_laboral || "No disponible" }}
                </dd>
                <dt class="field-title-data">Estatus</dt>
                <dd class="field-data">{{ selectedEmployee.estatus }}</dd>
                <dt class="field-title-data">Fecha de Ingreso</dt>
                <dd class="field-data">
                  {{ formatDate(selectedEmployee.fecha_ingreso) }}
                </dd>
                <dt class="field-title-data">Fecha de Salida</dt>
                <dd class="field-data">
                  {{ formatDate(selectedEmployee.fecha_baja) }}
                </dd>
              </dl>

              <!-- ========================================================== -->
              <!-- BOTÓN DESPLEGABLE DE SEGUROS MEDICOS -->
              <!-- ========================================================== -->
              <div class="medical-insurance-toggle-container">
                <button
                  type="button"
                  class="medical-insurance-toggle-btn"
                  @click="showMedicalInsuranceData = !showMedicalInsuranceData"
                >
                  {{
                    showMedicalInsuranceData
                      ? "Ocultar Datos Medicos"
                      : "Ver Datos medicos"
                  }}
                </button>
              </div>

              <!-- BLOQUE DESPLEGABLE (LISTA DE SEGUROS) -->
              <transition name="fade-slide">
                <div
                  v-if="showMedicalInsuranceData"
                  class="medical-insurance-data-panel"
                >
                  <h4>DATOS DE SEGUROS Y SEGURO MEDICO</h4>
                  <dl class="medical-insurance-dl">
                    <dt class="field-title-data">Alergias / Padecimientos:</dt>
                    <dd class="field-data">
                      {{
                        selectedEmployee.alergias || "Ninguna / Sin registro"
                      }}
                    </dd>

                    <dt class="field-title-data">Enfermedades:</dt>
                    <dd class="field-data">
                      {{
                        selectedEmployee.enfermedades ||
                        "Ninguna / Sin registro"
                      }}
                    </dd>

                    <dt class="field-title-data">
                      Discapacidad o Condicion Especial:
                    </dt>
                    <dd class="field-data">
                      {{
                        selectedEmployee.discapacidad_o_condicion_especial ||
                        "Ninguna / Sin registro"
                      }}
                    </dd>

                    <dt class="field-title-data">Medicamentos necesarios:</dt>
                    <dd class="field-data">
                      {{
                        selectedEmployee.medicamentos_necesarios ||
                        "Ninguna / Sin registro"
                      }}
                    </dd>
                  </dl>
                </div>
              </transition>
            </section>
          </div>

          <div class="employee-actions">
            <button
              v-if="canViewOrganigramaDetail"
              type="button"
              class="primary-2"
              @click="viewOrganigrama(selectedEmployee)"
            >
              Ver Organigrama
            </button>
            <button
              type="button"
              class="secondary"
              @click="selectedEmployee = null"
            >
              Cerrar Ficha
            </button>
          </div>
        </div>

        <div v-else class="empty-state">
          Selecciona "Ver Datos" en un empleado para ver su información personal
          y empresarial aquí.
        </div>
      </BaseCard>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch, reactive, nextTick } from "vue";
import { useRouter } from "vue-router";
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";
import organogramaService from "@/services/organograma.service";
import { ROLE_KEYS, getRoleActions, hasAnyRole } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";
import IconSymbol from "@/components/ui/IconSymbol.vue";

// ==========================================================
// 1. ESTADOS DE SERVICIOS Y RUTAS
// ==========================================================
const authStore = useAuthStore();
const router = useRouter();

// ==========================================================
// 2. VARIABLES REACTIVAS (ESTADOS)
// ==========================================================
const notice = ref(""); // Mensajes de error o éxito en la UI
const loading = ref(false); // Flag de carga para la tabla de empleados
const savingEmergency = ref(false); // Flag de carga al guardar datos de emergencia
const searchTerm = ref(""); // Término de búsqueda (Input principal)
const searchInputRef = ref(null); // Referencia al input para forzar el focus
const employeeDetailsRef = ref(null); // Referencia al contenedor de detalles (Scroll)

// Almacenamiento de valores de texto de los filtros
const direccionName = ref("");
const departamentoName = ref("");
const puestoName = ref("");

// Almacenamiento de IDs de los filtros seleccionados
const selectedDireccionId = ref("");
const selectedDepartamentoId = ref("");
const selectedPuestoId = ref("");

// Colecciones de datos del servidor
const employees = ref([]); // Empleados de la tabla actual
const selectedEmployee = ref(null); // Datos completos del empleado en consulta
const direcciones = ref([]); // Catálogo de Direcciones
const departamentos = ref([]); // Catálogo de Departamentos
const puestos = ref([]); // Catálogo de Puestos
const employeeSuggestions = ref([]); // Lista de autocompletado (No. - Nombre)
const showDepartamentoPuesto = ref(false); // Control de visualización adicional

// --- Botones y Paneles ---
const showEmergencyData = ref(false);
const showRegisterEmergencyData = ref(false);
const showMedicalInsuranceData = ref(false);

// Objeto reactivo local para la edición del contacto de emergencia
const formEmergency = reactive({
  contacto_nombre: "",
  contacto_parentesco: "",
  contacto_telefono: "",
  contacto_telefono_alternativo: "",
  contacto_direccion: "",
});

// Estado de la paginación de la tabla
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalRows = ref(0);

// ==========================================================
// 3. PROPIEDADES COMPUTADAS (COMPUTED)
// ==========================================================

/**
 * Calcula el número total de páginas con base en las filas del servidor
 */
const totalPages = computed(() => {
  return Math.ceil(totalRows.value / itemsPerPage.value) || 1;
});

/**
 * Obtiene las acciones permitidas en el directorio según el rol del usuario autenticado
 */
const actions = computed(() => getRoleActions(authStore.user, "directory"));

/**
 * Recupera el ID del empleado logueado desde el almacén de autenticación
 */
const currentEmployeeId = computed(
  () => authStore.user?.empleado_id || authStore.user?.id || null
);

/**
 * Determina si el usuario en sesión tiene privilegios para ver detalles del organigrama
 * Permite acceso total a Recursos Humanos o acceso exclusivo si es su propio registro
 */
const canViewOrganigramaDetail = computed(() => {
  if (!selectedEmployee.value) return false;
  if (hasAnyRole(authStore.user, [ROLE_KEYS.RECURSOS_HUMANOS])) return true;
  return selectedEmployee.value.id === currentEmployeeId.value;
});

/**
 * Configuración estructural de las columnas de la tabla principal (AppTable)
 */
const columns = [
  { key: "No_de_empleado", label: "No. empleado" },
  { key: "nombre", label: "Nombre" },
  { key: "departamento", label: "Departamento" },
  { key: "direccion", label: "Dirección" },
  { key: "puesto", label: "Puesto" },
  { key: "estatus", label: "Estatus" },
  { key: "acciones", label: "Acciones" },
];

/**
 * Filtra los puestos reactivamente en base al departamento seleccionado
 */
const filteredPuestos = computed(() => {
  if (!selectedDepartamentoId.value) return puestos.value;
  return puestos.value.filter(
    (puesto) => puesto.departamento_id === Number(selectedDepartamentoId.value)
  );
});

/**
 * Filtra los departamentos reactivamente en base a la dirección seleccionada
 */
const filteredDepartamentos = computed(() => departamentos.value);

// ==========================================================
// 4. MÉTODOS Y FUNCIONES DE CONTROL
// ==========================================================

/**
 * Inicializa y limpia la vista completa cargando los filtros y empleados desde cero
 */
const loadDirectory = async () => {
  searchTerm.value = "";
  direccionName.value = "";
  departamentoName.value = "";
  puestoName.value = "";
  selectedDireccionId.value = "";
  selectedDepartamentoId.value = "";
  selectedPuestoId.value = "";
  selectedEmployee.value = null;
  showDepartamentoPuesto.value = false;
  showRegisterEmergencyData.value = false;
  showMedicalInsuranceData.value = false;

  currentPage.value = 1;

  await fetchFilters();
  await fetchEmployees();
};

/**
 * Formatea un ID numérico estándar al formato corporativo (Ej: 5 -> EMP-005)
 */
const formatEmployeeNumber = (id) => `EMP-${String(id).padStart(3, "0")}`;

/**
 * Transforma fechas del servidor ISO a formato local de México (DD/MM/AAAA)
 */
const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString("es-MX");
};

/**
 * Calcula la edad de manera exacta en base a una fecha de nacimiento dada
 */
const calculateAge = (birthday) => {
  if (!birthday) return "-";
  const date = new Date(birthday);
  if (Number.isNaN(date.getTime())) return "-";
  const diff = Date.now() - date.getTime();
  return Math.floor(diff / 31557600000);
};

/**
 * Normaliza y homologa las propiedades básicas del objeto empleado para su renderizado plano
 */
const normalizeEmployee = (empleado) => ({
  id: empleado.id,
  No_de_empleado: empleado.No_de_empleado || formatEmployeeNumber(empleado.id),
  nombre: [empleado.nombre, empleado.apellidos].filter(Boolean).join(" "),
  departamento: empleado.departamento?.nombre || "Sin Departamento",
  direccion: empleado.direccion?.nombre || "Sin Dirección",
  puesto: empleado.puesto?.nombre || "Sin Puesto",
  estatus: empleado.estatus === "activo" ? "activo" : "Baja",
});

/**
 * Busca un empleado dentro de la lista local por coincidencia de ID o string formateado
 */
const findEmployeeByNumber = (value) => {
  const raw = String(value || "").trim();
  const digitsMatch = raw.match(/\d+/);
  if (!digitsMatch) return null;
  const digits = digitsMatch[0];
  const paddedDigits = String(digits).padStart(3, "0");

  return employees.value.find(
    (e) =>
      e.No_de_empleado === raw ||
      e.No_de_empleado === digits ||
      e.No_de_empleado === paddedDigits ||
      e.No_de_empleado === `EMP-${paddedDigits}` ||
      e.id === Number(digits)
  );
};

/**
 * Consume los servicios de la API para popular los catálogos de filtros de la interfaz
 */
const fetchFilters = async () => {
  try {
    const [direccionesResp, departamentosResp, puestosResp] = await Promise.all([
      organogramaService.listarDirecciones(),
      organogramaService.listarDepartamentos(),
      organogramaService.listarPuestos(),
    ]);
    direcciones.value = direccionesResp.data || [];
    departamentos.value = departamentosResp.data || [];
    puestos.value = puestosResp.data || [];
  } catch (error) {
    console.error("Error al cargar catálogos de filtros:", error);
  }
};

/**
 * Peticiona el listado de empleados paginado y con filtros aplicados directamente al backend
 */
const fetchEmployees = async () => {
  loading.value = true;
  try {
    const params = {
      limit: itemsPerPage.value,
      page: currentPage.value,
    };

    if (searchTerm.value.trim()) params.search = searchTerm.value.trim();
    if (selectedDepartamentoId.value)
      params.departamento_id = selectedDepartamentoId.value;
    if (selectedDireccionId.value)
      params.direccion_id = selectedDireccionId.value;
    if (selectedPuestoId.value) params.puesto_id = selectedPuestoId.value;

    const response = await organogramaService.listarEmpleados(params);

    const raw = response.data.rows ?? response.data;
    totalRows.value = response.data.count ?? raw.length;

    employees.value = Array.isArray(raw) ? raw.map(normalizeEmployee) : [];
  } catch (error) {
    notice.value = "Error al cargar empleados. Intenta nuevamente.";
    console.error("Error listarEmpleados:", error);
  } finally {
    loading.value = false;
  }
};

/**
 * Descarga una lista masiva para autocompletado en barra de búsquedas
 */
const fetchEmployeeSuggestions = async () => {
  try {
    const response = await organogramaService.listarEmpleados({
      page: 1,
      limit: 1000,
    });

    const raw = response.data.rows ?? response.data;
    employeeSuggestions.value = Array.isArray(raw)
      ? raw
          .map(normalizeEmployee)
          .map((employee) => `${employee.No_de_empleado} - ${employee.nombre}`)
      : [];
  } catch (error) {
    console.error("Error al poblar sugerencias:", error);
  }
};

/**
 * Devuelve la paginación al primer bloque e invoca la recarga de datos
 */
const resetPaginationAndFetch = () => {
  currentPage.value = 1;
  fetchEmployees();
};

/**
 * Avanza o retrocede de página validando límites superiores e inferiores
 */
const changePage = (step) => {
  currentPage.value += step;
  if (currentPage.value < 1) currentPage.value = 1;
  if (currentPage.value > totalPages.value)
    currentPage.value = totalPages.value;
  fetchEmployees();
};

/**
 * Resuelve y mapea el ID de Dirección en base a la cadena de texto seleccionada en la vista
 */
const resolveDireccionSelection = () => {
  const match = direcciones.value.find(
    (direccion) =>
      direccion.nombre.toLowerCase() ===
      direccionName.value.trim().toLowerCase()
  );
  selectedDireccionId.value = match ? String(match.id) : "";
  if (!selectedDireccionId.value) {
    puestoName.value = "";
    selectedPuestoId.value = "";
  }
};

/**
 * Resuelve y mapea el ID de Departamento restringido por la Dirección activa
 */
const resolveDepartamentoSelection = () => {
  const match = departamentos.value.find(
    (departamento) =>
      departamento.nombre.toLowerCase() ===
      departamentoName.value.trim().toLowerCase()
  );
  selectedDepartamentoId.value = match ? String(match.id) : "";
  if (!selectedDepartamentoId.value) {
    puestoName.value = "";
    selectedPuestoId.value = "";
  }
};

/**
 * Resuelve y asigna el ID exacto del puesto combinando las llaves jerárquicas anteriores
 */
const resolvePuestoSelection = () => {
  const match = puestos.value.find(
    (puesto) =>
      puesto.nombre.toLowerCase() === puestoName.value.trim().toLowerCase() &&
      (!selectedDireccionId.value ||
        puesto.direccion_id === Number(selectedDireccionId.value)) &&
      (!selectedDepartamentoId.value ||
        puesto.departamento_id === Number(selectedDepartamentoId.value))
  );
  selectedPuestoId.value = match ? String(match.id) : "";
};

// ==========================================================
// 5. CONTROL DE DATOS DE EMERGENCIA (EDICIÓN Y GUARDADO)
// ==========================================================

/**
 * Alterna la visibilidad del panel de registro y precarga el formulario con la información actual
 */
const toggleRegisterEmergency = () => {
  showRegisterEmergencyData.value = !showRegisterEmergencyData.value;

  if (showRegisterEmergencyData.value && selectedEmployee.value) {
    formEmergency.contacto_nombre = selectedEmployee.value.contacto_nombre || "";
    formEmergency.contacto_parentesco =
      selectedEmployee.value.contacto_parentesco ||
      selectedEmployee.value.parentesco_emergencia ||
      "";
    formEmergency.contacto_telefono =
      selectedEmployee.value.contacto_telefono ||
      selectedEmployee.value.telefono_emergencia ||
      "";
    formEmergency.contacto_telefono_alternativo =
      selectedEmployee.value.contacto_telefono_alternativo || "";
    formEmergency.contacto_direccion =
      selectedEmployee.value.contacto_direccion || "";
  }
};

/**
 * Envía los datos modificados del formulario a la API y sincroniza reactivamente la vista
 */
const saveEmergencyData = async () => {
  if (!selectedEmployee.value?.id) return;

  savingEmergency.value = true;
  notice.value = "";

  try {
    const payload = { ...formEmergency };
    
    // Llamada al servicio API para actualizar al empleado
    await organogramaService.actualizarEmpleado(selectedEmployee.value.id, payload);

    // Actualiza la referencia local en vivo para que los cambios se visualicen al instante
    Object.assign(selectedEmployee.value, payload);

    notice.value = "Datos de contacto de emergencia guardados correctamente.";
    showRegisterEmergencyData.value = false;
  } catch (error) {
    notice.value = "Ocurrió un error al guardar los datos de emergencia.";
    console.error("Error al guardar datos de emergencia:", error);
  } finally {
    savingEmergency.value = false;
  }
};

// ==========================================================
// 6. OBSERVADORES (WATCHERS)
// ==========================================================

// Limpieza en cascada si se borra el filtro de Dirección
watch(direccionName, (value) => {
  if (!value) {
    selectedDireccionId.value = "";
    selectedDepartamentoId.value = "";
    selectedPuestoId.value = "";
    departamentoName.value = "";
    puestoName.value = "";
  }
});

// Limpieza en cascada si se borra el filtro de Departamento
watch(departamentoName, (value) => {
  if (!value) {
    selectedDepartamentoId.value = "";
    selectedPuestoId.value = "";
    puestoName.value = "";
  }
});

// ==========================================================
// 7. ACCIONES DE SELECCIÓN Y FLUJO DE DETALLE
// ==========================================================

/**
 * Analiza la entrada del motor de búsqueda principal para procesar selecciones por nombre o código
 */
const resolveEmployeeSelection = () => {
  const trimmed = searchTerm.value.trim();
  if (!trimmed) return;

  const foundByNumber = findEmployeeByNumber(trimmed);
  if (foundByNumber) {
    searchTerm.value = `${foundByNumber.No_de_empleado} - ${foundByNumber.nombre}`;
    direccionName.value = foundByNumber.direccion || "";
    departamentoName.value = foundByNumber.departamento || "";
    puestoName.value = foundByNumber.puesto || "";
    resolveDireccionSelection();
    resolveDepartamentoSelection();
    resolvePuestoSelection();
    selectEmployee(foundByNumber);
    return;
  }

  const byName = employees.value.find(
    (e) =>
      `${e.No_de_empleado} - ${e.nombre}`.toLowerCase() ===
        trimmed.toLowerCase() ||
      e.nombre.toLowerCase().includes(trimmed.toLowerCase())
  );

  if (byName) {
    searchTerm.value = `${byName.No_de_empleado} - ${byName.nombre}`;
    direccionName.value = byName.direccion || "";
    departamentoName.value = byName.departamento || "";
    puestoName.value = byName.puesto || "";
    resolveDireccionSelection();
    resolveDepartamentoSelection();
    resolvePuestoSelection();
    selectEmployee(byName);
  }
};

/**
 * Consulta el endpoint detallado de un empleado, formatea su payload y desplaza la vista por scroll
 */
const selectEmployee = async (row) => {
  try {
    const response = await organogramaService.obtenerEmpleado(row.id);
    selectedEmployee.value = {
      ...response.data,
      No_de_empleado:
        response.data.No_de_empleado || formatEmployeeNumber(row.id),
      nombreCompleto: [response.data.nombre, response.data.apellidos]
        .filter(Boolean)
        .join(" "),
      numero: response.data.No_de_empleado || formatEmployeeNumber(row.id),
      edad: calculateAge(response.data.fecha_nacimiento),
    };
    notice.value = "";
    showEmergencyData.value = false;
    showRegisterEmergencyData.value = false;

    await nextTick();

    if (employeeDetailsRef.value) {
      employeeDetailsRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  } catch (error) {
    notice.value = "No se pudo cargar el empleado seleccionado.";
    console.error("Error al obtener detalle del empleado:", error);
  }
};

/**
 * Redirecciona al árbol jerárquico (Organigrama) inyectando el ID por query param
 */
const viewOrganigrama = (row) => {
  router.push({ name: "organigram", query: { empleadoId: row.id } });
};

/**
 * Ejecuta el limpiado absoluto de variables, cierra paneles expandidos y re-enfoca el buscador
 */
const clearFilters = async () => {
  searchTerm.value = "";
  direccionName.value = "";
  departamentoName.value = "";
  puestoName.value = "";
  selectedDireccionId.value = "";
  selectedDepartamentoId.value = "";
  selectedPuestoId.value = "";
  selectedEmployee.value = null;
  showDepartamentoPuesto.value = false;
  showEmergencyData.value = false;
  showMedicalInsuranceData.value = false;
  showRegisterEmergencyData.value = false;
  currentPage.value = 1;

  await fetchEmployees();
  await nextTick();
  searchInputRef.value?.focus?.();
};

// ==========================================================
// 8. CICLO DE VIDA (HOOKS)
// ==========================================================
onMounted(async () => {
  await fetchFilters();
  await fetchEmployeeSuggestions();
  await fetchEmployees();
});
</script>

<style scoped>
/* ==========================================================
   1. FILTROS Y BARRA SUPERIOR
   ========================================================== */
.filter-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
}

.header-summary {
  padding: 16px;
}

.headd,
.fil {
  background: var(--color-surface-muted);
}

.field {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 220px;
  min-width: 200px;
}

.field span {
  white-space: nowrap;
  font-size: 0.85rem;
  color: var(--color-text-soft);
  font-weight: 500;
  min-width: 90px;
}

.field input {
  flex: 1;
  min-width: 100px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 10px 14px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 0.9rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb, 0, 0, 0), 0.1);
}

.filter-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

/* ==========================================================
   2. BOTONES Y ACCIONES (SISTEMA DE BOTONES UNIFICADO)
   ========================================================== */
.primary-button,
.primary-2,
.secondary,
.ghost-button,
.icon-action,
.link-button,
.register-emergency-data-btn,
.emergency-toggle-btn,
.medical-insurance-toggle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.88rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.primary-button,
.primary-2,
.secondary {
  min-height: 42px;
  padding: 10px 18px;
  border: 1px solid transparent;
}

.primary-button,
.primary-2 {
  background: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
}

.primary-button--danger,
.primary-2--danger {
  background: var(--color-danger, #9d2d3e);
  border-color: var(--color-danger, #9d2d3e);
  color: #ffffff;
}

.secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-border);
}

.ghost-button {
  min-height: 38px;
  padding: 8px 14px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.link-button {
  min-height: 38px;
  padding: 8px 14px;
  border-radius: 12px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.register-emergency-data-btn,
.emergency-toggle-btn,
.medical-insurance-toggle-btn {
  padding: 10px 18px;
  background: var(--color-surface);
  color: var(--color-primary);
  border: 1px solid var(--color-border);
  font-size: 0.85rem;
}

/* Efectos Hover */
.primary-button:hover,
.primary-2:hover,
.secondary:hover,
.ghost-button:hover,
.link-button:hover,
.register-emergency-data-btn:hover,
.emergency-toggle-btn:hover,
.medical-insurance-toggle-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.secondary:hover,
.ghost-button:hover,
.register-emergency-data-btn:hover,
.emergency-toggle-btn:hover,
.medical-insurance-toggle-btn:hover {
  background: var(--color-surface-muted);
}

.row-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.employee-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

/* ==========================================================
   BOTÓN GUARDAR - FORMULARIO DE EMERGENCIA
   ========================================================== */
   
.emergency-form .save-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--color-primary);
  color: #ffffff;
  border: 1px solid var(--color-primary);
  padding: 10px 20px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.88rem;
  margin-top: 20px;
  width: 100%;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.emergency-form .save-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(var(--color-primary-rgb, 0, 0, 0), 0.2);
}

.emergency-form .save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* ==========================================================
   3. SECCIÓN DE DETALLES DEL EMPLEADO
   ========================================================== */
.section-gap {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.details-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.details-grid section {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.details-grid h3 {
  margin: 0 0 16px 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.details-grid dl {
  display: grid;
  gap: 12px 0;
  margin: 0;
}

.details-grid dt {
  color: var(--color-text-soft);
  font-size: 0.82rem;
  font-weight: 500;
}

.details-grid dd {
  margin: 2px 0 0 0;
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.95rem;
}

/* ==========================================================
   4. PANELES ESPECIALES (EMERGENCIA Y SEGURO MÉDICO)
   ========================================================== */
.emergency-toggle-container,
.medical-insurance-toggle-container {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px dashed var(--color-border);
}

.emergency-data-panel,
.medical-insurance-data-panel {
  margin-top: 16px;
  padding: 18px;
  background: rgba(157, 45, 62, 0.04);
  border: 1px solid rgba(157, 45, 62, 0.18);
  border-radius: 14px;
}

.emergency-data-panel h4,
.medical-insurance-data-panel h4 {
  margin: 0 0 14px 0;
  color: var(--color-danger, #9d2d3e);
  font-size: 0.88rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.emergency-dl,
.medical-insurance-dl {
  margin: 0;
  display: grid;
  gap: 12px 0;
}

.emergency-dl dd input {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 8px 12px;
  background: var(--color-surface);
  font-size: 0.88rem;
  color: var(--color-text);
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.emergency-dl dd input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb, 0, 0, 0), 0.1);
}

.emergency-form .form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

/* ==========================================================
   5. ESTADOS Y PAGINACIÓN
   ========================================================== */
.empty-state {
  padding: 24px;
  border: 1px dashed var(--color-border);
  border-radius: 16px;
  background: var(--color-surface-muted);
  color: var(--color-text-soft);
  text-align: center;
  margin-top: 16px;
}

.notice {
  margin: 0 0 16px;
  padding: 12px 16px;
  border: 1px solid rgba(47, 107, 79, 0.25);
  border-radius: 10px;
  background: rgba(47, 107, 79, 0.08);
  color: var(--color-success, #2f6b4f);
  font-weight: 600;
  font-size: 0.9rem;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.pagination-button {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.88rem;
  transition: all 0.2s ease;
}

.pagination-button:hover:not(:disabled) {
  background: var(--color-surface-muted);
  border-color: var(--color-text-soft);
}

.pagination-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 0.88rem;
  color: var(--color-text-soft);
  font-weight: 500;
}

/* ==========================================================
   6. ANIMACIONES Y MEDIA QUERIES
   ========================================================== */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1100px) {
  .details-grid {
    grid-template-columns: 1fr;
  }

  .filter-grid {
    flex-direction: column;
    align-items: stretch;
  }

  .field {
    flex: 1 1 100%;
  }

  .filter-actions {
    margin-left: 0;
    justify-content: flex-end;
  }
}
</style>