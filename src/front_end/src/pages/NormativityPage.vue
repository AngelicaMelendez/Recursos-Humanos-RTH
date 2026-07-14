<template>
  <div>
    <PageHeader
      eyebrow="Gestión documental"
      title="Normatividad y repositorio PDF"
      description="Biblioteca Institucional versionada para manuales, lineamientos, reglamentos y documentos oficiales."
    >

          <RoleActionBar 
          :actions="[{ key: 'uploadNormativity', label: 'Subir Normatividad', icon: 'upload', operation: 'C' }]"  
          compact
          @select="selectAction($event, row)"
          />
    
    </PageHeader>

    <p v-if="notice" class="notice">{{ notice }}</p>

    <BaseCard
      v-if="mostrarFormulario"
      title="Subir Nueva Normatividad"
      class="form-card"
    >
      <form @submit.prevent="subirNormatividad"  class="filter-grid">
        <label class="field">
          <span>Nombre del Documento:</span>
          <input
            v-model="formulario.nombre"
            type="text"
            placeholder="Ej. Reglamento Interior"
            required
          />
        </label>

        <label class="field">
          <span>Tipo:</span>
          <input
            v-model="formulario.tipo"
            type="text"
            placeholder="Ej. Manual, Reglamento, Lineamiento"
          />
        </label>

        <label class="field">
          <span>Versión:</span>
          <input
            v-model="formulario.version"
            type="text"
            placeholder="Ej. 1.0"
          />
        </label>

        <label class="field">
          <span>Fecha de Publicación:</span>
          <input v-model="formulario.fecha_publicacion" type="date" />
        </label>

        <label class="field">
          <span>Archivo PDF:</span>
          <input
            class="input-pdf"
            type="file"
            accept="application/pdf"
            @change="manejarArchivo"
            required
          />
        </label>

        <div class="form-actions">
          <button type="submit" class="primary-button" :disabled="guardando">
            {{ guardando ? "Guardando..." : "Guardar en Sistema" }}
          </button>
          <button
            type="button"
            class="secondary-button"
            @click="mostrarFormulario = false"
          >
            Cancelar
          </button>

        </div>
      </form>
    </BaseCard>

    <div class="section-gap">
      <BaseCard
        title="Repositorio Normativo"
        subtitle="Documentos controlados con vigencia, versión y estatus."
      >
        <AppTable :columns="columns" :rows="rows">
          <template #estatus="{ row }">
            <StatusBadge class="badge-class" :value="row.estatus" />
          </template>

          <template #acciones="{ row }">
            <div class="row-actions">
              <RoleActionBar
                :actions="obtenerAccionesPermitidas(row)"
                compact
                @select="selectAction($event, row)"
              />
              
              
            </div>
          </template>
        </AppTable>
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";// Importación de funciones reactivas de Vue 3
import axios from "axios";// Importación de Axios para realizar peticiones HTTP al backend
import BaseCard from "@/components/ui/BaseCard.vue";// Componente de tarjeta base para mostrar contenido en secciones
import AppTable from "@/components/ui/AppTable.vue";// Componente de tabla para mostrar datos en formato tabular
import PageHeader from "@/components/shared/PageHeader.vue";// Componente de encabezado de página con título y descripción
import RoleActionBar from "@/components/shared/RoleActionBar.vue";// Componente para mostrar botones de acción según el rol del usuario
import StatusBadge from "@/components/shared/StatusBadge.vue";// Componente para mostrar el estatus de un registro con un badge visual
import { getRoleActions } from "@/utils/permissions"; //Manejo de permisos, accesos a botones y acciones según el rol del usuario
import { useAuthStore } from "@/store/auth";// Acceso al store de autenticación para obtener el token y rol del usuario
import IconSymbol from "@/components/ui/IconSymbol.vue";

const authStore = useAuthStore();// Acceso al store de autenticación para obtener el token y rol del usuario
const notice = ref("");// Mensaje de aviso o error para el usuario
const rows = ref([]); // Inicializa vacío para llenar desde la API
const guardando = ref(false);// Controla el estado de guardado para deshabilitar el botón y mostrar un mensaje de carga
const mostrarFormulario = ref(false); // Controla la vista del formulario
const editar = ref(false);
const editarID = ref(null);


