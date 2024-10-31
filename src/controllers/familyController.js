import { Family } from "../models/family.js";
import { HttpError } from "../middlewares/httperror.js";

export const associationController = {
  //! Méthode pour lister les familles d'accueil
  getAllFamilies: async (req, res) => { 
    const families = await Family.findAll({
      include : [
        animals,// Inclut les animaux associés à chaque famille
        user, // Inclut l'utilisateur associé à la famille d'accueil
      ]
   /*    include: [
        { association: "animals", include: "association" }, // Inclut les animaux associés et leur association
        { association: "user" }, // Inclut l'utilisateur associé à la famille d'accueil
      ], */
    });
    res.json(families); // Envoie la liste des familles d'accueil avec leurs animaux en réponse sous forme de JSON
  },

  //! Méthode pour obtenir le détail d'une famille d'accueil
  getFamilyById: async (req, next) => {
    const { id: familyId } = req.params; // Extrait l'ID de la famille depuis les paramètres de la requête
    const family = await Family.findByPk(familyId, {
      include: [
        { association: "animals", include: "association" }, // Inclut les animaux associés et leur association
        { association: "user" }, // Inclut l'utilisateur associé à la famille d'accueil
      ],
    });
    if (!family) {
      return next(new HttpError(404, "Foster family not found")); // Si aucune famille n'est trouvée, lance une erreur 404
    }
    res.json(family); // Envoie la famille trouvée avec ses animaux en réponse sous forme de JSON
  },
};
