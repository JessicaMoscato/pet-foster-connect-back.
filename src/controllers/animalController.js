import {Animal, Association} from "../models/index.js";
import HttpError from "../middlewares/httperror.js";

export const animalController = {
  //! Recuperer tous les animaux
  getAllAnimals: async (_, res) => {
    const animals = await Animal.findAll({where: {id_family : null}});
    res.json(animals);
  },

  //! Recuperer un animal
  getAnimalById: async (req, res) => {
    const animalId = req.params.id;
    const animal = await Animal.findByPk(animalId, {
      include: [
        { 
          association: "family",
          include: {association :"user", attributes: {exclude: ["password"]}}
        },// Relation avec la famille
        { 
          association: "association",
          include: {association :"user", attributes: {exclude: ["password"]}}
        }, // Relation avec l'association
      ],
    });

    if (!animal) {
      throw new HttpError(
        404,
        "Animal non trouvé. Veuillez vérifier l'animal demandé"
      );
    }

    res.status(200).json(animal);
  },
  
  //! Ajouter un animal
createAnimal: async (req, res) => {
  const association = await Association.findOne({where: {id_user: req.user.id}});
  const animal = req.body;
  animal.id_association = association.id
  const newAnimal = await Animal.create(animal); // Crée un nouvel animal avec les données fournies dans la requête
  res.status(201).json(newAnimal); // Renvoie la réponse avec le nouvel animal créé
},

//! Modifier un animal
patchAnimal: async (req, res) => {
  const animalId = req.params.id;
  const selectidAnimal = await Animal.findByPk(animalId);

  if (!selectidAnimal) {
    throw new HttpError(
      404,
      "Animal non trouvé. Veuillez vérifier l'animal demandé"
    );
  }
  
  Object.assign(selectidAnimal, req.body); // Met à jour les propriétés de l'animal

  await selectidAnimal.save(); // Sauvegarde l'animal mis à jour

  res.status(200).json(selectidAnimal);
},


  //! Supprimer un animal
  deleteAnimal: async (req, res) => {
    const animalId = req.params.id;
    const selectidAnimal = await Animal.findByPk(animalId);

    if (!selectidAnimal) {
      throw new HttpError(
        404,
        "Animal non trouvé. Veuillez vérifier l'animal demandé"
      );
    }
    await selectidAnimal.destroy();
    res.status(204).end();
  },
};
