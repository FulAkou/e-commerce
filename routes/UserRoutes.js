const express = require("express");
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken"); // Ajoute une fonction pour générer un token
const { protect } = require("../middlewares/Auth");

const userRouter = express.Router();

//Login User
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

//create User
userRouter.post(
  "/",
  AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(400);
      throw new Error("User already exist");
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        token: generateToken(user._id), // Génération de token safegarder
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);

//get user profile
userRouter.get(
  "/profile",
  protect,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

//update user profile
userRouter.put(
  "/profile",
  protect,
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

module.exports = userRouter;
