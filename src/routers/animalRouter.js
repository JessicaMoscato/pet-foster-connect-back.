//! Router secondaire pour les routes liées aux animaux (prefixe de route : /api/animal)

import { Router } from "express";
import { animalController } from "../controllers/animalController.js"; 

export const router = Router();


router.get("/", animalController.getAllAnimals); // Route pour lister tous les animaux
router.get("/:id", animalController.getAnimalById); // Route pour obtenir un animal par son ID --> détail d'un animal
router.post("/", animalController.createAnimal); // Route pour créer un nouvel animal
router.patch("/:id", animalController.updateAnimal); // Route pour modifier un animal par son ID
router.delete("/:id", animalController.deleteAnimal); // Route pour supprimer un animal par son ID



