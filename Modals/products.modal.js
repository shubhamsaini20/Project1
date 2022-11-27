const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    object: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },

    inStock: {
      type: Boolean,
      required: true,
    },

    delivery: {
      type: Boolean,
      required: true,
    },

    discount: {
      type: Number,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
