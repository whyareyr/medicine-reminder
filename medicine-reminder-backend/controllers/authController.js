// controllers/authController.js
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.validateToken = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(401).json({ valid: false, message: "Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ valid: false, message: "Invalid token" });
  }
};
