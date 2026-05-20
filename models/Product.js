const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    image: {
      type: String
    },

    description: {
      type: String
    },

    stock: {
      type: Number,
      default: 0
    },

    rating: {
      type: Number,
      default: 0
    },

    reviews: {
      type: Number,
      default: 0
    },

    category: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);