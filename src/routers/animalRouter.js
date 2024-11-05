//! Router secondaire pour les routes liées aux animaux (prefixe de route : /api/animal)

import { Router } from "express";
import  withTryCatch  from "../controllers/withTryCatchController.js";
import { animalController } from "../controllers/animalController.js"; 
import { validate } from "../validation/validate.js";
import { createSchema, patchSchema } from "../validation/animal.js"

export const router = Router();


router.get("/", withTryCatch(animalController.getAllAnimals)); // Route pour lister tous les animaux
router.get("/:id", withTryCatch(animalController.getAnimalById)); // Route pour obtenir un animal par son ID --> détail d'un animal
router.post("/", validate(createSchema, 'body'), withTryCatch(animalController.createAnimal)); // Route pour créer un nouvel animal
router.patch("/:id", validate(patchSchema, 'body'), withTryCatch(animalController.patchAnimal)); // Route pour modifier un animal par son ID
router.delete("/:id", withTryCatch(animalController.deleteAnimal)); // Route pour supprimer un animal par son ID



