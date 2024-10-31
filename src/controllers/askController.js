import { Ask } from "../models/ask.js";
import { HttpError } from "../middlewares/httperror.js";

export const askController = {
  //! Méthode pour lister toutes les demandes (de l'association)
  getAllAsks: async (req, res) => {
    const asks = await Ask.findAll({
      include: [
        'animals', // Inclut les animaux associés à chaque demande
        'families', // Inclut les familles associées à chaque demande
      ]
    /*   include: [
        { association: "animals" }, // Inclut les animaux associés à chaque demande
        { association: "families" }, // Inclut les familles associées à chaque demande
      ], */
    });
    res.json(asks); // Envoie la liste des demandes en réponse sous forme de JSON
  },

  //! Méthode pour lister une seule demande
  getAskById: async (req, res) => {
    const { id: askId } = req.params; // Extrait l'ID de la demande depuis les paramètres de la requête
    const ask = await Ask.findByPk(askId, {
      include: [
        'animals', // Inclut les animaux associés à la demande
        'families', // Inclut les familles associées à la demande
      ]
     /*  include: [
        { association: "animals" }, // Inclut les animaux associés à la demande
        { association: "families" }, // Inclut les familles associées à la demande
      ], */
    }); 

    if (!ask) {
      throw new HttpError(404, "Request not found."); // Si aucune demande n'est trouvée, lance une erreur 404
    }
    res.json(ask); // Envoie la demande trouvée en réponse sous forme de JSON
  },

  //! Méthode pour ajouter une demande
  createAsk: async (req, res) => {
    const newAsk = await Ask.create(req.body); // Crée une nouvelle demande en utilisant les données du corps de la requête
    res.status(201).json(newAsk); // Envoie la nouvelle demande en réponse sous forme de JSON avec un statut 201 (création réussie)
  },

  //! Méthode pour modifier une demande
  patchAsk: async (req, res) => {
    const { id: askId } = req.params; // Extrait l'ID de la demande depuis les paramètres de la requête
    const ask = await Ask.findByPk(askId); // Recherche la demande dans la base de données en utilisant l'ID

    if (!ask) {
      throw new HttpError(404, "Request not found."); // Si aucune demande n'est trouvée, lance une erreur 404
    }
    Object.assign(ask, req.body); // Mise à jour des données de la demande
    await ask.save(); // Enregistrement de la nouvelle demande
    res.json(ask); // Envoie de la nouvelle demande mise à jour en réponse sous forme de JSON
  },
};
