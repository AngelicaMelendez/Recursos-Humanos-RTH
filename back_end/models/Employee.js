import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Employee extends Model {}

  Employee.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      numero_empleado: { type: DataTypes.STRING(30), unique: true, allowNull: false },
      nombres: { type: DataTypes.STRING(100), allowNull: false },
      apellidos: { type: DataTypes.STRING(140), allowNull: false },
      email: { type: DataTypes.STRING(120), unique: true, allowNull: false },
      telefono: { type: DataTypes.STRING(30), allowNull: true },
      fecha_ingreso: { type: DataTypes.DATEONLY, allowNull: false },
      fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: true },
      estatus: { type: DataTypes.STRING(40), allowNull: false, defaultValue: "activo" },
      fecha_baja: { type: DataTypes.DATEONLY, allowNull: true },
      motivo_baja: { type: DataTypes.TEXT, allowNull: true },
      documento_baja: { type: DataTypes.STRING(255), allowNull: true },
      puesto_id: { type: DataTypes.INTEGER, allowNull: false },
      jefe_directo_id: { type: DataTypes.INTEGER, allowNull: true }
    },
    {
      sequelize,
      modelName: "Employee",
      tableName: "empleados"
    }
  );

  return Employee;
};

