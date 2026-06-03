'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
        usuario: 'Omar', //----------------------------INFORMATICA-----------------------------//
        nombre: 'Omar Efren',
        apellidos: 'Vazquez Moreno',
        empleado_id: 101,
        rol: 'admin_rh',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', //->123456
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuario: 'Axel',//----------------------------INFORMATICA-----------------------------//
        nombre: 'Axel',
        apellidos: 'Antonio Alarcon',
        empleado_id: 102,
        rol: 'admin_rh',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuario: 'Angelica', //----------------------------INFORMATICA-----------------------------//
        nombre: 'Angelica',
        apellidos: 'Melendez Lopez',
        empleado_id: 103,
        rol: 'admin_rh',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuario: 'lorena',//----------------------------ADMIN-RH-----------------------------//
        nombre: 'Lorena',
        apellidos: 'Barrera Soto',
        empleado_id: 104,
        rol: 'admin_rh',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        usuario: 'Maribel', //----------------------------ADMIN-RH-----------------------------//
        nombre: 'Maribel',
        apellidos: 'Leal Rico',
        empleado_id: 105,
        rol: 'admin_rh',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
