import jwt from "jsonwebtoken"; // Importation de la bibliothèque jsonwebtoken pour gérer les JSON Web Tokens

//! Récupération de la clé secrète pour signer le token à partir des variables d'environnement
const JWT_SECRET = process.env.JWT_SECRET; 

//! Fonction pour générer le token
export const generateToken = (user) => {
  // Crée un token en incluant des informations sur l'utilisateur
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role }, // Payload : informations de l'utilisateur à inclure dans le token
    JWT_SECRET, // Clé secrète utilisée pour signer le token
    { expiresIn: "1h" } // Options de configuration : durée de validité du token (1 heure ici)
  );
};
