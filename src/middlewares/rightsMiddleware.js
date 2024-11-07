//! Middleware combiné pour vérifier les rôles autorisés
function isRoleAuthorizedMiddleware(roles = []) {
  return (req, res, next) => {
    // Vérifie si l'utilisateur est connecté et si son rôle est dans la liste des rôles autorisés
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Accès interdit : rôle ${roles.join(" ou ")} requis.`,
      });
    }
    
    next();
  };
}

export { isRoleAuthorizedMiddleware };
