<template>
  <div>
    <PageHeader
      eyebrow="Atracción de talento"
      title="Vacantes institucionales"
      description="Seguimiento de puestos abiertos, perfil requerido, tipo de contratación y estatus de cobertura."
    >
    
    </PageHeader>
    <p v-if="notice" class="notice">{{ notice }}</p>
    <BaseCard title="Vacantes Abiertas" subtitle="Consulta de posiciones por área y prioridad.">
      <AppTable :columns="columns" :rows="rows">
        <template #estatus="{ row }">
          <StatusBadge :value="row.estatus" />
        </template>
        <template #acciones="{ row }">
          <RoleActionBar :actions="rowActions" compact @select="selectAction($event, row)" />
        </template>
      </AppTable>
    </BaseCard>
  </div>

  
  <div class="pdf-editor-layout">
    <!-- panel izquierdo: formulario de edición -->
    <div class="editor-sidebar">
      <h3>Editar Datos del Documento</h3>
      
      <div class="form-group">
        <label>Tipo de Documento:</label>
        <select v-model="tipoDocumento">
          <option value="vacaciones-f1">Vacaciones (Formato 1 - DAF)</option>
          <option value="vacaciones-f2">Vacaciones (Formato 2 - Director de Área)</option>
        </select>
      </div>

    
      <template v-if="tipoDocumento === 'vacaciones-f2'">
        <div class="form-group">
          <label>Director de Área que Autoriza:</label>
          <input type="text" v-model="form.director_area_nombre" />
        </div>
        <div class="form-group">
          <label>Cargo / Área del Director:</label>
          <input type="text" v-model="form.director_area_puesto" />
        </div>
        <div class="form-group">
          <label>Jefe Inmediato:</label>
          <input type="text" v-model="form.jefe_nombre" />
        </div>
        <div class="form-group">
          <label>Cargo Jefe Inmediato:</label>
          <input type="text" v-model="form.jefe_puesto" />
        </div>
      </template>

      <button class="btn-primary" @click="generarPDF">
         Descargar PDF
      </button>
    </div>

    <!-- PANEL DERECHO: VISTA PREVIA EN TIEMPO REAL -->
    <div class="preview-area">
      <div class="paper-sheet">
        
        <!-- FORMATO 1 -->
        <div v-if="tipoDocumento === 'vacaciones-f1'" id="pdf-to-print" class="pdf-container">
          <div class="header-right">
            <p><strong>Pachuca de Soto, Hgo., a {{ form.fecha_solicitud }}</strong></p>
            <p><strong>Asunto:</strong> Solicitud de Autorización de Vacaciones</p>
          </div>

          <div class="recipient-block">
            <p><strong>Mtra. Isela Guadalupe Espinosa López</strong></p>
            <p>Directora de Administración y Finanzas</p>
            <p><strong>PRESENTE</strong></p>
            <p class="attn">Atn. LASC. Lorena Barrera Soto<br>Subdirectora Adjunta de Recursos Humanos</p>
          </div>

          <div class="body-text">
            <p>
              Por medio del presente, aprovecho la ocasión para saludarlo cordialmente y a la vez, 
              solicitar su autorización para que me sea otorgado <strong>{{ form.dias_solicitados }}</strong>, 
              a cuenta de mi {{ form.periodo }} periodo vacacional del ejercicio {{ form.ejercicio }}, 
              reanudando mis actividades el día <strong>{{ form.fecha_reanudacion }}</strong>.
            </p>
            <p>
              Esta solicitud se formula conforme a lo señalado en los numerales 96, inciso II (julio-octubre) y el 101 del acuerdo que contiene las políticas, Bases y Lineamientos para la administración de los recursos humanos al servicio del Poder Ejecutivo del Estado de Hidalgo.
            </p>
            <p>Agradezco de antemano su atención y quedo a su disposición para cualquier aclaración.</p>
          </div>

          <div class="signatures-section">
            <div class="signature-row single">
              <div class="signature-box">
                <p class="role-title">Solicito</p>
                <div class="signature-line"></div>
                <p class="name">{{ form.empleado_nombre }}</p>
                <p class="position">{{ form.empleado_puesto }}</p>
              </div>
            </div>

            <div class="signature-row dual">
              <div class="signature-box">
                <p class="role-title">Autorizó</p>
                <div class="signature-line"></div>
                <p class="name">Mtra. Isela Guadalupe Espinosa López</p>
                <p class="position">Directora de Administración y Finanzas</p>
              </div>
              <div class="signature-box">
                <p class="role-title">Autorizó</p>
                <div class="signature-line"></div>
                <p class="name">{{ form.jefe_nombre }}</p>
                <p class="position">{{ form.jefe_puesto }}</p>
              </div>
            </div>

            <div class="signature-row single">
              <div class="signature-box">
                <p class="role-title">Vo. Bo.</p>
                <div class="signature-line"></div>
                <p class="name">LASC. Lorena Barrera Soto</p>
                <p class="position">Subdirectora Adjunta de Recursos Humanos</p>
              </div>
            </div>
          </div>
        </div>

        <!-- FORMATO 2 -->
        <div v-else-if="tipoDocumento === 'vacaciones-f2'" id="pdf-to-print" class="pdf-container">
          <div class="header-right">
            <p><strong>Pachuca de Soto, Hgo., a {{ form.fecha_solicitud }}</strong></p>
            <p><strong>Asunto:</strong> Solicitud de Autorización de Vacaciones</p>
          </div>

          <div class="recipient-block">
            <p><strong>Mtra. Isela Guadalupe Espinosa López</strong></p>
            <p>Directora de Administración y Finanzas</p>
            <p><strong>PRESENTE</strong></p>
            <p class="attn">Atn. LASC. Lorena Barrera Soto<br>Subdirectora Adjunta de Recursos Humanos</p>
          </div>

          <div class="body-text">
            <p>
              Por medio del presente, aprovecho la ocasión para saludarlo cordialmente y a la vez, 
              solicitar su autorización para que me sea otorgado <strong>{{ form.dias_solicitados }}</strong>, 
              a cuenta de mi {{ form.periodo }} periodo vacacional del ejercicio {{ form.ejercicio }}, 
              reanudando mis actividades el día <strong>{{ form.fecha_reanudacion }}</strong>.
            </p>
            <p>
              Esta solicitud se formula conforme a lo señalado en los numerales 96, inciso II (julio-octubre) y el 101 del acuerdo que contiene las políticas, Bases y Lineamientos para la administración de los recursos humanos al servicio del Poder Ejecutivo del Estado de Hidalgo.
            </p>
            <p>Agradezco de antemano su atención y quedo a su disposición para cualquier aclaración.</p>
          </div>

          <div class="signatures-section">
            <div class="signature-row single">
              <div class="signature-box">
                <p class="role-title">Solicito</p>
                <p class="name">{{ form.empleado_nombre }}</p>
                <p class="position">{{ form.empleado_puesto }}</p>
              </div>
            </div>

            <div class="signature-row dual">
              <div class="signature-box">
                <p class="role-title">Autorizó</p>
                <p class="name">{{ form.director_area_nombre }}</p>
                <p class="position">{{ form.director_area_puesto }}</p>
              </div>
              <div class="signature-box">
                <p class="role-title">Autorizó</p>
                <p class="name">{{ form.jefe_nombre }}</p>
                <p class="position">{{ form.jefe_puesto }}</p>
              </div>
            </div>

            <div class="signature-row dual">
              <div class="signature-box">
                <p class="role-title">Vo. Bo.</p>
                <p class="name">LASC. Lorena Barrera Soto</p>
                <p class="position">Subdirectora Adjunta de Recursos Humanos</p>
              </div>
              <div class="signature-box">
                <p class="role-title">Vo. Bo.</p>
                <p class="name">Mtra. Isela Guadalupe Espinosa López</p>
                <p class="position">Directora de Administración y Finanzas</p>
              </div>
            </div>
          </div>
        </div>



      </div>

    </div>
  </div>


