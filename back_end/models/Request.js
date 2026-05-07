import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Request extends Model {}

  Request.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      empleado_id: { type: DataTypes.INTEGER, allowNull: false },
      tipo: { type: DataTypes.STRING(80), allowNull: false },
      fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
      fecha_fin: { type: DataTypes.DATEONLY, allowNull: false },
      motivo: { type: DataTypes.TEXT, allowNull: false },
      documento_adjunto: { type: DataTypes.STRING(255), allowNull: true },
      estatus: { type: DataTypes.STRING(40), allowNull: false, defaultValue: "pendiente" },
      aprobado_por: { type: DataTypes.STRING(150), allowNull: true },
      fecha_resolucion: { type: DataTypes.DATE, allowNull: true }
    },
    {
      sequelize,
      modelName: "Request",
      tableName: "solicitudes"
    }
  );

  return Request;
};

