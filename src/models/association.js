import sequelize from "./client";
import { Model, DataTypes } from "sequelize";

export class Association extends Model{}

Association.init({
    repesentative: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Le représentant est obligatoire"},
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "L'adresse est obligatoire"},
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]+$/i,  // Vérifie que le numéro ne contient que des chiffres
            notEmpty: {msg: "Le numéro de téléphone est obligatoire"},
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
});