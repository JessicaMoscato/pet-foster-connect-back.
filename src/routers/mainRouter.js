//! Router principal
import { Router } from "express";
import { errorHandler } from '../middlewares/errorhandle.js'; // Importation du gestionnaire d'erreurs global
import  HttpError  from "../middlewares/httperror.js"; // Importation de la classe d'erreur HTTP personnalisée

import { router as animalRouter } from "./animalRouter.js"; // Importation du routeur secondaire animalRouter
import { router as askRouter } from "./askRouter.js"; // Importation du routeur secondaire askRouter
import { router as associationRouter } from "./associationRouter.js"; // Importation du routeur secondaire associationRouter
import { router as familyRouter } from "./familyRouter.js"; // Importation du routeur secondaire familyRouter
import { router as userRouter } from "./userRouter.js"; // Importation du routeur secondaire userRouter
import { router as signinRouter } from "./signinRouter.js"; // Importation du routeur secondaire signinRouter



const router = Router();

//! Ajout des sous-routeurs
router.use("/association", associationRouter); // toutes les routes commencant par /association seront traitées par associationRouter
router.use("/animal", animalRouter); // toutes les routes commencant par /animal seront traitées par animalRouter
router.use("/ask", askRouter); // toutes les routes commencant par /ask seront traitées par askRouter
router.use("/family", familyRouter); // toutes les routes commencant par /family seront traitées par familyRouter
router.use("/user", userRouter);// toutes les routes commencant par /user seront traitées par userRouter
router.use("/signin", signinRouter);// toutes les routes commencant par /signin seront traitées par signinRouter


// !Middleware pour gérer les routes non trouvées
router.use((req, res, next)=>{
  next(new HttpError(404, "Resource not found")); 
});

// !Middleware de gestion globale des erreurs
router.use(errorHandler); 


export default router; 