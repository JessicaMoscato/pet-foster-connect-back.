//! Router secondaire pour les routes liées aux animaux (prefixe de route : /api/animal)

import { Router } from "express";
import  withTryCatch  from "../controllers/withTryCatchController.js"; // Importation du décorateur de gestion d'erreurs avec try/catch pour middlewares asynchrones
import { animalController } from "../controllers/animalController.js";  // Importation du Controller animalController
import { isAssociationMiddleware } from "../middlewares/rightsMiddleware.js"; // Importation du Middleware de vérification des droits
import { verifyToken } from "../auth/verifyToken.js"; // Importation du Middleware de vérification du token

export const router = Router();

//* Routes publiques
router.get("/", withTryCatch(animalController.getAllAnimals)); // Route pour lister tous les animaux
router.get("/:id", withTryCatch(animalController.getAnimalById)); // Route pour obtenir un animal par son ID --> détail d'un animal



//* Routes accessibles uniquement aux associations
router.post("/", /*verifyToken, isAssociationMiddleware,*/withTryCatch(animalController.createAnimal)); // Route pour créer un nouvel animal
router.patch("/:id", /*verifyToken, isAssociationMiddleware,*/withTryCatch(animalController.patchAnimal)); // Route pour modifier un animal par son ID
router.delete("/:id", /*verifyToken, isAssociationMiddleware,*/withTryCatch(animalController.deleteAnimal)); // Route pour supprimer un animal par son ID


