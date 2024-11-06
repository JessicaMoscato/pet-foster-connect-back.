//! Middleware pour vérifier si l'utilisateur est de type "family"
function isFamilyMiddleware(req, res, next) {
  // Vérifie si l'utilisateur est connecté et si son rôle est "family"
  if (!req.session.user || req.session.user.role !== "family") {
    return res
      .status(403)
      .json({ error: "Accès interdit : rôle famille requis." });
  }

  // Passe au middleware suivant si l'utilisateur est de type "family"
  next();
}

//! Middleware pour vérifier si l'utilisateur est de type "association"
function isAssociationMiddleware(req, res, next) {
  // Vérifie si l'utilisateur est connecté et si son rôle est "association"
  if (!req.session.user || req.session.user.role !== "association") {
    return res
      .status(403)
      .json({ error: "Accès interdit : rôle association requis." });
  }

  // Passe au middleware suivant si l'utilisateur est de type "association"
  next();
}

//! Middleware pour vérifier si l'utilisateur est un administrateur
function isAdminMiddleware(req, res, next) {
  // Vérifie si l'utilisateur est connecté et si son rôle est "admin"
  if (!req.session.user || req.session.user.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Accès interdit : rôle administrateur requis." });
  }

  // Passe au middleware suivant si l'utilisateur est administrateur
  next();
}


export { isFamilyMiddleware, isAssociationMiddleware, isAdminMiddleware };
