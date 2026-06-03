'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('empleados', [
  {
    id: 101,
    nombre: 'Omar Efren',
    apellidos: 'Vazquez Moreno',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 102,
    nombre: 'Axel',
    apellidos: 'Antonio Alarcon',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 103,
    nombre: 'Angelica',
    apellidos: 'Gonzalez Ramirez',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 104,
    nombre: 'Lorena',
    apellidos: 'Barrera Soto',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 105,
    nombre: 'Maribel',
    apellidos: 'Leal Rico',
    createdAt: new Date(),
    updatedAt: new Date()
  }
], {});
    
  },

  async down(queryInterface, Sequelize) {
    // 1. Apagamos la revisión de llaves foráneas para que MySQL no bloquee el borrado
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    
    // 2. Vaciamos la tabla de empleados por completo
    await queryInterface.bulkDelete('empleados', null, {});
    
    // 3. Volvemos a encender la revisión de llaves foráneas
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
};
