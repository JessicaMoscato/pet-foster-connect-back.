import { Model, DataTypes } from "sequelize";
import sequelize from './client.js';

export default class Animal extends Model{}

Animal.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le nom est obligatoire" },
        is: {
          args: /^[A-Za-zÀ-ÿ\s]+$/i, // Permet uniquement les lettres et les espaces
          msg: "Le nom doit contenir uniquement des lettres.",
        },
      },
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "L'espèce est obligatoire" },
      },
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La race est obligatoire" },
      },
    },
    gender: {
      type: DataTypes.CHAR,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Le genre est obligatoire" },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "l'age est obligatoire" },
      },
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La taille est obligatoire" },
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    profile_photo: {
      type: DataTypes.STRING,
    },
    photo1: {
      type: DataTypes.STRING,
    },
    photo2: {
      type: DataTypes.STRING,
    },
    photo3: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelize,
    tableName: "animal",
  }
);