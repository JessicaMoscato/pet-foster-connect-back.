import User from "../models/user.js";
import { Scrypt } from "../auth/Scrypt.js";
import { generateToken } from "../auth/tokenService.js";
import validator from "validator";

export const signinController = {
  //! Méthode pour connecter un utilisateur
  async signinUser(req, res) {
    let { email, password } = req.body;

    email = email.trim();
    password = password.trim();

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
      return res.status(401).json({ message: "Identifiant ou Mot de passe incorrect" });
    }

    // Vérification du mot de passe et de l'email
    const isValidPassword = await Scrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Identifiant ou Mot de passe incorrect" });
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
