const express = require("express");
const router = express.Router();
const voucherController = require("../controllers/voucherController");

router.post("/", voucherController.createDiscountVoucher);
router.get("/admin", voucherController.getAdminVoucher);
router.patch("/:id", voucherController.deleteVoucher);

module.exports = router;