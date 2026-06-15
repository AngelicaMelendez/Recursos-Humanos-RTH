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
      <span>NO. de Empleado o Nombre</span>
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

    <template v-if="showDepartamentoPuesto">
      
      <label class="field">
        <span>Dirección</span>
        <input
          v-model="direccionName"
          @change="resolveDireccionSelection"
          list="direccionList"
          placeholder="Selecciona o Escribe Dirección"
        />
        <datalist id="direccionList">
          <option v-for="dir in direcciones" :key="dir.id" :value="dir.nombre" />
        </datalist>
      </label>

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
          <option v-for="dep in filteredDepartamentos" :key="dep.id" :value="dep.nombre" />
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
          <option v-for="puesto in filteredPuestos" :key="puesto.id" :value="puesto.nombre" />
        </datalist>
      </label>
    </template>

    <div class="filter-actions">
      <button type="button" class="primary" @click="fetchEmployees"> <IconSymbol name="search" /> Buscar</button>
      <button type="button" class="secondary" @click="clearFilters"> <IconSymbol name="clear" /> Limpiar</button>
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
              <button type="button" class="link-button" @click="selectEmployee(row)">Ver Datos</button>
              <button type="button" class="link-button" @click="viewOrganigrama(row)">Ver Organigrama</button>
            </div>
          </template>
        </AppTable>
        <p v-if="!employees.length && !loading" class="empty-state">No se encontraron empleados con esos filtros.</p>
      </BaseCard>
    </div>

    <div class="section-gap">
      <BaseCard title="Datos Generales" subtitle="Información del empleado seleccionado para consulta inmediata.">
        <div v-if="selectedEmployee" class="employee-details">
          <div class="details-grid">
            <section>
              <h3>Datos Personales</h3>
              <dl>
                <dt>No. de Empleado</dt>
                <dd>{{ selectedEmployee.numero }}</dd>
                <dt>Nombre</dt>
                <dd>{{ selectedEmployee.nombreCompleto }}</dd>
                <dt>CURP</dt>
                <dd>{{ selectedEmployee.curp || '-' }}</dd>
                <dt>RFC</dt>
                <dd>{{ selectedEmployee.rfc || '-' }}</dd>
                <dt>Tipo de Sangre</dt>
                <dd>{{ selectedEmployee.tipo_sangre || '-' }}</dd>
                <dt>Fecha de Nacimiento</dt>
                <dd>{{ formatDate(selectedEmployee.fecha_nacimiento) }}</dd>
                <dt>Edad</dt>
                <dd>{{ selectedEmployee.edad }}</dd>
                <dt>Sexo</dt>
                <dd>{{ selectedEmployee.sexo || '-' }}</dd>
                <dt>Correo Electrónico</dt>
                <dd>{{ selectedEmployee.email || selectedEmployee.correo || '-' }}</dd>
                <dt>Teléfono</dt>
                <dd>{{ selectedEmployee.telefono || selectedEmployee.celular || '-' }}</dd>
              </dl>
            </section>

            <section>
              <h3>Datos Empresariales</h3>
              <dl>
                <dt>No. de Empleado</dt>
                <dd>{{ selectedEmployee.numero }}</dd>
                <dt>Constancia de Vigencia de Derechos</dt>
                <dd>{{ selectedEmployee.estatus === 'Activo' ? 'Alta' : 'Baja' }}</dd>
                <dt>NSS</dt>
                <dd>{{ selectedEmployee.nss || '-' }}</dd>
                <dt>Área</dt>
                <dd>{{ selectedEmployee.area?.nombre || 'Sin Área' }}</dd>
                <dt>Puesto</dt>
                <dd>{{ selectedEmployee.puesto?.nombre || 'Sin Puesto' }}</dd>
                <dt>Estatus</dt>
                <dd>{{ selectedEmployee.estatus }}</dd>
                <dt>Fecha de Ingreso</dt>
                <dd>{{ formatDate(selectedEmployee.fecha_ingreso) }}</dd>
                <dt>Fecha de Salida</dt>
                <dd>{{ formatDate(selectedEmployee.fecha_baja) }}</dd>
              </dl>
            </section>
          </div>

          <div class="employee-actions">
            <button type="button" class="primary" @click="viewOrganigrama(selectedEmployee)">Ver Organigrama</button>
            <button type="button" class="secondary" @click="selectedEmployee = null">Cerrar Ficha</button>
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
import IconSymbol from "@/components/ui/IconSymbol.vue";

const authStore = useAuthStore();
const router = useRouter();

const notice = ref("");
const loading = ref(false);
const searchTerm = ref("");
const searchInputRef = ref(null);
const direccionName = ref("");
const departamentoName = ref("");
const puestoName = ref("");
const selectedDireccionId = ref("");
const selectedDepartamentoId = ref("");
const selectedPuestoId = ref("");
const employees = ref([]);
const selectedEmployee = ref(null);
const direcciones = ref([]);
const departamentos = ref([]);
const puestos = ref([]);
const employeeSuggestions = ref([]);
const showAreaPuesto = ref(false);

