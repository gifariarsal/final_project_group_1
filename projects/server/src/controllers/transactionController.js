const { Sequelize } = require("sequelize");
const db = require("../../models");
const { Transaction, Product, Transactionitem } = db;

const transactionController = {
  getTransaction: async (req, res) => {
    try {
      const transaction = await Transaction.findAll({ where: { user_id: req.user.id } });
      res.status(200).json({ message: "Get Transaction Success", data: transaction });
    } catch (error) {
      res.status(500).json({ message: "Get Transaction Failed", error: error.message });
    }
  },
  getTransactionItemOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Transactionitem.findOne({ where: { transaction_id: id }, include: Product });
      res.status(200).json({ message: "Get Transaction Success", data: item.Product });
    } catch (error) {
      res.status(500).json({ message: "Get Transaction Item Failed", error: error.message });
    }
  },
};

module.exports = transactionController;
