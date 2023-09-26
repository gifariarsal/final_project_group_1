const db = require("../../models");
const { Op } = require("sequelize");
const Voucherdetail = db.Voucherdetail;

const voucherController = {
  createDiscountVoucher: async (req, res) => {
    try {
      const { name, product_id, description, nominal, percent, minimum_payment, type, expired } =
        req.body;

      const expirationDate = new Date(expired);
      const currentDate = new Date();

      if (expirationDate <= currentDate) {
        return res
          .status(400)
          .json({ message: "Expired date must be in the future" });
      }

      const voucherExist = await Voucherdetail.findOne({
        where: { name },
      });

      if (voucherExist) {
        return res.status(400).json({ message: "Voucher already exists" });
      }

      if (nominal > 0 && percent > 0) {
        return res.status(400).json({
          message: "You must fill either nominal or percent, not both",
        });
      }

      await db.sequelize.transaction(async (t) => {
        const newVoucher = await Voucherdetail.create(
          {
            name,
            product_id,
            description,
            nominal,
            percent,
            type,
            expired,
          },
          { transaction: t }
        );
        return res.status(200).json({
          message: "Voucher created",
          data: newVoucher,
        });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getAdminVoucher: async (req, res) => {
    try {
      const currentDate = new Date();
      const vouchers = await Voucherdetail.findAll({
        where: {
          isactive: true,
          name: {
            [Op.notLike]: "Referral Voucher",
          },
        },
        attributes: { exclude: ["createdAt", "updatedAt", "isactive"] },
      });
      return res.status(200).json({ message: "Success", vouchers });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deleteVoucher: async (req, res) => {
    try {
      const { id } = req.params;
      await db.sequelize.transaction(async (t) => {
        await Voucherdetail.update(
          { isactive: false },
          { where: { id } },
          { transaction: t }
        );
        return res.status(200).json({ message: "Voucher deleted" });
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = voucherController;
