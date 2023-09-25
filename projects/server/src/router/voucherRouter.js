const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucherController");

router.post("/", voucherController.createDiscountVoucher);

module.exports = router;