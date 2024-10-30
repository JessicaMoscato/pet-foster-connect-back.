import client from "./sequelize.js";
import user from "./models/user.js";
import family from "./models/family.js";
import association from "./models/association.js";
import animal from "./models/animal.js";
import ask from "./models/ask.js";

//! Une famille peut avoir plusieurs animaux 
family.hasMany(animal, {
  foreignKey: "code_family", // clé étrangère dans animal
});

animal.belongsTo(family, {
  foreignKey: "code_family", // clé étrangère dans animal
});

//! Une association peut avoir plusieurs animaux 
association.hasMany(animal, {
  foreignKey: "code_asso", // clé étrangère dans animal
});
animal.belongsTo(association, {
  foreignKey: "code_asso", // clé étrangère dans animal
});

//! Un utilisateur peut être associé à une famille
user.hasOne(family, {
  foreignKey: "code_user", // clé étrangère dans family
});
family.belongsTo(user, {
  foreignKey: "code_user", // clé étrangère dans family
});

//! Un utilisateur peut être associé à plusieurs associations 
user.hasMany(association, {
  foreignKey: "code_user", // clé étrangère dans association
});
association.belongsTo(user, {
  foreignKey: "code_user", // clé étrangère dans association
});

//! Une famille peut faire plusieurs demandes (ask) 
family.hasMany(ask, {
  foreignKey: "code_family", // clé étrangère dans ask
});
ask.belongsTo(family, {
  foreignKey: "code_family", // clé étrangère dans ask
});

//! Un animal peut être associé à plusieurs demandes (ask) 
animal.hasMany(ask, {
  foreignKey: "code_animal", // clé étrangère dans ask
});
ask.belongsTo(animal, {
  foreignKey: "code_animal", // clé étrangère dans ask
});

export { client, user, family, association, animal, ask };
