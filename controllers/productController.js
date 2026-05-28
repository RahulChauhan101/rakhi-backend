const Product = require("../models/Product");


// ================= GET ALL PRODUCTS =================
const getProducts = async (req, res) => {

  try {

    const products = await Product.find()
    .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      count: products.length,

      products

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ================= ADD PRODUCT =================
const addProduct = async (req, res) => {

  try {

    console.log(req.body);

    const {

      name,
      description,
      price,
      discountPrice,
      brand,
      category,
      subCategory,
      stock,
      images,
      video,
      colors,
      sizes,
      variants,
      tags,
      productType,
      isFeatured,
      isBestSeller,
      isTrending

    } = req.body;

    // VALIDATION
    if (
      !name ||
      !description ||
      !price ||
      !category
    ) {

      return res.status(400).json({

        success: false,

        message: "Required fields missing"

      });

    }

    // CREATE PRODUCT
    const product = await Product.create({

      name,
      description,
      price,
      discountPrice,
      brand,
      category,
      subCategory,
      stock,

      images,
      video,

      colors,
      sizes,

      variants,

      tags,

      productType,

      isFeatured,
      isBestSeller,
      isTrending

    });

    res.status(201).json({

      success: true,

      message: "Product Added Successfully",

      product

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ================= GET SINGLE PRODUCT =================
const getSingleProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found"

      });

    }

    res.status(200).json({

      success: true,

      product

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ================= UPDATE PRODUCT =================
const updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true
      }

    );

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found"

      });

    }

    res.status(200).json({

      success: true,

      message: "Product Updated Successfully",

      product

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// ================= DELETE PRODUCT =================
const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({

        success: false,

        message: "Product not found"

      });

    }

    res.status(200).json({

      success: true,

      message: "Product Deleted Successfully"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


module.exports = {

  getProducts,
  addProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct

};