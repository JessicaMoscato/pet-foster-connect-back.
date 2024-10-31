//! Router secondaire pour les routes liées aux utilisateurs (prefixe de route : /api/user)

import { Router } from "express";
import { userController } from "../controllers/userController.js"; 

export const router = Router();


router.post("/", userController.createUser); // Route pour créer un nouvel utilisateur
router.patch("/:id", userController.updateUser); // Route pour modifier un utilisateur par son ID
router.delete("/:id", userController.deleteUser); // Route pour supprimer un utilisateur par son ID

