'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('usuarios');

    if (!table.empleado_id) {
      await queryInterface.addColumn('usuarios', 'empleado_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      });
    }
  },

  async down(queryInterface) {
    const table = await queryInterface.describeTable('usuarios');

    if (table.empleado_id) {
      await queryInterface.removeColumn('usuarios', 'empleado_id');
    }
  },
};