// Estado del formulario reactivo para una nueva normatividad - esto es acuerdo a la migracion y modelo de normatividad
const formulario = ref({
  nombre: "",
  tipo: "",
  version: "",
  fecha_publicacion: "",
  archivoBinario: null,
});

// Computed properties para obtener las acciones disponibles según el rol del usuario
const actions = computed(() =>

// Filtra las acciones disponibles según el rol del usuario y la sección de normatividad
  getRoleActions(authStore.user?.rol, "normativity"),
);

// Filtra las acciones que se pueden realizar en cada fila de la tabla (R, U, D)
const rowActions = computed(() =>

// Filtra las acciones que se pueden realizar en cada fila de la tabla (Leer, Actualizar, Eliminar y Descargar)
  actions.value.filter((action) => ["R", "U", "D"].includes(action.operation)),
);

// Definición de las columnas de la tabla de normatividades - que muesatra la información de cada documento en el repositorio
const columns = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Documento" },
  { key: "tipo", label: "Tipo" },
  { key: "version", label: "Versión" },
  { key: "fecha_publicacion", label: "Publicación" },
  { key: "estatus", label: "Estatus" },
  { key: "acciones", label: "Acciones" },
];

// Función para manejar la selección de archivo PDF y almacenarlo en el formulario
const manejarArchivo = (event) => {
  // Obtiene el primer archivo seleccionado por el usuario
  const archivo = event.target.files[0];

  // si no hay un archivo seleccionado, se limpia el campo de archivoBinario en el formulario
  if (archivo) {
    // Asigna el archivo seleccionado al campo archivoBinario del formulario
    formulario.value.archivoBinario = archivo;
  }
};

//Función para subir la normatividad al backend y guardar en la base de datos
// =========================================================================
// PUNTO 3: Reemplaza tu función subirNormatividad actual por esta versión
// =========================================================================
const subirNormatividad = async () => {
  guardando.value = true;

  try {
    // 1. Creamos el contenedor FormData obligatorio para enviar archivos binarios (Multipart)
    const formData = new FormData();
    formData.append("nombre", formulario.value.nombre);
    formData.append("tipo", formulario.value.tipo);
    formData.append("version", formulario.value.version);
    formData.append("fecha_publicacion", formulario.value.fecha_publicacion);
    
    // Solo adjuntamos el archivo PDF si el usuario seleccionó uno nuevo en el input
    if (formulario.value.archivoBinario) {
      formData.append("archivo_pdf", formulario.value.archivoBinario);
    }

    // 2. Evaluamos si el formulario se abrió para editar o para crear un registro nuevo
    if (editando.value) {
      // --- MODO EDICIÓN / ACTUALIZACIÓN ---
      // Apunta con un PUT al ID guardado al presionar el botón de la fila
      await axios.put(`http://localhost:8000/api/normatividad/${editandoId.value}`, formData, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          "Content-Type": "multipart/form-data" // Necesario para que viaje el nuevo archivo PDF
        },
      });
      notice.value = `¡La Normatividad "${formulario.value.nombre}" ha sido actualizada con éxito a la versión ${formulario.value.version}!`;
    } else {
      // --- MODO CREACIÓN NORMAL ---
      // Si no estamos editando, hace el POST tradicional que ya tenías para crear un registro nuevo
      await axios.post("http://localhost:8000/api/normatividad", formData, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      notice.value = "¡Normatividad guardada exitosamente en el sistema!";
    }

    // 3. Limpieza de estados globales tras una petición exitosa
    mostrarFormulario.value = false;
    editando.value = false;
    editandoId.value = null;

    // Reseteamos los campos del formulario para que queden completamente vacíos
    formulario.value = {
      nombre: "",
      tipo: "",
      version: "",
      fecha_publicacion: "",
      archivoBinario: null,
    };

    // 4. Refrescamos la tabla de inmediato con los nuevos datos actualizados desde la BD
    fetchNormatividades();

  } catch (error) {
    console.error("Error al procesar la normatividad:", error);
    notice.value = `Error: ${error.response?.data?.error || error.response?.data?.details || error.message}`;
  } finally {
    guardando.value = false;
  }
};


const fetchNormatividades = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/normatividad");
    rows.value = response.data;
  } catch (error) {
    console.error("Error cargando normatividades:", error);
  }
};

