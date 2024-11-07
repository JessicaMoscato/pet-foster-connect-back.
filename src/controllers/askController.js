import Ask from "../models/ask.js";
import HttpError from "../middlewares/httperror.js";
import Animal from "../models/animal.js";
import Family from "../models/family.js";

export const askController = {
  //! Méthode pour lister toutes les demandes (de l'association)
  getAllAsks: async (req, res) => {
    const asks = await Ask.findAll({
      include: [
        { model: Family, as: "family" }, // Inclut la famille associée à la demande
        { model: Animal, as: "animal" }, // Inclut l'animal associé à la demande
      ],
    });
    res.status(200).json(asks); 
  },

  //! Méthode pour lister une seule demande
  getAskById: async (req, res) => {
    const { id: askId } = req.params; 
    const ask = await Ask.findByPk( askId, {
      include: [
        { model: Family, as: "family" }, // Inclut la famille associée à la demande
        { model: Animal, as: "animal" }, // Inclut l'animal associé à la demande
      ],
    });

    if ( !askId ) {
      return res.status(404).json({ error: "Request not found." }); 
    }

    res.status(200).json(ask); 
  },

  //! Méthode pour ajouter une demande
  createAsk: async (req, res) => {
    const newAsk = await Ask.create(req.body); 
    res.status(201).json(newAsk); 
  },

  //! Méthode pour modifier une demande
  patchAsk: async (req, res) => {
    const { id: askId } = req.params; 
    const newStatut = (req.body.status).toLowerCase();
    const ask = await Ask.findByPk(askId);

    if (!ask) {
      throw new HttpError(404, "Request not found."); 
    }

  
    // ask.status = req.body.status;
    Object.assign(ask, newStatut); // Mise à jour des données de la demande
    await ask.save(); // Enregistrement de la nouvelle demande
    res.status(200).json(ask); // Envoie de la nouvelle demande mise à jour en réponse sous forme de JSON
    
  },
};
