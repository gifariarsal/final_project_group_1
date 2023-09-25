const db = require("../../models");
const { Op } = require("sequelize");
const Voucherdetail = db.Voucherdetail;

const voucherController = {
  createDiscountVoucher: async (req, res) => {
    try {
      const { name, product_id, description, nominal, percent, type, expired } =
        req.body;

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
};

module.exports = voucherController;
