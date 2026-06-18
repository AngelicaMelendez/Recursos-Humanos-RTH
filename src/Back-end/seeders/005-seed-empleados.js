'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const empleados = [
      {

        id: 1,
        usuario: 'Marina', //----------------------------Contraloría-----------------------------//
        nombre: 'Marina',
        apellidos: 'Callejas Alamilla',
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
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
        usuario_id: null,
        rol: 'empleado',
        password_hash: '$2a$12$B379B.n8PvCusWrRejO3N./oASsiclqb5BqrFz/Ww7PzhhoMmtH86', // Otro hash de ejemplo
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    const columnasEmpleados = [
      'id',
      'nombre',
      'apellidos',
      'curp',
      'usuario_id',
      'rfc',
      'nss',
      'grado_de_estudios',
      'tipo_Sanguineo',
      'fecha_ingreso',
      'tipo_contrato',
      'estatus',
      'direccion_id',
      'departamento_id',
      'puesto_id',
      'jefe_directo_id',
      'clabe_bancaria',
      'contacto_nombre',
      'contacto_parentesco',
      'contacto_telefono',
      'fecha_baja',
      'motivo_baja',
      'documento_baja',
      'createdAt',
      'updatedAt',
    ];

    const empleadosNormalizados = empleados.map((empleado) => {
      const normalizado = {};
      for (const columna of columnasEmpleados) {
        if (Object.prototype.hasOwnProperty.call(empleado, columna)) {
          normalizado[columna] = empleado[columna];
        }
      }
      normalizado.estatus = normalizado.estatus || 'activo';
      normalizado.createdAt = normalizado.createdAt || new Date();
      normalizado.updatedAt = normalizado.updatedAt || new Date();
      return normalizado;
    });

    await queryInterface.bulkInsert('empleados', empleadosNormalizados, {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empleados', null, {});
  }
};
