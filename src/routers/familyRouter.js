//! Router secondaire pour les routes liées aux familles d'accueil (prefixe de route : /api/family)
//! Toutes les routes définies ici auront automatiquement le préfixe /api/family
import { Router } from "express";
import { familyController } from "../controllers/familyController.js"; /* controlleur et chemin à vérifier */

export const router = Router();

/* Vérifier le nom des méthodes */
router.get("/", familyController.getAllFamilies); // Route pour lister toutes les familles
router.get("/:id", familyController.getFamilyById); // Route pour obtenir le détail d'une famille
