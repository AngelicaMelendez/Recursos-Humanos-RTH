'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // TODO: Añade datos para "usuarios". Incluye `usuario`, `nombre`, `apellidos`, `password_hash`, `rol`, createdAt, updatedAt.
    // Ejemplo:
    // await queryInterface.bulkInsert('usuarios', [ { usuario: 'admin', nombre: 'Admin', apellidos: 'Sistema', password_hash: 'hash', rol: 'admin', createdAt: new Date(), updatedAt: new Date() } ], {});
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('usuarios', null, {});
  },
};
