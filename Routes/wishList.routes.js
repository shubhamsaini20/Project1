const express = require("express");
const router = express.Router();
const { extend } = require("lodash");

const mySecret = process.env["secret"];

const { User } = require("../Modals/users.modal.js");

router
  .route("/")

  .get((req, res) => {
    const { wishListItems } = req.user;
    res.status(200).json({ wishListItems });
  })

  .post(async (req, res) => {
    let { user } = req;
    let { wishListItems } = req.user;

    const { productId } = req.body;

    const checkWishListExist = await wishListItems.find(
      (video) => video._id == productId
    );

    if (checkWishListExist) {
      return res
        .status(422)
        .json({ message: " item is already exist in wishlist " });
    } else {
      wishListItems.push(productId);
      await user.save();
      user = await user.populate("wishListItems").execPopulate();

      return res.status(201).json({
        message: "new item added in wishList ",
        userData: user,
        addedWishlistItem: productId,
      });
    }
  })
  .delete(async (req, res) => {
    let { user } = req;
    let { wishListItems } = user;
    const { productId } = req.body;

    const getUpdatedWishList = await wishListItems.filter(
      (items) => items.id != productId
    );

    user.wishListItems = getUpdatedWishList;
    await user.save();
    user = await user.populate("wishListItems").execPopulate();

    res.status(204).send();

    // .json({
    //     status:201,
    //     message:'wishlistItem is deleted',
    //     deletedWishListItem:productId,
    //     userData:user
    // })
  });

module.exports = router;
