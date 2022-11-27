const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    object: {
      type: String,
      required: true,
    },

    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    address: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      default: "pending",
    },

    razorpay_orderID: {
      type: String,
    },
    paymentID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
