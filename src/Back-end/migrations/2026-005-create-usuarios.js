'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      usuario: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
      },
      nombre: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      apellidos: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      empleado_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        references: {       // llave foranea
          model: 'empleados', // Nombre real de la tabla en tu base de datos
          key: 'id'           // Columna a la que apunta
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'  // Si se borra el empleado, el usuario queda libre en NULL
      },
      rol: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'empleado',
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('usuarios');
  },
};