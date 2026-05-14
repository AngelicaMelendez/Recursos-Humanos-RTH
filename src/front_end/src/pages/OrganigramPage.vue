<template>
  <div>
    <PageHeader
      eyebrow="Estructura institucional"
      title="Organigrama interactivo"
      description="Representación jerárquica de dirección general, direcciones, subdirecciones, departamentos y responsables operativos."
    />

    <BaseCard
      title="Mapa organizacional"
      subtitle="La estructura puede alimentarse desde áreas, puestos y empleados."
    >
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
  name: "Dirección General de Radio y Television de Hidalgo", //12B
  role: "Titular del organismo", //Direccion general de radio y television de hidalgo

  children: [ //direcciones
    {
      name: "Dirección Juridica", //Direccion juridica //11B
      role: "Asesorias Legales, y control y cumplimiento de las normas",

      children: [
        {
          name: "Subdireccion adjunta de Concesiones y Normatividad",
          role: "Subdireccion adjunta de Concesiones y Normatividad" //10A
        },
        {
          name: "Subdireccion adjunta de regulacion y cumplimiento Normativo",
          role: "Subdireccion adjunta de regulacion y cumplimiento Normativo" //10A
        },
        {
          name: "Subdireccion adjunta operativa",
          role: "Subdireccion adjunta operativa" //10A
        },
        {
          name: "Subdireccion adjunta Tecnica",
          role: "Subdireccion adjunta Tecnica" //10A
        }
      ]
    },

    {
      name: "Dirección de Proyectos Estrategicos", //Direccion de proyectos estrategicos //11B
      role: "Dirección de Proyectos Estrategicos",

      children: [
        {
          name: "Subdireccion de Plataformas",
          role: "Subdireccion de Plataformas", //10C

          children: [
            {
              name: "Departamento de planeacion de Proyectos Estrategicos",
              role: "Departamento de planeacion de Proyectos Estrategicos" //09C
            }
          ]
        }
      ]
    },

    {
      name: "Direccion de Promocion y Mejora Continua", //Direccion de Promocion y Mejora Continua //11B
      role: "Direccion de Promocion y Mejora Continua",

      children: [
        {
          name: "Subdireccion adjunta de Evaluacion y Seguimiento",
          role: "Subdireccion adjunta de Evaluacion y Seguimiento" //10A
        }
      ]
    },

    {
      name: "Direccion de Administracion y Finanzas", //Direccion de Administracion y Finanzas //11B
      role: "Direccion de Administracion y Finanzas",

      children: [ //subdirecciones
        {
          name: "Subdireccion administrativa",
          role: "Subdireccion administrativa", //10C

          children: [
            {
              name: "Subdireccion adjunta de recursos humanos",
              role: "Subdireccion adjunta de recursos humanos" //10A
            }
          ]
        },

        {
          name: "Subdireccion de planeacion",
          role: "Subdireccion de planeacion", //10C

          children: [
            {
              name: "Subdireccion adjunta de programas presupuestales",
              role: "Subdireccion adjunta de programas presupuestales" //10A
            }
          ]
        },

        {
          name: "Subdireccion de recursos operativos",
          role: "Subdireccion de recursos operativos", //10C

          children: [
            {
              name: "Departamento de rol y seguimiento",
              role: "Departamento de rol y seguimiento" //10A
            }
          ]
        }
      ]
    },
    {
      name: "Direccion de Vinculacion", //Direccion de Vinculacion //11B
      role: "Direccion de Vinculacion",

      children: [
        {
          name: "Subdireccion de Producciones Institucionales y Comunicacion",
          role: "Subdireccion de Producciones Institucionales y Comunicacion" //10C
        },
        {
          name: "Subdireccion de Relaciones Publicas",
          role: "Subdireccion de Relaciones Publicas" //10C
        }
      ]
    },
    {
      name: "Direccion de Noticias", //Direccion de Noticias //11B
      role: "Direccion de Noticias",

      children: [
        {
          name: "Subdireccion de Informacion",
          role: "Subdireccion de Informacion", //10C

          children: [
            {
              name: "Subdireccion adjunta de Post-produccion",  //10A
              role: "Subdireccion adjunta de Post-produccion",
              children: [
                  {
                    name: "Departamento de Produccion Audiovisual",
                    role: "Departamento de Produccion Audiovisual"      //09C
                  }
                ]//10A
               },
            {
              name: "Subdireccion adjunta de Coberturas Especiales",
              role: "Subdireccion adjunta de Coberturas Especiales" //10A
            },
            {
              name: "Subdireccion adjunta de Reporteros",
              role: "Subdireccion adjunta de Reporteros" //10A
            }
          ]
        },
      ]
    },
    {
      name: "Direccion de Ingenieria", //Direccion de Ingenieria //11B
      role: "Direccion de Ingenieria",

      children: [
        {
          name: "Subdireccion de Transmision y Operacion",
          role: "Subdireccion de Transmision y Operacion", //10C
          children: [
            {
              name: "Subdireccion adjunta de mantenimiento a Television",
              role: "Subdireccion adjunta de mantenimiento a Television" //10A
            },
            {
              name: "Subdireccion adjunta de mantenimiento a Radio",
              role: "Subdireccion adjunta de mantenimiento a Radio" //10A
            }
          ]
        }
      ]
    },
    {
      name: "Direccion de Radio", //Direccion de Radio //11B
      role: "Direccion de Radio",

      children: [
        {
          name: "Subdireccion de Programacion y Continuidad Radiofonica",
          role: "Subdireccion de Programacion y Continuidad Radiofonica", //10C

          children: [
            {
              name: "Subdireccion adjunta de Estacion de Radio",
              role: "Subdireccion adjunta de Estacion de Radio" //10A
            }
          ]
        },
        {
          name: "Subdireccion de Adjunta de control y seguimiento",
          role: "Subdireccion de Adjunta de control y seguimiento", //10C
          
          children: [
            {
              name: "Subdireccion adjunta de redaccion e informacion",
              role: "Subdireccion adjunta de redaccion e informacion" //10A
            }
          ]
        }
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