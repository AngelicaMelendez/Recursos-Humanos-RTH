'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // TODO: Añade datos para "reacciones_comunicados". Respeta el índice único (comunicado_id, usuario_id).
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('reacciones_comunicados', null, {});
  },
};
