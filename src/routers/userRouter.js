//! Router secondaire pour les routes liées aux utilisateurs (prefixe de route : /api/user)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js";
import { userController } from "../controllers/userController.js"; 

export const router = Router();

router.get("/", withTryCatch(userController.getAllUsers)); // Route pour lister tous les utilisateurs
router.post("/", withTryCatch(userController.createUser)); // Route pour créer un nouvel utilisateur
router.patch("/:id", withTryCatch(userController.patchUser)); // Route pour modifier un utilisateur par son ID
router.delete("/:id", withTryCatch(userController.deleteUser)); // Route pour supprimer un utilisateur par son ID

