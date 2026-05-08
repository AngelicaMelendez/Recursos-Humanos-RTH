<template>
  <div>
    <PageHeader
      eyebrow="Estructura institucional"
      title="Organigrama interactivo"
      description="Representación jerárquica de dirección general, direcciones, subdirecciones, departamentos y responsables operativos."
    />
    <BaseCard title="Mapa organizacional" subtitle="La estructura puede alimentarse desde áreas, puestos y empleados.">
      <div class="org-chart-wrapper">
        <ul class="org-chart-root">
          <OrgNode :node="tree" />
        </ul>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import BaseCard from "@/components/ui/BaseCard.vue";
import OrgNode from "@/components/orgchart/OrgNode.vue";
import PageHeader from "@/components/shared/PageHeader.vue";

const tree = {
  name: "Dirección General",
  role: "Titular del organismo",
  children: [
    {
      name: "Dirección Administrativa",
      role: "Recursos, control y planeación",
      children: [
        { name: "Recursos Humanos", role: "Jefatura de departamento" },
        { name: "Finanzas", role: "Jefatura de departamento" }
      ]
    },
    {
      name: "Dirección de Producción",
      role: "Operación radio y televisión",
      children: [
        { name: "Producción TV", role: "Coordinación" },
        { name: "Producción Radio", role: "Coordinación" }
      ]
    }
  ]
};
</script>

<style scoped>
.org-chart-wrapper {
  overflow-x: auto;
}

.org-chart-root {
  padding: 8px 12px 20px;
}
</style>

