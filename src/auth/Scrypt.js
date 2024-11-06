import { scryptSync, timingSafeEqual, randomBytes } from "node:crypto"; 
// scryptSync : Fonction qui permet de créer un hash à partir d'un mot de passe et d'un sel, en utilisant l'algorithme scrypt.
// timingSafeEqual : Fonction qui compare deux buffers de manière sécurisée, empêchant les attaques par temporisation.
// randomBytes : Fonction qui génère des octets aléatoires, utilisée pour créer un sel unique pour le hachage des mots de passe.

//! Permet de gérer les mots de passe
class Scrypt {
  // Cette méthode va transformer un mot de passe clair en mot de passe hashé.
  // Elle sera appelée uniquement lors de l'enregistrement d'un nouveau mot de passe en base de données
  // (formulaire d'inscription, formulaire de modification de mot de passe, etc.)
  static hash(password) {
    // On crée un sel (salt) aléatoire de 16 octets et on le convertit en chaîne hexadécimale.
    const salt = randomBytes(16).toString("hex");

    // On crée le hash du mot de passe d'une longueur de 64 caractères.
    // Les options spécifient des paramètres de sécurité (N, maxmem).
    const buffer = scryptSync(password, salt, 64, {
      N: 131072,
      maxmem: 134220800,
    }).toString("hex");

    // On concatène le hash avec le sel pour obtenir le mot de passe hashé final à stocker en BDD.
    return `${buffer}.${salt}`;
  }

  //! Cette méthode va comparer un mot de passe clair avec un mot de passe hashé
  //! et retourner un booléen indiquant si les deux correspondent.
  // Elle sera appelée lors de la tentative de connexion :
  //  - Le contrôleur ira chercher en BDD le User correspondant à l'identifiant du formulaire de connexion
  //    et récupérera le hash enregistré.
  static compare(plainTextPassword, hash) {
    // On commence par récupérer le salt et le hash du mot de passe à partir du paramètre `hash`.
    const [hashedPassword, salt] = hash.split(".");

    // On crée un buffer à partir du hash pour effectuer la comparaison.
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");

    // On génère un nouveau buffer en utilisant le mot de passe clair et le sel pour le comparer.
    const clearPasswordBuffer = scryptSync(plainTextPassword, salt, 64, {
      N: 131072,
      maxmem: 134220800,
    });

    //! On compare de manière sécurisée les deux buffers pour vérifier s'ils sont identiques.
    return timingSafeEqual(hashedPasswordBuf, clearPasswordBuffer);
  }
}

export { Scrypt };
