const express = require("express");
const orderRouter = express.Router();
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const { protect } = require("../middlewares/Auth");

// Créer une nouvelle commande
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Validation des données
    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ message: "Aucun article dans la commande" });
    }

    // Création de la commande
    const order = new Order({
      orderItems,
      user: req.user._id, // L'utilisateur connecté (injecté par le middleware `protect`)
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    if (createdOrder) {
      res.status(201).json(createdOrder);
    } else {
      res.status(500).json({ message: "Échec de la création de la commande" });
    }
  })
);

module.exports = orderRouter;
