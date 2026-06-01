// database/seeders/AreaSeeder.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('areas', [
      {
        id: 1,
        nombre: 'DIRECCION GENERAL',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 2,
        nombre: 'CONTRALORIA INTERNA',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 3,
        nombre: 'DIRECCION DE COORDINACION FINANCIERA Y PLANEACION',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 4,
        nombre: 'RECURSOS HUMANOS',
        area_padre_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 5,
        nombre: 'FINANZAS Y CONTABILIDAD',
        area_padre_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 6,
        nombre: 'CONTABILIDAD',
        area_padre_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 7,
        nombre: 'INVENTARIOS',
        area_padre_id: 5,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 8,
        nombre: 'ARCHIVO',
        area_padre_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 9,
        nombre: 'DIRECCION JURIDICA',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 10,
        nombre: 'DIRECCION DE NOTICIAS',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 11,
        nombre: 'REPORTEROS',
        area_padre_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 12,
        nombre: 'DEPORTES',
        area_padre_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 13,
        nombre: 'CONDUCTORES',
        area_padre_id: 10,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 14,
        nombre: 'DIRECCION DE RADIO',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 15,
        nombre: 'RADIODIFUSORA PACHUCA',
        area_padre_id: 14,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 16,
        nombre: 'RADIODIFUSORA HUEJUTLA AM',
        area_padre_id: 14,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 17,
        nombre: 'RADIODIFUSORA HUEJUTLA FM',
        area_padre_id: 14,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 18,
        nombre: 'RADIODIFUSORA JACALA',
        area_padre_id: 14,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 19,
        nombre: 'RADIODIFUSORA TLANCHINOL',
        area_padre_id: 14,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 20,
        nombre: 'DIRECCION DE TELEVISION',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 21,
        nombre: 'PRODUCCION',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 22,
        nombre: 'AUDIO',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 23,
        nombre: 'IMAGEN',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 24,
        nombre: 'EDICION',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 25,
        nombre: 'SWITCHER',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 26,
        nombre: 'MASTER',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 27,
        nombre: 'PLAY OUT',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 28,
        nombre: 'CAMAROGRAFO',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 29,
        nombre: 'ILUMINACION',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 30,
        nombre: 'ESCENOGRAFIA',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 31,
        nombre: 'MAQUILLISTA',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 32,
        nombre: 'DIRECCION DE INGENIERIA',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 33,
        nombre: 'TRANSMISOR CERRO CUBITOS',
        area_padre_id: 32,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 34,
        nombre: 'REPETIDOR DE TV TULA',
        area_padre_id: 32,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 35,
        nombre: 'REPETIDOR DE TV TULANCINGO',
        area_padre_id: 32,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 36,
        nombre: 'REPETIDOR DE TV HUEJUTLA',
        area_padre_id: 32,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 37,
        nombre: 'TX RADIO ACTOPAN',
        area_padre_id: 32,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 38,
        nombre: 'INFORMATICA',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 39,
        nombre: 'SERVICIOS GENERALES',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 40,
        nombre: 'VIDEOTECA',
        area_padre_id: 20,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 41,
        nombre: 'SECRETARIA',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 42,
        nombre: 'DIRECCION DE VINCULACION INSTITUCIONAL',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },

      {
        id: 43,
        nombre: 'DIRECCION DE IMAGEN Y PROYECTOS ESTRATEGICOS',
        area_padre_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('areas', null, {});
  }
};