'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('historial_puestos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      empleado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      puesto_id: {
        type: Sequelize.INTEGER,
        allowNull: true,

        unique: true,
        references: {
          model: 'puestos',
          key : 'id'
        },
        OnUpdate: 'CASCADE',
        OnDelete: 'CASCADE'
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      fecha_fin: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      motivo_cambio: {
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
    await queryInterface.dropTable('historial_puestos');
  },
};
