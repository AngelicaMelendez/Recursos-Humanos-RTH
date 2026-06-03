'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('visitantes', [
      {
        nombre: 'Carlos',
        apellidos: 'Hernandez Perez',
        institucion: 'Proveedor externo',
        motivo: 'Entrega de documentacion',
        persona_a_visitar: 'Recursos Humanos',
        fecha_entrada: '2026-05-27',
        hora_entrada: '10:15:00',
        hora_salida: '10:45:00',
        gafete: 'V-001',
        createdAt: now,
        updatedAt: now,
      },
      {
        nombre: 'Daniela',
        apellidos: 'Sanchez Ruiz',
        institucion: 'Gobierno del Estado',
        motivo: 'Reunion de seguimiento',
        persona_a_visitar: 'Direccion General',
        fecha_entrada: '2026-05-28',
        hora_entrada: '12:00:00',
        hora_salida: '13:05:00',
        gafete: 'V-002',
        createdAt: now,
        updatedAt: now,
      },
      {
        nombre: 'Miguel',
        apellidos: 'Lopez Garcia',
        institucion: 'Servicio tecnico',
        motivo: 'Revision de equipo',
        persona_a_visitar: 'Informatica',
        fecha_entrada: '2026-05-29',
        hora_entrada: '09:30:00',
        hora_salida: null,
        gafete: 'V-003',
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('visitantes', null, {});
  },
};