// Cargar los archivos al arrancar el componente
onMounted(() => {
  fetchNormatividades();
});


const obtenerAccionesPermitidas = (row) => {
  const accionesBase = [
    { key: 'viewNormativity', label: 'Consultar Normatividad', icon: 'eye', operation: 'R' },
    { key: 'downloadNormativity', label: 'Descargar PDF', icon: 'saveAlt', operation:'R' },
    { key: 'updateNormativity', label: 'Actualizar Normatividad', icon: 'edit', operation:'U' }
  ];

  if (row.estatus === 'inactiva' || row.estatus === 'Inactiva') {
    // Si ya está inactiva, se le permite volver a Activarse
    accionesBase.push({ key: 'activateNormativity', label: 'Activar lógica', icon: 'check', operation:'U' });
  } else {
    // Si está activa, se le permite mandarse a Baja Lógica
    accionesBase.push({ key: 'desactivateNormativity', label: 'Baja Lógica', icon: 'archive', operation:'D' });
  }


  return accionesBase;
};

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
      const nuevaVersion = `${parseFloat(row.version || "1.0") + 0.1}`.slice(
        0,
        3,
      );

      await axios.put(
        `http://localhost:8000/api/normatividad/${row.id}`,
        {
          version: nuevaVersion,
        },
        {
          headers: { Authorization: `Bearer ${authStore.token}` },
        },
      );

      notice.value = `¡${row.nombre} Ha Sido Actualizado con Éxito a la Versión: ${nuevaVersion}!`;
      fetchNormatividades(); // Recarga la tabla con los datos de la BD
    } catch (error) {
      console.error("Error al actualizar:", error);
      notice.value = "Error al intentar actualizar el documento.";
    }
    return;
  }

  // 3. Botón en fila: Baja Lógica (Llave del catálogo: desactivateNormativity)
  if (action.key === "desactivateNormativity" && row) {
    if (
      confirm(
        `¿Estás completamente seguro de Dar de Baja Logica la Normatividad: "${row.nombre}"? Su Estatus cambiara a Inactiva.`,
      )
    ) {
      try {
        await axios.put(`http://localhost:8000/api/normatividad/${row.id}`, 
        {
          nombre: row.nombre,
          tipo: row.tipo,
          version: row.version,
          fecha_publicacion: row.fecha_publicacion,
          estatus: "inactiva"
        },
        {
          headers: { Authorization: `Bearer ${authStore.token}` },
        },
      );

        notice.value = `La Normatividad: "${row.nombre}" ha sido Dada de Baja en el sistema correctamente.`;
        fetchNormatividades(); // Recarga la tabla al instante
      } catch (error) {
        console.error("Error al Aplicar Baja de Lógica", error);
        notice.value = "Error al Intentar Cambiar el Estatus de la Normatividad en el Servidor.";
      }
    }
    return;
  }

  // 4. Botón en fila: Activar Normatividad (Llave del catálogo: activateNormativity)
  if (action.key === "activateNormativity" && row) {
    if (
      confirm(
        `¿Deseas volver a Activar de Forma Lógica la Normatividad: "${row.nombre}"? Su Estatus cambiará a Activa.`,
      )
    ) {
      try {
        await axios.put(`http://localhost:8000/api/normatividad/${row.id}`, 
          {
            nombre: row.nombre,
            tipo: row.tipo,
            version: row.version,
            fecha_publicacion: row.fecha_publicacion,
            estatus: "activa" // Volvemos a mandar el estatus vigente
          },
          {
            headers: { Authorization: `Bearer ${authStore.token}` },
          },
        );

        notice.value = `¡La Normatividad: "${row.nombre}" ha sido Activada con Éxito en el sistema!`;
        fetchNormatividades(); // Recarga la tabla al instante para ver el badge en verde
      } catch (error) {
        console.error("Error al Activar la Normatividad de Forma Lógica:", error);
        notice.value = "Error al Intentar Activar la Normatividad en el Servidor.";
      }
    }
    return;
  }

  
  // 5. Botón Consultar Repositorio (Llave del catálogo: viewNormativity)
  if (action.key === "viewNormativity" && row) {
    if (row.archivo_pdf) {
      // Abre el archivo PDF real en una pestaña nueva del navegador
      window.open(`http://localhost:8000/${row.archivo_pdf}`, "_blank");
    } else {
      notice.value =
        "Este documento no cuenta con un archivo PDF físico adjunto.";
    }
    return;
  }



