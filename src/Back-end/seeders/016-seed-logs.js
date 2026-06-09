'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('logs', [
      {
        usuario: 'sistema',
        accion: 'Carga inicial de seeders',
        fecha: now,
        modulo: 'base_de_datos',
        ip: '127.0.0.1',
        createdAt: now,
        updatedAt: now,
      },
      {
        usuario: 'Omar',
        accion: 'Usuario inicial disponible',
        fecha: now,
        modulo: 'usuarios',
        ip: '127.0.0.1',
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('logs', null, {});
  },
};
