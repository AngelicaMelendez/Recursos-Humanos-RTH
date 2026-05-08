module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    area_padre_id: { type: DataTypes.INTEGER }, // self-reference
  }, { tableName: 'areas' });

  Area.associate = (models) => {
    Area.belongsTo(models.Area, { foreignKey: 'area_padre_id', as: 'padre' });
    Area.hasMany(models.Area, { foreignKey: 'area_padre_id', as: 'subareas' });
    Area.hasMany(models.Empleado, { foreignKey: 'area_id', as: 'empleados' });
  };

  return Area;
};