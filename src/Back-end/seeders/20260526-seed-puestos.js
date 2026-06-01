'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('puestos', [
      {
        nombre: 'Analista',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('puestos', null, {});
  },
};
