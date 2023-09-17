const db = require("../../models");
const UserAddress = db.Useraddress;

const addressController = {
  addAddress: async (req, res) => {
    try {
      const { user_id, address, longitude, latitude } = req.body;

      const existingAddress = await UserAddress.findOne({
        where: { user_id, address },
      });

      if (existingAddress) {
        return res.status(400).json({ message: "Address already exists" });
      }

      const newAddress = await UserAddress.create({
        user_id,
        address,
        longitude,
        latitude,
      });

      return res.status(201).json({ message: "Successfully added", data: newAddress });
    } catch (error) {
      return res.status(500).json({ message: "Failed to add address" });
    }
  },

  getAddress: async (req, res) => {
    try {
      const addressId = req.params.id;
      const userAddress = await UserAddress.findAll({
        where: { id: addressId, isactive: true },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get address" });
    }
  },

  updateAddress: async (req, res) => {
    try {
      const addressId = req.params.id;
      const { address, longitude, latitude } = req.body;

      const addressToUpdate = await UserAddress.findByPk(addressId);

      if (!addressToUpdate) {
        return res.status(404).json({ message: "Address not found" });
      }

      addressToUpdate.address = address || addressToUpdate.address;
      addressToUpdate.longitude = longitude || addressToUpdate.longitude;
      addressToUpdate.latitude = latitude || addressToUpdate.latitude;

      await addressToUpdate.save();

      return res.status(200).json({ message: "Successfully updated", data: addressToUpdate });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update address" });
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const addressId = req.params.id;
      const addressToDelete = await UserAddress.findByPk(addressId);

      if (!addressToDelete) {
        return res.status(404).json({ message: "Address not found" });
      }

      // Metode soft delete: Set isactive menjadi false
      addressToDelete.isactive = false;
      await addressToDelete.save();

      return res.status(204).send();
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

      return res.status(200).json({ message: "Successfully set primary address", data: addressToSetPrimary });
    } catch (error) {
      return res.status(500).json({ message: "Failed to set primary address" });
    }
  },
};

module.exports = addressController;
