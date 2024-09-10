// controllers/medicineController.js
const Medicine = require("../models/Medicine.js");

// Add a new medicine
exports.addMedicine = async (req, res) => {
  const { name, dosage, reminderTime } = req.body;
  const userId = req.user.id;

  try {
    const medicine = new Medicine({ name, dosage, reminderTime, user: userId });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get user medicines
exports.getMedicines = async (req, res) => {
  const userId = req.user.id;

  try {
    const medicines = await Medicine.find({ user: userId });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Ensure user authentication and ownership of the medicine

    const deletedMedicine = await Medicine.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
