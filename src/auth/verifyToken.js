import jwt from "jsonwebtoken"; // Importation de la bibliothèque jsonwebtoken pour gérer les tokens JWT

// Récupération de la clé secrète à partir des variables d'environnement pour signer et vérifier les tokens JWT
const JWT_SECRET = process.env.JWT_SECRET;

//! Middleware de vérification du token JWT
export const verifyToken = (req, res, next) => {
  // Récupérer le token de l'en-tête Authorization
  // L'en-tête Authorization est de la forme "Bearer <token>"
  // On extrait uniquement le token après le mot "Bearer"
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Si aucun token n'est présent dans l'en-tête, renvoie une erreur 401 "Unauthorized"
  if (!token) {
    return res.status(401).json({ message: "Token introuvable" });
  }

  //! Vérifie et décode le token
  // jwt.verify décode le token et s'assure qu'il est valide en utilisant la clé secrète JWT_SECRET
  jwt.verify(token, JWT_SECRET, (err, user) => {
    // Si le token est invalide ou expiré, renvoie une erreur 403 "Forbidden"
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }

    // Si le token est valide, ajoute les informations de l'utilisateur décodées (payload du token) à `req.user`
    // Cela permet aux prochaines étapes de la requête d'accéder aux informations de l'utilisateur
    req.user = user;

    
    next();
  });
};
