'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = bcrypt.hashSync('123456', 10);

    await queryInterface.bulkInsert('usuarios', [
      {
        id: 14,
        usuario: 'Omar Efren',
        nombre: 'Omar Efren',
        apellidos: 'Vazquez Moreno',
        empleado_id: 14,
        rol: 'super_usuario',
        password_hash: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        usuario: 'Axel',
        nombre: 'Axel',
        apellidos: 'Antonio Alarcon',
        empleado_id: 15,
        rol: 'super_usuario',
        password_hash: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        usuario: 'Angelica',
        nombre: 'Angelica',
        apellidos: 'Melendez Lopez',
        empleado_id: 16,
        rol: 'super_usuario',
        password_hash: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        usuario: 'Lorena',
        nombre: 'Lorena',
        apellidos: 'Barrera Soto',
        empleado_id: 21,
        rol: 'admin_rh',
        password_hash: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        usuario: 'Maribel',
        nombre: 'Maribel',
        apellidos: 'Leal Rico',
        empleado_id: 22,
        rol: 'admin_rh',
        password_hash: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        usuario: 'Ariadna Albertina',
        nombre: 'Ariadna Albertina',
        apellidos: 'Ramirez Trejo',
        empleado_id: 23,
        rol: 'admin_rh',
        password_hash: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
        
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
