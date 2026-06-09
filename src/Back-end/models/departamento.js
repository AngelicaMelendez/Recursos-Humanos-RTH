module.exports = (sequelize, DataTypes) => {
  const Departamento = sequelize.define('Departamento', {
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    direccion_id: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    tableName: 'departamentos',
  });

  Departamento.associate = (models) => {
    Departamento.belongsTo(models.Direccion, { foreignKey: 'direccion_id', as: 'direccion' });
    Departamento.hasMany(models.Empleado, { foreignKey: 'departamento_id', as: 'empleados' });
    Departamento.hasMany(models.Puesto, { foreignKey: 'departamento_id', as: 'puestos' });
    Departamento.hasMany(models.Vacante, { foreignKey: 'departamento_id', as: 'vacantes' });
    Departamento.hasMany(models.Comunicado, { foreignKey: 'departamento_id', as: 'comunicados' });
  };

  return Departamento;
};
