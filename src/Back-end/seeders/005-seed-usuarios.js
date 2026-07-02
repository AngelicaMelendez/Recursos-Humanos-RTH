'use strict';

const DEFAULT_PASSWORD_HASH = '$2b$10$86Pz62YxtAfz3wlE9ZT0WOvFOnAD6V2HvdWnVVTBowVh6G/tGGsHK';

module.exports = {
  async up (queryInterface, Sequelize) {
    const usuarios = [
      {
        id: 1,
        usuario: 'Marina12',
        empleado_id: 1,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        usuario: 'MariaA13',
        empleado_id: 2,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        usuario: 'EdgardJ',
        empleado_id: 3,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        usuario: 'CinthyaI',
        empleado_id: 4,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        usuario: 'WendyVal',
        empleado_id: 5,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        usuario: 'MariaDLA',
        empleado_id: 6,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        usuario: 'CarlosA1',
        empleado_id: 7,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        usuario: 'DanielaCJ',
        empleado_id: 8,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        usuario: 'MariadP',
        empleado_id: 9,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
        usuario: 'JohanannCA',
        empleado_id: 10,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 11,
        usuario: 'AliciaRM',
        empleado_id: 11,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 12,
        usuario: 'LuzEVL',
        empleado_id: 12,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 13,
        usuario: 'JoelACB',
        empleado_id: 13,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        id: 14,
        usuario: 'OmarEVM',
        empleado_id: 14,
        rol: 'super_usuario',
        password_hash: DEFAULT_PASSWORD_HASH,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 15,
        usuario: 'AxelAA',
        empleado_id: 15,
        rol: 'super_usuario',
        password_hash: DEFAULT_PASSWORD_HASH,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 16,
        usuario: 'AngelicaML',
        empleado_id: 16,
        rol: 'super_usuario',
        password_hash: DEFAULT_PASSWORD_HASH,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 17,
        usuario: 'IvanMA',
        empleado_id: 17,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 18,
        usuario: 'JoseDPC',
        empleado_id: 18,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 19,
        usuario: 'MariaDLPAZ',
        empleado_id: 19,
        rol: 'empleado',
        password_hash: null,
        documento_baja: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 20,
        usuario: 'JorgeEFG',
        empleado_id: 20,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 21,
        usuario: 'LorenaBS',
        empleado_id: 21,
        rol: 'recursos_humanos',
        password_hash: DEFAULT_PASSWORD_HASH,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 22,
        usuario: 'MaribelLR',
        empleado_id: 22,
        rol: 'recursos_humanos',
        password_hash: DEFAULT_PASSWORD_HASH,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 23,
        usuario: 'AriadnaART',
        empleado_id: 23,
        rol: 'recursos_humanos',
        password_hash: DEFAULT_PASSWORD_HASH,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 24,
        usuario: 'RobertoED',
        empleado_id: 24,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 25,
        usuario: 'OscarIS',
        empleado_id: 25,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 26,
        usuario: 'AmparoLM',
        empleado_id: 26,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 27,
        usuario: 'MariaLAP',
        empleado_id: 27,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 28,
        usuario: 'AntonioJH',
        empleado_id: 28,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 29,
        usuario: 'MariaER',
        empleado_id: 29,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 30,
        usuario: 'VictorMGG',
        empleado_id: 30,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 31,
        usuario: 'EnriqueMAM',
        empleado_id: 31,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 32,
        usuario: 'FernandoHC',
        empleado_id: 32,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 33,
        usuario: 'JavierZM',
        empleado_id: 33,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 34,
        usuario: 'GuillermoVQ',
        empleado_id: 34,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 35,
        usuario: 'JonathanDGV',
        empleado_id: 35,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 36,
        usuario: 'MiguelSG',
        empleado_id: 36,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 37,
        usuario: 'DavidCH',
        empleado_id: 37,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 38,
        usuario: 'IvanEAC',
        empleado_id: 38,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 39,
        usuario: 'AlejandroBG',
        empleado_id: 39,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 40,
        usuario: 'HectorJSC',
        empleado_id: 40,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 41,
        usuario: 'YadiradelROL',
        empleado_id: 41,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 42,
        usuario: 'DianaFB',
        empleado_id: 42,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 43,
        usuario: 'JoseABC',
        empleado_id: 43,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 44,
        usuario: 'FlorencioGT',
        empleado_id: 44,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 45,
        usuario: 'JavierGT',
        empleado_id: 45,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 46,
        usuario: 'JoseJFG',
        empleado_id: 46,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 47,
        usuario: 'ArturoOTP',
        empleado_id: 47,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 48,
        usuario: 'JonatanEF',
        empleado_id: 48,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 49,
        usuario: 'LuisVL',
        empleado_id: 49,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 50,
        usuario: 'ClementeLH',
        empleado_id: 50,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 51,
        usuario: 'SabasLH',
        empleado_id: 51,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 52,
        usuario: 'MarioHE',
        empleado_id: 52,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 53,
        usuario: 'GregorioOJ',
        empleado_id: 53,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 54,
        usuario: 'ErikAN',
        empleado_id: 54,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 55,
        usuario: 'KeobelRRL',
        empleado_id: 55,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 56,
        usuario: 'KarinaAP',
        empleado_id: 56,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 57,
        usuario: 'MaraLOH',
        empleado_id: 57,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 58,
        usuario: 'UrielRV',
        empleado_id: 58,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 59,
        usuario: 'CitlallyIVG',
        empleado_id: 59,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 60,
        usuario: 'BriandaYGR',
        empleado_id: 60,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 61,
        usuario: 'VictorOCV',
        empleado_id: 61,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 62,
        usuario: 'JoseLOO',
        empleado_id: 62,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 63,
        usuario: 'FernandoLV',
        empleado_id: 63,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 64,
        usuario: 'DaniloABA',
        empleado_id: 64,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 65,
        usuario: 'LucioTM',
        empleado_id: 65,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 66,
        usuario: 'AlejandroJP',
        empleado_id: 66,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 67,
        usuario: 'IvanCP',
        empleado_id: 67,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 68,
        usuario: 'ChristianCI',
        empleado_id: 68,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 69,
        usuario: 'YazminAQH',
        empleado_id: 69,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 70,
        usuario: 'VianeyJP',
        empleado_id: 70,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 71,
        usuario: 'LuisEMO',
        empleado_id: 71,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 72,
        usuario: 'MariadlpRG',
        empleado_id: 72,
        rol: 'empleado',
        password_hash: null,
        documento_baja: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 73,
        usuario: 'FlorIHH',
        empleado_id: 73,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 74,
        usuario: 'JuanOBC',
        empleado_id: 74,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 75,
        usuario: 'GustavoGS',
        empleado_id: 75,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 76,
        usuario: 'AngelicaPA',
        empleado_id: 76,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 77,
        usuario: 'MarinaBC',
        empleado_id: 77,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 78,
        usuario: 'DavidLS',
        empleado_id: 78,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 79,
        usuario: 'AndresTA',
        empleado_id: 79,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 80,
        usuario: 'JuanAGY',
        empleado_id: 80,
        rol: 'empleado',
        password_hash: null,
        documento_baja: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 81,
        usuario: 'KarinaZMV',
        empleado_id: 81,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 82,
        usuario: 'EdgarMMS',
        empleado_id: 82,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 83,
        usuario: 'VaniaAGP',
        empleado_id: 83,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 84,
        usuario: 'GiselleMA',
        empleado_id: 84,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 85,
        usuario: 'LeonardoSOC',
        empleado_id: 85,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 86,
        usuario: 'MarioATN',
        empleado_id: 86,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 87,
        usuario: 'AldoEFJ',
        empleado_id: 87,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 88,
        usuario: 'JazminFJ',
        empleado_id: 88,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 89,
        usuario: 'BelindaSPR',
        empleado_id: 89,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 90,
        usuario: 'JuanCGT',
        empleado_id: 90,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 91,
        usuario: 'NicolasMM',
        empleado_id: 91,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 92,
        usuario: 'JulioFMH',
        empleado_id: 92,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 93,
        usuario: 'FranciscoEP',
        empleado_id: 93,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 94,
        usuario: 'MariceldaBG',
        empleado_id: 94,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 95,
        usuario: 'EldaNBR',
        empleado_id: 95,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 96,
        usuario: 'DelfinoSJH',
        empleado_id: 96,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 97,
        usuario: 'JessicaRV',
        empleado_id: 97,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 98,
        usuario: 'MariaFMH',
        empleado_id: 98,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 99,
        usuario: 'JoelVP',
        empleado_id: 99,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 100,
        usuario: 'ElizabethRC',
        empleado_id: 100,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 101,
        usuario: 'WendySC',
        empleado_id: 101,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 102,
        usuario: 'AdolfoOM',
        empleado_id: 102,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 103,
        usuario: 'RobertoGF',
        empleado_id: 103,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 104,
        usuario: 'MarcelaGR',
        empleado_id: 104,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 105,
        usuario: 'Ma de la LuzGM',
        empleado_id: 105,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 106,
        usuario: 'LeonidesLH',
        empleado_id: 106,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 107,
        usuario: 'FabiolaEPI',
        empleado_id: 107,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 108,
        usuario: 'LidiaSPG',
        empleado_id: 108,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 109,
        usuario: 'RicardoCM',
        empleado_id: 109,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 110,
        usuario: 'EduardoJPR',
        empleado_id: 110,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 111,
        usuario: 'OscarRM',
        empleado_id: 111,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 112,
        usuario: 'SocorroGT',
        empleado_id: 112,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 113,
        usuario: 'Ma Cristina HV',
        empleado_id: 113,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 114,
        usuario: 'RicardoJOM',
        empleado_id: 114,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 115,
        usuario: 'PatriciaET',
        empleado_id: 115,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 116,
        usuario: 'AuroraRR',
        empleado_id: 116,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 117,
        usuario: 'LeticiaPC',
        empleado_id: 117,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 118,
        usuario: 'IvetteEH',
        empleado_id: 118,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 119,
        usuario: 'HugoGC',
        empleado_id: 119,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 120,
        usuario: 'Astrid Minelli',
        empleado_id: 120,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 121,
        usuario: 'IvetteAGM',
        empleado_id: 121,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 122,
        usuario: 'GabrielPR',
        empleado_id: 122,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 123,
        usuario: 'AnabellyEA',
        empleado_id: 123,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 124,
        usuario: 'JoseOAG',
        empleado_id: 124,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 125,
        usuario: 'SaulGA',
        empleado_id: 125,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 126,
        usuario: 'SaulLP',
        empleado_id: 126,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 127,
        usuario: 'LorenaERR',
        empleado_id: 127,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 128,
        usuario: 'Maria del ConsueloCB',
        empleado_id: 128,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 129,
        usuario: 'OmarAPC',
        empleado_id: 129,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 130,
        usuario: 'SilviaRCP',
        empleado_id: 130,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 131,
        usuario: 'CristianASO',
        empleado_id: 131,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 132,
        usuario: 'RomualdoSJ',
        empleado_id: 132,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 133,
        usuario: 'EnriqueP133',
        empleado_id: 133,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 134,
        usuario: 'RicardoJRH',
        empleado_id: 134,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 135,
        usuario: 'LuisARJ',
        empleado_id: 135,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 136,
        usuario: 'AlejandroCQ',
        empleado_id: 136,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 137,
        usuario: 'JuanMGH',
        empleado_id: 137,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 138,
        usuario: 'CrystianARG',
        empleado_id: 138,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 139,
        usuario: 'LuisAMC',
        empleado_id: 139,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 140,
        usuario: 'JoelSG',
        empleado_id: 140,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 141,
        usuario: 'OscarAHM',
        empleado_id: 141,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 142,
        usuario: 'BenjaminRA',
        empleado_id: 142,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 143,
        usuario: 'AldoPL',
        empleado_id: 143,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 144,
        usuario: 'RocioCRM',
        empleado_id: 144,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 145,
        usuario: 'JesusRH',
        empleado_id: 145,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 146,
        usuario: 'RaulBI',
        empleado_id: 146,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 147,
        usuario: 'JoseAPHL',
        empleado_id: 147,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 148,
        usuario: 'ErickDPL',
        empleado_id: 148,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 149,
        usuario: 'SantiagoMH',
        empleado_id: 149,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 150,
        usuario: 'GemanHC',
        empleado_id: 150,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 151,
        usuario: 'SalvadorAM',
        empleado_id: 151,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 152,
        usuario: 'ClementeAE',
        empleado_id: 152,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 153,
        usuario: 'GustavoGS',
        empleado_id: 153,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 154,
        usuario: 'JosueEMS',
        empleado_id: 154,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 155,
        usuario: 'MarcoAAF',
        empleado_id: 155,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 156,
        usuario: 'JoseIGB',
        empleado_id: 156,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 157,
        usuario: 'AndersonHH',
        empleado_id: 157,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 158,
        usuario: 'GerardoGG',
        empleado_id: 158,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 159,
        usuario: 'JuanJSL',
        empleado_id: 159,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 160,
        usuario: 'MariaMDB',
        empleado_id: 160,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 161,
        usuario: 'JesusAVF',
        empleado_id: 161,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 162,
        usuario: 'JudithABC',
        empleado_id: 162,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 163,
        usuario: 'JuanAAF',
        empleado_id: 163,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 164,
        usuario: 'LeopoldoJH',
        empleado_id: 164,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 165,
        usuario: 'LeslieSCL',
        empleado_id: 165,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 166,
        usuario: 'EnriqueRMR',
        empleado_id: 166,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 167,
        usuario: 'AnaGGS',
        empleado_id: 167,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 168,
        usuario: 'AlejandroPE',
        empleado_id: 168,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 169,
        usuario: 'EstephaniaSCM',
        empleado_id: 169,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 170,
        usuario: 'AlbaJRG',
        empleado_id: 170,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 171,
        usuario: 'AlbertoCEA',
        empleado_id: 171,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 172,
        usuario: 'RubenEPA',
        empleado_id: 172,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 173,
        usuario: 'AreliCS',
        empleado_id: 173,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 174,
        usuario: 'CarlosAHI',
        empleado_id: 174,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 175,
        usuario: 'ArianaFG',
        empleado_id: 158,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 176,
        usuario: 'MiltonPR',
        empleado_id: 176,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 177,
        usuario: 'KarinaSN',
        empleado_id: 177,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 178,
        usuario: 'AngelVL',
        empleado_id: 178,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 179,
        usuario: 'MarthaAMR',
        empleado_id: 179,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 180,
        usuario: 'AlanAA',
        empleado_id: 180,
        rol: 'Director',
        password_hash: DEFAULT_PASSWORD_HASH,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 181,
        usuario: 'AdrianRJP',
        empleado_id: 181,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 182,
        usuario: 'JesusMGR',
        empleado_id: 158,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 183,
        usuario: 'AdrianaGCS',
        empleado_id: 183,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 184,
        usuario: 'RicardoGV',
        empleado_id: 184,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 185,
        usuario: 'MirnaSG',
        empleado_id: 185,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 186,
        usuario: 'MariaDCM',
        empleado_id: 186,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 187,
       usuario: 'JobLM',
        empleado_id: 187,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 188,
        usuario: 'MarioFCG',
        empleado_id: 188,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 189,
        usuario: 'FelipeFRL',
        empleado_id: 189,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 190,
        usuario: 'JoseHH',
        empleado_id: 190,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 191,
        usuario: 'GerardoGG',
        empleado_id: 191,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 192,
        usuario: 'EddertYHR',
        empleado_id: 192,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 193,
        usuario: 'FridaEMG',
        empleado_id: 193,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 194,
        usuario: 'HectorFC',
        empleado_id: 194,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 195,
        usuario: 'BrendaMU',
        empleado_id: 195,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 196,
        usuario: 'GerardoGG',
        empleado_id: 196,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 197,
        usuario: 'ClaudiaGJC',
        empleado_id: 197,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 198,
        usuario: 'MauraARdelRC',
        empleado_id: 198,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 199,
        usuario: 'LuisEGD',
        empleado_id: 199,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 200,
        usuario: 'EdgarFOG',
        empleado_id: 200,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 201,
        usuario: 'DanielaIGA',
        empleado_id: 158,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 202,
        usuario: 'BlancaGLG',
        empleado_id: 202,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 203,
        usuario: 'GerardoIM',
        empleado_id: 203,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 204,
        usuario: 'LuisMGA',
        empleado_id: 204,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 205,
        usuario: 'ChristianALdelC',
        empleado_id: 205,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 206,
        usuario: 'ElverthCO',
        empleado_id: 206,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 207,
        usuario: 'Gabriela del Mar,DE',
        empleado_id: 158,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 208,
        usuario: 'MariaISM',
        empleado_id: 208,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 209,
        usuario: 'YazminSEH',
        empleado_id: 209,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 210,
        usuario: 'IreneERA',
        empleado_id: 158,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 211,
        usuario: 'SebastianGD',
        empleado_id: 211,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 212,
        usuario: 'SilviaMSA',
        empleado_id: 212,
        rol: 'empleado',
        password_hash: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    const columnasUsuarios = [
      'id',
      'usuario',
      'empleado_id',
      'rol',
      'password_hash',
      'createdAt',
      'updatedAt',
    ];

    const empleadosNormalizados = usuarios.map((usuario) => {
      const normalizado = {};
      for (const columna of columnasUsuarios) {
        if (Object.prototype.hasOwnProperty.call(usuario, columna)) {
          normalizado[columna] = usuario[columna];
        }
      }
      normalizado.createdAt = normalizado.createdAt || new Date();
      normalizado.updatedAt = normalizado.updatedAt || new Date();
      return normalizado;
    });

    await queryInterface.bulkInsert('usuarios', empleadosNormalizados, {});
  }, 

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('usuarios', null, {});
  } 
}; 
