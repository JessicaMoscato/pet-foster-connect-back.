//! Router secondaire pour les routes liées aux associations (prefixe de route : /api/association)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js"; // Importation du sélectionrateur de gestion d'erreurs avec try/catch pour middlewares asynchrones
import { associationController } from "../controllers/associationController.js";  // Importation du Controller associationController


export const router = Router();

//* Routes publiques
router.get("/", withTryCatch(associationController.getAllAssociations)); // Route pour lister toutes les associations
router.get("/:id", withTryCatch(associationController.getAssociationById)); // Route pour obtenir le détail d'une association
