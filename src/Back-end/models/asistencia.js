module.exports = (sequelize, DataTypes) => {
  const Asistencia = sequelize.define('Asistencia', {
    empleado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_entrada: {
      type: DataTypes.TIME,
    },
    hora_salida: {
      type: DataTypes.TIME,
    },
    estatus_entrada: {
      type: DataTypes.ENUM('a_tiempo', 'retardo', 'ausente', 'licencia'),
      defaultValue: 'a_tiempo',
    },
    estatus_salida: {
      type: DataTypes.ENUM('normal', 'temprano', 'tarde', 'sin_registro'),
      defaultValue: 'normal',
    },
    minutos_retardo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    notas: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'asistencias',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['empleado_id', 'fecha'],
      },
    ],
  });

  Asistencia.associate = (models) => {
    Asistencia.belongsTo(models.Empleado, { foreignKey: 'empleado_id', as: 'empleado' });
  };

  return Asistencia;
};
