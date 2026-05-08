<template>
  <BaseCard title="Calendario institucional" subtitle="Visualización de incidencias, celebraciones y eventos.">
    <FullCalendar :options="calendarOptions" />
  </BaseCard>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import BaseCard from "@/components/ui/BaseCard.vue";

const props = defineProps({
  events: {
    type: Array,
    required: true
  }
});

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  locale: esLocale,
  height: "auto",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: ""
  },
  events: props.events
};
</script>

