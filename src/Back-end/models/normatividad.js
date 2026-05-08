module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Normatividad', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    tipo: DataTypes.STRING,
    version: DataTypes.STRING,
    fecha_publicacion: DataTypes.DATEONLY,
    estatus: { type: DataTypes.ENUM('activa', 'inactiva'), defaultValue: 'activa' },
    archivo_pdf: DataTypes.STRING,
  }, { tableName: 'normatividades' });
};
