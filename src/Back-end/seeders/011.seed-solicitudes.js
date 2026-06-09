'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('solicitudes', [
      {
        id: 1,
        empleado_id: 2,          // Axel hace la solicitud
        tipo: 'Vacaciones',
        fecha_inicio: '2026-07-01',
        fecha_fin: '2026-07-10',
        motivo: 'Vacaciones de verano correspondientes al primer periodo.',
        documento_adjunto: null,
        estatus: 'aprobado',     
        aprobado_por: 1,         // Omar Efren (su jefe) la aprobó
        fecha_resolucion: new Date('2026-06-15 10:00:00'), // <-- Formato limpio y seguro
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        empleado_id: 3,          // Angelica hace la solicitud
        tipo: 'Permiso Médico',
        fecha_inicio: '2026-08-12',
        fecha_fin: '2026-08-12',
        motivo: 'Cita médica de control institucional.',
        documento_adjunto: 'constancia_medica_angelica.pdf',
        estatus: 'pendiente',    
        aprobado_por: null,      
        fecha_resolucion: null,   // <-- Null no da problemas porque pusiste allowNull: true
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        empleado_id: 4,          // Lorena hace la solicitud
        tipo: 'Día Económico',
        fecha_inicio: '2026-09-20',
        fecha_fin: '2026-09-21',
        motivo: 'Asuntos particulares urgentes.',
        documento_adjunto: null,
        estatus: 'rechazado',    
        aprobado_por: 1,         // Omar Efren la rechazó
        fecha_resolucion: new Date('2026-09-18 16:30:00'), // <-- Formato limpio y seguro
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('solicitudes', null, {});
  }
};