</template>

<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import RoleActionBar from "@/components/shared/RoleActionBar.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";

import html2pdf from 'html2pdf.js';
import { computed, ref, reactive ,watch } from "vue";
import { getRoleActions } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";





const authStore = useAuthStore();
const notice = ref("");

const actions = computed(() => getRoleActions(authStore.user?.rol, "vacancies"));
const rowActions = computed(() => actions.value.filter((action) => ["R", "U"].includes(action.operation)));




const selectAction = (action, row = null) => {
  if (action.key === "publishVacancy") {
    rows.value.unshift({
      id: `VAC-${String(rows.value.length + 10)}`,
      area: "Recursos Humanos",
      puesto: "Nueva vacante",
      tipo_contrato: "Por definir",
      fecha_publicacion: new Date().toISOString().slice(0, 10),
      estatus: "activa"
    });
    notice.value = "Vacante publicada en la vista demo.";
    return;
  }

  if (action.key === "closeVacancy" && row) {
    row.estatus = "cerrada";
    notice.value = `${row.id} fue cerrada correctamente.`;
    return;
  }

  notice.value = row ? `${row.id}: ${row.puesto}` : "Consulta de vacantes.";
};

const columns = [
  { key: "id", label: "ID" },
  { key: "area", label: "Área" },
  { key: "puesto", label: "Puesto" },
  { key: "tipo_contrato", label: "Contrato" },
  { key: "fecha_publicacion", label: "Publicación" },
  { key: "estatus", label: "Estatus" },
  { key: "acciones", label: "Acciones" }
];

