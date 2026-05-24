const mongoose = require("mongoose");

const productSchema =
  new mongoose.Schema({

    name: String,

    price: Number,

    image: String,

    description: String,

    stock: Number,

    rating: Number,

    reviews: Number,

    category: String,

    productType: {

      type: String,

      enum: [
        "bestSeller",
        "new",
        "trending"
      ],

      default: "new"

    }

  },
  {
    timestamps: true
  });

module.exports =
  mongoose.model(
    "Product",
    productSchema
  );