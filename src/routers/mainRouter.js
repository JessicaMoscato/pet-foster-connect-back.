//! Router principal
import { Router } from "express";
import { errorHandler } from '../middlewares/errorhandle.js'; // Importation du gestionnaire d'erreurs global
import  HttpError  from "../middlewares/httperror.js"; // Importation de la classe d'erreur HTTP personnalisée
import withTryCatch from "../controllers/withTryCatchController.js";

import { router as animalRouter } from "./animalRouter.js"; // Importation du routeur secondaire animalRouter
import { router as askRouter } from "./askRouter.js"; // Importation du routeur secondaire askRouter
import { router as associationRouter } from "./associationRouter.js"; // Importation du routeur secondaire associationRouter
import { router as familyRouter } from "./familyRouter.js"; // Importation du routeur secondaire familyRouter
import { router as userRouter } from "./userRouter.js"; // Importation du routeur secondaire userRouter

import { signinController } from "../controllers/signinController.js"; // Importation du Controller signinController pour la connexion
import { signupController } from "../controllers/signupController.js"; // Importation du Controller signupController pour l'inscription


const router = Router();

//! Ajout des sous-routeurs
router.use("/association", associationRouter); // toutes les routes commencant par /association seront traitées par associationRouter
router.use("/animal", animalRouter); // toutes les routes commencant par /animal seront traitées par animalRouter
router.use("/ask", askRouter); // toutes les routes commencant par /ask seront traitées par askRouter
router.use("/family", familyRouter); // toutes les routes commencant par /family seront traitées par familyRouter
router.use("/user", userRouter);// toutes les routes commencant par /user seront traitées par userRouter

router.post("/signin", withTryCatch(signinController.signinUser)); // Connexion
router.post("/signup", withTryCatch(signupController.signupUser)); // Inscription


// !Middleware pour gérer les routes non trouvées
router.use((req, res, next)=>{
  next(new HttpError(404, "Resource not found")); // Crée une erreur 404 pour toute route non gérée
});

// !Middleware de gestion globale des erreurs
router.use(errorHandler); // Utilise le gestionnaire d'erreurs global pour traiter toutes les erreurs


export default router; // Exportation par défaut du routeur