'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('comunicados', [
      {
        id: 1,
        titulo: 'Actualizacion de expedientes',
        contenido: 'Favor de revisar que los expedientes digitales del personal cuenten con los documentos basicos actualizados.',
        departamento_id: null,
        direccion_id: 7,
        usuario_id: 1,
        tipo: 'publico',
        fecha_vencimiento: '2026-06-30',
        estatus: 'activo',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        titulo: 'Recordatorio de asistencia',
        contenido: 'Se recuerda registrar entrada y salida en el sistema para mantener el historial completo.',
        departamento_id: null,
        direccion_id: null,
        usuario_id: 2,
        tipo: 'publico',
        fecha_vencimiento: '2026-06-15',
        estatus: 'activo',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        titulo: 'Mantenimiento preventivo',
        contenido: 'El area de Informatica realizara mantenimiento preventivo a los equipos administrativos.',
        departamento_id: null,
        direccion_id: 38,
        usuario_id: 1,
        tipo: 'privado',
        fecha_vencimiento: '2026-06-20',
        estatus: 'activo',
        createdAt: now,
        updatedAt: now,
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comunicados', null, {});
  },
};
