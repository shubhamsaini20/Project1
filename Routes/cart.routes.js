const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { User } = require("../Modals/users.modal.js");
const { Product } = require("../Modals/products.modal");
const { checkCartID } = require("../controllers/cart.controller");


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
    let { user } = req;
    let { cartItems } = user;
    const { productId } = req.body;
    const isItemInCartExist = await cartItems.find(
      (items) => items.product._id == productId
    );

    if (isItemInCartExist) {
      res.status(403).json({ message: " item is already in cart " });
    } else {
      let cartItem = { product: productId, quantity: 1 };
      cartItems.push(cartItem);

      await user.save();
      user = await user.populate("cartItems.product").execPopulate();
      res.status(201).json({
        message: " new product in cart is added ",
        addedCartItem: productId,
        userData: user,
      });
    }
  });

router.param("cartID", checkCartID);

router
  .route("/:cartID")
  .get(async (req, res) => {
    const { cartItem } = req;

    res.status(200).json({ cartItems: cartItem });
  })

  .post(async (req, res) => {
    const { quantity } = req.body;
    let { cartItem, user } = req;

    if (quantity === "inc") {
      cartItem.quantity = cartItem.quantity + 1;
      await user.save();

      res.status(201).json({
        message: " cart item quantity increase by 1 ",
        user,
        updatedCartItem: cartItem,
      });
    } else if (quantity === "dec") {
      cartItem.quantity = cartItem.quantity - 1;
      await user.save();

      res.status(201).json({
        message: "cart item quantity decrease by 1  ",
        user,
        updatedCartItem: cartItem,
      });
    } else {
      res.status(400).json({ message: " quantity is not valid " });
    }
  })

  .delete(async (req, res) => {
    let { cartItem, user } = req;
    // console.log(user.cartItem)
    await cartItem.remove();

    await user.save();
    res.status(204).send();
  });

module.exports = router;
