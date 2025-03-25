const express = require("express");
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken"); // Ajoute une fonction pour générer un token

const userRouter = express.Router();

userRouter.post(
  "/login",
  AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    console.log("Données reçues:", req.body); // Debugging

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir un email et un mot de passe" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Utilisateur non trouvé avec cet email:", email);
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log("Mot de passe incorrect pour l'utilisateur:", email);
      return res
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      token: generateToken(user._id), // Génération de token sécurisé
    });
  })
);

//create a user
module.exports = userRouter;
