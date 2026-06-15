'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('empleados', [
      {
        nombre: 'Omar Efren',
        apellidos: 'Vazquez Moreno',
        curp: null,
        rfc: null,
        nss: null,
        tipo_Sanguineo: null,
        fecha_ingreso: null,
        tipo_contrato: null,
        estatus: 'activo',
        direccion: '',
        area_id: 38, // Informatica   
        
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Axel',
        apellidos: 'Antonio Alarcon',
        rfc: 'AIAA900101AA2',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Angelica',
        apellidos: 'Melendez Lopez',
        rfc: 'MELA900101AA3',
        estatus: 'activo',
        direccion_id: 7,
        departamento_id: 2,
        puesto_id: 2,
        jefe_directo_id: null,
        clabe_bancaria: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        fecha_baja: null,
        motivo_baja: null,
        documento_baja: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Lorena',
        apellidos: 'Barrera Soto',
        rfc: 'BASL900101AA4',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Maribel',
        apellidos: 'Leal Rico',
        rfc: 'LERM900101AA5',
        estatus: 'activo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Ariadna Albertina',
        apellidos: 'Ramirez Trejo',
        curp: null,
        rfc: null,
        estatus: 'activo',
        direccion_id: 11,
        departamento_id: 2,
        puesto_id: 2,
        jefe_directo_id: null,
        clabe_bancaria: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        fecha_baja: null,
        motivo_baja: null,
        documento_baja: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empleados', null, {});
  }
};