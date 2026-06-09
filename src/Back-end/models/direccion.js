module.exports = (sequelize, DataTypes) => {
  const Direccion = sequelize.define('Direccion', {
    nombre: { type: DataTypes.STRING(100), allowNull: false },
  }, {
    tableName: 'direcciones',
  });

  Direccion.associate = (models) => {
    Direccion.hasMany(models.Departamento, { foreignKey: 'direccion_id', as: 'departamentos' });
    Direccion.hasMany(models.Empleado, { foreignKey: 'direccion_id', as: 'empleados' });
    Direccion.hasMany(models.Comunicado, { foreignKey: 'direccion_id', as: 'comunicados' });
  };

  return Direccion;
};
