'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('visitantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      institucion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      motivo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      persona_a_visitar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_entrada: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      hora_entrada: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      hora_salida: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      gafete: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('visitantes');
  },
};
