// routes/medicineRoutes.js
const express = require("express");
const {
  addMedicine,
  getMedicines,
  deleteMedicine,
} = require("../controllers/medicineController.js");
const { protect } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", protect, addMedicine);
router.get("/", protect, getMedicines);
router.delete("/:id", protect, deleteMedicine); // Add this line

module.exports = router;