const actions = computed(() => getRoleActions(authStore.user?.rol, "directory"));


const columns = [
  { key: "numero", label: "No. empleado" },
  { key: "nombre", label: "Nombre" },
  { key: "direccion", label: "Direccion" },
  { key: "departamento", label: "Departamento" },
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
  direccion: empleado.direccion?.nombre || "Sin Direccion",
  departamento: empleado.departamento?.nombre || "Sin Departamento",
  puesto: empleado.puesto?.nombre || "Sin Puesto",
  estatus: empleado.estatus === "activo" ? "activo" : "Baja"
});

const fetchFilters = async () => {
  try {
    const [direccionesResp, departamentosResp, puestosResp] = await Promise.all([
      organogramaService.listarDirecciones(),
      organogramaService.listarDepartamentos(),
      organogramaService.listarPuestos()
    ]);
    direcciones.value = direccionesResp.data || [];
    departamentos.value = departamentosResp.data || [];
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
    if (selectedDireccionId.value) params.direccion_id = selectedDireccionId.value;
    if (selectedDepartamentoId.value) params.departamento_id = selectedDepartamentoId.value;
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

const resolveDireccionSelection = () => {
  const match = direcciones.value.find(
    (direccion) => direccion.nombre.toLowerCase() === direccionName.value.trim().toLowerCase()
  );
  selectedDireccionId.value = match ? String(match.id) : "";
  if (!selectedDireccionId.value) {
    puestoName.value = "";
    selectedPuestoId.value = "";
  }
};

const resolveDepartamentoSelection = () => {
  const match = departamentos.value.find(
    (departamento) =>
      departamento.nombre.toLowerCase() === departamentoName.value.trim().toLowerCase() &&
      (!selectedDireccionId.value || departamento.direccion_id === Number(selectedDireccionId.value))
  );
  selectedDepartamentoId.value = match ? String(match.id) : "";
  if (!selectedDepartamentoId.value) {
    puestoName.value = "";
    selectedPuestoId.value = "";
  }
};

const resolvePuestoSelection = () => {
  const match = puestos.value.find(
    (puesto) =>
      puesto.nombre.toLowerCase() === puestoName.value.trim().toLowerCase() &&
      (!selectedDireccionId.value || puesto.direccion_id === Number(selectedDireccionId.value)),
      (!selectedDepartamentoId.value || puesto.departamento_id === Number(selectedDepartamentoId.value))
  );
  selectedPuestoId.value = match ? String(match.id) : "";
};

watch(direccionName,departamentoName,(value) => {
  if (!value) {
    selectedDireccionId.value = "";
    selectedDepartamentoId.value = "";  
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
    showAreaPuesto.value = true;

    const found = employees.value.find((e) => e.numero === formatted || e.id === Number(match[1]));
    if (found) {
      direccionName.value = found.direccion || "";
      departamentoName.value = found.departamento || "";
      puestoName.value = found.puesto || "";
      resolveAreaSelection();
      resolvePuestoSelection();
      selectEmployee(found);
    }
    if (!found) {
      selectEmployee({ id: Number(match[1]) });
    }
    return;
  }

  const byName = employees.value.find((e) => `${e.numero} - ${e.nombre}`.toLowerCase() === trimmed.toLowerCase() || e.nombre.toLowerCase().includes(trimmed.toLowerCase()));
  if (byName) {
    showDireccionPuesto.value = true;
    showDepartamentoPuesto.value = true;
    searchTerm.value = `${byName.numero} - ${byName.nombre}`;
    direccionName.value = byName.direccion || "";
    departamentoName.value = byName.departamento || "";
    puestoName.value = byName.puesto || "";
    resolveDireccionSelection();
    resolveDepartamentoSelection();
    resolvePuestoSelection();
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
  direccionName.value = "";
  departamentoName.value = "";
  puestoName.value = "";
  selectedDireccionId.value = "";
  selectedDepartamentoId.value = "";
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
  display: inline-flex;
  justify-content: center;
  border: none;
  gap: 8px;
  border: none;
  background: var(--color-primary);
  color: #fff;
  padding: 12px 20px;
  border-radius: 999px;
  cursor: pointer;
}

.filter-actions .secondary,
.employee-actions .secondary {
  display: inline-flex;
  justify-content: center;
  border: none;
  gap: 8px;
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-text);
  padding: 12px 20px;
  border-radius: 999px;
  cursor: pointer;
}

.link-button {
  background: var (--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  display:inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 9px 14px;
  border-radius: 12px;
  font-weight: 700;
  
}

.link-button:hover {
  background: var(--color-surface);
  transform: translateY(-1px);
}

.row-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.act-buttom {
  background: var (--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  
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