const rows = ref([
  {
    id: "VAC-10",
    area: "Producción TV",
    puesto: "Editor de video",
    tipo_contrato: "Honorarios",
    fecha_publicacion: "2026-04-21",
    estatus: "activa"
  },
  {
    id: "VAC-11",
    area: "Recursos Humanos",
    puesto: "Auxiliar documental",
    tipo_contrato: "Base",
    fecha_publicacion: "2026-05-02",
    estatus: "pendiente"
  }
]);



const props = defineProps({
  datosIniciales: {
    type: Object,
    default: () => ({})
  }
})

const tipoDocumento = ref('vacaciones-f1')

const form = reactive({
  fecha_solicitud: '17 de julio del 2026',
  periodo: 'segundo',
  ejercicio: '2026',
  dias_solicitados: 'el día 31 de julio del presente año',
  fecha_reanudacion: '4 de agosto del año 2026',
  empleado_nombre: 'LA',
  empleado_puesto: 'Desarrollador Frontend',
  jefe_nombre: 'Omar Efrén Vázquez Moreno',
  jefe_puesto: 'Encargado de Tecnologías de la Información',
  director_area_nombre: 'Nombre (Director de Área)',
  director_area_puesto: 'Dirección del Área Correspondiente'
})

watch(() => props.datosIniciales, (nuevosDatos) => {
  if (nuevosDatos && Object.keys(nuevosDatos).length) {
    Object.assign(form, nuevosDatos)
  }
}, { immediate: true })

const generarPDF = async () => {
  const elemento = document.getElementById('pdf-to-print')
  if (!elemento) return

  const opciones = {
    margin:       [10, 10, 10, 10],
    filename:     `Oficio_Vacaciones_${Date.now()}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 3, useCORS: true, letterRendering: true },
    jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' }
  }

  await html2pdf().set(opciones).from(elemento).save()



};


</script>

<style scoped>
.notice {
  margin: 0 0 16px;
  padding: 12px 14px;
  border: 1px solid rgba(47, 107, 79, 0.22);
  border-radius: 8px;
  background: rgba(47, 107, 79, 0.1);
  color: var(--color-success);
  font-weight: 700;
}

.role-actions{
  margin-bottom: 20px;
  margin-top: 20px;
}

.page-header{
  margin-bottom: 20px;
  margin-top: 20px;
}

.pdf-editor-layout {
  display: flex;
  height: 100vh;
  background: #8a3c3c;
  color: #fff;
}

.editor-sidebar {
  width: 380px;
  background: #f0f0f3;
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid #f1efef;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 4px;
  color: #ccc;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #f5ecec;
  background: #f1eeee;
  color: #fff;
  box-sizing: border-box;
}

.divider {
  border: 0;
  border-top: 1px solid #ebe7e7;
  margin: 20px 0;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #A02142;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;

  cursor: pointer;
  margin-top: 15px;
}

.btn-primary:hover {
  background-color: #0b5ed7;
}

.preview-area {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  background: #f4f1f1;
}

.paper-sheet {
  background: #fff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
}

.pdf-container {
  width: 216mm;
  min-height: 279mm;
  padding: 18mm 20mm;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11pt;
  line-height: 1.5;
  color: #000;
  box-sizing: border-box;
}

.header-right { text-align: right; margin-bottom: 20px; }
.recipient-block { margin-bottom: 20px; }
.recipient-block p { margin: 2px 0; }
.attn { margin-top: 8px !important; font-size: 10.5pt; }
.body-text { text-align: justify; margin-bottom: 25px; }
.body-text p { margin-bottom: 12px; text-indent: 25px; }
.signatures-section { margin-top: 30px; }
.signature-row { display: flex; justify-content: center; margin-bottom: 25px; }
.signature-row.dual { justify-content: space-between; }
.signature-box { width: 45%; text-align: center; }
.signature-row.single .signature-box { width: 50%; }
.role-title { font-weight: bold; margin-bottom: 40px; }
.name { font-weight: bold; font-size: 9.5pt; margin: 0; }
.position { font-size: 8.5pt; margin: 0; color: #222; }

</style>

