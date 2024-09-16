const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const authMiddleware = require("../middleware/authMiddleware"); 
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "User already exists" });
    }

    user = new User({ username, email, password });
    await user.save();

    const token = user.generateAuthToken();
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();
    res.json({ token });
  } catch (error) {
    console.error("Server Error:", error); 
    res.status(500).send("Internal Server Error");
  }
});


router.get('/verify-token', authMiddleware, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

module.exports = router;
