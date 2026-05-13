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

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

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

