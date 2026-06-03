module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    tipo: {
      type: DataTypes.ENUM('direccion', 'departamento'),
      allowNull: false,
      defaultValue: 'departamento',
    },
    area_padre_id: { type: DataTypes.INTEGER }, // self-reference
  }, { tableName: 'areas' });

  Area.associate = (models) => {
    Area.belongsTo(models.Area, { foreignKey: 'area_padre_id', as: 'padre' });
    // (1:1) Un area pertenece a un area padre
    Area.hasMany(models.Area, { foreignKey: 'area_padre_id', as: 'subareas' });
    // (1:N) Un area padre puede tener muchas subareas hijos
    Area.hasMany(models.Empleado, { foreignKey: 'area_id', as: 'empleados' });
    // (1:N) Un area tiene a muchos empleados trabajando en ella
  };
  return Area;
};
