'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // TODO: Añade datos para "asistencias". Evita duplicados de `empleado_id`+`fecha` si existe índice único.
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('asistencias', null, {});
  },
};
