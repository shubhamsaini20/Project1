const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { Order } = require("../Modals/orders.modal.js");

router
  .route("/")
  .get((req, res) => {
    let { user } = req;

    let { cartItems } = user;

    return res.status(200).json({
      message: "cartItems fetch  successfully Done",
      cartItems: cartItems,
    });
  })

  .post(async (req, res) => {
    const {
      order: { address, userID, orderID, amount, orderItems, payID },
    } = req.body;
    let { user } = req;
    let { cartItems } = req.user;

    try {
      const NewOrder = new Order({
        object: "order",
        razorpay_orderID: orderID,
        amount: amount,
        orderItems: orderItems,
        userID,
        address: address,
        paymentID: payID,
      });
      const savedOrder = await NewOrder.save();
      user.cartItems = [];
      await user.save();

      res.status(201).json({
        message: "new order is created",
        order: savedOrder,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  });

module.exports = router;
