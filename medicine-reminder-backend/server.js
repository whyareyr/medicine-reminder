const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const medicineRoutes = require("./routes/medicineRoutes.js");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Use CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your frontend origin here
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If you need to allow cookies or authorization headers
  })
);

app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);

// Start cron jobs
require("./cron/reminderCron.js");

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
