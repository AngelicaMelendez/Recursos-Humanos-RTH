'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comunicados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contenido: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
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
      direccion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'direcciones',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('publico', 'privado'),
        allowNull: true,
        defaultValue: 'publico',
      },
      fecha_vencimiento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      estatus: {
        type: Sequelize.ENUM('activo', 'vencido', 'archivado'),
        allowNull: false,
        defaultValue: 'activo',
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
    await queryInterface.dropTable('comunicados');
  },
};
