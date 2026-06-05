<template>
  <div>
    <PageHeader class="header-summary"
      title ="Directorio"
      description="Consulta de personal  datos generales y datos empresariales ."
    />

    <p v-if="notice" class="notice">{{ notice }}</p>

    <BaseCard title="Busqueda">
      <div class="filter-grid">
        <label class="field">
          <span>No. de empleado o nombre</span>
          <input
            ref="searchInputRef"
            v-model="searchTerm"
            @change="resolveEmployeeSelection"
            list="employeeSuggestions"
            placeholder="EMP-001 / Nombre"
          />
          <datalist id="employeeSuggestions">
            <option v-for="option in employeeSuggestions" :key="option" :value="option" />
          </datalist>
        </label>

        <template v-if="showAreaPuesto">
          <label class="field">
            <span>Área</span>
            <input
              v-model="areaName"
              @change="resolveAreaSelection"
              list="areaList"
              placeholder="Selecciona o escribe área"
            />
            <datalist id="areaList">
              <option v-for="area in areas" :key="area.id" :value="area.nombre" />
            </datalist>
          </label>

          <label class="field">
            <span>Puesto</span>
            <input
              v-model="puestoName"
              @change="resolvePuestoSelection"
              :list="filteredPuestos.length ? 'puestoList' : null"
              :disabled="!areas.length"
              placeholder="Selecciona o escribe puesto"
            />
            <datalist id="puestoList">
              <option v-for="puesto in filteredPuestos" :key="puesto.id" :value="puesto.nombre" />
            </datalist>
          </label>
        </template>
        <div class="filter-actions">
          <button type="button" class="primary" @click="fetchEmployees">Buscar</button>
          <button type="button" class="secondary" @click="clearFilters">Limpiar</button>
        </div>
      </div>
    </BaseCard>

    <div class="section-gap">
      <BaseCard title="Resultados" subtitle="Lista de empleados que cumplen los criterios de búsqueda.">
        <AppTable :columns="columns" :rows="employees" idField="id">
          <template #estatus="{ row }">
            <StatusBadge :value="row.estatus" />
          </template>
          <template #acciones="{ row }">
            <div class="row-actions">
              <button type="button" class="link-button" @click="selectEmployee(row)">Ver datos</button>
              <button type="button" class="link-button" @click="viewOrganigrama(row)">Ver organigrama</button>
            </div>
          </template>
        </AppTable>
        <p v-if="!employees.length && !loading" class="empty-state">No se encontraron empleados con esos filtros.</p>
      </BaseCard>
    </div>

    <div class="section-gap">
      <BaseCard title="Datos generales" subtitle="Información del empleado seleccionado para consulta inmediata.">
        <div v-if="selectedEmployee" class="employee-details">
          <div class="details-grid">
            <section>
              <h3>Datos personales</h3>
              <dl>
                <dt>No. de empleado</dt>
                <dd>{{ selectedEmployee.numero }}</dd>
                <dt>Nombre</dt>
                <dd>{{ selectedEmployee.nombreCompleto }}</dd>
                <dt>CURP</dt>
                <dd>{{ selectedEmployee.curp || '-' }}</dd>
                <dt>RFC</dt>
                <dd>{{ selectedEmployee.rfc || '-' }}</dd>
                <dt>Tipo de sangre</dt>
                <dd>{{ selectedEmployee.tipo_sangre || '-' }}</dd>
                <dt>Fecha de nacimiento</dt>
                <dd>{{ formatDate(selectedEmployee.fecha_nacimiento) }}</dd>
                <dt>Edad</dt>
                <dd>{{ selectedEmployee.edad }}</dd>
                <dt>Sexo</dt>
                <dd>{{ selectedEmployee.sexo || '-' }}</dd>
                <dt>Correo electrónico</dt>
                <dd>{{ selectedEmployee.email || selectedEmployee.correo || '-' }}</dd>
                <dt>Teléfono</dt>
                <dd>{{ selectedEmployee.telefono || selectedEmployee.celular || '-' }}</dd>
              </dl>
            </section>

            <section>
              <h3>Datos empresariales</h3>
              <dl>
                <dt>No. de empleado</dt>
                <dd>{{ selectedEmployee.numero }}</dd>
                <dt>Constancia de vigencia de derechos</dt>
                <dd>{{ selectedEmployee.estatus === 'activo' ? 'Alta' : 'Baja' }}</dd>
                <dt>NSS</dt>
                <dd>{{ selectedEmployee.nss || '-' }}</dd>
                <dt>Área</dt>
                <dd>{{ selectedEmployee.area?.nombre || 'Sin área' }}</dd>
                <dt>Puesto</dt>
                <dd>{{ selectedEmployee.puesto?.nombre || 'Sin puesto' }}</dd>
                <dt>Estatus</dt>
                <dd>{{ selectedEmployee.estatus }}</dd>
                <dt>Fecha de ingreso</dt>
                <dd>{{ formatDate(selectedEmployee.fecha_ingreso) }}</dd>
                <dt>Fecha de salida</dt>
                <dd>{{ formatDate(selectedEmployee.fecha_baja) }}</dd>
              </dl>
            </section>
          </div>

          <div class="employee-actions">
            <button type="button" class="primary" @click="viewOrganigrama(selectedEmployee)">Ver organigrama</button>
            <button type="button" class="secondary" @click="selectedEmployee = null">Cerrar ficha</button>
          </div>
        </div>

        <div v-else class="empty-state">
          Selecciona ver datos en un empleado para ver su información personal y empresarial aquí.
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";
import organogramaService from "@/services/organograma.service";
import { getRoleActions } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const router = useRouter();

