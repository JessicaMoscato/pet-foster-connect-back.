//! Router secondaire pour les routes liées aux alertes (prefixe de route : /api/ask)

import { Router } from "express";
import { askController } from "../controllers/askController.js"; 

export const router = Router();


router.get("/", askController.getAllAsks); // Route pour lister toutes les demandes (de l'association)
router.get("/:id", askController.getAskById); // Route pour obtenir le détail d'une demande
router.post ("/", askController.createAsk); // Route pour créer une nouvelle demande
router.patch("/:id", askController.updateAsk); // Route pour modifier une demande

