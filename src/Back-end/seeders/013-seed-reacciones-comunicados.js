'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('reacciones_comunicados', [
      {
        comunicado_id: 1,
        usuario_id: 2,
        tipo: 'like',
        createdAt: now,
      },
      {
        comunicado_id: 1,
        usuario_id: 3,
        tipo: 'like',
        createdAt: now,
      },
      {
        comunicado_id: 2,
        usuario_id: 1,
        tipo: 'like',
        createdAt: now,
      },
      {
        comunicado_id: 3,
        usuario_id: 4,
        tipo: 'like',
        createdAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reacciones_comunicados', null, {});
  },
};
