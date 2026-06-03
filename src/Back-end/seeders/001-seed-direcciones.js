'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const direccionesUnicas = [
      "DIRECCIÓN DE CONTRALORIA",
      "DIRECCIÓN DE COORDINACIÓN FINANCIERA Y PLANEACIÓN",
      "PLANEACIÓN",
      "ARCHIVO",
      "CONTABILIDAD",
      "FINANZAS Y CONTABILIDAD",
      "INFORMATICA",
      "INVENTARIOS",
      "RECURSOS HUMANOS",
      "SERVICIOS GENERALES",
      "DIRECCIÓN DE IMAGEN Y PROYECTOS ESTRATEGICOS",
      "DIRECCIÓN DE INGENIERÍA",
      "DIRECCIÓN DE INGENIERIA",
      "REPETIDOR DE TV. CERRO JUÁREZ",
      "REPETIDOR DE TV. HUEJUTLA",
      "REPETIDOR DE TV. TEPEAPULCO",
      "REPETIDOR DE TV. TULA",
      "REPETIDOR DE TV. TULANCINGO",
      "TRANSMISOR CERRO CUBITOS",
      "DIRECCIÓN DE NOTICIAS",
      "CONDUCTORES",
      "CAMARÓGRAFO",
      "EDICIÓN",
      "REPORTEROS",
      "DIRECCIÓN DE PROMOCIÓN E INTERCAMBIO",
      "DIRECCIÓN DE RADIO",
      "RADIODIFUSORA PACHUCA",
      "TX. RADIO ACTOPAN",
      "TX. RADIODIFUSORAS DE HUEJUTLA AM Y FM",
      "RADIODIFUSORA HUEJUTLA AM",
      "RADIODIFUSORA HUEJUTLA FM",
      "RADIODIFUSORA JACALA",
      "RADIODIFUSORA TLANCHINOL",
      "DIRECCIÓN DE TELEVISIÓN",
      "SECRETARIA",
      "PRODUCCIÓN",
      "CONTENIDOS",
      "AUDIO",
      "DEPORTES",
      "COORDINADOR DE STAFF",
      "ESCENOGRAFIA",
      "ILUMINACIÓN",  
      "IMAGEN",
      "MAQUILLISTA",
      "MASTER",
      "SWITCHER",
      "TITULADOR",
      "VIDEOTECA",
      "PLAY OUT",
      "DIRECCIÓN DE VINCULACIÓN INSTITUCIONAL",
      "DIRECCIÓN GENERAL",
      "DIRECCIÓN JURÍDICA",
      "COMISIONADO SUBSECRETARÍA DE PROTECCIÓN CIVIL Y GESTIÓN DE RIESGOS",
      "ARCHIVO Y SERVICIOS GENERALES",
      "COORDINADOR PERSONAL CERROS DE TX",
      "MANTENIMIENTOS Y TX. DE FUTBOL Y EVENTOS ESPECIALES",
      "CONDUCTORA",
      "ESCENGRAFO",
      "PRODUCCIÓN Y CONDUCTOR"
    ];

    const datosDirecciones = direccionesUnicas.map(nombre => ({
      nombre,
      tipo: 'direccion',
      area_padre_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('areas', datosDirecciones);
  },

  async down(queryInterface, Sequelize) {
    // Borra solo las que sean tipo direccion
    await queryInterface.bulkDelete('areas', { tipo: 'direccion' }, {});
  }
};