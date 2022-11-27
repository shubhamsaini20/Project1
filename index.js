require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

const { checkUserID } = require("./controllers/users.controller.js");

const authVerify = require("./middlewares/authVerify.middleware.js");
const {
  routeErrorHandler,
} = require("./middlewares/routeErrorHandler.middleware.js");
const { errorHandler } = require("./middlewares/errorHandler.middleware.js");

//db connect

const { initializeDBConnection } = require("./db/db.connect.js");
const PORT = 4000;
initializeDBConnection();

// routes

const productV1 = require("./Routes/products.routes");
const userV1 = require("./Routes/users.routes.js");
const cartV1 = require("./Routes/cart.routes.js");

const wishListV1 = require("./Routes/wishList.routes.js");
// const razorpayV1 = require("./Routes/razorpay.routes.js");
const orderV1 = require("./Routes/order.routes.js");

app.use("/v1/products", productV1);
app.use("/v1/", userV1);

// app.use("/v1/checkout", razorpayV1);

app.param("userID", checkUserID);

app.use("/v1/users/:userID/cart", authVerify, cartV1);
app.use("/v1/users/:userID/wishlist", authVerify, wishListV1);

app.use("/v1/users/:userID/order", authVerify, orderV1);

// 404 Route Handler

app.use(routeErrorHandler);

//  Error Handler

app.use(errorHandler);

// port establish

app.listen(PORT, () => {
  console.log("server started");
});
