'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('empleados', [
      {
        id: 1,
        nombre: 'Omar Efren',
        apellidos: 'Vazquez Moreno',
        curp: 'VAMO900101HDFZNR01',
        rfc: 'VAMO900101AA5',
        nss: '12345678999',
        tipo_Sanguineo: 'O+',
        fecha_ingreso: '2026-01-15',
        tipo_contrato: 'Confianza', // <-- Corregido a Mayúscula
        estatus: 'activo',
        direccion_id: null,        // <-- Cambiado a null porque no existe el ID 7
        departamento_id: null,
        puesto_id: 1, 
        jefe_directo_id: null,
        clabe_bancaria: '012345678901234567',
        contacto_nombre: 'Maria Lopez',
        contacto_parentesco: 'Esposa',
        contacto_telefono: '5551234567',
        fecha_baja: null,
        documento_baja: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'Axel',
        apellidos: 'Antonio Alarcon',
        curp: 'AAAA900101HDFZNR02', // <-- CURP ficticio único para evitar error UNIQUE
        rfc: null,
        nss: null,
        tipo_Sanguineo: null,
        fecha_ingreso: '2026-01-15',
        tipo_contrato: 'Confianza', // <-- Corregido a Mayúscula
        estatus: 'activo',
        direccion_id: null,        // <-- Cambiado a null
        departamento_id: null,
        puesto_id: 1, 
        jefe_directo_id: 1, 
        clabe_bancaria: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        fecha_baja: null,
        documento_baja: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'Angelica',
        apellidos: 'Melendez Lopez',
        curp: 'AMLM900101HDFZNR03', // <-- CURP ficticio único
        rfc: null,
        nss: null,
        tipo_Sanguineo: null,
        fecha_ingreso: '2026-01-15',
        tipo_contrato: 'Confianza', // <-- Corregido a Mayúscula
        estatus: 'activo',
        direccion_id: null,        // <-- Cambiado a null
        departamento_id: null,
        puesto_id: 1, 
        jefe_directo_id: 1, 
        clabe_bancaria: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        fecha_baja: null,
        documento_baja: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: 'Lorena',
        apellidos: 'Barrera Soto',
        curp: 'LABS900101HDFZNR04', // <-- CURP ficticio único
        rfc: null,
        nss: null,
        tipo_Sanguineo: null,
        fecha_ingreso: '2026-01-15',
        tipo_contrato: 'Indefinido', // <-- Corregido a Mayúscula
        estatus: 'activo',
        direccion_id: null,         // <-- Cambiado a null
        departamento_id: null,
        puesto_id: 1,
        jefe_directo_id: 1,
        clabe_bancaria: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        fecha_baja: null,
        documento_baja: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nombre: 'Maribel',
        apellidos: 'Leal Rico',
        curp: 'MALR900101HDFZNR05', // <-- CURP ficticio único
        rfc: 'LERM900101AA5',
        nss: null,
        tipo_Sanguineo: null,
        fecha_ingreso: '2026-01-15',
        tipo_contrato: 'Indefinido', // <-- Corregido a Mayúscula
        estatus: 'activo',
        direccion_id: null,         // <-- Cambiado a null
        departamento_id: null,
        puesto_id: 1,
        jefe_directo_id: 1,
        clabe_bancaria: null,
        contacto_nombre: null,
        contacto_parentesco: null,
        contacto_telefono: null,
        fecha_baja: null,
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