//! Router secondaire pour les routes liées aux animaux (prefixe de route : /api/animal)

import { Router } from "express";
import  withTryCatch  from "../controllers/withTryCatchController.js";
import { animalController } from "../controllers/animalController.js"; 
import { isAssociationMiddleware } from "../middlewares/rightsMiddleware.js";
import { verifyToken } from "../auth/verifyToken.js";

export const router = Router();

//* Routes publiques
router.get("/", withTryCatch(animalController.getAllAnimals)); // Route pour lister tous les animaux
router.get("/:id", withTryCatch(animalController.getAnimalById)); // Route pour obtenir un animal par son ID --> détail d'un animal



//* Routes accessibles uniquement aux associations
router.post("/", verifyToken,isAssociationMiddleware,withTryCatch(animalController.createAnimal)); // Route pour créer un nouvel animal
router.patch("/:id", verifyToken,isAssociationMiddleware,withTryCatch(animalController.patchAnimal)); // Route pour modifier un animal par son ID
router.delete("/:id", verifyToken,isAssociationMiddleware,withTryCatch(animalController.deleteAnimal)); // Route pour supprimer un animal par son ID


