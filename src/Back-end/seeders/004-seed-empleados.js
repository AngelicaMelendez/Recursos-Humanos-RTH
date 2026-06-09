'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('empleados', [
      {
        nombre: 'Omar Efren',
        apellidos: 'Vazquez Moreno',
        curp: 'VAMO760618HDFZRM08',
        rfc: 'VAMO900101AA1',
        nss:null,
        fecha_ingreso: '2020-01-15',
        tipo_contrato: 'indefinido',
        estatus: 'activo',
        direccion: null,
        area_id: 38, // Informatica
        puesto_id: 1, // Desarrollador
        clabe: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Axel',
        apellidos: 'Antonio Alarcon',
        curp: null,
        rfc: 'AIAA900101AA2',
        nss: null,
        fecha_ingreso: '2020-01-15',
        tipo_contrato: 'indefinido',
        estatus: 'activo',
        direccion: null,
        area_id: 60, // Informatica
          puesto_id: 2, // Analista
        clabe: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Angelica',
        apellidos: 'Melendez Lopez',
        curp: null,
        rfc: 'MELA900101AA3',
        nss: null,
        fecha_ingreso: '2020-01-15',
        tipo_contrato: 'indefinido',
        estatus: 'activo',
        direccion: null,
        area_id: 60, // Informatica
        puesto_id: 3, // Soporte
        clabe: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Lorena',
        apellidos: 'Barrera Soto',
        curp: null,
        rfc: 'BASL900101AA4',
        nss: null,
        fecha_ingreso: '2021-06-01',
        tipo_contrato: 'indefinido',
        estatus: 'activo',
        direccion: null,
        area_id: 60, // Recursos Humanos
        puesto_id: 4, // Recurso Humano
        clabe: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Maribel',
        apellidos: 'Leal Rico',
        curp: null,
        rfc: 'LERM900101AA5',
        nss: null,
        fecha_ingreso: '2021-06-01',
        tipo_contrato: 'indefinido',
        estatus: 'activo',
        direccion: null,
        area_id: 60, // Recursos Humanos
        puesto_id: 4, // Recurso Humano
        clabe: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empleados', null, {});
  },
};
