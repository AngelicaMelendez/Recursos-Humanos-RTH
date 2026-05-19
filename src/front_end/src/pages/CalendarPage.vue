<template>
  <div class="page-container">
    <PageHeader
      eyebrow="Agenda institucional"
      title="Calendario de Incidencias"
      description="Planeación anual y seguimiento visual de vacaciones, incapacidades, comisiones, eventos institucionales y fechas relevantes."
    />
    <div class="main-card">
        <IncidenceCalendar :events="events" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import PageHeader from "@/components/shared/PageHeader.vue";
import IncidenceCalendar from "@/components/calendar/IncidenceCalendar.vue";
import api from "@/services/api";

const events = ref([]);

const loadEvents = async () => {
  try {
    const { data } = await api.get("/calendario");
    events.value = data.events || [];
  } catch (error) {
    console.warn("No se pudieron cargar los eventos del calendario.", error);
    events.value = [];
  }
};

onMounted(loadEvents);
</script>
