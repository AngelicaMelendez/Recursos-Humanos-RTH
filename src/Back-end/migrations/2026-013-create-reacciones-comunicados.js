'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reacciones_comunicados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comunicado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.ENUM('like'),
        allowNull: true,
        defaultValue: 'like',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
    await queryInterface.addIndex('reacciones_comunicados', ['comunicado_id', 'usuario_id'], {
      unique: true,
      name: 'reacciones_comunicados_comunicado_usuario_unique',
    });
  },

async down(queryInterface, Sequelize) {
  // Si hay líneas aquí arriba borrando índices o llaves, coméntalas con //
  // await queryInterface.removeConstraint('reacciones_comunicados', '...'); 

  // Deja solo esto, que es lo que realmente importa:
  await queryInterface.dropTable('reacciones_comunicados');
}
};
