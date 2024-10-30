import client from "./sequelize.js";
import User from "./models/U.js";
import Family from "./models/family.js";
import Association from "./models/association.js";
import Animal from "./models/animal.js";
import Ask from "./models/ask.js";


//! Une famille peut avoir plusieurs animaux 
Family.hasMany(Animal, {
  foreignKey: "id_family", // clé étrangère dans animal
  as: "animals",
});

Animal.belongsTo(Family, {
  foreignKey: "id_family", // clé étrangère dans animal
  as: "family",
});

//! Une association peut avoir plusieurs animaux 
Association.hasMany(Animal, {
  foreignKey: "id_association", // clé étrangère dans animal
  onDelete: "cascade",
  as: "animals",
});

Animal.belongsTo(Association, {
  foreignKey: "id_association", // clé étrangère dans animal
  as: "association",
});

//! Un utilisateur peut être associé à une famille
User.hasOne(Family, {
  foreignKey: "id_user", // clé étrangère dans family
  as: "family",
});
Family.belongsTo(User, {
  foreignKey: "id_user", // clé étrangère dans family
  as: "user",
});

//! Un utilisateur peut être associé à plusieurs associations 
User.hasMany(Association, {
  foreignKey: "id_user", // clé étrangère dans association
  as: "associations",
});
Association.belongsTo(User, {
  foreignKey: "id_user", // clé étrangère dans association
  as: "user",
});

//! Une famille peut faire plusieurs demandes (ask) 
Family.belongsToMany(Animal, {
  through: "ask",
  foreignKey: "id_family",
  as: "animals",
});
Animal.belongsToMany(Family, {
  foreignKey: "id_animal", 
  through: "ask",
  as: "families",
});



export { client, User, Family, Association, Animal, Ask };
