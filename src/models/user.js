import { Model, DataTypes } from "sequelize";
import sequelize from './client.js';

export class User extends Model{}

User.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Le Nom est obligatoire"},
        },
    },
    lasstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Le Prénom est obligatoire"},
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: "L'email n'est pas au bon format" },
            notEmpty: {msg: "L'email est obligatoire"},
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {msg: "Le Mot de Passe est obligatoire"},
        },
    },
    role: {
        type: DataTypes.STRING,
    },
},
{
    sequelize: sequelize,
    tableName: 'user',
})