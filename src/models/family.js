import { Model, DataTypes } from "sequelize";
import sequelize from "./client.js";


export class Family extends Model {}

Family.init(
  {
    //*possible si changement du comportement par defaut 
/*     id: {   
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }, */
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]+$/i, // Vérifie que le numéro ne contient que des chiffres
      },
    },
    number_of_children: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    number_of_animals: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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

      //* pas indispensable
      /* references: {
        model: "user", 
        key: "id", 
      }, */
    },
  },
  {
    sequelize: sequelize,
    tableName: "family",
  }
);
