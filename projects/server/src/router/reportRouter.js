const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/user/:store_id", reportController.getUsersTransactionReportPerBranch);
router.get("/user/:user_id/:store_id", reportController.getUserTransactionPerUserId);
router.get("/product/history/:product_id/:store_id", reportController.getProductTransactionPerId);
router.get("/product/:store_id", reportController.getProductTransaction);
router.get("/transaction/:store_id", reportController.getReportTransactionStatusAll);
router.get("/:store_id", reportController.getReportTransaction);

module.exports = router;
