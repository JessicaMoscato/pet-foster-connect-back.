import { Animal } from '../models/index.js';

export const animalController = {
    getAllAnimals: async (req, res) => {
        const animals = await Animal.findAll();
        res.json(animals);
    },

    getOne: async (req, res) => {
        const animalId = req.params.id;
        const animal = await Animal.findbyPk(animalId);

        // gestion d'une 404 ici?

        res.json(animal);
    },

    createOne: async (req, res) => {
        
    }
};