const { Sequelize } = require("sequelize");
const db = require("../../models");
const { check } = require("express-validator");
const { Product, Category, Store, ProductStore } = db;

const includeStore = [{ model: Store, attributes: { exclude: ["createdAt", "updatedAt"] } }];
const includeCategory = [{ model: Category, attributes: { exclude: ["createdAt", "updatedAt"] } }];
const includeProductStore = [
  { model: Product, attributes: { exclude: ["createdAt", "updatedAt"] }, include: includeCategory },
];

const productController = {
  getProduct: async (req, res) => {
    try {
      const products = await Product.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "category_id"],
        },
        include: includeCategory,
      });
      res.status(200).json({ data: products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProductStore: async (req, res) => {
    try {
      const { store_id } = req.query;
      console.log(store_id);
      const storeProducts = await ProductStore.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "product_id", "store_id"],
        },
        where: { store_id },
        include: [...includeProductStore, ...includeStore],
      });
      res.status(200).json({ data: storeProducts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },  
};

module.exports = productController;
