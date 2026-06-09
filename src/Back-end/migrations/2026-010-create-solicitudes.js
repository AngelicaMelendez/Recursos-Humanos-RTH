'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('solicitudes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      empleado_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      fecha_fin: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      motivo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      documento_adjunto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estatus: {
        type: Sequelize.ENUM('pendiente', 'aprobado', 'rechazado'),
        allowNull: false,
        defaultValue: 'pendiente',
      },
      aprobado_por: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      fecha_resolucion: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('solicitudes');
  },
};
