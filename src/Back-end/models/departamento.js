module.exports = (sequelize, DataTypes) => {
  const Departamento = sequelize.define('Departamento', {
    nombre: { type: DataTypes.STRING(100), allowNull: false },

  }, {
    tableName: 'departamentos',
  });

  Departamento.associate = (models) => {

    //   Un Departamento TIENE MUCHOS Empleados.
    // La foreignKey en el destino debe ser 'departamento_id' (la columna que vive dentro de la tabla empleados).
    if (models.Empleado) {
      Departamento.hasMany(models.Empleado, { 
        foreignKey: 'departamento_id', 
        as: 'empleados' 
      });
    }

    //   Un Departamento TIENE MUCHOS Puestos.
    // La foreignKey en el destino debe ser 'departamento_id' (dentro de la tabla puestos).
    if (models.Puesto) {
      Departamento.hasMany(models.Puesto, { 
        foreignKey: 'departamento_id', 
        as: 'puestos' 
      });
    }

    //   Un Departamento TIENE MUCHAS Vacantes.
    if (models.Vacante) {
      Departamento.hasMany(models.Vacante, { 
        foreignKey: 'departamento_id', 
        as: 'vacantes' 
      });
    }

    //   Un Departamento TIENE MUCHOS Comunicados.
    if (models.Comunicado) {
      Departamento.hasMany(models.Comunicado, { 
        foreignKey: 'departamento_id', 
        as: 'comunicados' 
      });
    }
  };

  return Departamento;
};