const notice = ref("");
const loading = ref(false);
const searchTerm = ref("");
const searchInputRef = ref(null);
const areaName = ref("");
const puestoName = ref("");
const selectedAreaId = ref("");
const selectedPuestoId = ref("");
const employees = ref([]);
const selectedEmployee = ref(null);
const areas = ref([]);
const puestos = ref([]);
const employeeSuggestions = ref([]);
const showAreaPuesto = ref(false);

const actions = computed(() => getRoleActions(authStore.user?.rol, "directory"));

// role actions removed from header; keep actions to evaluate permissions if needed

const columns = [
  { key: "numero", label: "No. empleado" },
  { key: "nombre", label: "Nombre" },
  { key: "area", label: "Área" },
  { key: "puesto", label: "Puesto" },
  { key: "estatus", label: "Estatus" },
  { key: "acciones", label: "Acciones" }
];

const filteredPuestos = computed(() => {
  if (!selectedAreaId.value) return puestos.value;
  return puestos.value.filter((puesto) => puesto.area_id === Number(selectedAreaId.value));
});

const formatEmployeeNumber = (id) => `EMP-${String(id).padStart(3, "0")}`;

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString("es-MX");
};

const calculateAge = (birthday) => {
  if (!birthday) return "-";
  const date = new Date(birthday);
  if (Number.isNaN(date.getTime())) return "-";
  const diff = Date.now() - date.getTime();
  return Math.floor(diff / 31557600000);
};

const normalizeEmployee = (empleado) => ({
  id: empleado.id,
  numero: formatEmployeeNumber(empleado.id),
  nombre: [empleado.nombre, empleado.apellidos].filter(Boolean).join(" "),
  area: empleado.area?.nombre || "Sin área",
  puesto: empleado.puesto?.nombre || "Sin puesto",
  estatus: empleado.estatus === "activo" ? "activa" : "baja"
});

const fetchFilters = async () => {
  try {
    const [areasResp, puestosResp] = await Promise.all([
      organogramaService.listarAreas(),
      organogramaService.listarPuestos()
    ]);
    areas.value = areasResp.data || [];
    puestos.value = puestosResp.data || [];
  } catch (error) {
    console.error(error);
  }
};

