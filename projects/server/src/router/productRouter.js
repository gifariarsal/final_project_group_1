const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middleware/auth");

router.get("/", productController.getProduct);
router.get("/store", productController.getProductStore);
router.patch("/cart", verifyToken, productController.addCartItem)
// router.post("/cart", verifyToken, productController.addCart)
// router.post("/cart/item", verifyToken, productController.addCartItem)
// router.get("/item", verifyToken, productController.getItem)
module.exports = router;
