import User from "../models/user.js";
import { Scrypt } from "../auth/Scrypt.js";
import { generateToken } from "../auth/tokenService.js";
import validator from "validator";

//! Fonction de validation de mot de passe
const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password); // Vérifie la présence d'une majuscule
  const hasSpecialChar = /[!@#$%^&*]/.test(password); // Vérifie la présence d'un caractère spécial
  const hasNumber = /\d/.test(password); // Vérifie la présence d'un chiffre
  const isValidLength = password.length >= 8; // Vérifie que la longueur minimale est de 8 caractères

  return hasUpperCase && hasSpecialChar && hasNumber && isValidLength;
};

export const signinController = {
  //! Méthode pour connecter un utilisateur
  async signinUser(req, res) {
    const { email, password } = req.body;

    // Vérification de la présence de l'email et du mot de passe
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email et mot de passe sont requis" });
    }

    // Vérification de la validité de l'email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email invalide" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    // Vérification du mot de passe
    const isValidPassword = await Scrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Génération du token JWT
    const token = generateToken(user);

    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: { email: user.email, role: user.role },
    });
  },
};
