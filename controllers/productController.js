const Product = require("../models/Product");

// GET PRODUCTS
const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ADD PRODUCT
const addProduct = async (req, res) => {

  try {
        console.log(req.body);


    const {
      name,
      price,
      image,
      description,
      stock,
      rating,
      reviews,
      category,
      productType

    } = req.body;

    const product = await Product.create({
      name,
      price,
      image,
      description,
      stock,
      rating,
      reviews,
      category,
      productType
    });

    res.status(201).json({
      message: "Product Added Successfully",
      product
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getProducts,
  addProduct
};