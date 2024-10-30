import { Model, DataTypes } from "sequelize";
import sequelize from "./client";

export class Ask extends Model{}

Ask.init({
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "en attente"
    },
},
{
    sequelize: sequelize,
    tableName: "ask",
})