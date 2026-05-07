import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class PositionHistory extends Model {}

  PositionHistory.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      empleado_id: { type: DataTypes.INTEGER, allowNull: false },
      puesto_id: { type: DataTypes.INTEGER, allowNull: false },
      fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
      fecha_fin: { type: DataTypes.DATEONLY, allowNull: true },
      motivo_cambio: { type: DataTypes.TEXT, allowNull: true }
    },
    {
      sequelize,
      modelName: "PositionHistory",
      tableName: "historial_puestos"
    }
  );

  return PositionHistory;
};

