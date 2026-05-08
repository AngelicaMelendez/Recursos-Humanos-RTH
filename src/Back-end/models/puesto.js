module.exports = (sequelize, DataTypes) => {
  const Puesto = sequelize.define('Puesto', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    nivel: { type: DataTypes.INTEGER }, // opcional para jerarquía
    area_id: { type: DataTypes.INTEGER },
  }, { tableName: 'puestos' });

  Puesto.associate = (models) => {
    Puesto.belongsTo(models.Area, { foreignKey: 'area_id', as: 'area' });
  };

  return Puesto;
};