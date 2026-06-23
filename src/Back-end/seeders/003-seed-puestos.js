"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Borra posibles registros existentes para evitar errores de PK duplicadas
    // al volver a ejecutar el seeder en la misma base de datos.
    await queryInterface.bulkDelete('puestos', null, {});
    await queryInterface.sequelize.query('ALTER TABLE `puestos` AUTO_INCREMENT = 1;');

    const puestos = [
      {
        id: 1,
        nombre: "Director General de Radio y Television de Hidalgo",
        nivel: "12B",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nombre: "Jefe de area A",
        nivel: "89A",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nombre: "Jefe de area B",
        nivel: "89B",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nombre: "Tecnico Especializado",
        nivel: "007",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        nombre: "Director de Administracion y Finanzas",
        nivel: "11B",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        nombre: "Jefe de Departamento C",
        nivel: "09C",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        nombre: "Subdirector de Area C",
        nivel: "10C",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        nombre: "Subdirector Adjunto A",
        nivel: "10A",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        nombre: "Director de Ingenieria",
        nivel: "11B",
        departamento_id:null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        nombre: "Director de Promocion y Mejora Continua",
        nivel: "11B",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        nombre: "Director de Radio",
        nivel: "11B",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        nombre: "Director de Television",
        nivel: "11B",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        nombre: "Director de Vinculacion",
        nivel: "11B",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        nombre: "Director de Juridico",
        nivel: "11B",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        nombre: "Asistente General",
        nivel: "H03",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        nombre: "Asesor Tecnico/Gestor",
        nivel: "H06",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        nombre: "Supervisor Analista",
        nivel: "H07",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        nombre: "Jefe de Unidad de Proyecto",
        nivel: "H08",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        nombre: "Titular de Organo Interno de Control",
        nivel: "11B",
        departamento_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      
      // Aquí abajo pondrías otros puestos diferentes si tuvieras (ej: Subdirector, Analista, etc.)
    ];
    // Inserta los registros en la tabla 'puestos'
    await queryInterface.bulkInsert("puestos", puestos, {});
  },

  async down(queryInterface, Sequelize) {
    // Elimina todos los registros de la tabla puestos en caso de deshacer el seed
    await queryInterface.bulkDelete("puestos", null, {});
  },
};
