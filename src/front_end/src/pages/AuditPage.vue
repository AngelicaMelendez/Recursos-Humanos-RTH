<template>
  <div>
    <PageHeader
      eyebrow="Trazabilidad"
      title="Auditoría de acciones"
      description="Bitácora de seguridad y operación con registro de logins, cambios, aprobaciones, modificaciones y cargas documentales."
      class="page-header"
    />

    <BaseCard title="Eventos recientes" subtitle="Modelo de tabla para auditoría institucional.">
      <!-- Controles de búsqueda y recarga -->
      <div class="audit-toolbar">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar por usuario, empleado, puesto, IP..."
          class="search-input"
          @input="fetchLogs"
        />
        <button class="refresh-btn" @click="fetchLogs" :disabled="loading">
          {{ loading ? 'Cargando...' : 'Actualizar' }}
        </button>
      </div>

      <!-- Mensaje de error si falla la API -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <!-- Tabla de componentes -->
      <AppTable :columns="columns" :rows="rows" />
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api"; // Instancia de Axios configurada
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";

// 1. Columnas de la tabla
const columns = [
  { key: "usuario", label: "Usuario" },
  { key: "empleado_nombre", label: "Empleado" },
  { key: "No_de_empleado", label: "No. Empleado" },
  { key: "puesto", label: "Puesto" },
  { key: "departamento", label: "Departamento" },
  { key: "accion", label: "Acción" },
  { key: "modulo", label: "Módulo" },
  { key: "fecha", label: "Fecha" },
  { key: "ip", label: "IP" }
];

// 2. Definición explícita de variables reactivas
const rows = ref([]);
const loading = ref(false);
const error = ref(null);
const searchQuery = ref("");

// 3. Función de consulta a la API
const fetchLogs = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await api.get("/auditoria", {
      params: {
        buscar: searchQuery.value
      }
    });

    // Si tu backend responde directamente con el array o dentro de response.data.data
    rows.value = Array.isArray(response.data) ? response.data : (response.data.data || []);
  } catch (err) {
    console.error("Error al cargar auditoría:", err);
    error.value = err.response?.data?.error || "Ocurrió un error al cargar los logs de auditoría.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchLogs();
});
</script>

<style scoped>
.page-header {
  margin-bottom: 20px;
  margin-top: 20px;
}

.audit-toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.refresh-btn {
  padding: 8px 16px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  padding: 10px 14px;
  background-color: #f8d7da;
  color: #842029;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}
</style>