import { randomBytes, scryptSync } from "crypto"; // Importation des modules pour le hachage
import User from "../../models/user.js"; // Importation du modèle User


//! Fonction pour hacher le mot de passe
const hashPassword = (password) => {
    const salt = randomBytes(16).toString("hex");
    const buffer = scryptSync(password, salt, 64, {
        N: 131072,
        maxmem: 134220800,
    }).toString("hex");
    return `${buffer}.${salt}`;
};

//! Fonction pour hacher tous les mots de passe des utilisateurs
const hashAllPasswords = async () => {
  try {
    // Récupération de tous les utilisateurs
    const users = await User.findAll();
    console.log(`Nombre d'utilisateurs récupérés : ${users.length}`);

    // Parcours des utilisateurs pour hacher les mots de passe
    for (const user of users) {
      console.log(`Traitement de l'utilisateur : ${user.email}`);

      // Ajout du log pour afficher le mot de passe original
      console.log(
        `Mot de passe original pour l'utilisateur ${user.email} : ${user.password}`
      );

      // Hachage du mot de passe
      const hashedPassword = hashPassword(user.password);

      // Mise à jour de l'utilisateur avec le mot de passe haché
      await user.update({ password: hashedPassword });
      console.log(`Mot de passe haché pour l'utilisateur : ${user.email}`);
    }

    console.log("Tous les mots de passe ont été hachés avec succès !");
  } catch (error) {
    console.error("Erreur lors du hachage des mots de passe :", error);
  }
};

// Appel de la fonction pour hacher tous les mots de passe
hashAllPasswords();