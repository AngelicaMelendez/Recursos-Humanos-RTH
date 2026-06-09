'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vacantes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      departamento_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'departamentos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      puesto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipo_contrato: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      perfil_requerido: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      fecha_publicacion: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      estatus: {
        type: Sequelize.ENUM('abierta', 'cerrada'),
        allowNull: false,
        defaultValue: 'abierta',
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
    await queryInterface.dropTable('vacantes');
  },
};
