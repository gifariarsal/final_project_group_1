const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");

router.post("/", addressController.addAddress);
router.get("/", addressController.getAddress);
router.put("/:id", addressController.updateAddress);
router.patch("/:id", addressController.deleteAddress);
router.put("/:id/set-default",addressController.setPrimaryAddress);

module.exports = router;
