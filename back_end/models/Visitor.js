import { DataTypes, Model } from "sequelize";

export default (sequelize) => {
  class Visitor extends Model {}

  Visitor.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: DataTypes.STRING(150), allowNull: false },
      institucion: { type: DataTypes.STRING(150), allowNull: false },
      motivo: { type: DataTypes.TEXT, allowNull: false },
      persona_a_visitar: { type: DataTypes.STRING(150), allowNull: false },
      hora_entrada: { type: DataTypes.DATE, allowNull: false },
      hora_salida: { type: DataTypes.DATE, allowNull: true },
      identificacion: { type: DataTypes.STRING(120), allowNull: true },
      gafete_asignado: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
      sequelize,
      modelName: "Visitor",
      tableName: "visitantes"
    }
  );

  return Visitor;
};

