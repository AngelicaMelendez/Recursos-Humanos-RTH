<template>
  <div class="page-container">
    <PageHeader
      eyebrow="Agenda institucional"
      title="Calendario de incidencias"
      description="Planeación anual y seguimiento visual de vacaciones, incapacidades, comisiones, eventos y fechas relevantes."
    />
    <div class="main-card">
      <div class="calendar-layout">



        <div class="calendar-section">
        <div class="section-header">
        </div>
        <IncidenceCalendar :events="events" />
      </div>





    </div>
  </div>
  </div>
</template>

<script setup>
import PageHeader from "@/components/shared/PageHeader.vue";
import IncidenceCalendar from "@/components/calendar/IncidenceCalendar.vue";

const events = [
  { title: "Vacaciones · Carlos Ortega", start: "2026-05-06", end: "2026-05-11", color: "#621132" },
  { title: "Incapacidad · Laura Mendoza", start: "2026-05-08", end: "2026-05-13", color: "#b38e5d" },
  { title: "Cumpleaños · Ana Laura Pérez", start: "2026-05-09", color: "#2f6b4f" },
  { title: "Comisión · José Miguel Vargas", start: "2026-05-14", end: "2026-05-16", color: "#7d2342" }
];
</script>

