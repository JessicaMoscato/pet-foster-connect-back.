import { Model, DataTypes } from "sequelize";
import sequelize from "./client.js";

export default class Family extends Model {}

Family.init(
  {
    /*  //possible si changement du comportement par defaut 
   id: {   
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }, */

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      validate: {
        is: /^[0-9]{5}$/i, // Vérifie que le code postal est composé de 5 chiffres
      },
    },
    city: {
      type: DataTypes.STRING(50),
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
      allowNull: false,
    },
    number_of_animals: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      // allowNull: false,
      // unique: true,
    },
    //id_user: {
    //  type: DataTypes.INTEGER,
    //  allowNull: false,
    //  unique: true,

      //* pas indispensable
      /* references: {
        model: "user", 
        key: "id", 
      }, */
    //},
  },
  {
    sequelize: sequelize,
    tableName: "family",
  }
);
