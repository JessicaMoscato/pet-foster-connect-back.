import { Model, DataTypes } from "sequelize";
import sequelize from "./client.js";


export class Family extends Model {}

Family.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_of_children: {
      type: DataTypes.INTEGER,

    },
    number_of_animals: {
      type: DataTypes.INTEGER,

    },
    garden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    profile_photo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "user", // Indique que cette colonne fait référence à la table 'user'
        key: "id", // Spécifie que la clé primaire dans la table 'user' à laquelle cette colonne fait référence est 'id'
      },
    },
  },
  {
    sequelize: sequelize,
    tableName: "family",
  }
);

export default Family;
