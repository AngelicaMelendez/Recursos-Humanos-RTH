<template>
  <div>
    <PageHeader
      eyebrow="Gestión documental"
      title="Normatividad y repositorio PDF"
      description="Biblioteca Institucional versionada para manuales, lineamientos, reglamentos y documentos oficiales."
    >

    </PageHeader>
    
    <p v-if="notice" class="notice">{{ notice }}</p>

    <BaseCard v-if="mostrarFormulario" title="Subir Nueva Normatividad" class="form-card">
      <form @submit.prevent="subirNormatividad" class="filter-grid">
        <label class="field">
          <span>Nombre del Documento</span>
          <input v-model="formulario.nombre" type="text" placeholder="Ej. Reglamento Interior" required />
        </label>

        <label class="field">
          <span>Tipo</span>
          <input v-model="formulario.tipo" type="text" placeholder="Ej. Manual, Reglamento, Lineamiento" />
        </label>

        <label class="field">
          <span>Versión</span>
          <input v-model="formulario.version" type="text" placeholder="Ej. 1.0" />
        </label>

        <label class="field">
          <span>Fecha de Publicación</span>
          <input v-model="formulario.fecha_publicacion" type="date" />
        </label>

        <label class="field">
          <span>Archivo PDF</span>
          <input type="file" accept="application/pdf" @change="manejarArchivo" required />
        </label>

        <div class="form-actions">
          <button type="submit" class="primary-button" :disabled="guardando">
            {{ guardando ? 'Guardando...' : 'Guardar en Sistema' }}
          </button>
          <button type="button" class="secondary" @click="mostrarFormulario = false">Cancelar</button>
        </div>
      </form>
    </BaseCard>

    <div class="section-gap">
      <BaseCard title="Repositorio Normativo" subtitle="Documentos controlados con vigencia, versión y estatus.">
        <AppTable :columns="columns" :rows="rows">
          <template #estatus="{ row }">
            <StatusBadge :value="row.estatus" />
          </template>
          <template #acciones="{ row }">
            <div class="row-actions">
              
              <button
                v-if= "row.archivo_pdf"
                @click="descargarDocumento(row)"
                class="link-button download-link"
                title="Descargar Normatividad"
                >
                Descargar Normatividad
              </button>
              
              <RoleActionBar :actions="rowActions" compact @select="selectAction($event, row)" />
            </div>
          </template>
        </AppTable>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import axios from "axios"; 
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import RoleActionBar from "@/components/shared/RoleActionBar.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";

import { getRoleActions } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
const notice = ref("");
const rows = ref([]); // Inicializa vacío para llenarlo desde tu API
const guardando = ref(false);
const mostrarFormulario = ref(false); // Controla la vista del formulario


// Estado del formulario reactivo
const formulario = ref({
  nombre: "",
  tipo: "",
  version: "",
  fecha_publicacion: "",
  archivoBinario: null
});

const actions = computed(() => getRoleActions(authStore.user?.rol, "normativity"));
const rowActions = computed(() => actions.value.filter((action) => ["R", "U", "D"].includes(action.operation)));



const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Documento" },
  { key: "tipo", label: "Tipo" },
  { key: "version", label: "Versión" },
  { key: "fecha_publicacion", label: "Publicación" },
  { key: "estatus", label: "Estatus" },
  { key: "acciones", label: "Acciones" }
];

const manejarArchivo = (event) => {
  const archivo = event.target.files[0];
  if (archivo) {
    formulario.value.archivoBinario = archivo;
  }
};


const subirNormatividad = async () => {
  guardando.value = true;
  try {
    const formData = new FormData();
    formData.append('nombre', formulario.value.nombre);
    formData.append('tipo', formulario.value.tipo);
    formData.append('version', formulario.value.version);
    formData.append('fecha_publicacion', formulario.value.fecha_publicacion);
    formData.append('archivo_pdf', formulario.value.archivoBinario); 

    await axios.post('http://localhost:8000/api/normatividad', formData, {
      headers: {
        'Authorization': `Bearer ${authStore.token}` 
      }
    });

    notice.value = "¡Normatividad guardada exitosamente en el sistema!";
    mostrarFormulario.value = false;
    
    // Resetear formulario
    formulario.value = { nombre: "", tipo: "", version: "", fecha_publicacion: "", archivoBinario: null };
    
    // Recargar tabla de inmediato
    fetchNormatividades();
  } catch (error) {
 console.error("Error en la petición", error);
    notice.value = `Error: ${error.response?.data?.error || error.response?.data?.details || error.message}`;
  } finally {
    guardando.value = false;
  }
};


const fetchNormatividades = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/normatividad');
    rows.value = response.data;
  } catch (error) {
    console.error("Error cargando normatividades:", error);
  }
};

