'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('areas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('direccion', 'departamento'),
        allowNull: false,
        defaultValue: 'departamento',
      },

      area_padre_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {       // llave foranea
          model: 'areas', // Nombre real de la tabla en tu base de datos}
          key: 'id'       // Columna a la que apunta
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('areas');
  },
};
