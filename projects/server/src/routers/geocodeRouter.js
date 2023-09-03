const express = require("express");
const router = express.Router();
const { geocodeController } = require("../controllers");

router.get("/geocode", geocodeController.getGeocode);

module.exports = router;