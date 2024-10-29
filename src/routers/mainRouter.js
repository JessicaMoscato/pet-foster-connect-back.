//! router principal
import express from "express";


const router = express.Router();

router.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de Pet Foster Connect !");
});


export default router;