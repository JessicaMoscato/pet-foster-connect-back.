import { Association } from "../models/association.js";
import { HttpError } from "../middlewares/httperror.js";


export const associationController = {
  //! Méthode pour lister les associations
  getAllAssociations: async (req, res) => {
    const associations = await Association.findAll({
      include: [
        'animals', // Inclut les animaux associés à chaque association
      ]
   /*    include: [
        { association: "animals" }, // Inclut les animaux associés à chaque association
      ], */
    });
    res.json(associations); // Envoie les associations en réponse sous format JSON
  },

  //! Méthode pour obtenir le détail d'une association
  getAssociationById: async (req, next) => {
    const { id: associationId } = req.params; // Extrait l'ID de l'association depuis les paramètres de la requête
    const association = await Association.findByPk(associationId, {
      include: [
        'animals', // Inclut les animaux associés à chaque association
      ]
    /*   include: [
        { association: "animals" }, // Inclut les animaux associés à chaque association
      ], */
    });

    if (!association) {
      next(new HttpError(404, "Association not found")); // Lance une erreur 404 si l'association n'existe pas
    } else {
      res.json(association); // Envoie les détails de l'association en réponse sous format JSON
    }
  },
};
