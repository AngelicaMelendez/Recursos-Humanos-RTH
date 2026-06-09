'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('incidencias', {
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
      tipo: {
        type: Sequelize.ENUM('vacaciones', 'permiso', 'incapacidad', 'maternidad', 'paternidad', 'comision', 'otro'),
        allowNull: true,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      color: {
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
      estatus: {
        type: Sequelize.ENUM('pendiente', 'aprobado', 'rechazado'),
        allowNull: false,
        defaultValue: 'aprobado',
      },
      documento_pdf: {
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
    await queryInterface.dropTable('incidencias');
  },
};
