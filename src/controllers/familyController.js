import  Family  from "../models/family.js";
import HttpError from "../middlewares/httperror.js";

export const familyController = {
  //! Méthode pour lister les familles d'accueil
  getAllFamilies: async (req, res) => {
    const families = await Family.findAll({
      include: [
        { association: "animalsFamily" }, // Inclut les animaux associés à chaque famille
        { association: "user", attributes: {exclude: ["password"]} }, // Inclut les utilisateurs associés à chaque famille
      ],
    });
    res.status(200).json(families); 
  },

  //! Méthode pour obtenir le détail d'une famille d'accueil
  getFamilyById: async (req, res, next) => {
    // Ajout de 'res' comme argument
    const { id: familyId } = req.params; // Extrait l'ID de la famille depuis les paramètres de la requête
    const family = await Family.findByPk(familyId, {
      include: [{ association: "animalsFamily" }, 
                { association: "user", attributes: {exclude: ["password"]} }],
    });

    if (!family) {
      return next(new HttpError(404, "Foster family not found")); 
    }
    res.status(200).json(family); 
  },

  patchFamily: async (req, res) => {
    const familyId = req.params.id;
    const family = await Family.findByPk(familyId,{
      attributes: {exclude: "password"},
      include: "user"
    });

    if(!family) {
      return next(new HttpError(404, "Foster family not found")); 
    }

    res.status(201).json(family)
  },

  deleteFamily: async (req, res) => {

  }
};
