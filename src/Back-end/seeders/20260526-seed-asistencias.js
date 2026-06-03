'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('asistencias', [
      {
        empleado_id: 1,
        fecha: '2026-05-25',
        hora_entrada: '08:55:00',
        hora_salida: '17:03:00',
        estatus_entrada: 'a_tiempo',
        estatus_salida: 'normal',
        minutos_retardo: 0,
        notas: 'Registro regular',
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 2,
        fecha: '2026-05-25',
        hora_entrada: '09:17:00',
        hora_salida: '17:10:00',
        estatus_entrada: 'retardo',
        estatus_salida: 'normal',
        minutos_retardo: 17,
        notas: 'Retardo justificado por traslado',
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 3,
        fecha: '2026-05-25',
        hora_entrada: '08:48:00',
        hora_salida: '17:00:00',
        estatus_entrada: 'a_tiempo',
        estatus_salida: 'normal',
        minutos_retardo: 0,
        notas: null,
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 4,
        fecha: '2026-05-25',
        hora_entrada: null,
        hora_salida: null,
        estatus_entrada: 'licencia',
        estatus_salida: 'sin_registro',
        minutos_retardo: 0,
        notas: 'Licencia registrada por Recursos Humanos',
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 5,
        fecha: '2026-05-25',
        hora_entrada: '08:59:00',
        hora_salida: '16:45:00',
        estatus_entrada: 'a_tiempo',
        estatus_salida: 'temprano',
        minutos_retardo: 0,
        notas: 'Salida autorizada',
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('asistencias', null, {});
  },
};
