//! Router secondaire pour les routes liées aux familles d'accueil (prefixe de route : /api/family)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js"; // Importation du sélectionrateur de gestion d'erreurs avec try/catch pour middlewares asynchrones
import { familyController } from "../controllers/familyController.js"; // Importation du Controller familyController
import { isRoleAuthorizedMiddleware } from "../middlewares/rightsMiddleware.js"; // Importation du Middleware de vérification des droits



export const router = Router();

//* Routes accessibles uniquement aux admin et aux associations
router.get("/", isRoleAuthorizedMiddleware(["admin","Association"]),withTryCatch(familyController.getAllFamilies)); // Route pour lister toutes les familles
router.get(  "/:id", isRoleAuthorizedMiddleware(["admin", "association"]), withTryCatch(familyController.getFamilyById)); // Route pour obtenir le détail d'une famille
