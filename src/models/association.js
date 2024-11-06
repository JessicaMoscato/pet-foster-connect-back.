import sequelize from "./client.js";
import { Model, DataTypes } from "sequelize";

export default class Association extends Model{}

Association.init(
  {
    rna_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^W\d{9}$/,
        notEmpty: {msg: "Renseigner un numéro RNA valide"}
      }
    },
    representative: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le représentant est obligatoire" },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "L'adresse est obligatoire" },
      },
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
        notEmpty: { msg: "Le numéro de téléphone est obligatoire" },
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "en attente",
    },
    profile_photo: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelize,
    tableName: "association",
  }
);