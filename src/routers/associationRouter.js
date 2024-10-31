//! Router secondaire pour les routes liées aux associations (prefixe de route : /api/association)

import { Router } from "express";
import { associationController } from "../controllers/associationController.js"; 

export const router = Router();


router.get("/", associationController.getAllAssociations); // Route pour lister toutes les associations
router.get("/:id", associationController.getAssociationById); // Route pour obtenir le détail d'une association
