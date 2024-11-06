//! Router secondaire pour les routes liées aux alertes (prefixe de route : /api/ask)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js";
import { askController } from "../controllers/askController.js"; 

export const router = Router();

// association
router.get("/", withTryCatch(askController.getAllAsks)); // Route pour lister toutes les demandes 
router.get("/:id", withTryCatch(askController.getAskById)); // Route pour obtenir le détail d'une demande

//family
router.post ("/", withTryCatch(askController.createAsk)); // Route pour créer une nouvelle demande

//association
router.patch("/:id", withTryCatch(askController.patchAsk)); // Route pour modifier une demande

