import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class AuditLog extends Model {}

  AuditLog.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      usuario: { type: DataTypes.STRING(150), allowNull: false },
      accion: { type: DataTypes.TEXT, allowNull: false },
      fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      modulo: { type: DataTypes.STRING(100), allowNull: false },
      ip: { type: DataTypes.STRING(60), allowNull: false },
      metadata: { type: DataTypes.JSON, allowNull: true }
    },
    {
      sequelize,
      modelName: "AuditLog",
      tableName: "logs"
    }
  );

  return AuditLog;
};

