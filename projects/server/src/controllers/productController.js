const { Sequelize } = require("sequelize");
const db = require("../../models");
const { check } = require("express-validator");
const cart = db.Cart
const cartItems = db.Cartitem
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

  addCartItem: async (req, res) => {
    try {
      const {id} = req.user
      const { total_price, cartId, item } = req.body;
      console.log("??", cartId, item)
      const checkUser = await cart.findOne({where : {user_id : id}})
      console.log("cart back => ", checkUser)
      await db.sequelize.transaction(async (t) => {
        const result = await cart.update({total_price : total_price }, {where : {user_id : id}}, { transaction: t });
        // const addItem = await cartItems.create({name : })
        return res.status(200).json({ message: "Success", data : result });
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed", error: error.message });
    }
  },
  // addCartItem : async (req, res) => {
  //   try {
  //     const {id} = req.user
  //     const checkCart = await cart.findOne({where : user_id.id})
  //     console.log("check Cart =>", checkCart)
  //     const {cartId, item} = req.body
  //     console.log("addcartItem", cartId, item)
  //     await db.sequelize.transaction(async(t) => {
  //       const result = await cartItems.create({ name:item.name, product_id:item.id, quantity: item.quantity,  cart_id:cartId, price : item.price}, {transaction : t})
  //       return res.status(200).json({message : "Success"})
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  // getItem : async(req, res) => {
  //   try {
  //     const item = await cartItems.findAll({
  //       attributes: {
  //         exclude: ["createdAt", "updatedAt", "category_id"],
  //       },
  //     })
  //     return res.status(200).json({message : "Success", data : item})
  //   } catch (error) {
  //     return res.status(500).json({message : "Failed"})
  //   }
  // }
  
};

module.exports = productController;
