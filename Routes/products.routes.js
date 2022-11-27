const express = require("express");
const router = express.Router();
const { extend } = require("lodash");
const { checkProductID } = require("../controllers/products.controller");

const { Product } = require("../Modals/products.modal");

router
  .route("/")
  .get(async (req, res) => {
      try{
              const products = await Product.find({});

            res
      .status(201)
      .json({ message: " Fetch Successfully Done ", products });
      }
catch(error){
    res.status(401).json({message:error.message})
}
  
  })




  .post(async (req, res) => {
    const product = req.body;

    try {
      const NewProduct = new Product(product);
      const savedProduct = await NewProduct.save();

      res.status(201).json({
        message: " a new product is saved  ",
        products: savedProduct,
      });
    } catch (error) {
        res.status(400).json({
        message: error.message,
      });
    }
  });




router.param('productID',checkProductID)


router
  .route("/:productID")

  .get((req, res) => {
    let { product } = req;
    product.__v = undefined;

    res.status(200).json({  product });
  })



  .post(async (req, res) => {
    let { product } = req;
    const updateProduct = req.body;
    product = extend(product, updateProduct);
    product = await product.save();
    res.status(201).json({  message: "product updated", product });
  })


  .delete(async (req, res) => {
    let { product } = req;
    product = await product.remove();
    res.status(204);
  });


  
module.exports = router;
