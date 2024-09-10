// models/Medicine.js
const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  reminderTime: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Medicine", medicineSchema);
