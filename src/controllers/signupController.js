import User from "../models/user.js";
import { Scrypt } from "../auth/Scrypt.js";
import { generateToken } from "../auth/tokenService.js";
import validator from "validator";

// Fonction pour valider la complexité du mot de passe
function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

export const signupController = {
  //! Méthode pour inscrire un utilisateur (Association ou Family)
  async signupUser(req, res) {
    const {
      firstname,
      lastname,
      address,
      postal_code,
      city,
      phone,
      email,
      password,
      rna_number,
      representative,
      role,
    } = req.body;

    // Vérification des champs obligatoires
    if (
      !firstname ||
      !lastname ||
      !address ||
      !postal_code ||
      !city ||
      !phone ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        message:
          "Tous les champs nécessaires (firstname, lastname, address, postal_code, city, phone, email, password, role) sont requis.",
      });
    }

    // Vérification de la validité de l'email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email invalide" });
    }

    // Vérification de la validité du mot de passe
    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.",
      });
    }

    // Vérification des champs spécifiques en fonction du rôle
    if (role === "association") {
      if (!representative || !rna_number) {
        return res.status(400).json({
          message:
            "Les champs 'representative' et 'rna_number' sont obligatoires pour les associations.",
        });
      }
    }

    if (role === "family") {
      if (rna_number || representative) {
        return res.status(400).json({
          message:
            "Les champs 'rna_number' et 'representative' ne sont pas requis pour les familles.",
        });
      }
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "L'email est déjà utilisé" });
    }

    try {
      // Hachage du mot de passe
      const hashedPassword =  Scrypt.hash(password);

      // Création de l'utilisateur dans la base de données
      const newUser = await User.create({
        firstname,
        lastname,
        address,
        postal_code,
        city,
        phone,
        email,
        password: hashedPassword,
        role,
        rna_number: rna_number || null, // Rna_number est requis uniquement pour les associations
        representative: representative || null, // Le champ "representative" est requis uniquement pour les associations
      });

      // Génération d'un token pour l'utilisateur
      const token = generateToken(newUser);

      // Envoi de la réponse avec un message de succès et les informations nécessaires
      res.status(201).json({
        message: "Inscription réussie",
        token,
        user: { email: newUser.email, role: newUser.role },
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur : ", error);
      res.status(500).json({
        message: "Erreur lors de l'inscription de l'utilisateur.",
        error: error.message,
      });
    }
  },
};
