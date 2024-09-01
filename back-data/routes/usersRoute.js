const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// User verification
		let user = await User.findOne({ email });
		if (user) {
			return res.status(404).json({ message: "User already exists" });
		}

		// Create new user
		user = new User({ username, email, password });
		await user.save();

		// Token generation
		const token = user.generateAuthToken();
		res.status(201).json({ token });
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// login
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
		console.error("Server Error:", error); // Log the error on the server side
		res.status(500).send("Internal Server Error");
	}
});

// Middleware JWT auth
const authMiddleware = (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		return res
			.status(401)
			.json({ message: "Access denied. Please login again." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).json({ message: "Invalid token" });
	}
};

module.exports = router;
