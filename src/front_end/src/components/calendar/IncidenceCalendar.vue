<template>
  <div class="flex-container">
    <div class="Simbologia">
      <h3>Simbolog&iacute;a</h3>
      <ul class="legend-list">
        <li>
          <label class="legend-option legend-option-all">
            <input
              type="checkbox"
              :checked="allCategoriesSelected"
              @change="toggleAllCategories"
            />
            <span class="checkmark"></span>
            Todos
          </label>
        </li>
        <li v-for="category in legendCategories" :key="category.color">
          <label class="legend-option">
            <input
              type="checkbox"
              :checked="selectedColors.includes(category.color)"
              @change="toggleCategory(category.color)"
            />
            <span class="checkmark" :style="{ '--legend-color': category.color }"></span>
            <span class="legend-color" :style="{ backgroundColor: category.color }"></span>
            {{ category.label }}
          </label>
        </li>
      </ul>
    </div>

    <div class="calendar-wrapper">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { computed, ref } from "vue";
import { color } from "chart.js/helpers";

const props = defineProps({
  events: {
    type: Array,
    required: true
  }
});

const legendCategories = [
  { label: "Vacaciones", color: "#621132" },
  { label: "Incapacidades", color: "#b38e5d" },
  { label: "Cumplea\u00f1os", color: "#2f6b4f" },
  { label: "Comisiones", color: "#7d2342" },
  { label: "Eventos Institucionales", color: "#6F7271" },
  { label: "Maternidad/Paternidad", color: "#DDC9A3" },
  { label: "Incidencias", color: "#98989A" },
  { label: "Dia Naranja", color: "#F97316" },
  { label: "Entrega de Informes", color:"#0ea5e9" },
  { label: "Dia para Realizar Actividad", color:"#16a34a" }
];

const selectedColors = ref(legendCategories.map((category) => category.color));

const normalizeColor = (color) => color?.toLowerCase();

const allCategoriesSelected = computed(
  () => selectedColors.value.length === legendCategories.length
);

const filteredEvents = computed(() => {
  const activeColors = selectedColors.value.map(normalizeColor);

  return props.events.filter((event) =>
    activeColors.includes(normalizeColor(event.color || event.backgroundColor))
  );
});

const toggleCategory = (color) => {
  selectedColors.value = selectedColors.value.includes(color)
    ? selectedColors.value.filter((selectedColor) => selectedColor !== color)
    : [...selectedColors.value, color];
};

const toggleAllCategories = () => {
  selectedColors.value = allCategoriesSelected.value
    ? []
    : legendCategories.map((category) => category.color);
};

const calendarOptions = computed(() => ({
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
  events: filteredEvents.value
}));
</script>

<style scoped>
/* ==========================================
   LAYOUT Y ESTRUCTURA DE CONTENEDORES
   ========================================== */
.flex-container {
  display: flex;
  flex-direction: row;     /* Fuerza la fila horizontal */
  gap: 40px;               /* Separacion amplia entre elementos */
  align-items: flex-start; /* Evita estiramientos verticales extranos */
  width: 100%;
}

.calendar-wrapper {
  flex: 1;                 /* El calendario ocupa todo el espacio sobrante */
  min-width: 0;            /* Evita desbordamientos del FullCalendar */
}

/* ==========================================
   ESTILOS DE LA SIMBOLOGIA
   ========================================== */
.Simbologia {
  width: 190px;            /* Tamano de la barra lateral */
  flex-shrink: 0;          /* Evita que el calendario la aplaste */
  margin-top: 65px;        /* Lo alinea a la altura perfecta de la cuadricula */
}

.Simbologia h3 {
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 15px;
}

.legend-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.legend-list li {
  margin-bottom: 12px;
}

.legend-option {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #334155;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  user-select: none;
}

.legend-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkmark {
  --legend-color: #A02142;
  position: relative;
  display: inline-flex;
  width: 16px;
  height: 16px;
  border: 2px solid #cbd5e1;
  border-radius: 4px;
  flex-shrink: 0;
  background-color: #ffffff;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.legend-option input:checked + .checkmark {
  background-color: var(--legend-color);
  border-color: var(--legend-color);
}

.legend-option input:checked + .checkmark::after {
  content: "";
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.legend-option-all {
  color: #64748b;
}

.legend-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  flex-shrink: 0;
}

/* ==========================================
   DISENO INTERNO DE FULLCALENDAR (:DEEP)
   ========================================== */
:deep(.fc) {
  /* Variables globales del tema */
  --fc-border-color: #e2e8f0;
  --fc-today-bg-color: #f8fafc;

  /* Botones institucionales (Guinda) */
  --fc-button-bg-color: #621132;
  --fc-button-border-color: #621132;
  --fc-button-hover-bg-color: #4a0d26;
  --fc-button-active-bg-color: #4a0d26;
}

/* Encabezados del titulo y botones */
:deep(.fc-toolbar-title) {
  text-transform: uppercase;
  font-weight: 700;
}

:deep(.fc .fc-button) {
  border-radius: 8px;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

:deep(.fc .fc-button:focus) {
  box-shadow: none !important;
}

/* Cabeceras de los dias (LUN, MAR...) */
:deep(.fc-col-header-cell) {
  background-color: #f8fafc; /* Color claro y limpio */
  padding: 12px 0;
  border-bottom: 2px solid #e2e8f0;
}

:deep(.fc-col-header-cell-cushion) {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.8rem;
  color: #475569;
  text-decoration: none !important;
}

/* Celdas del mes y cuadricula */
:deep(.fc-view-harness) {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

:deep(.fc-daygrid-day) {
  background-color: #fcfcfc;
}

:deep(.fc-day-other) {
  background-color: #f1f5f9 !important;
  opacity: 0.6;
}

:deep(.fc-day-sat), :deep(.fc-day-sun) {
  background-color: #f9f9f9 !important;
}

:deep(.fc-daygrid-day:hover) {
  background-color: #fff5f7 !important;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

:deep(.fc-daygrid-day-top) {
  background-color: rgba(0, 0, 0, 0.01);
}

:deep(.fc-daygrid-day-number) {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: #64748b;
  padding: 8px !important;
  text-decoration: none !important;
}

/* Eventos (Barras de incidencias) */
:deep(.fc-event) {
  border-radius: 6px !important;
  border: none !important;
  padding: 2px 6px;
}

:deep(.fc-daygrid-event) {
  border-radius: 6px !important;
}


/* Pinta todo el fondo de la celda del día de hoy */
:deep(.fc-day-today) {
  background-color: rgba(98, 17, 50, 0.08) !important; /* Guinda muy suave de fondo */
  border: 1px solid #621132 !important;
}

/* Resalta el número del día con un círculo sólido */
:deep(.fc-day-today .fc-daygrid-day-top) {
  display: flex;
  justify-content: flex-end; /* Alinea el número a la derecha */
  padding: 4px;
}

:deep(.fc-day-today .fc-daygrid-day-number) {
  background-color: #621132; /* Círculo guinda sólido */
  color: white !important;   /* Número blanco */
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin: 4px;
}

@media (max-width: 768px) {
  .flex-container {
    flex-direction: column; /* Cambia a vertical si la pantalla es chica */
  }
  .Simbologia {
    width: 100%;
    margin-top: 20px;
  }
  .legend-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
  .legend-list li {
    flex: 1 1 45%;
    margin-bottom: 0;
  }
}
</style>
2>