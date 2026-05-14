<template>
  <div class="flex-container">
    <div class="calendar-wrapper">
    <FullCalendar :options="calendarOptions" />
  </div>

  <div class="Simbologia">
    <h3>Simbología</h3>
    <ul>
      <li><span class="legend-color-1" style="background-color: #621132;"></span> Vacaciones</li>
      <li><span class="legend-color-2" style="background-color: #b38e5d;"></span> Incapacidades</li>
      <li><span class="legend-color-3" style="background-color: #2f6b4f;"></span> Cumpleaños</li>
      <li><span class="legend-color-4" style="background-color: #7d2342;"></span> Comisiones</li>
    </ul>

  </div>
  </div>
</template>

<style scoped>
:deep(.fc-col-header-cell-cushion) {
  text-transform: uppercase; /* Días (LUN, MAR...) en mayúsculas */
  font-weight: 700;
  font-size: 0.8rem;
}

:deep(.fc-toolbar-title) {
  text-transform: uppercase; /* Mes (Mayo 2026) */
  font-weight: 700;

}

</style>

<style scoped>

/* Redondear el borde exterior de todo el calendario */
:deep(.fc-view-harness) {
  border-radius: 12px;
  overflow: hidden; /* Importante para que las celdas no se salgan del redondeo */
  border: 1px solid #e2e8f0;
}

/* Redondear el efecto de "hover" o selección de las celdas */
:deep(.fc-daygrid-day-frame) {
  border-radius: 4px;
}

/* Redondear el indicador del día actual (si lo tienes resaltado) */
:deep(.fc-day-today) {
  border-radius: 8px !important;
  
}

:deep(.fc-daygrid-day.events){
  border-radius: 8px !important;
}

</style>


<style scoped>
/* Redondea los eventos (las barras de colores) */
:deep(.fc-event) {
  border-radius: 8px !important; /* Ajusta el número para más o menos redondeo */
  border: none;
  padding: 2px 4px;
}

:deep(.fc-daygrid-day-number) {
  border-radius: 8px !important;
  color: black !important;
}

/* Si usas la vista de mes (dayGridMonth), asegura el redondeo aquí */
:deep(.fc-daygrid-event) {
  border-radius: 8px !important;
}

:deep(.fc-scrollgrid-day-frame) {
  border-radius: 8px !important;
  background-color: #6F7271;
} 

/* Cambia el fondo de todas las celdas del mes */
:deep(.fc-daygrid-day) {
  background-color: #fdfdfd; /* Un blanco roto o gris muy ligero */
}

/* Cambia el color de fondo de las celdas que no pertenecen al mes actual */
:deep(.fc-day-other) {
  background-color: #f1f5f9; /* Un gris un poco más oscuro */
  opacity: 0.6;
}

:deep(.fc-daygrid-day:hover) {
  background-color: #f8fafc !important;
  cursor: pointer;
}

:deep(.fc-daygrid-day) {
  background-color: #fcfcfc; /* Un gris casi blanco */
}

/* El fondo del área donde está el número del día */
:deep(.fc-daygrid-day-top) {
  background-color: rgba(0, 0, 0, 0.02); /* Sutil sombreado arriba */
}

/* Color para Sábados y Domingos */
:deep(.fc-day-sat), 
:deep(.fc-day-sun) {
  background-color: #f9f9f9 !important; /* Gris un poco más marcado */
}

:deep(.fc-daygrid-day:hover) {
  background-color: #fff5f7 !important; /* Un tono crema o rosado muy tenue */
  transition: background-color 0.2s ease;
}

/* Estilo para las celdas de la cabecera (LUN, MAR, etc.) */
:deep(.fc-col-header-cell) {
  background-color: #5f5757; /* El azul muy tenue de tu imagen */
  padding: 15px 0;           /* Les da un poco más de altura */
}

/* Estilo para el texto dentro de esas celdas */
:deep(.fc-col-header-cell-cushion) {
  text-transform: uppercase; /* MAYÚSCULAS */
  font-weight: 700;          /* Negrita */
  color: #1e293b;            /* Azul oscuro profesional */
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  text-decoration: none !important; /* Quita el subrayado si es link */
}


</style>

<style scoped>
.Simbologia {
  margin-top: 20px;
}
.Simbologia h3 {
  margin-bottom: 10px;
}
.Simbologia ul {
  list-style: none;
  padding: 0;
}
.Simbologia li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.legend-color-1, .legend-color-2, .legend-color-3, .legend-color-4 {
  display
  :inline-block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 4px;
}
</style>


<style scoped>
.flex-container {
  display: flex;
  gap: 40px;
}
.calendar-wrapper {
  flex: 1;
}

</style>

<style scoped>
@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }
}
</style>

<style scoped>
@media (max-width: 768px) {
  .Simbologia {
    margin-top: 30px;
  }
}
</style>

<style scoped>
@media (max-width: 768px) {
  .Simbologia ul {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
}
</style>

<style scoped>
@media (max-width: 768px) {
  .Simbologia li {
    flex: 1 1 45%;
  }
}
</style>


<style scoped>
:deep(.fc) {
  /* Colores de bordes y fondo */
  --fc-border-color: #f1f5f9;
  --fc-daygrid-event-dot-width: 8px;
  
  /* Color del resaltado de hoy */
  --fc-today-bg-color: #f8fafc;
  
  /* Botones del encabezado */
  --fc-button-bg-color: #621132; /* Tu guinda institucional */
  --fc-button-border-color: #621132;
  --fc-button-hover-bg-color: #4a0d26;
  --fc-button-active-bg-color: #4a0d26;
}

:deep(.fc .fc-button) {
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

/* Quitar el borde azul feo al hacer clic */
:deep(.fc .fc-button:focus) {
  box-shadow: none !important;
}

:deep(.fc-col-header-cell) {
  background-color: #f8fafc; /* Fondo gris muy claro */
  padding: 12px 0;
  border-bottom: 2px solid #e2e8f0;
}

:deep(.fc-col-header-cell-cushion) {
  color: #475569; /* Gris azulado oscuro */
  text-decoration: none !important;
}

:deep(.fc-daygrid-day-number) {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #94a3b8;
  padding: 8px !important;
  text-decoration: none !important;
}

/* Resaltar el número del día de hoy */
:deep(.fc-day-today) {
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
}

</style>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { color } from "chart.js/helpers";

const props = defineProps({
  events: {
    type: Array,
    required: true
  }
});

const calendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  locale: esLocale,
  height: "auto",
  contentHeight: "auto",
  

  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek",
    
  },

  events: props.events
};


</script>


