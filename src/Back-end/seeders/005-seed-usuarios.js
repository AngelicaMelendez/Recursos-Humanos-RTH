'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {

        id: 1,
        usuario: 'Marina', //----------------------------Contraloría-----------------------------//
        nombre: 'Marina',
        apellidos: 'Callejas Alamilla',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        usuario: 'Maria Angelica', //----------------------------Contraloría-----------------------------//
        nombre: 'Maria Angelica',
        apellidos: 'Hernandez Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        usuario: 'Edgar de Jesus', //----------------------------Dirección de Administración y Finanzas-----------------------------//
        nombre: 'Edgar de Jesus',
        apellidos: 'Vergara Contreras',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        usuario: 'Cinthya Iris', //----------------------------Dirección de Administración y Finanzas-----------------------------//
        nombre: 'Cinthya Iris',
        apellidos: 'Aguado Castañeda',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        usuario: 'Wendy Valeria', //----------------------------Dirección de Administración y Finanzas-----------------------------//
        nombre: 'Wendy Valeria',
        apellidos: 'Rubiales Flores',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        usuario: 'Maria de los Angeles', //----------------------------Planeacion-----------------------------//
        nombre: 'Maria de los Angeles',
        apellidos: 'Monzalvo Perez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        usuario: 'Carlos Alberto', //----------------------------Planeacion-----------------------------//
        nombre: 'Carlos Alberto',
        apellidos: 'Luna Ibarra',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        usuario: 'Daniela', //----------------------------Planeacion-----------------------------//
        nombre: 'Daniela' ,
        apellidos: 'Cruz Jimenez',
        empleado_id: null,
        rol: 'empleado', 
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        usuario: 'Maria del Pilar', //----------------------------Archivo-----------------------------//
        nombre: 'Maria del Pilar',
        apellidos: 'Palomares Paredes',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        usuario: 'Johanann', //----------------------------Archivo-----------------------------//
        nombre: 'Johanann',
        apellidos: 'Carrasco Acosta',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        usuario: 'Alicia', //----------------------------Contabilidad-----------------------------//
        nombre: 'Alicia',
        apellidos: 'Rangel Mendoza',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        usuario: 'Luz Elena', //----------------------------Finanzas y Contabilidad-----------------------------//
        nombre: 'Luz Elena',
        apellidos: 'Velazco Lara',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        usuario: 'Joel Alberto', //----------------------------Finanzas y Contabilidad-----------------------------//
        nombre: 'Joel Alberto',
        apellidos: 'Carpio Bautista',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86',
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        id: 14,
        usuario: 'Omar Efren', //----------------------------INFORMATICA-----------------------------//
        nombre: 'Omar Efren',
        apellidos: 'Vazquez Moreno',
        empleado_id: null,
        rol: 'super_usuario',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', //->123456
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        usuario: 'Axel',//----------------------------INFORMATICA-----------------------------//
        nombre: 'Axel',
        apellidos: 'Antonio Alarcon',
        empleado_id: null,
        rol: 'super_usuario',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        usuario: 'Angelica', //----------------------------INFORMATICA-----------------------------//
        nombre: 'Angelica',
        apellidos: 'Melendez Lopez',
        empleado_id: null,
        rol: 'super_usuario',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id: 17,
        usuario: 'Ivan', //----------------------------Almacen-----------------------------//
        nombre: 'Ivan',
        apellidos: 'Martinez Aldana',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        usuario: 'Jose David', //----------------------------Inventarios-----------------------------//
        nombre: 'Jose David',
        apellidos: 'Paredes Cruz',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        usuario: 'Maria de la Paz', //----------------------------Inventarios-----------------------------//
        nombre: 'Maria de la Paz',
        apellidos: 'Hernandez Escamilla',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        usuario: 'Jorge Enrique', //----------------------------Inventarios-----------------------------//
        nombre: 'Jorge Enrique',
        apellidos: 'Fernandez Garcia',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        usuario: 'Lorena',//----------------------------Recursos-Humanos-----------------------------//
        nombre: 'Lorena',
        apellidos: 'Barrera Soto',
        empleado_id: null,
        rol: 'admin_rh',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        usuario: 'Maribel', //----------------------------Recursos-Humanos-----------------------------//
        nombre: 'Maribel',
        apellidos: 'Leal Rico',
        empleado_id: null,
        rol: 'admin_rh',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        usuario: 'Ariadna Albertina', //----------------------------Recursos-Humanos-----------------------------//
        nombre: 'Ariadna Albertina',
        apellidos: 'Ramirez Trejo',
        empleado_id: null,
        rol: 'admin_rh',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        usuario: 'Roberto', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Roberto',
        apellidos: 'Espinoza Dominguez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        usuario: 'Oscar', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Oscar',
        apellidos: 'Islas Sanchez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        usuario: 'Amparo', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Amparo',
        apellidos: 'Lugo Muñoz',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        usuario: 'Maria Lidia', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Maria Lidia',
        apellidos: 'Alvarado Palafox',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        usuario: 'Antonio', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Antonio',
        apellidos: 'Jimenez Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        usuario: 'Maria Esther Raquel', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Maria Esther Raquel',
        apellidos: 'Tapia Alfaro',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        usuario: 'Victor Manuel', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Victor Manuel',
        apellidos: 'Guerrero Guerrero',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        usuario: 'Enrique Manuel', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Enrique Manuel',
        apellidos: 'Alarcon Murrieta',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        usuario: 'Fernando', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Fernando',
        apellidos: 'Herrera Chagoya',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        usuario: 'Javier', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Javier',
        apellidos: 'Zamora Martinez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        usuario: 'Guillermo', //----------------------------Servicios-Generales-----------------------------//
        nombre: 'Guillermo',
        apellidos: 'Vivanco Quijano',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        usuario: 'Jonathan Daniel', //----------------------------Dirección de Proyectos Estrategicos-----------------------------//
        nombre: 'Jonathan Daniel',
        apellidos: 'Gama Venegas',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 36,
        usuario: 'Miguel', //----------------------------Dirección de Proyectos Estrategicos-----------------------------//
        nombre: 'Miguel',
        apellidos: 'Serna Grajales',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        usuario: 'David', //----------------------------Dirección de Ingenieria-----------------------------//
        nombre: 'David',
        apellidos: 'Cervantes Herrera',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        usuario: 'Ivan Erick', //----------------------------Dirección de Ingenieria-----------------------------//
        nombre: 'Ivan Erick',
        apellidos: 'Aguilar Castillo',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 39,
        usuario: 'Alejandro', //----------------------------Dirección de Ingenieria-----------------------------//
        nombre: 'Alejandro',
        apellidos: 'Benitez Garcia',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 40,
        usuario: 'Hector Joseph', //----------------------------Dirección de Ingenieria-----------------------------//
        nombre: 'Hector Joseph',
        apellidos: 'Sosa de la Cruz',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 41,
        usuario: 'Yadira del Rosario', //----------------------------Dirección de Ingenieria-----------------------------//
        nombre: 'Yadira del Rosario',
        apellidos: 'Ortiz Leon',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 42,
        usuario: 'Diana', //----------------------------Dirección de Ingenieria-----------------------------//
        nombre: 'Diana',
        apellidos: 'Fonseca Barquin',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 43,
        usuario: 'AntonioC', //----------------------------Repetidor de Tv: Cerro Juarez-----------------------------//
        nombre: 'Antonio',
        apellidos: 'Barrera Castro',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 44,
        usuario: 'Florencio', //----------------------------Repetidor de Tv: Cerro Juarez-----------------------------//
        nombre: 'Florencio',
        apellidos: 'Gonzalez Torquemada',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 45,
        usuario: 'JavierT', //----------------------------Repetidor de Tv: Cerro Juarez-----------------------------//
        nombre: 'Javier',
        apellidos: 'Gonzalez Torquemada',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 46,
         usuario: 'Jose Juan', //----------------------------Repetidor de Tv: Huejutla-----------------------------//
        nombre: 'Jose Juan',
        apellidos: 'Flores Galvan',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 47,
         usuario: 'Arturo Oldair', //----------------------------Repetidor de Tv: Huejutla-----------------------------//
        nombre: 'Arturo Oldair',
        apellidos: 'Tapia Diego',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 48,
         usuario: 'Jonatan', //----------------------------Repetidor de Tv: Tepeapulco-----------------------------//
        nombre: 'Jonatan',
        apellidos: 'Espinoza Fernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 49,
         usuario: 'Luis', //----------------------------Repetidor de Tv: Tepeapulco-----------------------------//
        nombre: 'Luis',
        apellidos: 'Vera Lozada',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 50,
        usuario: 'Clemente', //----------------------------Repetidor de Tv: Tula-----------------------------//
        nombre: 'Clemente',
        apellidos: 'Lara Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 51,
        usuario: 'Sabas', //----------------------------Repetidor de Tv: Tula-----------------------------//
        nombre: 'Sabas',
        apellidos: 'Lara Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 52,
        usuario: 'Mario', //----------------------------Repetidor de Tv: Tulancingo-----------------------------//
        nombre: 'Mario',
        apellidos: 'Hernandez Escorcia',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 53,
        usuario: 'Gregorio', //----------------------------Repetidor de Tv: Tulancingo-----------------------------//
        nombre: 'Gregorio',
        apellidos: 'Oviedo Jimenez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 54,
        usuario: 'Erik', //----------------------------Transmisor-Cerro-Cubitos-----------------------------//
        nombre: 'Erik',
        apellidos: 'Aguilar Noriega',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 55,
        usuario: 'Keobel Ramses', //----------------------------Transmisor-Cerro-Cubitos-----------------------------//
        nombre: 'Keobel Ramses',
        apellidos: 'Rivera Lopez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 56,
        usuario: 'Karina', //----------------------------Direccion de Noticias-----------------------------//
        nombre: 'Karina',
        apellidos: 'Atanacio Ponce',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 57,
        usuario: 'Mara lizette', //----------------------------Conductores-----------------------------//
        nombre: 'Mara lizette',
        apellidos: 'Olvera Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 58,
        usuario: 'Uriel', //----------------------------Conductores-----------------------------//
        nombre: 'Uriel',
        apellidos: 'Ramirez Vega',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 59,
        usuario: 'Citlally Isabel', //----------------------------Conductores-----------------------------//
        nombre: 'Citlally Isabel',
        apellidos: 'Velasco Guerrero',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 60,
        usuario: 'Brianda Yareli', //----------------------------Direccion de Noticias-----------------------------//
        nombre: 'Brianda Yareli',
        apellidos: 'Gomez Ramirez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 61,
        usuario: 'Victor Omar', //----------------------------Direccion de Noticias-----------------------------//
        nombre: 'Victor Omar',
        apellidos: 'Castilleja Vergara',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 62,
        usuario: 'Jose Luis', //----------------------------Camarografos-----------------------------//
        nombre: 'Jose Luis',
        apellidos: 'Ortega Ortega',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 63,
        usuario: 'FernandoV', //----------------------------Camarografos-----------------------------//
        nombre: 'Fernando',
        apellidos: 'Lozano Vazquez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 64,
        usuario: 'Danilo Agustin', //----------------------------Camarografos-----------------------------//
        nombre: 'Danilo Agustin',
        apellidos: 'Badillo Ayala',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 65,
        usuario: 'Lucio', //----------------------------Camarografos-----------------------------//
        nombre: 'Lucio',
        apellidos: 'Torres Moreno',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 66,
        usuario: 'AlejandroP', //----------------------------Camarografos-----------------------------//
        nombre: 'Alejandro',
        apellidos: 'Juarez Pacheco',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 67,
        usuario: 'IvanP', //----------------------------Edición-----------------------------//
        nombre: 'Ivan',
        apellidos: 'Cabrera Perez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 68,
        usuario: 'Christian', //----------------------------Edición-----------------------------//
        nombre: 'Christian',
        apellidos: 'Corte Islas',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 69,
        usuario: 'Yazmin Arlette', //----------------------------Edición-----------------------------//
        nombre: 'Yazmin Arlette',
        apellidos: 'Quebrado Herrera',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 70,
        usuario: 'Vianey', //----------------------------Edición-----------------------------//
        nombre: 'Vianey',
        apellidos: 'Juarez Pacheco',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 71,
        usuario: 'Luis Enrique', //----------------------------Edición-----------------------------//
        nombre: 'Luis Enrique',
        apellidos: 'Martinez Oviedo',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 72,
        usuario: 'Maria de la PazG', //----------------------------Reporteros-----------------------------//
        nombre: 'Maria de la Paz',
        apellidos: 'Roldan Garcia',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 73,
        usuario: 'Flor Ivonne', //----------------------------Reporteros-----------------------------//
        nombre: 'Flor Ivonne',
        apellidos: 'Hernandez Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 74,
        usuario: 'Juan Orlando', //----------------------------Reporteros-----------------------------//
        nombre: 'Juan Orlando',
        apellidos: 'Betancur Castano',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 75,
        usuario: 'Gustavo', //----------------------------Reporteros-----------------------------//
        nombre: 'Gustavo',
        apellidos: 'Garcia Serrano',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 76,
        usuario: 'AngelicaA', //----------------------------Direccion de Promocion y Mejora Continua-----------------------------//
        nombre: 'Angelica',
        apellidos: 'Palafox Alpizar',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 77,
         usuario: 'MarinaC', //----------------------------Direccion de Promocion y Mejora Continua-----------------------------//
        nombre: 'Marina',
        apellidos: 'Barrera Cruz',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 78,
        usuario: 'DavidS', //----------------------------Direccion de Promocion y Mejora Continua-----------------------------//
        nombre: 'David',
        apellidos: 'Lara Salinas',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 79,
         usuario: 'Andres', //----------------------------Direccion de Radio-----------------------------//
        nombre: 'Andres',
        apellidos: 'Torres Aguirre',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 80,
        usuario: 'Juan Antonio', //----------------------------Direccion de Radio-----------------------------//
        nombre: 'Juan Antonio',
        apellidos: 'Garcia Ybarra',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 81,
        usuario: 'Karina Zuleima', //----------------------------Radiodifusora Pachuca-----------------------------//
        nombre: 'Karina Zuleima',
        apellidos: 'Martinez Velazquez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 82,
         usuario: 'Edgar Marcos', //----------------------------Radiodifusora Pachuca-----------------------------//
        nombre: 'Edgar Marcos',
        apellidos: 'Martinez Soto',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 83,
         usuario: 'Vania Anet', //----------------------------Radiodifusora Pachuca-----------------------------//
        nombre: 'Vania Anet',
        apellidos: 'Gomez Paredes',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 84,
         usuario: 'Giselle', //----------------------------Radiodifusora Pachuca-----------------------------//
        nombre: 'Giselle',
        apellidos: 'Macias Aguirre',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 85,
         usuario: 'Leonardo Saul', //----------------------------Radiodifusora Pachuca-----------------------------//
        nombre: 'Leonardo Saul',
        apellidos: 'Ortiz Contreras',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 86,
         usuario: 'Mario Alfredo', //----------------------------Radiodifusora Pachuca-----------------------------//
        nombre: 'Mario Alfredo',
        apellidos: 'Tapia Nava',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 87,
         usuario: 'Aldo Esteban', //----------------------------Radiodifusora Pachuca-----------------------------//
        nombre: 'Aldo Esteban',
        apellidos: 'Falcon Jimenez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 88,
         usuario: 'Jazmin', //----------------------------Radiodifusora Pachuca-----------------------------//
        nombre: 'Jazmin',
        apellidos: 'Falcon Jimenez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 89,
         usuario: 'Belinda Silvia', //----------------------------Radiodifusora Pachuca-----------------------------//
        nombre: 'Belinda Silvia',
        apellidos: 'Perez Rios',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 90,
        usuario: 'Juan Carlos', //----------------------------Radiodifusora Pachuca-----------------------------//
        nombre: 'Juan Carlos',
        apellidos: 'Garcia Tenorio',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 91,
        usuario: 'Nicolas', //----------------------------Tx. Radio Actopan-----------------------------//
        nombre: 'Nicolas',
        apellidos: 'Moctezuma Mendoza',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 92,
        usuario: 'Julio Fortunato', //----------------------------Tx. Radiodifusoras de Huejutla AM y FM-----------------------------//
        nombre: 'Julio Fortunato',
        apellidos: 'Martinez Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 93,
        usuario: 'Francisco', //----------------------------Tx. Radiofusoras de Huejutla AM y FM-----------------------------//
        nombre: 'Francisco',
        apellidos: 'Esparza Perez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 94,
        usuario: 'Maricelda', //----------------------------Radiofusora de Huejutla AM-----------------------------//
        nombre: 'Maricelda',
        apellidos: 'Bautista Granados',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 95,
        usuario: 'Elda Nora', //----------------------------Radiofusora de Huejutla AM-----------------------------//
        nombre: 'Elda Nora',
        apellidos: 'Bengoa Retama',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 96,
        usuario: 'Delfino', //----------------------------Radiofusora de Huejutla AM-----------------------------//
        nombre: 'Delfino',
        apellidos: 'San Juan Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 97,
        usuario: 'Jessica', //----------------------------Radiofusora de Huejutla AM-----------------------------//
        nombre: 'Jessica',
        apellidos: 'Reyes Vicente',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 98,
        usuario: 'Maria Fernanda', //----------------------------Radiofusora de Huejutla AM-----------------------------//
        nombre: 'Maria Fernanda',
        apellidos: 'Martinez Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 99,
        usuario: 'Joel', //----------------------------Radiofusora de Huejutla AM-----------------------------//
        nombre: 'Joel',
        apellidos: 'Vega Perez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 100,
        usuario: 'Elizabeth', //----------------------------Radiofusora de Huejutla AM-----------------------------//
        nombre: 'Elizabeth',
        apellidos: 'Ruiz Cruz',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 101,
        usuario: 'Wendy', //----------------------------Radiofusora de Huejutla AM-----------------------------//
        nombre: 'Wendy',
        apellidos: 'Salazar Castillo',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 102,
        usuario: 'Adolfo', //----------------------------Radiofusora-Jacala--------------------------//
        nombre: 'Adolfo',
        apellidos: 'Otero Melo',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 103,
         usuario: 'RobertoF', //----------------------------Radiofusora-Jacala--------------------------//
        nombre: 'Roberto',
        apellidos: 'Garay Franco',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 104,
         usuario: 'Marcela', //----------------------------Radiofusora-Jacala--------------------------//
        nombre: 'Marcela',
        apellidos: 'Garica Ramirez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 105,
         usuario: 'Ma de la Luz', //----------------------------Radiofusora-Jacala--------------------------//
        nombre: 'Ma de la Luz',
        apellidos: 'Gonzalez Maqueda',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 106,
         usuario: 'Leonides', //----------------------------Radiofusora-Jacala--------------------------//
        nombre: 'Leonides',
        apellidos: 'Leonardo Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 107,
         usuario: 'Fabiola Estefani', //----------------------------Radiofusora-Jacala--------------------------//
        nombre: 'Fabiola Estefani',
        apellidos: 'Pedraza Ibarra',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 108,
         usuario: 'Lidia Smith', //----------------------------Radiofusora-Jacala--------------------------//
        nombre: 'Lidia Smith',
        apellidos: 'Perez Gonzalez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 109,
         usuario: 'Ricardo', //----------------------------Radiofusora-Jacala--------------------------//
        nombre: 'Ricardo',
        apellidos: 'Cruz Morales',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 110,
         usuario: 'Eduardo Jeovany', //----------------------------Radiofusora-Tlanchinol--------------------------//
        nombre: 'Eduardo Jeovany',
        apellidos: 'Peña Ramirez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 111,
         usuario: 'OscarM', //----------------------------Radiofusora-Tlanchinol--------------------------//
        nombre: 'Oscar',
        apellidos: 'Ramirez Medina',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 112,
         usuario: 'Socorro', //----------------------------Radiofusora-Tlanchinol--------------------------//
        nombre: 'Socorro',
        apellidos: 'Garcia Torres',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 113,
         usuario: 'Ma Cristina', //----------------------------Radiofusora-Tlanchinol--------------------------//
        nombre: 'Ma Cristina',
        apellidos: 'Hernandez Velasco',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 114,
        usuario: 'Ricardo Javier', //----------------------------Dirección de Televisión--------------------------//
        nombre: 'Ricardo Javier',
        apellidos: 'Olguin Martinez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 115,
         usuario: 'Patricia', //----------------------------Dirección de Televisión--------------------------//
        nombre: 'Patricia',
        apellidos: 'Escalante Tinoco',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 116,
         usuario: 'Aurora', //----------------------------Planeación-------------------------//
        nombre: 'Aurora',
        apellidos: 'Resendiz Ramos',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 117,
         usuario: 'Leticia', //----------------------------Secretaría--------------------------//
        nombre: 'Leticia',
        apellidos: 'Perez Castillo',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 118,
        usuario: 'Ivette', //----------------------------Secretaría--------------------------//
        nombre: 'Ivette',
        apellidos: 'Espejel Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 119,
         usuario: 'Hugo', //----------------------------Producción--------------------------//
        nombre: 'Hugo',
        apellidos: 'Guzman Cortes',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 120,
        usuario: 'Astrid Minelli', //----------------------------Producción--------------------------//
        nombre: 'Astrid Minelli',
        apellidos: 'Dominguez Garcia',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 121,
        usuario: 'Ivette America', //----------------------------Producción--------------------------//
        nombre: 'Ivette America',
        apellidos: 'Guerrero Montesinos',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 122,
        usuario: 'Gabriel', //----------------------------Producción--------------------------//
        nombre: 'Gabriel',
        apellidos: 'Perales Ramirez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 123,
        usuario: 'Anabelly', //----------------------------Producción--------------------------//
        nombre: 'Anabelly',
        apellidos: 'Espinoza Angeles',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 124,
        usuario: 'Jose Omar', //----------------------------Producción--------------------------//
        nombre: 'Jose Omar',
        apellidos: 'Aguirre Garcia',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 125,
        usuario: 'Saul', //----------------------------Producción--------------------------//
        nombre: 'Saul',
        apellidos: 'Garrido Arroyo',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 126,
        usuario: 'SaulP', //----------------------------Producción--------------------------//
        nombre: 'Saul',
        apellidos: 'Lopez Pimentel',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 127,
        usuario: 'Lorena Elizabeth', //----------------------------Producción--------------------------//
        nombre: 'Lorena Elizabeth',
        apellidos: 'Ruiz Rodriguez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 128,
        usuario: 'Maria del Consuelo', //----------------------------Producción--------------------------//
        nombre: 'Maria del Consuelo',
        apellidos: 'Chong Barreiro',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 129,
        usuario: 'AlejandroC', //----------------------------Contenidos--------------------------//
        nombre: 'Alejandro',
        apellidos: 'Paz Carrasco',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 130,
        usuario: 'Silvia Rosa', //----------------------------Contenidos--------------------------//
        nombre: 'Silvia Rosa',
        apellidos: 'Cortes Pasten',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 131,
        usuario: 'Cristian Armando', //----------------------------Audio--------------------------//
        nombre: 'Cristian Armando',
        apellidos: 'Sanchez Olguin',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 132,
        usuario: 'Romualdo', //----------------------------Audio--------------------------//
        nombre: 'Romualdo',
        apellidos: 'Sanchez Jurado',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 133,
        usuario: 'Enrique', //----------------------------Audio--------------------------//
        nombre: 'Enrique',
        apellidos: 'Ponce',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 134,
        usuario: 'Ricardo Jesus', //----------------------------Audio--------------------------//
        nombre: 'Ricardo Jesus',
        apellidos: 'Rodriguez Herrera',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 135,
        usuario: 'Luis Angel', //----------------------------Camarográfo--------------------------//
        nombre: 'Luis Angel',
        apellidos: 'Romero Jimenez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 136,
        usuario: 'AlejandroQ', //----------------------------Camarográfo--------------------------//
        nombre: 'Alejandro',
        apellidos: 'Castañeda Quitero',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 137,
         usuario: 'Juan Manuel', //----------------------------Camarográfo--------------------------//
        nombre: 'Juan Manuel',
        apellidos: 'Gomez Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 138,
        usuario: 'Crystian Alexis', //----------------------------Camarográfo--------------------------//
        nombre: 'Crystian Alexis',
        apellidos: 'Razgado Garcia',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 139,
        usuario: 'Luis Alberto', //----------------------------Camarográfo--------------------------//
        nombre: 'Luis Alberto',
        apellidos: 'Martinez Chavez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 140,
        usuario: 'JoelG', //----------------------------Camarográfo--------------------------//
        nombre: 'Joel',
        apellidos: 'Spargo Gonzalez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 141,
         usuario: 'Oscar Alberto', //----------------------------Camarográfo--------------------------//
        nombre: 'Oscar Alberto',
        apellidos: 'Hernandez Meneses',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 142,
         usuario: 'Benjamin', //----------------------------Camarográfo--------------------------//
        nombre: 'Benjamin',
        apellidos: 'Ramos Aldana',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 143,
         usuario: 'Aldo', //----------------------------Camarográfo--------------------------//
        nombre: 'Aldo',
        apellidos: 'Polvo Lopez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 144,
         usuario: 'Rocio Carolina', //----------------------------Produccion--------------------------//
        nombre: 'Rocio Carolina',
        apellidos: 'Rivera Martinez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 145,
         usuario: 'Jesus', //----------------------------Produccion--------------------------//
        nombre: 'Jesus',
        apellidos: 'Ramirez Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 146,
        usuario: 'Raul', //----------------------------Deportes--------------------------//
        nombre: 'Raul',
        apellidos: 'Bautista Ibarra',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 147,
        usuario: 'Jose Alberto', //----------------------------Deportes--------------------------//
        nombre: 'Jose Alberto',
        apellidos: 'Perez Hernandez Lara',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 148,
        usuario: 'Erick Daniel', //----------------------------Deportes--------------------------//
        nombre: 'Erick Daniel',
        apellidos: 'Paredes Lopez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 149,
        usuario: 'Santiago', //----------------------------Coordinador de Staff------------------------//
        nombre: 'Santiago',
        apellidos: 'Mejia Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 150,
        usuario: 'German', //----------------------------Escenografia--------------------------//
        nombre: 'German',
        apellidos: 'Herrera Castillo',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 151,
        usuario: 'Salvador', //----------------------------Escenografia--------------------------//
        nombre: 'Salvador',
        apellidos: 'Alejandre Maldonado',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 152,
        usuario: 'ClementeE', //----------------------------Escenografia--------------------------//
        nombre: 'Clemente',
        apellidos: 'Alcantara Estrada',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 153,
        usuario: 'Ignacio Aristeo', //----------------------------Escenografia--------------------------//
        nombre: 'Ignacio Aristeo',
        apellidos: 'Lopez Lopez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 154,
        usuario: 'Josue Eddgar', //----------------------------Edición--------------------------//
        nombre: 'Josue Eddgar',
        apellidos: 'Melo Sandoval',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 155,
         usuario: 'Marco Antonio', //----------------------------Iluminación--------------------------//
        nombre: 'Marco Antonio',
        apellidos: 'Acosta Flores',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 156,
         usuario: 'Jose Ignacio', //----------------------------Iluminación--------------------------//
        nombre: 'Jose Ignacio',
        apellidos: 'Galvan Bocanegra',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 157,
         usuario: 'Anderson', //----------------------------Iluminación--------------------------//
        nombre: 'Anderson',
        apellidos: 'Hernandez Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 158,
         usuario: 'Gerardo', //----------------------------Imagen--------------------------//
        nombre: 'Gerardo',
        apellidos: 'Guasso Gonzalez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 159,
         usuario: 'Juan Jose', //----------------------------Imagen--------------------------//
        nombre: 'Juan Jose',
        apellidos: 'Sanchez Lopez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 160,
        usuario: 'Maria Magdalena', //----------------------------Maquillista--------------------------//
        nombre: 'Maria Magdalena',
        apellidos: 'Diaz Benitez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 161,
         usuario: 'Jesus Angel', //----------------------------Master--------------------------//
        nombre: 'Jesus Angel',
        apellidos: 'Vargas Flores',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 162,
        usuario: 'Judith Alejandra', //----------------------------Master--------------------------//
        nombre: 'Judith Alejandra',
        apellidos: 'Bernardino Cruz',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 163,
        usuario: 'Juan Alberto', //----------------------------Master--------------------------//
        nombre: 'Juan Alberto',
        apellidos: 'Acosta Flores',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 164,
        usuario: 'Leopoldo', //----------------------------Master--------------------------//
        nombre: 'Leopoldo',
        apellidos: 'Juarez Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 165,
        usuario: 'Leslie Shanik', //----------------------------Switcher--------------------------//
        nombre: 'Leslie Shanik',
        apellidos: 'Cabrera Lopez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 166,
        usuario: 'Enrique Roman', //----------------------------Switcher--------------------------//
        nombre: 'Enrique Roman',
        apellidos: 'Monroy Ruiz',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 167,
        usuario: 'Ana Gabriela', //----------------------------Titulador--------------------------//
        nombre: 'Ana Gabriela',
        apellidos: 'Gomez Soto',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 168,
        usuario: 'Alejandra', //----------------------------Titulador--------------------------//
        nombre: 'Alejandra',
        apellidos: 'Pineda Espinoza',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 169,
        usuario: 'Estephania Sarahi', //----------------------------Titulador--------------------------//
        nombre: 'Estephania Sarahi',
        apellidos: 'Cruz Muñoz',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 170,
        usuario: 'Alba Johana', //----------------------------Videoteca--------------------------//
        nombre: 'Alba Johana',
        apellidos: 'Reyes Gutierrez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 171,
        usuario: 'Alberto Carlos', //----------------------------Videoteca--------------------------//
        nombre: 'Alberto Carlos',
        apellidos: 'Echavarri Ayala',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 172,
        usuario: 'Ruben Eduardo', //----------------------------Videoteca--------------------------//
        nombre: 'Ruben Eduardo',
        apellidos: 'Perez Anaya',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 173,
        usuario: 'Areli', //----------------------------Play-Out--------------------------//
        nombre: 'Areli',
        apellidos: 'Cruz Sosa',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 174,
         usuario: 'Carlos AlbertoI', //----------------------------Play-Out--------------------------//
        nombre: 'Carlos Alberto',
        apellidos: 'Henandez Ibarra',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 175,
        usuario: 'Ariana', //----------------------------Dirección de Vinculación--------------------------//
        nombre: 'Ariana',
        apellidos: 'Flores Gomez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 176,
        usuario: 'Milton', //----------------------------Dirección de Vinculación--------------------------//
        nombre: 'Milton',
        apellidos: 'Pelcastre Rubio',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 177,
        usuario: 'KarinaN', //----------------------------Dirección de Vinculación--------------------------//
        nombre: 'Karina',
        apellidos: 'Sanchez Nochebuena',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 178,
        usuario: 'Angel', //----------------------------Dirección de Vinculación--------------------------//
        nombre: 'Angel',
        apellidos: 'Ventura Lopez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 179,
        usuario: 'Martha Adriana', //----------------------------Dirección de Vinculación--------------------------//
        nombre: 'Martha Adriana',
        apellidos: 'Martinez Retama',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 180,
        usuario: 'Alan', //----------------------------Dirección-General--------------------------//
        nombre: 'Alan',
        apellidos: 'Austria Anaya',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 181,
        usuario: 'Adrian Rodrigo', //----------------------------Dirección-General--------------------------//
        nombre: 'Adrian Rodrigo',
        apellidos: 'Jimenez Perez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 182,
        usuario: 'Jesus Martin', //----------------------------Dirección-General--------------------------//
        nombre: 'Jesus Martin',
        apellidos: 'Galvan Ramos',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 183,
        usuario: 'Adriana Gabriela', //----------------------------Dirección-General--------------------------//
        nombre: 'Adriana Gabriela',
        apellidos: 'Cruz Sosa',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 184,
        usuario: 'RicardoV', //----------------------------Dirección-Juridica--------------------------//
        nombre: 'Ricardo',
        apellidos: 'Gonzalez Valencia',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 185,
        usuario: 'Mirna', //----------------------------Dirección-Juridica--------------------------//
        nombre: 'Mirna',
        apellidos: 'Samperio Gomez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 186,
        usuario: 'Maria Deyanira', //----------------------------Dirección-Juridica--------------------------//
        nombre: 'Maria Deyanira',
        apellidos: 'Chavez Maldonado',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 187,
        usuario: 'Job', //----------------------------Dirección-Juridica--------------------------//
        nombre: 'Job',
        apellidos: 'Licona Martinez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 188,
        usuario: 'Mario Felix', //----------------------------Comisionado Subsecretaría De Protección Civil Y Gestión De Riesgos--------------------------//
        nombre: 'Mario Felix',
        apellidos: 'Castillo Granillo',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 189,
        usuario: 'Felipe Fernando', //----------------------------Servicios-Generales--------------------------//
        nombre: 'Felipe Fernando',
        apellidos: 'Rodriguez Lopez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 190,
        usuario: 'Jose', //----------------------------Archivo y Servicios Generales--------------------------//
        nombre: 'Jose',
        apellidos: 'Hernandez Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 191,
        usuario: 'Cesar Alberto', //----------------------------Direccion de Proyectos Estrategicos--------------------------//
        nombre: 'Cesar Alberto',
        apellidos: 'Cravioto Aguirre',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 192,
        usuario: 'Eddert Yonn', //----------------------------Coordinador Personal Cerros de Tx--------------------------//
        nombre: 'Eddert Yonn',
        apellidos: 'Hernandez Ricaño',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 193,
        usuario: 'Frida Elizabeth', //----------------------------Reporteros--------------------------//
        nombre: 'Frida Elizabeth',
        apellidos: 'Maya Guzman',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 194,
        usuario: 'Hector', //----------------------------Mantenimientos y Tx. De Futbol y Eventos Especiales--------------------------//
        nombre: 'Hector',
        apellidos: 'Fuentes Cervantes',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 195,
        usuario: 'Brenda', //----------------------------Conductora--------------------------//
        nombre: 'Brenda',
        apellidos: 'Monzalvo Uribe',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 196,
        usuario: 'ElizabethG', //----------------------------Conductora--------------------------//
        nombre: 'Elizabeth',
        apellidos: 'Patiño Gonzalez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 197,
        usuario: 'Claudia Guadalupe', //----------------------------Conductora--------------------------//
        nombre: 'Claudia Guadalupe',
        apellidos: 'Jimenez Cruz',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 198,
        usuario: 'Maura Alejandra Rosario', //----------------------------Conductora--------------------------//
        nombre: 'Maura Alejandra Rosario',
        apellidos: 'del Rio Calderon',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 199,
        usuario: 'Luis EnriqueD', //----------------------------Edición--------------------------//
        nombre: 'Luis Enrique',
        apellidos: 'Gonzalez Duran',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 200,
        usuario: 'Edgar Fernando', //----------------------------Escengrafo--------------------------//
        nombre: 'Edgar Fernando',
        apellidos: 'Olguin Gonzalez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 201,
        usuario: 'Daniela Itzamar', //----------------------------Imagen--------------------------//
        nombre: 'Daniela Itzamar',
        apellidos: 'Gonzalez Alvidrez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 202,
        usuario: 'Blanca Guadalupe', //----------------------------Master--------------------------//
        nombre: 'Blanca Guadalupe',
        apellidos: 'Lopez Gonzalez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 203,
        usuario: 'GerardoM', //----------------------------Producción--------------------------//
        nombre: 'Gerardo',
        apellidos: 'Islas Muñoz',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 204,
        usuario: 'Luis Manuel', //----------------------------Producción y Conductor --------------------------//
        nombre: 'Luis Manuel',
        apellidos: 'Garcia Aguirre',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 205,
        usuario: 'Christian Alejandro', //----------------------------Producción y Conductor --------------------------//
        nombre: 'Christian Alejandro',
        apellidos: 'Leines del Castillo',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 206,
        usuario: 'GerardoO', //----------------------------Producción y Conductor --------------------------//
        nombre: 'Gerardo',
        apellidos: 'Castillo Osorio',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 207,
        usuario: 'Gabriela del Mar', //----------------------------Producción y Conductor --------------------------//
        nombre: 'Gabriela del Mar',
        apellidos: 'Diaz Enriquez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 208,
        usuario: 'Maria Isabel', //----------------------------Videoteca--------------------------//
        nombre: 'Maria Isabel',
        apellidos: 'Santillan Montiel',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 209,
        usuario: 'Yazmin Sarahi', //----------------------------Dirección de Televisión--------------------------//
        nombre: 'Yazmin Sarahi',
        apellidos: 'Esparza Hernandez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 210,
        usuario: 'Irene Esperanza', //----------------------------Recepción--------------------------//
        nombre: 'Irene Esperanza',
        apellidos: 'Rodriguez Altamirano',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 211,
        usuario: 'Sebastian', //----------------------------Producción--------------------------//
        nombre: 'Sebastian',
        apellidos: 'Guarneros Dominguez',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 212,
        usuario: 'Silvia Maryne', //----------------------------Direccion de Contraloria--------------------------//
        nombre: 'Silvia Maryne',
        apellidos: 'Salinas Argumedo',
        empleado_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
