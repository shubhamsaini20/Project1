// check cart ID

async function checkCartID(req, res, next, id) {
  let { user } = req;
  let { cartItems } = user;

  try {
    const cartItemExist = await cartItems.find((items) => items._id == id);
    if (!cartItemExist) {
      const { productID } = req.body;
      if (productID) {
        const checkCartIDByProductID = await cartItems.find(
          (items) => items.product._id == productID
        );

        req.cartItem = checkCartIDByProductID;
        next();
      } else {
        res.status(404).json({ message: "cart ID is not Found " });
      }
    } else {
      req.cartItem = cartItemExist;
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

module.exports = { checkCartID };
