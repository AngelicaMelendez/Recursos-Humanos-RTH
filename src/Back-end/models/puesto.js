module.exports = (sequelize, DataTypes) => {
  const Puesto = sequelize.define('Puesto', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    nivel: { type: DataTypes.STRING(5), allowNull: true }, 
    departamento_id: { type: DataTypes.INTEGER, allowNull: true },
  }, { tableName: 'puestos' });

  Puesto.associate = (models) => {
    //  Un Puesto pertenece a un Departamento (¡Esto ya lo tenías perfecto!)
    Puesto.belongsTo(models.Departamento, { 
      foreignKey: 'departamento_id', 
      as: 'departamento' 
    });

    //  OPCIONAL: Un Puesto puede ser ocupado por muchos Empleados
    if (models.Empleado) {
      Puesto.hasMany(models.Empleado, { 
        foreignKey: 'puesto_id', 
        as: 'empleados' 
      });
    }
  };

  return Puesto;
};