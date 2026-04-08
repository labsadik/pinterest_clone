require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./db/db"); // 👈 import DB function

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log("Server running on", process.env.PORT);
});