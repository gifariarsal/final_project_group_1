const db = require("../../models");
const UserAddress = db.Useraddress;

const addressController = {
  addAddress: async (req, res) => {
    try {
      const { user_id, address, longitude, latitude } = req.body;

      const existingAddress = await UserAddress.findOne({
        where: { user_id, address, isactive: true },
      });

      if (existingAddress) {
        return res.status(400).json({ message: "Address already exists" });
      }

      await db.sequelize.transaction(async (t) => {
        const newAddress = await UserAddress.create({
          user_id,
          address,
          longitude,
          latitude,
        });
        return res.status(200).json({ message: "Successfully added", data: newAddress });
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to add address" });
    }
  },

  getAddress: async (req, res) => {
    try {
      const id = req.params.id;
      const userAddress = await UserAddress.findAll({
        where: { user_id: id, isactive: true },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      return res
        .status(200)
        .json({ message: "Successfully retrieved", data: userAddress });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get address" });
    }
  },

  updateAddress: async (req, res) => {
    try {
      const { id } = req.params;
      const { user_id, address, longitude, latitude } = req.body;

      const existingAddress = await UserAddress.findOne({
        where: { user_id, address, isactive: true },
      });

      if (existingAddress) {
        return res.status(400).json({ message: "Address already exists" });
      }

      const updatedAddress = await UserAddress.findByPk(id);
      if (!updatedAddress) {
        return res.status(404).json({ message: "Address not found" });
      }

      await db.sequelize.transaction(async (t) => {
        await updatedAddress.update(
          {
            address,
            longitude,
            latitude,
          },
          { where: { id: id }, transaction: t }
        );

        return res.status(200).json({ message: "Address updated", data: updatedAddress });
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update address", error: error.message });
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const { id } = req.params;
      await db.sequelize.transaction(async (t) => {
        await UserAddress.update(
          { isactive: false },
          { where: { id: id }, transaction: t }
        );
        return res.status(200).json({ message: "Address deleted" });
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete address" });
    }
  },

  setPrimaryAddress: async (req, res) => {
    try {
      const addressId = req.params.id;

      const addressToSetPrimary = await UserAddress.findByPk(addressId);

      if (!addressToSetPrimary) {
        return res.status(404).json({ message: "Address not found" });
      }

      await UserAddress.update(
        { isdefault: false },
        { where: { user_id: addressToSetPrimary.user_id } }
      );

      addressToSetPrimary.isdefault = true;
      await addressToSetPrimary.save();

      return res.status(200).json({
        message: "Successfully set primary address",
        data: addressToSetPrimary,
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to set primary address" });
    }
  },
};

module.exports = addressController;
