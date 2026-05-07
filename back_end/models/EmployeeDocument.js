import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class EmployeeDocument extends Model {}

  EmployeeDocument.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      empleado_id: { type: DataTypes.INTEGER, allowNull: false },
      tipo_documento: { type: DataTypes.STRING(120), allowNull: false },
      archivo_path: { type: DataTypes.STRING(255), allowNull: false },
      fecha_subida: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
    },
    {
      sequelize,
      modelName: "EmployeeDocument",
      tableName: "empleado_documentos"
    }
  );

  return EmployeeDocument;
};

