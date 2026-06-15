'use strict';

module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define('Empleado', {
    nombre: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    apellidos: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    curp: { 
      type: DataTypes.STRING(18), 
      unique: true,
      allowNull: true
    },
    rfc: { 
      type: DataTypes.STRING(13),
      allowNull: true
    },
    nss: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    grado_de_estudios: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tipo_Sanguineo: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    fecha_ingreso: { 
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    tipo_contrato: { 
      type: DataTypes.ENUM('honorarios', 'funcionarios', 'confianza', 'base', 'indefinido'), // Con mayúsculas como tu migración
      allowNull: true
    },
    estatus: { 
      type: DataTypes.ENUM('activo', 'baja'), 
      allowNull: false,
      defaultValue: 'activo' 
    },
    direccion_id: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    departamento_id: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    puesto_id: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jefe_directo_id: { 
      type: DataTypes.INTEGER,
      allowNull: true
    },
    clabe_bancaria: { // Corregido de 'clabe' a 'clabe_bancaria' para que coincida con tu tabla
      type: DataTypes.STRING,
      allowNull: true
    },
    contacto_nombre: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    contacto_parentesco: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    contacto_telefono: { 
      type: DataTypes.STRING,
      allowNull: true
    },
    fecha_baja: { 
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    documento_baja: { 
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'empleados',
    timestamps: true // Tu migración cuenta con createdAt y updatedAt obligatorios
  });

  Empleado.associate = (models) => {
    Empleado.belongsTo(models.Departamento, { foreignKey: 'departamento_id', as: 'departamento' });
    Empleado.belongsTo(models.Direccion, { foreignKey: 'direccion_id', as: 'direccion_de_empleado' }); // <-- Alias cambiado para evitar colisiones
    Empleado.belongsTo(models.Puesto, { foreignKey: 'puesto_id', as: 'puesto' });
    Empleado.belongsTo(models.Empleado, { foreignKey: 'jefe_directo_id', as: 'jefe' });
    
    // Tus otras relaciones se mantienen intactas
    Empleado.hasMany(models.EmpleadoDocumento, { foreignKey: 'empleado_id', as: 'documentos' });
    Empleado.hasMany(models.HistorialPuesto, { foreignKey: 'empleado_id', as: 'historial' });
    Empleado.hasMany(models.Incidencia, { foreignKey: 'empleado_id', as: 'incidencias' });
    Empleado.hasMany(models.Solicitud, { foreignKey: 'empleado_id', as: 'solicitudes' });
    Empleado.hasOne(models.Usuario, { foreignKey: 'empleado_id', as: 'usuario' });
  };

  return Empleado;
};