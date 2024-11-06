import { Model, DataTypes } from "sequelize";
import sequelize from "./client.js";
import Animal from "./animal.js";
import Family from "./family.js";

export default class Ask extends Model {
  static associate(models) {
    // Associations définies ici
    Ask.belongsTo(models.Animal, { foreignKey: "id_animal", as: "animal" });
    Ask.belongsTo(models.Family, { foreignKey: "id_family", as: "family" });
  }
}


Ask.init(
  {
   
    // !Clé étrangère référant à la table family
    id_family: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "family", // Nom de la table de référence
        key: "id", // Clé primaire de la table de référence
      },
      primaryKey: true, // Indique que c'est une partie de la clé primaire
    },
    // !Clé étrangère référant à la table animal
    id_animal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "animal", // Nom de la table de référence
        key: "id", // Clé primaire de la table de référence
      },
      primaryKey: true, // Indique que c'est une partie de la clé primaire
    },

    // !Statut de la demande
    status: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "en attente",
    },
  },
  {
    sequelize: sequelize,
    tableName: "ask",
  }
);

