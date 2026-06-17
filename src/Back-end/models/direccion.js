module.exports = (sequelize, DataTypes) => {
  const Direccion = sequelize.define('Direccion', {
    nombre: { type: DataTypes.STRING(100), allowNull: false },
  }, {
    tableName: 'direcciones',
  });

  Direccion.associate = (models) => {
    //  1. Una Dirección tiene muchos Departamentos. 
    // La columna 'direccion_id' vive en la tabla de departamentos.
    Direccion.hasMany(models.Departamento, { 
      foreignKey: 'direccion_id', 
      as: 'departamentos' 
    });

    // 💡 2. Si un Comunicado pertenece a una dirección, la columna 'direccion_id' vive en comunicados.
    if (models.Comunicado) {
      Direccion.hasMany(models.Comunicado, { 
        foreignKey: 'direccion_id', 
        as: 'comunicados' 
      });
    }
    
    //  NOTA: Quitamos la relación directa con Empleado, porque quedamos en que 
    // el Empleado ahora pertenece a un Departamento, no a una Dirección directamente.
  };

  return Direccion;
};