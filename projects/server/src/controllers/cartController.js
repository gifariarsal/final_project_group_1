const db = require("../../models");
const product = db.Product;
const cart = db.Cart;
const items = db.Cartitem;
const Store = db.Store;

const cartController = {
  addCartItem: async (req, res) => {
    try {
      const { id } = req.user;
      const { total_price, cartId, productId , store_id } = req.body;
      const checkCart = await cart.findOne({ where: { user_id: id } });
      const checkProduct = await product.findOne({ where: { id: productId } });
      const newPrice = checkProduct.price - checkProduct.admin_discount;
      const totalPrice = (checkCart.total_price += newPrice);
      const checkItem = await items.findOne({ where: { product_id: checkProduct.id } });
      await db.sequelize.transaction(async (t) => {
        const result = await cart.update({ total_price: totalPrice }, { where: { user_id: id } }, { transaction: t });
        if (checkItem) {
          if (checkItem.quantity === null) {
            checkItem.quantity = 1;
          }
          if (checkItem.quantity >= 0) {
            checkItem.quantity += 1;
          }
          checkItem.save();
          return res.status(200).json({ message: "Success" });
        } else {
          const addItem = await items.create({
            name: checkProduct.name,
            product_id: checkProduct.id,
            quantity: 1,
            price: newPrice,
            cart_id: checkCart.id,
            store_id : store_id,
          });
          return res.status(200).json({ message: "Success", data: addItem });
        }
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed", error: error.message });
    }
  },
  removeItemCart: async (req, res) => {
    try {
      const { id } = req.user;
      const { total_price, cartId, productId } = req.body;
      const checkCart = await cart.findOne({ where: { user_id: id } });
      const checkProduct = await product.findOne({ where: { id: productId } });
      const newPrice = checkProduct.price - checkProduct.admin_discount
      const totalPrice = (checkCart.total_price -= newPrice);
      const checkItem = await items.findOne({ where: { product_id: checkProduct.id } });
      await db.sequelize.transaction(async (t) => {
        if (totalPrice !== 0) {
          const result = await cart.update({ total_price: totalPrice }, { where: { user_id: id } }, { transaction: t });
        }
        if (checkItem) {
          if (checkItem.quantity > 1) {
            checkItem.quantity -= 1;
          }
          checkItem.save();
          console.log("quantity decrement ", checkItem.quantity);
          return res.status(200).json({ message: "Success" });
        }
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed", error: error.message });
    }
  },
  removeFromCart: async (req, res) => {
    try {
      const { id } = req.user;
      const { productId } = req.params;
      const checkCart = await cart.findOne({ where: { user_id: id } });
      const checkProduct = await product.findOne({ where: { id: productId } });
      const checkItem = await items.findOne({ where: { product_id: checkProduct.id } });
      const newPrice = checkItem.quantity * checkItem.price;
      const finalPrice = checkCart.total_price - newPrice;
      await db.sequelize.transaction(async (t) => {
        const result = await cart.update({ total_price: finalPrice }, { where: { user_id: id } });
        const response = await items.destroy({ where: { product_id: productId } }, { transaction: t });
      });
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: "Failed", error: error.message });
    }
  },
  getItemsCart: async (req, res) => {
    try {
      const { id } = req.user;
      const { productId } = req.params;

      const findCart = await cart.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: { user_id: id },
      });
      const findCartsItems = await items.findAll({
        include : [
          {
            model: Store,
            attributes: [`name`]
          }
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: { cart_id: findCart.id },
      });
      console.log("item", findCartsItems);
      res.status(200).json({ data: findCartsItems });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getCart: async (req, res) => {
    try {
      const findCart = await cart.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      return res.status(200).json({ message: "Success", data: findCart });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = cartController;
