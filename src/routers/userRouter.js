//! Router secondaire pour les routes liées aux utilisateurs (prefixe de route : /api/user)

import { Router } from "express";
import withTryCatch from "../controllers/withTryCatchController.js";
import { userController } from "../controllers/userController.js"; 
import { validate } from "../validation/validate.js";

import {  patchSchema } from "../validation/allUser.js";
import {  isAssociationMiddleware,  isFamilyMiddleware,isAdminMiddleware} from "../middlewares/rightsMiddleware.js";

export const router = Router();


router.get("/", withTryCatch(userController.getAllUsers)); // Route pour lister tous les utilisateurs RESTCLient

//* Routes accessibles uniquement aux associations et aux familles d'accueil
router.patch("/:id", isAssociationMiddleware,isFamilyMiddleware,validate(patchSchema, "body"),withTryCatch(userController.patchUser)); // Route pour modifier un utilisateur par son ID

//* Routes accessibles uniquement aux admin, aux associations et aux familles d’accueil
router.delete("/:id", isAdminMiddleware,isAssociationMiddleware,isFamilyMiddleware,withTryCatch(userController.deleteUser)); // Route pour supprimer un utilisateur par son ID


