"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Borra posibles registros existentes para evitar errores de PK duplicadas
    // al volver a ejecutar el seeder en la misma base de datos.
    await queryInterface.bulkDelete('puestos', null, {});
    await queryInterface.sequelize.query('ALTER TABLE `puestos` AUTO_INCREMENT = 1;');

    const puestos = [
      {    // ====== ÁREA: INFORMATICA ======
        id: 1,
        nombre: "JEFE       DE AREA A",
        nivel: "89A",
        area_id: 38,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {      // ====== ÁREA: DIRECCION GENERAL ======
        id: 2,
        nombre: "DIRECTOR GENERAL",
        nivel: "12B",
        area_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nombre: "SUBDIRECTOR DE AREA C",
        nivel: "10C",
        area_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:4,
        nombre:"SUBDIRECTOR ADJUNTO A",
        nivel: "10A",
        area_id:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:5,
        nombre:"JEFE DE AREA A",
        nivel: "89A",
        area_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:6,
        nombre:"JEFE DE AREA A",
        nivel: "89A",
        area_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        id:7,
        nombre:"JEFE  AREA A",
        nivel: "89A",
        area_id: 38,
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
