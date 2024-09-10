// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.protect = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Token received:", token); // Debugging

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // Debugging

    req.user = await User.findById(decoded.id);
    console.log("User found:", req.user); // Debugging

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Error in token verification:", error); // Debugging
    res.status(401).json({ message: "Invalid token" });
  }
};
