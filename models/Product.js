const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(

  {

    // PRODUCT NAME
    name: {
      type: String,
      required: true
    },

    // URL SLUG
    slug: {
      type: String,
      unique: true
    },

    // DESCRIPTION
    description: {
      type: String,
      required: true
    },

    // MAIN PRICE
    price: {
      type: Number,
      required: true
    },

    discountPrice: {
      type: Number,
      default: 0
    },

    // BRAND
    brand: {
      type: String,
      default: ""
    },

    // CATEGORY
    category: {
      type: String,
      required: true
    },

    // SUB CATEGORY
    subCategory: {
      type: String,
      default: ""
    },

    // TOTAL STOCK
    stock: {
      type: Number,
      default: 0
    },

    // RATINGS
    rating: {
      type: Number,
      default: 0
    },

    reviews: {
      type: Number,
      default: 0
    },

    // MAIN IMAGES
    images: [
      {
        type: String
      }
    ],

    // VIDEO
    video: {
      type: String,
      default: ""
    },

    // COLORS
    colors: [
      {
        type: String
      }
    ],

    // SIZES
    sizes: [
      {
        type: String
      }
    ],

    // PRODUCT VARIANTS
    variants: [

      {

        color: {
          type: String
        },

        size: {
          type: String
        },

        stock: {
          type: Number,
          default: 0
        },

        price: {
          type: Number
        },

        discountPrice: {
          type: Number,
          default: 0
        },

        images: [
          {
            type: String
          }
        ]

      }

    ],

    // TAGS
    tags: [
      {
        type: String
      }
    ],

    // PRODUCT FLAGS
    isFeatured: {
      type: Boolean,
      default: false
    },

    isBestSeller: {
      type: Boolean,
      default: false
    },

    isTrending: {
      type: Boolean,
      default: false
    },

    // PRODUCT TYPE
    productType: {

      type: String,

      enum: [
        "bestSeller",
        "new",
        "trending"
      ],

      default: "new"

    },

    // ADMIN WHO ADDED PRODUCT
    createdBy: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User"

    }

  },

  {
    timestamps: true
  }

);

module.exports = mongoose.model(
  "Product",
  productSchema
);