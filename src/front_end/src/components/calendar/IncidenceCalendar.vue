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
      </ul>

      <ul class="legend-list legend-list-events">
        <li v-for="category in eventLegendCategories" :key="category.label">
          <label class="legend-option">
            <input
              type="checkbox"
              :checked="selectedColors.includes(category.color)"
              @change="toggleCategory(category.color)"
            />
            <span class="checkmark" :style="{ '--legend-color': category.color }"></span>
            <span class="legend-color" :style="{ backgroundColor: category.color }"></span>
            <svg class="legend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <path :d="eventIconPaths[category.icon]" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>{{ category.label }}</span>
          </label>
        </li>
      </ul>

      <ul class="legend-list legend-list-incidences">
        <li>
          <label class="legend-option legend-option-incidences">
            <input
              type="checkbox"
              :checked="allIncidencesSelected"
              @change="toggleIncidences"
            />
            <span class="checkmark" :style="{ '--legend-color': incidenceColor }"></span>
            <span class="legend-color" :style="{ backgroundColor: incidenceColor }"></span>
            <svg class="legend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <path :d="eventIconPaths.activity" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Incidencias</span>
          </label>
        </li>
        <li
          v-for="category in incidenceLegendCategories"
          :key="category.label"
          class="legend-subitem"
        >
          <label class="legend-option">
            <input
              type="checkbox"
              :checked="selectedColors.includes(category.color)"
              @change="toggleCategory(category.color)"
            />
            <span class="checkmark" :style="{ '--legend-color': category.color }"></span>
            <svg class="legend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9">
              <path :d="eventIconPaths[category.icon]" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>{{ category.label }}</span>
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

const props = defineProps({
  events: {
    type: Array,
    required: true
  }
});

const eventIconPaths = {
  sun: "M12 3v2m0 14v2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42M3 12h2m14 0h2M5.64 18.36l1.42-1.42m9.88-9.88 1.42-1.42M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z",
  cake: "M4 21h16M5 21v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7M8 12V9m4 3V9m4 3V9M8 6c0 1 .8 1.5 1.5 1.5S11 7 11 6c0-.9-1.5-2-1.5-2S8 5.1 8 6Zm4 0c0 1 .8 1.5 1.5 1.5S15 7 15 6c0-.9-1.5-2-1.5-2S12 5.1 12 6Z",
  briefcase: "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 3h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Zm7 0v2",
  building: "M4 21V5a2 2 0 0 1 2-2h8v18M14 8h4a2 2 0 0 1 2 2v11M8 7h2m-2 4h2m-2 4h2m6-3h2m-2 4h2M3 21h18",
  heart: "M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21l8.8-8.3a5 5 0 0 0 0-7.1Z",
  alert: "M12 9v4m0 4h.01M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6M8 13h8M8 17h5",
  activity: "M3 12h4l2-5 4 10 2-5h6",
  clock: "M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  xCircle: "M15 9l-6 6m0-6 6 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  bandage: "M10 21 3 14a3 3 0 0 1 0-4l7-7a3 3 0 0 1 4 0l7 7a3 3 0 0 1 0 4l-7 7a3 3 0 0 1-4 0ZM7.5 9.5l7 7M9 13h.01m3-3h.01m0 6h.01m3-3h.01",
  hourglass: "M6 2h12M6 22h12M7 2v6a5 5 0 0 0 3 4 5 5 0 0 0-3 4v6m10-20v6a5 5 0 0 1-3 4 5 5 0 0 1 3 4v6",
  shield: "M12 3l7 3v6c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V6l7-3Zm-3 9 2 2 4-4",
  calendar: "M8 2v4m8-4v4M3 9h18M5 5h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
};

const legendCategories = [
  { label: "Vacaciones", color: "#621132", icon: "sun" },
  { label: "Cumpleaños", color: "#2f6b4f", icon: "cake" },
  { label: "Comisiones", color: "#7d2342", icon: "briefcase" },
  { label: "Eventos Institucionales", color: "#6F7271", icon: "building" },
  { label: "Maternidad/Paternidad", color: "#DDC9A3", icon: "heart" },
  { label: "Dia Naranja", color: "#F97316", icon: "alert" },
  { label: "Entrega de Informes", color: "#0ea5e9", icon: "file" },
  { label: "Dia para Realizar Actividad", color: "#16a34a", icon: "activity" },
  { label: "Retraso", color: "#98989A", icon: "clock" },
  { label: "Falta", color: "#98989A", icon: "xCircle" },
  { label: "Incapacidad", color: "#98989A", icon: "bandage" },
  { label: "Medio Dia", color: "#98989A", icon: "hourglass" },
  { label: "Permiso", color: "#98989A", icon: "shield" }
];

