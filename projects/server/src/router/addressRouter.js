const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.post("/", addressController.addAddress);
router.get("/:id", addressController.getAddress);
router.patch("/deactivate/:id", addressController.deleteAddress);
router.patch("/default/:id",addressController.setPrimaryAddress);
router.patch("/:id", addressController.updateAddress);

module.exports = router;
