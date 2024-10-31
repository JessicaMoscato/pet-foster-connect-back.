//! Router secondaire pour la page de login (prefixe de route : /api/signin)

import { Router } from "express";
import { signinController } from "../controllers/signinController.js"; /* controlleur et chemin à vérifier */

export const router = Router();

/* Vérifier le nom des méthodes */
router.post("/", signinController.signinUser);