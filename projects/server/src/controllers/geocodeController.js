const axios = require("axios");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const API_KEY = process.env.API_KEY;

const geocodeController = {
  getGeocode: async (req, res) => {
    const { query } = req.query;

    try {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: query,
            key: API_KEY,
          },
        }
      );

      const locationData = response.data.results[0];
      res.json(locationData);
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengakses OpenCage API." });
    }
  },
};

module.exports = geocodeController;
