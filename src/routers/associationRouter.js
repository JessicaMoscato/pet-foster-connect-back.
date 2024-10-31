//! Router secondaire pour les routes liées aux associations (prefixe de route : /api/association)
//! Toutes les routes définies ici auront automatiquement le préfixe /api/association
import { Router } from "express";
import { associationController } from "../controllers/associationController.js"; /* controlleur et chemin à vérifier */

export const router = Router();

/* Vérifier le nom des méthodes */
router.get("/", associationController.getAllAssociations); // Route pour lister toutes les associations
router.get("/:id", associationController.getAssociationById); // Route pour obtenir le détail d'une association
