import  Association  from "../models/association.js";
import HttpError from "../middlewares/httperror.js";


export const associationController = {
  //! Méthode pour lister les associations
  getAllAssociations: async (req, res) => {
    const associations = await Association.findAll({
      include: [
        { association: "user", attributes: {exclude: ["password"]}}, // Inclut les animaux associés à chaque association
        { association: "animals" }, // Inclut les utilisateurs associés à chaque association
      ],
    });
    res.status(200).json(associations); 
  },

  //! Méthode pour obtenir le détail d'une association
  getAssociationById: async (req, res, next) => {
    const { id: associationId } = req.params; 
    const association = await Association.findByPk(associationId, {
      include: [
        { association: "user", attributes: {exclude: ["password"]} }, // Inclut les animaux associés à chaque association
        { association: "animals" }, // Inclut les utilisateurs associés à chaque association
      ],
    });

    if (!association) {
      next(new HttpError(404, "Association not found")); 
    } else {
      res.status(200).json(association); 
    }
  },
};
