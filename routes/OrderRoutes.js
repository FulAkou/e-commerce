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

//order payment route
orderRouter.put(
  "/:id/payment",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      console.log(updatedOrder);
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Commande non trouvée" });
    }
  })
);

//get all orders
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: "Commandes non trouvées" });
    }
  })
);

//get order by id
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "email");
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Commande non trouvée" });
    }
  })
);

module.exports = orderRouter;
