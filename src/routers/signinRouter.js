//! Router secondaire pour la page de login (prefixe de route : /api/signin)

import { Router } from "express";
import { withTryCatch } from "../controllers/withTryCatchController.js";
import { signinController } from "../controllers/signinController.js";
export const router = Router();


router.post("/", withTryCatch(signinController.signinUser));