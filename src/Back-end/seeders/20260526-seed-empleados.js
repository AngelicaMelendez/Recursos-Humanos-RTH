'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('empleados', [
      {
        id: 101,
        nombre: 'Omar Efren',
        apellidos: 'Vazquez Moreno',
        rfc: 'VAMO900101AA1',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 102,
        nombre: 'Axel',
        apellidos: 'Antonio Alarcon',
        rfc: 'AIAA900101AA2',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 103,
        nombre: 'Angelica',
        apellidos: 'Melendez Lopez',
        rfc: 'MELA900101AA3',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 104,
        nombre: 'Lorena',
        apellidos: 'Barrera Soto',
        rfc: 'BASL900101AA4',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 105,
        nombre: 'Maribel',
        apellidos: 'Leal Rico',
        rfc: 'LERM900101AA5',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empleados', {
      id: { [Sequelize.Op.in]: [101, 102, 103, 104, 105] }
    }, {});
  },
};
