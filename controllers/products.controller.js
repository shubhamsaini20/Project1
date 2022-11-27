const { Product } = require("../Modals/products.modal");

// check product ID

async function checkProductID(req, res, next, id) {
  try {
    //   const isProductExistInUserCartItems =

    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product ID is not Found" });
    } else {
      req.product = product;
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

module.exports = { checkProductID };