// Cargar los archivos al arrancar el componente
onMounted(() => {
  fetchNormatividades();
});

const selectAction = async (action, row = null) => {
  // 1. Botón superior: Subir Normatividad (Llave del catálogo: uploadNormativity)
  if (action.key === "uploadNormativity") {
    mostrarFormulario.value = true;
    return;
  }

  // 2. Botón en fila: Actualizar Documento (Llave del catálogo: updateNormativity)
  if (action.key === "updateNormativity" && row) {
    try {
      // Incrementamos la versión de forma automática (+0.1) para la actualización rápida
      const nuevaVersion = `${parseFloat(row.version || "1.0") + 0.1}`.slice(0, 3);
      
      await axios.put(`http://localhost:8000/api/normatividad/${row.id}`, {
        version: nuevaVersion
      }, {
        headers: { 'Authorization': `Bearer ${authStore.token}` }
      });

      notice.value = `¡${row.nombre} actualizado con éxito a la versión ${nuevaVersion}!`;
      fetchNormatividades(); // Recarga la tabla con los datos de la BD
    } catch (error) {
      console.error("Error al actualizar:", error);
      notice.value = "Error al intentar actualizar el documento.";
    }
    return;
  }

  // 3. Botón en fila: Baja Lógica (Llave del catálogo: deactivateNormativity)
  // Acción: Eliminar permanentemente (Botón de la fila con icono de archivo/bote)
if (action.key === "desactivateNormativity" && row) {
  if (confirm(`¿Estás completamente seguro de ELIMINAR PERMANENTEMENTE el documento "${row.nombre}"? Esta acción no se puede deshacer.`)) {
    try {
      await axios.delete(`http://localhost:8000/api/normatividad/${row.id}`, {
        headers: { 'Authorization': `Bearer ${authStore.token}` }
      });

      notice.value = `El documento "${row.nombre}" ha sido eliminado del sistema de manera permanente.`;
      fetchNormatividades(); // Recarga la tabla al instante
    } catch (error) {
      console.error("Error al eliminar:", error);
      notice.value = "Error al intentar eliminar el archivo del servidor.";
    }
  }
  return;
}

  // 4. Botón en fila: Consultar Repositorio (Llave del catálogo: viewNormativity)
  if (action.key === "viewNormativity" && row) {
    if (row.archivo_pdf) {
      // Abre el archivo PDF real en una pestaña nueva del navegador
      window.open(`http://localhost:8000/${row.archivo_pdf}`, '_blank');
    } else {
      notice.value = "Este documento no cuenta con un archivo PDF físico adjunto.";
    }
    return;
  }
};


const descargarDocumento = async (row) => {
  try {
    notice.value = `Iniciando la descarga de: ${row.nombre}...`;

    // Hacemos la petición al backend pidiendo el archivo como un 'blob'
    const response = await axios.get(`http://localhost:8000/${row.archivo_pdf}`, {
      responseType: 'blob', 
    });

    // Creamos una URL temporal local en el navegador para ese archivo binario
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    
    // Creamos un enlace <a> invisible en la memoria
    const enlaceOculto = document.createElement('a');
    enlaceOculto.href = blobUrl;

    
    const nombreLimpio = row.nombre.replace(/[^a-zA-Z0-9]/g, "_");
    enlaceOculto.setAttribute('download', `${nombreLimpio}_v${row.version || '1.0'}.pdf`);

    // Añadimos el enlace al documento, lo cliqueamos automáticamente y lo destruimos
    document.body.appendChild(enlaceOculto);
    enlaceOculto.click();
    document.body.removeChild(enlaceOculto);
    
    // Liberamos la memoria del navegador
    window.URL.revokeObjectURL(blobUrl);

    notice.value = `¡"${row.nombre}" descargado con éxito!`;
  } catch (error) {
    console.error("Error al descargar el archivo:", error);
    notice.value = "No se pudo procesar la descarga del archivo PDF.";
  }
};

</script>

<style scoped>

.page-header {
  margin-top: 15px;
  margin-bottom: 15px;
}

.form-card {
  margin-bottom: 20px;
  background: var(--color-surface-muted, #f9f9f9);
}
.filter-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 200px;
}
.field span {
  font-size: 0.85rem;
  font-weight: 600;
}
.field input {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.form-actions {
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: flex-end;
  margin-top: 12px;
}
.pdf-link {
  text-decoration: none;
  background-color: #2f6b4f;
  color: white !important;
}
.row-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.role-actions {
  margin-top: 10px;
  margin-bottom: 10px;
}

.download-link{
  text-decoration: none;
  background: var(--color-primary);
  color: white !important;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.86rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s ;
  font-weight: 500;
  box-shadow: cornsilk;
}

.download-link:hover {
    transform: translateY(-1px);

  }
  
  </style>