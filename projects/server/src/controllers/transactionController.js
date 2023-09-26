const { Sequelize, Op } = require("sequelize");
const db = require("../../models");
const { Transaction, Product, Transactionitem } = db;

const setPagination = (limit, page) => {
  const offset = (page - 1) * +limit;
  return { limit: parseInt(limit), offset };
};

const transactionController = {
  getTransaction: async (req, res) => {
    try {
      const { page = 1, limit = 3, order = "DESC", orderBy = "id", startDate, endDate } = req.query;
      let filter = {};
      if (startDate) filter.createdAt = { [Op.gte]: new Date(startDate) };
      if (endDate) filter.createdAt = { [Op.lte]: new Date(endDate).setHours(23, 59, 59) };
      if (startDate && endDate) {
        filter = {
          createdAt: { [Op.between]: [new Date(startDate), new Date(endDate).setHours(23, 59, 59)] },
        };
      }

      const pagination = setPagination(limit, page);
      const totalTransaction = await Transaction.count({
        where: {
          user_id: req.user.id,
          status: { [Op.lt]: 5 },
          ...filter,
        },
      });
      const totalPage = Math.ceil(totalTransaction / +limit);
      console.log("order", orderBy);
      const transaction = await Transaction.findAll({
        where: {
          user_id: req.user.id,
          status: {
            [Op.lt]: 5,
          },
          ...filter,
        },
        ...pagination,
        order: [[orderBy, order]],
      });
      res.status(200).json({ message: "Get Transaction Success", totalPage, data: transaction });
    } catch (error) {
      res.status(500).json({ message: "Get Transaction Failed", error: error.message });
    }
  },
  getFinishedTransaction: async (req, res) => {
    try {
      const { page = 1, limit = 3, order = "ASC", orderBy = "name", startDate, endDate } = req.query;

      let filter = {};
      if (startDate) filter.createdAt = { [Op.gte]: new Date(startDate) };
      if (endDate) filter.createdAt = { [Op.lte]: new Date(endDate).setHours(23, 59, 59) };
      if (startDate && endDate) {
        filter = { createdAt: { [Op.between]: [new Date(startDate), new Date(endDate).setHours(23, 59, 59)] } };
      }

      const pagination = setPagination(limit, page);
      const totalTransaction = await Transaction.count({
        where: {
          user_id: req.user.id,
          status: { [Op.gte]: 5 },
          ...filter,
        },
      });
      const totalPage = Math.ceil(totalTransaction / +limit);

      const transaction = await Transaction.findAll({
        where: {
          user_id: req.user.id,
          status: { [Op.gte]: 5 },
          ...filter,
        },
        ...pagination,
        order: [[orderBy, order]],
      });
      res.status(200).json({ message: "Get Transaction Success", totalPage, data: transaction });
    } catch (error) {
      res.status(500).json({ message: "Get Transaction Failed", error: error.message });
    }
  },

  getTransactionItemOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Transactionitem.findAll({ where: { transaction_id: id }, include: Product });
      res.status(200).json({ message: "Get Transaction Success", data: item });
    } catch (error) {
      res.status(500).json({ message: "Get Transaction Item Failed", error: error.message });
    }
  },
};

module.exports = transactionController;
