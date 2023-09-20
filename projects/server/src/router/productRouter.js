const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");

router.get("/", productController.getProduct);
router.get("/store", productController.getProductStore);
router.get("/detail", productController.getProductStock);
router.get("/stock", productController.getStoreProductEachBranch);
router.get("/search", productController.getSearchProduct);
router.post("/", multerUpload.single("product_img"), productController.createProduct)
router.patch("/:id", multerUpload.single("product_img"), productController.updateProduct)
router.patch("/image/:id", multerUpload.single("product_img"), productController.updateProductImage)

module.exports = router;
