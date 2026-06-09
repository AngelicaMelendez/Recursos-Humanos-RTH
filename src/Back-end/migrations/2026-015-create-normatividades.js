'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('normatividades', {
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
      tipo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      version: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_publicacion: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      estatus: {
        type: Sequelize.ENUM('activa', 'inactiva'),
        allowNull: false,
        defaultValue: 'activa',
      },
      archivo_pdf: {
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
    await queryInterface.dropTable('normatividades');
  },
};
