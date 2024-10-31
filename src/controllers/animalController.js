import { Animal } from '../models/index.js';
import HttpError from '../middlewares/httperror.js';

export const animalController = {
    getAllAnimals: async (_, res) => {
        const animals = await Animal.findAll();
        res.json(animals);
    },

    getAnimalById: async (req, res) => {
        const animalId = req.params.id;
        const animal = await Animal.findbyPk(animalId);

        if(!animal){
            throw new HttpError(404, "Animal non trouvé. Veuillez vérifier l'animal demandé")
        }

        res.json(animal);
    },

    createAnimal: async (req, res) => {
        const newAnimal = await Animal.create(req.body);
        res.status(201).json(newAnimal);
    },
    
    patchAnimal: async (req, res) => {
        const animalId = req.params.id;
        const selectidAnimal = await Animal.findbyPk(animalId);

        if(!selectidAnimal){
            throw new HttpError(404, "Animal non trouvé. Veuillez vérifier l'animal demandé")
        }

        Object.assign(animalController, req.body);
        await selectidAnimal.save();
        res.json(selectidAnimal);
    },

    deleteAnimal: async (req, res) => {
        const animalId = req.params.id;
        const selectidAnimal = await Animal.findbyPk(animalId);

        if(!selectidAnimal){
            throw new HttpError(404, "Animal non trouvé. Veuillez vérifier l'animal demandé")
        }

        await selectidAnimal.destroy();
        res.status(204).end();
    },
};