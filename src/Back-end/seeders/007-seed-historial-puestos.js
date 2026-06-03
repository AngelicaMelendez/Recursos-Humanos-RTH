'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('historial_puestos', [
      {
        empleado_id: 1,
        puesto_id: 1,
        fecha_inicio: '2020-01-15',
        fecha_fin: null,
        motivo_cambio: 'Alta inicial en el sistema',
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 2,
        puesto_id: 7,
        fecha_inicio: '2021-03-01',
        fecha_fin: null,
        motivo_cambio: 'Alta inicial en el sistema',
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 3,
        puesto_id: 5,
        fecha_inicio: '2022-06-16',
        fecha_fin: null,
        motivo_cambio: 'Asignacion administrativa',
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 4,
        puesto_id: 6,
        fecha_inicio: '2023-02-01',
        fecha_fin: null,
        motivo_cambio: 'Asignacion administrativa',
        createdAt: now,
        updatedAt: now,
      },
      {
        empleado_id: 5,
        puesto_id: 3,
        fecha_inicio: '2023-08-01',
        fecha_fin: null,
        motivo_cambio: 'Asignacion administrativa',
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('historial_puestos', null, {});
  },
};
