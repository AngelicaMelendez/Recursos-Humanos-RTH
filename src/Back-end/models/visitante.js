module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Visitante', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellidos: { type: DataTypes.STRING, allowNull: true },
    institucion: DataTypes.STRING,
    motivo: DataTypes.STRING,
    persona_a_visitar: DataTypes.STRING,
    fecha_entrada: DataTypes.DATEONLY,
    hora_entrada: DataTypes.TIME,
    hora_salida: DataTypes.TIME,
    gafete: DataTypes.STRING,
  }, { tableName: 'visitantes' });
};
