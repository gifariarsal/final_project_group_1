const { Sequelize, Op } = require("sequelize");
const db = require("../../models");
const { Transaction, Product, Transactionitem, Cart, Cartitem, Voucherdetail, Uservoucher } = db;

const createFreeShippingVoucher = async (userId) => {
  try {
    const successfulTransactionsCount = await Transaction.count({
      where: {
        user_id: userId,
        status: {
          [Op.gte]: 5,
        },
      },
    });
    if (successfulTransactionsCount % 5 === 0) {
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
      const newVoucher = await Voucherdetail.create({
        name: "Free Shipping Voucher",
        description: "Get free shipping on your next purchase",
        nominal: 0,
        percent: 100,
        type: "freedelivery",
        expired: sevenDaysFromNow,
      });

      await Uservoucher.create({
        user_id: userId,
        voucherdetail_id: newVoucher.id,
        isused: false,
      });

      console.log("Free Shipping Voucher created for user:", userId);
    }
  } catch (error) {
    console.error("Failed to create Free Shipping Voucher:", error);
  }
};

const transactionController = {
  getTransaction: async (req, res) => {
    try {
      const transaction = await Transaction.findAll({
        where: {
          user_id: req.user.id,
          status: {
            [Op.lt]: 5,
          },
        },
      });
      console.log("transaction", transaction);
      res
        .status(200)
        .json({ message: "Get Transaction Success", data: transaction });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Get Transaction Failed", error: error.message });
    }
  },
  getFinishedTransaction: async (req, res) => {
    try {
      const transaction = await Transaction.findAll({
        where: {
          user_id: req.user.id,
          status: {
            [Op.gte]: 5,
          },
        },
      });
      console.log("transaction", transaction);
      res
        .status(200)
        .json({ message: "Get Transaction Success", data: transaction });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Get Transaction Failed", error: error.message });
    }
  },

  getTransactionItemOne: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Transactionitem.findAll({
        where: { transaction_id: id },
        include: Product,
      });
      res.status(200).json({ message: "Get Transaction Success", data: item });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Get Transaction Item Failed", error: error.message });
    }
  },
  checkout: async (req, res) => {
    try {
      const { id } = req.user;
      const cart = await Cart.findOne({ where: { user_id: id } });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const cartItems = await Cartitem.findAll({ where: { cart_id: cart.id } });

      const {
        name,
        total_price,
        delivery_price,
        address,
        city_id,
        store_id,
        voucher_discount,
        courier,
      } = req.body;

      let total_discount = 0;
      for (const cartItem of cartItems) {
        const product = await Product.findByPk(cartItem.product_id);
        total_discount += product.admin_discount;
      }

      total_discount += voucher_discount;

      const newTransaction = await Transaction.create({
        user_id: id,
        name,
        total_price,
        delivery_price,
        total_discount,
        address,
        city_id,
        store_id,
        courier,
        status: 0,
      });

      for (const cartItem of cartItems) {
        const product = await Product.findByPk(cartItem.product_id);

        await Transactionitem.create({
          transaction_id: newTransaction.id,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
          admin_discount: product.admin_discount,
          voucher_discount,
          price: product.price,
        });
      }

      if (total_price >= 100000) {
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
        const newVoucher = await Voucherdetail.create({
          name: "Shop More, Save More",
          description: "Special discount after spending more than Rp.100.000",
          nominal: 5000,
          percent: null,
          type: "discount",
          expired: sevenDaysFromNow,
        });

        await Uservoucher.create({
          user_id: id,
          voucherdetail_id: newVoucher.id,
          isused: false,
        });
      };

      await createFreeShippingVoucher(id);
      await Cartitem.destroy({ where: { cart_id: cart.id } });
      await cart.update({ total_price: 0 });
      await cart.save();

      return res.status(200).json({ message: "Checkout successful", transaction: newTransaction });
    } catch (error) {
      return res.status(500).json({ message: "Failed", error: error.message });
    }
  },
};

module.exports = transactionController;
