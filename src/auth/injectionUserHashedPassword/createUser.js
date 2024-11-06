import { randomBytes, scryptSync } from "crypto"; // Importation des modules pour le hachage
import User from "../../models/user.js"; // Importation du modèle User
import validator from "validator"; // Importation d'un validateur d'email

//! Fonction pour hacher le mot de passe
const hashPassword = (password) => {
  // Génération d'un sel
  const salt = randomBytes(16).toString("hex");
  // Hachage du mot de passe avec le sel
  const buffer = scryptSync(password, salt, 64, {
    N: 131072,
    maxmem: 134220800,
  }).toString("hex");
  // Retourne le mot de passe haché avec le sel
  return `${buffer}.${salt}`;
};

//! Fonction de validation de mot de passe
const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password); // Vérifie la présence d'une majuscule
  const hasSpecialChar = /[!@#$%^&*]/.test(password); // Vérifie la présence d'un caractère spécial
  const hasNumber = /\d/.test(password); // Vérifie la présence d'un chiffre
  const isValidLength = password.length >= 8; // Vérifie que la longueur minimale est de 8 caractères

  return hasUpperCase && hasSpecialChar && hasNumber && isValidLength;
};

//! Fonction pour créer un nouvel utilisateur
const createUser = async (firstname, lastname, email, password, role) => {
  // Vérification des valeurs obligatoires
  if (!firstname || !lastname || !email || !password || !role) {
    console.error("Tous les champs sont obligatoires !");
    return;
  }

  // Validation de l'email
  if (!validator.isEmail(email)) {
    console.error("L'email n'est pas valide !");
    return;
  }

  // Validation du mot de passe
  if (!validatePassword(password)) {
    console.error(
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial."
    );
    return;
  }

  try {
    const hashedPassword = hashPassword(password);
    await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });
    console.log(`Utilisateur créé avec succès : ${email}`);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
  }
};

//! Appel de la fonction pour créer un utilisateur par rôle

createUser("Family", "UserFamily", "family@example.com", "Family@123", "family");
createUser("Asso", "UserAsso", "asso@example.com", "Asso@123", "association");
createUser("Admin", "UserAdmin", "admin@example.com", "Admin@123", "admin");


