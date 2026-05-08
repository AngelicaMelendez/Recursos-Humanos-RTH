module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Log', {
    usuario: DataTypes.STRING,
    accion: DataTypes.STRING,
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    modulo: DataTypes.STRING,
    ip: DataTypes.STRING,
  }, { tableName: 'logs' });
};