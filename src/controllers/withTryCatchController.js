// !Décorateur pour la gestion des erreurs dans les middlewares
/*
Décorateur utilisé pour créer des middlewares s'executant dans un block try/catch
et appelant le middleware de gestion des erreurs en cas de levée d'une exception
*/
export function withTryCatch(middleware) {
  return async function (req, res, next) {
    // Retourne une fonction middleware asynchrone
    try {
      await middleware(req, res, next); // Exécution du middleware original dans un bloc try
    } catch (error) {
      next(error); // En cas d'erreur, passe l'erreur au middleware suivant (généralement le gestionnaire d'erreurs)
    }
  };
}
