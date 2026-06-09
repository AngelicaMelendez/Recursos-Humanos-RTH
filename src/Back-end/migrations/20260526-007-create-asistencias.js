'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('asistencias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      empleado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'empleados', // Nombre real de la tabla en tu base de datos
          key: 'id'           // Columna a la que apunta
        },
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hora_entrada: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      hora_salida: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      estatus_entrada: {
        type: Sequelize.ENUM('a_tiempo', 'retardo', 'ausente', 'licencia'),
        allowNull: true,
        defaultValue: 'a_tiempo',
      },
      estatus_salida: {
        type: Sequelize.ENUM('normal', 'temprano', 'tarde', 'sin_registro'),
        allowNull: true,
        defaultValue: 'normal',
      },
      minutos_retardo: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      notas: {
        type: Sequelize.TEXT,
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
    //await queryInterface.removeIndex('asistencias', 'asistencias_empleado_fecha_unique');
    await queryInterface.dropTable('asistencias');
  },
};
