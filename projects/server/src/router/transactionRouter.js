const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

const transactionController = require("../controllers/transactionController");

router.post("/", verifyToken, transactionController.checkout);

module.exports = router;