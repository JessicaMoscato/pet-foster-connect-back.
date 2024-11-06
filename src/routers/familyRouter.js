//! Router secondaire pour les routes liées aux familles d'accueil (prefixe de route : /api/family)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js";
import { familyController } from "../controllers/familyController.js";
import { isAssociationMiddleware, isAdminMiddleware } from "../middlewares/rightsMiddleware.js";

export const router = Router();

//* Routes accessibles uniquement aux admin et aux associations
router.get("/", isAdminMiddleware, isAssociationMiddleware,withTryCatch(familyController.getAllFamilies)); // Route pour lister toutes les familles
router.get("/:id", isAdminMiddleware, isAssociationMiddleware,withTryCatch(familyController.getFamilyById)); // Route pour obtenir le détail d'une famille