const incidenceColor = "#98989A";
const eventLegendCategories = legendCategories.filter(
  (category) => category.color && category.color !== incidenceColor
);
const incidenceLegendCategories = legendCategories.filter(
  (category) => category.color === incidenceColor
);
const legendColors = [...new Set(legendCategories.map((category) => category.color))];


//Permite que no aparezcan eventos al entrar a la página, y que el usuario pueda activar o desactivar cada categoría de eventos e incidencias según su preferencia.
const selectedColors = ref([]);

const normalizeColor = (color) => color?.toLowerCase();

const allCategoriesSelected = computed(
  () => legendColors.every((color) => selectedColors.value.includes(color))
);

const allIncidencesSelected = computed(
  () => selectedColors.value.includes(incidenceColor)
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
    : [...legendColors];
};

const toggleIncidences = () => {
  toggleCategory(incidenceColor);
};

const getEventIconName = (title) => {
  const normalizedTitle = String(title || "").toLowerCase();

  if (normalizedTitle.includes("solicitud pendiente")) return "calendar";
  if (normalizedTitle.includes("vacaciones")) return "sun";
  if (normalizedTitle.includes("cumple")) return "cake";
  if (normalizedTitle.includes("Comision") || normalizedTitle.includes("Comisión")) return "briefcase";
  if (normalizedTitle.includes("Maternidad") || normalizedTitle.includes("paternidad")) return "heart";
  if (normalizedTitle.includes("incapacidad")) return "bandage";
  if (normalizedTitle.includes("permiso")) return "shield";
  if (normalizedTitle.includes("retraso")) return "clock";
  if (normalizedTitle.includes("falta")) return "xCircle";
  if (normalizedTitle.includes("medio dia") || normalizedTitle.includes("medio día")) return "hourglass";
  if (normalizedTitle.includes("informe")) return "file";
  if (normalizedTitle.includes("naranja")) return "alert";
  if (normalizedTitle.includes("actividad")) return "activity";
  if (normalizedTitle.includes("evento")) return "building";

  return "calendar";
};

const createEventIcon = (iconName) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  svg.setAttribute("class", "event-inline-icon");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  path.setAttribute("d", eventIconPaths[iconName] || eventIconPaths.calendar);
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  svg.appendChild(path);

  return svg;
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
    right: "dayGridMonth,timeGridWeek"
  },
  events: filteredEvents.value,
  eventContent(arg) {
    const titleEl = document.createElement("span");

    titleEl.innerText = arg.event.title;
    titleEl.className = "event-title-text";

    return {
      domNodes: [createEventIcon(getEventIconName(arg.event.title)), titleEl]
    };
  }
}));
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
}

.calendar-wrapper {
  flex: 1;
  min-width: 0;
}

.Simbologia {
  width: 230px;
  flex-shrink: 0;
  margin-bottom: 95px;
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

.legend-list-events {
  margin-top: 12px;
}

.legend-list-incidences {
  margin-top: 4px;
}

.legend-list-incidences li {
  margin-bottom: 8px;
}

.legend-option-incidences {
  color: #64748b;
}

.legend-subitem {
  padding-left: 24px;
}

.legend-subitem .legend-option {
  gap: 8px;
  font-size: 0.82rem;
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

.legend-icon {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  color: #475569;
}

:deep(.fc) {
  --fc-border-color: #e2e8f0;
  --fc-today-bg-color: #f8fafc;
  --fc-button-bg-color: #621132;
  --fc-button-border-color: #621132;
  --fc-button-hover-bg-color: #4a0d26;
  --fc-button-active-bg-color: #4a0d26;
}

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

:deep(.fc-col-header-cell) {
  background-color: #f8fafc;
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

:deep(.fc-event) {
  border-radius: 6px !important;
  border: none !important;
  padding: 2px 6px;
}

:deep(.fc-event-main) {
  display: flex !important;
  align-items: flex-start !important;
  gap: 6px;

}

:deep(.event-inline-icon) {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.92);
}

:deep(.event-title-text) {
  text-overflow: clip;
  white-space: normal;
  font-size: 0.66rem;
  font-weight: 750;
  word-break: break-word;
  
  
}

:deep(.fc-daygrid-event) {
  border-radius: 6px !important;
}

.sidebar-icon {
  margin-right: 6px;
  color: #64748b;
  font-size: 0.9rem;
}

:deep(.fc-day-today) {
  background-color: rgba(98, 17, 50, 0.08) !important;
  border: 1px solid #621132 !important;
}

:deep(.fc-day-today .fc-daygrid-day-top) {
  display: flex;
  justify-content: flex-end;
  padding: 4px;
}

:deep(.fc-day-today .fc-daygrid-day-number) {
  background-color: #621132;
  color: white !important;
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
    flex-direction: column;
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
