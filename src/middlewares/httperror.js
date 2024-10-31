// !Classe personnalisée pour les erreurs HTTP

export class HttpError extends Error {
  constructor(status, message) {
    super(message); // Appel du constructeur de la classe parente Error avec le message d'erreur
    this.status = status; // Ajout d'une propriété status à l'erreur pour stocker le code de statut HTTP
  }
}
