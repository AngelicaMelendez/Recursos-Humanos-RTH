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
              <img :src="logoUrl" alt="Logo Hidalgo" class="pdf-logo" />
            </td>
          </tr>
        </table>

        <table class="header-tablee">
          <tr>
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
                Base <div class="checkbox-box"></div>
              </td>
              <td class="checkbox-item">
                Confianza <div class="checkbox-box"></div>
              </td>
              <td class="checkbox-item">
                Honorarios <div class="checkbox-box"></div>
              </td>
            </tr>
          </table>
        </div>

        <div class="content-section">
          <p class="content-text">
          Por este conducto me permito informarle que ha sido comisionado para el día <strong> lunes, 20 de julio del año en curso</strong>, para asistir a  <strong> " "</strong> para " ".
          </p>
        </div>

        <table class="schedule-table">
          <tr>
            <td class="schedule-cell">
              <strong>Salida:</strong> 16:30 hrs.
            </td>
          </tr>
        </table>

        <table class="schedule-table">
          <tr>
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
              <div class="signature-space"></div>
              <div class="signature-name">Mtra. Isela Guadalupe Espinosa López</div>
              <div class="signature-title">Directora de Administración y Finanzas</div>
            </td>
            <td class="signature-cell">
              <div class="signature-role">Acepto Comisión</div>
              <div class="signature-space"></div>
              <div class="signature-name">Omar Efrén Vázquez Moreno</div>
              <div class="signature-title">Jefe de Área A</div>
            </td>
          </tr>
        </table>

      </div>
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
        
        <table class="headeer-tablee">
          <tr>
            <td class="header-right">
              <div class="secc-goob">Pachuca de Soto, Hgo., a 20 de julio 2026</div>
              <div class="rth-texxt">Asunto: Solicitud de Autorizacin de Vacaciones </div>
            </td>
          </tr>
        </table>

        <div class="date-section">
        </div>

        <table class="dataa-tablee">
          <tr>
            <td class="label-cell">Mtra. Isela Guadalupe Espinoza Lopez </td>
          </tr>
          <tr>
            <td class="label-cell">Directora de Administración y Finanzas</td>
          </tr>
          <tr>
            <td class="label-cell">PRESENTE</td>
          </tr>
        </table>


        <table class="headeer-tablee">
          <tr>
            <td class="header-right">
              <div class="secc-goob">Atn. LASC. Lorena Barrera Soto</div>
              <div class="rth-texxt">Subdirectora Adjunta de Recursos Humanos </div>
            </td>
          </tr>
        </table>
       
        <div class="content-section">
          <p class="content-text">
          Por medio del presente, aprovecho la ocasión para saludarlo coordialmente <strong> y a la vez, solicitar su autorización para que me sea otorgado el dia "" de "" del</strong> presente año , a cuenta de mi segundo periodo vacacional del ejercicio 2026,<strong>reanudando mis actividades el dia "" de "" del año 2026</strong>.
          </p>
        </div>

        <div class="content-section">
          <p class="content-text">
          Esta solicitud se formula conforme a lo señalado en los numerales del 96, inciso II <strong> vez, solicitar su autorización para que me sea otorgado el dia "" de "" del</strong> presente año , a cuenta de mi segundo periodo vacacional del ejercicio 2026,<strong>reanudando mis actividades el dia "" de "" del año 2026</strong>.
          </p>
        </div>

        
        <div class="content-section">
          <p class="content-text">
          Esta solicitud se formula conforme a lo señalado en los numerales del 96, inciso II <strong> vez, solicitar su autorización para que me sea otorgado el dia "" de "" del</strong> presente año , a cuenta de mi segundo periodo vacacional del ejercicio 2026,<strong>reanudando mis actividades el dia "" de "" del año 2026</strong>.
          </p>
        </div>

        <table class="schedule-table">
          <tr>
            <td class="schedule-cell">
              <strong>Salida:</strong> 16:30 hrs.
            </td>
          </tr>
        </table>

        <table class="schedule-table">
          <tr>
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
              <div class="signature-space"></div>
              <div class="signature-name">Mtra. Isela Guadalupe Espinosa López</div>
              <div class="signature-title">Directora de Administración y Finanzas</div>
            </td>
            <td class="signature-cell">
              <div class="signature-role">Acepto Comisión</div>
              <div class="signature-space"></div>
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
import BaseCard from "@/components/ui/BaseCard.vue";
import AppTable from "@/components/ui/AppTable.vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import RoleActionBar from "@/components/shared/RoleActionBar.vue";
import StatusBadge from "@/components/shared/StatusBadge.vue";
import logopdf from "@/assets/logopdf.png"
import html2pdf from 'html2pdf.js';
import { computed, ref, onMounted } from "vue";
import { getRoleActions } from "@/utils/permissions";
import { useAuthStore } from "@/store/auth";


const logoUrl = logopdf;
const reporteRef = ref(null);


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


const exportarPDF = () => {
  const elemento = reporteRef.value;

  const opciones = {
    margin:       3, 
    filename:     'Oficio_de_Comision_Ejemplo_RTH.pdf',
    image:        { type: 'png', quality: 1.98 },
    html2canvas:  { 
      scale: 2,          // Resolución nítida de texto
      useCORS: true,     // Asegura la carga de imágenes
      logging: false 
    },
    jsPDF:        { unit: 'mm', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opciones).from(elemento).save();
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

.test-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Roboto, sans-serif;
  background-color: #f3f4f6;
  min-height: 100vh;
}


.control-panel {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  text-align: center;
}

.control-panel h2 {
  margin-top: 0;
  color: #1e293b;
}

.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 15px;
}

.btn {
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary {
  background-color: #0284c7;
  color: white;
}


.btn-primary:hover {
  background-color: #0369a1;
}

.btn-secondary {
  background-color: #e2e8f0;
  color: #334155;
}

.btn-secondary:hover {
  background-color: #cbd5e1;
}




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
  margin-left: 30%;
}

.header-left {
  width: 45%;
  vertical-align: top;
  text-align: left;
  justify-content: left;

}

.pdf-logo {
  max-height: 140px;
  width: 140px;
  vertical-align: top;
  text-align: center;
  margin-bottom: 5px;
  justify-content: left;
  text-align: left;
  object-fit: contain;
  margin-left: 85% ;
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
  margin-top: 8px;
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

</style>