const fetchEmployees = async () => {
  loading.value = true;
  try {
    const params = {
      limit: 100,
      page: 1
    };

    if (searchTerm.value.trim()) params.search = searchTerm.value.trim();
    if (selectedAreaId.value) params.area_id = selectedAreaId.value;
    if (selectedPuestoId.value) params.puesto_id = selectedPuestoId.value;

    const response = await organogramaService.listarEmpleados(params);
    const raw = response.data.rows ?? response.data;
    employees.value = raw.map(normalizeEmployee);
    employeeSuggestions.value = employees.value.map((employee) => `${employee.numero} - ${employee.nombre}`);
  } catch (error) {
    notice.value = "Error al cargar empleados. Intenta nuevamente.";
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const resolveAreaSelection = () => {
  const match = areas.value.find(
    (area) => area.nombre.toLowerCase() === areaName.value.trim().toLowerCase()
  );
  selectedAreaId.value = match ? String(match.id) : "";
  if (!selectedAreaId.value) {
    puestoName.value = "";
    selectedPuestoId.value = "";
  }
};

const resolvePuestoSelection = () => {
  const match = puestos.value.find(
    (puesto) =>
      puesto.nombre.toLowerCase() === puestoName.value.trim().toLowerCase() &&
      (!selectedAreaId.value || puesto.area_id === Number(selectedAreaId.value))
  );
  selectedPuestoId.value = match ? String(match.id) : "";
};

watch(areaName, (value) => {
  if (!value) {
    selectedAreaId.value = "";
    selectedPuestoId.value = "";
    puestoName.value = "";
  }
});

watch(puestoName, (value) => {
  if (!value) {
    selectedPuestoId.value = "";
  }
});

const resolveEmployeeSelection = () => {
  const trimmed = searchTerm.value.trim();
  const match = trimmed.match(/EMP-?0*(\d+)/i);
  if (match) {
    const formatted = `EMP-${String(match[1]).padStart(3, "0")}`;
    searchTerm.value = formatted;
    // show next filters
    showAreaPuesto.value = true;

    // try to prefill area/puesto if employee exists in current fetched list
    const found = employees.value.find((e) => e.numero === formatted || e.id === Number(match[1]));
    if (found) {
      areaName.value = found.area || "";
      puestoName.value = found.puesto || "";
      resolveAreaSelection();
      resolvePuestoSelection();
      // auto-load ficha
      selectEmployee(found);
    }
    // if not found in current list, try fetching by id
    if (!found) {
      selectEmployee({ id: Number(match[1]) });
    }
    return;
  }

  // if user typed a name that matches an employee suggestion, show next filters
  const byName = employees.value.find((e) => `${e.numero} - ${e.nombre}`.toLowerCase() === trimmed.toLowerCase() || e.nombre.toLowerCase().includes(trimmed.toLowerCase()));
  if (byName) {
    showAreaPuesto.value = true;
    areaName.value = byName.area || "";
    puestoName.value = byName.puesto || "";
    resolveAreaSelection();
    resolvePuestoSelection();
    // auto-load ficha when selecting by name
    selectEmployee(byName);
  }
};

const selectEmployee = async (row) => {
  try {
    const response = await organogramaService.obtenerEmpleado(row.id);
    selectedEmployee.value = {
      ...response.data,
      numero: formatEmployeeNumber(row.id),
      nombreCompleto: [response.data.nombre, response.data.apellidos].filter(Boolean).join(" "),
      edad: calculateAge(response.data.fecha_nacimiento)
    };
    notice.value = "";
  } catch (error) {
    notice.value = "No se pudo cargar el empleado seleccionado.";
    console.error(error);
  }
};

const viewOrganigrama = (row) => {
  router.push({ name: "organigram", query: { empleadoId: row.id } });
};

const clearFilters = async () => {
  searchTerm.value = "";
  areaName.value = "";
  puestoName.value = "";
  selectedAreaId.value = "";
  selectedPuestoId.value = "";
  selectedEmployee.value = null;
  showAreaPuesto.value = false;
  await fetchEmployees();
  await nextTick();
  searchInputRef.value?.focus?.();
};

onMounted(async () => {
  await fetchFilters();
  await fetchEmployees();
});
</script>

<style scoped>
.filter-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
}
.header-summary{
  padding: 15px;
}
.field {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
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
  padding: 10px 12px;
  background: var(--color-surface);
  font-size: 0.9rem;
}

.filter-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.filter-actions .primary,
.employee-actions .primary {
  border: none;
  background: var(--color-primary);
  color: #fff;
  padding: 12px 20px;
  border-radius: 999px;
  cursor: pointer;
}

.filter-actions .secondary,
.employee-actions .secondary,
.link-button {
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text);
  padding: 12px 20px;
  border-radius: 999px;
  cursor: pointer;
}

.row-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.link-button {
  text-decoration: underline;
  background: transparent;
  border: none;
  padding: 0;
  color: var(--color-primary-strong);
}

.details-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.details-grid section {
  background: rgba(250, 248, 242, 0.9);
  border: 1px solid var(--color-border);
  border-radius: 18px;
  padding: 20px;
}

.details-grid h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1rem;
}

.details-grid dl {
  display: grid;
  gap: 10px 0;
}

.details-grid dt {
  color: var(--color-text-soft);
  font-size: 0.82rem;
}

.details-grid dd {
  margin: 0;
  font-weight: 600;
}

.employee-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 18px;
}

.empty-state {
  padding: 20px;
  border: 1px dashed var(--color-border);
  border-radius: 16px;
  background: var(--color-surface-muted);
  color: var(--color-text-soft);
  margin-top: 16px;
}

.notice {
  margin: 0 0 16px;
  padding: 12px 14px;
  border: 1px solid rgba(47, 107, 79, 0.22);
  border-radius: 8px;
  background: rgba(47, 107, 79, 0.1);
  color: var(--color-success);
  font-weight: 700;
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
    flex: 1 1 auto;
  }

  .filter-actions {
    margin-left: 0;
  }
}

/* espaciado entre cards del directorio */
.section-gap {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 14px;
}
</style>
