'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // TODO: Añade datos para "empleados". Incluye campos como nombre, apellidos, curp, rfc, createdAt, updatedAt.
    // Ejemplo:
    // await queryInterface.bulkInsert('empleados', [ { nombre: 'Juan', apellidos: 'Pérez', createdAt: new Date(), updatedAt: new Date() } ], {});
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('empleados', null, {});
  },
};
