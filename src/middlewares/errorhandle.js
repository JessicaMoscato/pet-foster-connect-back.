// !Middleware de gestion des erreurs


export function errorHandler(err, req, res, next) {
  const httpStatus = err.status ? err.status : 500; // Définition du statut HTTP de l'erreur, par défaut 500 si non spécifié

  if (err.message === "Validation error") { // Vérification si l'erreur est une erreur de validation
    err.message = err.errors[0].message; // Remplacement du message d'erreur par le premier message d'erreur de validation
  }
  res.status(httpStatus).json({ error: err.message }); // Envoi de la réponse avec le statut HTTP et le message d'erreur au format JSON
}
