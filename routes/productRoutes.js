const express = require("express");

const router = express.Router();

const {

  getProducts,
  addProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct

} = require("../controllers/productController");


// GET ALL PRODUCTS
router.get("/", getProducts);


// GET SINGLE PRODUCT
router.get("/:id", getSingleProduct);


// ADD PRODUCT
router.post("/add", addProduct);


// UPDATE PRODUCT
router.put("/:id", updateProduct);


// DELETE PRODUCT
router.delete("/:id", deleteProduct);


module.exports = router;