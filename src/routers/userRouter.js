//! Router secondaire pour les routes liées aux utilisateurs (prefixe de route : /api/user)
//! Toutes les routes définies ici auront automatiquement le préfixe /api/user
import { Router } from "express";
import { userController } from "../controllers/userController.js"; /* controlleur et chemin à vérifier */

export const router = Router();

/* Vérifier le nom des méthodes  */
router.post("/", userController.createUser); // Route pour créer un nouvel utilisateur
router.patch("/:id", userController.updateUser); // Route pour modifier un utilisateur par son ID
router.delete("/:id", userController.deleteUser); // Route pour supprimer un utilisateur par son ID

