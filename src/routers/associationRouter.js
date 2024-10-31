//! Router secondaire pour les routes liées aux associations (prefixe de route : /api/association)

import { Router } from "express";
import { withTryCatch } from "../controllers/withTryCatchController.js";
import { associationController } from "../controllers/associationController.js"; 

export const router = Router();


router.get("/", withTryCatch(associationController.getAllAssociations)); // Route pour lister toutes les associations
router.get("/:id", withTryCatch(associationController.getAssociationById)); // Route pour obtenir le détail d'une association
