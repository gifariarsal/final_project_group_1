const db = require("../../models");
const Transaction = db.Transaction;
const TransactionItem = db.Transactionitem;
const Product = db.Product;
const Cart = db.Cart;
const CartItem = db.Cartitem;

const transactionController = {
  checkout: async (req, res) => {
    try {
      const { id } = req.user;
      const cart = await Cart.findOne({ where: { user_id: id } });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const cartItems = await CartItem.findAll({ where: { cart_id: cart.id } });

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

      // Tambahkan voucher_discount ke total_discount
      total_discount += voucher_discount;

      const newTransaction = await Transaction.create({
        user_id: id,
        name,
        total_price,
        delivery_price,
        total_discount, // Gunakan total_discount yang sudah diperbarui
        address,
        city_id,
        store_id,
        courier,
        status: 0,
      });

      for (const cartItem of cartItems) {
        const product = await Product.findByPk(cartItem.product_id);

        await TransactionItem.create({
          transaction_id: newTransaction.id,
          product_id: cartItem.product_id,
          quantity: cartItem.quantity,
          admin_discount: product.admin_discount,
          voucher_discount,
          price: product.price,
        });
      }

      // Hitung total harga, dll. untuk transaksi dan simpan di dalam newTransaction

      await CartItem.destroy({ where: { cart_id: cart.id } });

      return res
        .status(200)
        .json({ message: "Checkout successful", transaction: newTransaction });
    } catch (error) {
      return res.status(500).json({ message: "Failed", error: error.message });
    }
  },
};

module.exports = transactionController;
