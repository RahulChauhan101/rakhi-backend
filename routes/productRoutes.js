const express = require("express");
const router = express.Router();

const {
  getProducts,
  addProduct
} = require("../controllers/productController");

// GET ALL PRODUCTS
router.get("/", getProducts);

// ADD PRODUCT
router.post("/add", addProduct);

// GET SINGLE PRODUCT BY ID
router.get("/:id", async (req, res) => {
  const Product = require("../models/Product"); // import model if not already
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;