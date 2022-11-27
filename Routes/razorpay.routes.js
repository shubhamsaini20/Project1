const express = require("express");
const router = express.Router();
const payID = process.env["pay"];
const payKey = process.env["payKey"];
const Razorpay = require("razorpay");
const crypto = require("crypto");
const SHA256 = require("crypto-js/sha256");
const shortid = require("shortid");
const signKey = process.env["hookSignKey"];
const { Order } = require("../Modals/orders.modal.js");

const razorpay = new Razorpay({
  key_id: payKey,
  key_secret: payID,
});

router.route("/payment").post(async (req, res) => {
  const payInfo = req.body;
  const options = {
    amount: payInfo.amount * 100,
    currency: payInfo.currency,
    receipt: shortid.generate(),
    payment_capture: 1,
  };
  try {
    const response = await razorpay.orders.create(options);
    res.status(200).json({
      info: response,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.route("/payment-capture").post(async (req, res) => {
  console.log("payment-capture");

  const shasum = crypto.createHmac("sha256", signKey);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("signature  verified");
    const razorpayBody = req.body;
    const pay_id = razorpayBody.payload.payment.entity.id;

    res.json({ status: "ok" });
  } else {
    res.status(400).send("Invalid signature");
  }
});

module.exports = router;
