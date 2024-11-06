import client from "./client.js";
import User from "./user.js";
import Family from "./family.js";
import Association from "./association.js";
import Animal from "./animal.js";
import Ask from "./ask.js";

//! Une famille peut avoir plusieurs animaux
Family.hasMany(Animal, {
  foreignKey: "id_family", // clé étrangère dans animal
  as: "animalsFamily", // alias pour la relation
});

Animal.belongsTo(Family, {
  foreignKey: "id_family", // clé étrangère dans animal
  as: "family", // alias pour la relation
});

//! Une association peut avoir plusieurs animaux
Association.hasMany(Animal, {
  foreignKey: "id_association", // clé étrangère dans animal
  onDelete: "cascade", // suppression en cascade
  as: "animals", // alias pour la relation
});

Animal.belongsTo(Association, {
  foreignKey: "id_association", // clé étrangère dans animal
  as: "association", // alias pour la relation
});

//! Un utilisateur peut être associé à une famille
User.hasOne(Family, {
  foreignKey: "id_user", // clé étrangère dans family
  as: "family", // alias pour la relation
  onDelete: "cascade",
});

Family.belongsTo(User, {
  foreignKey: "id_user", // clé étrangère dans family
  as: "user", // alias pour la relation
  onDelete: "cascade",
});

//! Un utilisateur peut être associé à une association
User.hasOne(Association, {
  foreignKey: "id_user", // clé étrangère dans association
  as: "association", // alias pour la relation
  onDelete: "cascade",
});

Association.belongsTo(User, {
  foreignKey: "id_user", // clé étrangère dans association
  as: "user", // alias pour la relation
  onDelete: "cascade",
});

//! Une famille peut faire plusieurs demandes (ask)
Family.hasMany(Ask, {
  foreignKey: "id_family", // clé étrangère dans Ask
  as: "asks", // alias pour la relation
  onDelete: "cascade",
});

Ask.belongsTo(Family, {
  foreignKey: "id_family", // clé étrangère dans Ask
  as: "family", // alias pour la relation
});

//! Un animal peut être associé à plusieurs demandes (ask)
Animal.hasMany(Ask, {
  foreignKey: "id_animal", // clé étrangère dans Ask
  as: "asks", // alias pour la relation
  onDelete: "cascade",
});

Ask.belongsTo(Animal, {
  foreignKey: "id_animal", // clé étrangère dans Ask
  as: "animal", // alias pour la relation
});

export { client, User, Family, Association, Animal, Ask };