//6. Botón para Descargar el Archivo PDF de la Normatividad desde el Backend (Llave del catálogo: downloadNormativity)
if (action.key === "downloadNormativity" && row) {

  // Manejo de errores para la descarga de archivos PDF
  try {

    //Mensaje de aviso en caso de que comience la descarga de algun PDF de alguna normatividad
    notice.value = `Iniciando la descarga de: ${row.nombre}...`;

    // Hacemos la petición al backend pidiendo el archivo como un 'blob' - blob es un objeto que representa datos binarios, como un archivo PDF, en la memoria del navegador.
    const response = await axios.get(
      `http://localhost:8000/${row.archivo_pdf}`,
      {
        // Configuración para recibir el archivo como un blob
        responseType: "blob",
      },
    );

    // Creación de una URL temporal local en el navegador para ese archivo binario
    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

    // Creación de un enlace <a> invisible en la memoria
    const enlaceOculto = document.createElement("a");

    // Asignamos la URL temporal al enlace
    enlaceOculto.href = blobUrl;

    // Limpiamos el nombre del archivo para que sea seguro y compatible con la mayoría de los sistemas de archivos
    const nombreLimpio = row.nombre.replace(/[^a-zA-Z0-9]/g, "_");

    //configuración con el nombre del archivo descargado, incluyendo la versión si está disponible
    enlaceOculto.setAttribute(
      "download",
      `${nombreLimpio}_v${row.version || "1.0"}.pdf`,
    );

    // Añadimos el enlace al documento, lo cliqueamos automáticamente y lo destruimos
    document.body.appendChild(enlaceOculto);

    // Simulamos un clic en el enlace para iniciar la descarga
    enlaceOculto.click();

    // Eliminamos el enlace del DOM después de la descarga
    document.body.removeChild(enlaceOculto);

    // Liberamos la memoria del navegador
    window.URL.revokeObjectURL(blobUrl);

    // Mensaje en caso de que se descarque el pdf con éxito al usuario
    notice.value = `¡"${row.nombre}" Descargado con Éxito!`;

    //la funcion catch maneja los errores de descarga, como problemas de red o permisos, y muestra un mensaje de error adecuado al usuario.
  } catch (error) {

    // Manejo de errores más detallado - errores de red, permisos, etc.
    console.error("Error al descargar el archivo:", error);
    
    //mensaje de error de descarga
    notice.value = "No se pudo procesar la descarga del archivo PDF.";
  }
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

.row-actions {
  display:inline;
  gap: 8px;
  align-items: center;
  font-weight: bold;
}

.role-actions {
  margin-top: 10px;
  margin-bottom: 10px;
  display: inline-flex;
  font-weight: bold;
}

.primary-button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  align-items:center;
  justify-content:center;
  text-align: center;
  margin-right: 20px;
  margin-top: 12px;
  margin-bottom: 12px;
  font-weight: 1.10rem;
  font-size: 0.95rem;
  width: auto;
  height: auto;
  display: inline-flex;
  gap: 8px;
  white-space: nowrap;
}

.primary-button:hover {
  transform: translateY(-1px);
}

.secondary-button {
  background-color: var(--color-surface);
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  align-items:center;
  justify-content:center;
  text-align: center;
  margin-right: 20px;
  margin-top: 12px;
  margin-bottom: 12px;
}

.secondary-button:hover {
  transform: translateY(-1px);
}

.header-action-container {
  margin-top: 1rem;     
  margin-bottom: 1.5rem;   
  display: flex;
  justify-content: flex-start; 
}

.icon {
  width: px;
  height: 20px;
  margin-right: 2px;
  margin-top: 2px;
  

}

.icon-hover .icon {
  stroke: var(--color-primary);
}  

.input-pdf {
  border-radius: 20px;
  box-shadow: black;
}

.notice {
  background-color: #fef3c7;
  color: #b45309;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-weight: bold;
}

.badge-class {
  background-color: #A02142;
  color: #ffffff;
}

</style>


