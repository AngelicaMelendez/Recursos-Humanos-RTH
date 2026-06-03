'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('empleados', [
      {
        id: 1,
        nombre: 'Omar Efren',
        apellidos: 'Vazquez Moreno',
        curp: 'VAMO760618HDFZRM08',
        rfc: 'VAMO900101AA1',
        nss:'',
        fecha_ingreso: '2020-01-15',
        tipo_contrato: 'indefinido',
        estatus: 'activo',
        direccion: '',
        area_id: 38, // Informatica   
        
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'Axel',
        apellidos: 'Antonio Alarcon',
        rfc: 'AIAA900101AA2',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'Angelica',
        apellidos: 'Melendez Lopez',
        rfc: 'MELA900101AA3',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: 'Lorena',
        apellidos: 'Barrera Soto',
        rfc: 'BASL900101AA4',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
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
    await queryInterface.bulkDelete('empleados', null, {});
  },
};
