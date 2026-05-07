import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Incident extends Model {}

  Incident.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      empleado_id: { type: DataTypes.INTEGER, allowNull: false },
      tipo: { type: DataTypes.STRING(80), allowNull: false },
      fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
      fecha_fin: { type: DataTypes.DATEONLY, allowNull: false },
      estatus: { type: DataTypes.STRING(40), allowNull: false, defaultValue: "pendiente" },
      documento_pdf: { type: DataTypes.STRING(255), allowNull: true }
    },
    {
      sequelize,
      modelName: "Incident",
      tableName: "incidencias"
    }
  );

  return Incident;
};

