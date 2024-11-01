//! Router secondaire pour les routes liées aux familles d'accueil (prefixe de route : /api/family)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js";
import { familyController } from "../controllers/familyController.js"; 

export const router = Router();


router.get("/", withTryCatch(familyController.getAllFamilies)); // Route pour lister toutes les familles
router.get("/:id", withTryCatch(familyController.getFamilyById)); // Route pour obtenir le détail d'une famille
