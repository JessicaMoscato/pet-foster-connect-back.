//! Router secondaire pour la page de login (prefixe de route : /api/signin)

import { Router } from "express";
import { signinController } from "../controllers/signinController.js";
export const router = Router();


router.post("/", signinController.signinUser);