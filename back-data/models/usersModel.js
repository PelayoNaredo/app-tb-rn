const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Schema
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// Middleware crypt
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// pass verification
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// JWT token
userSchema.methods.generateAuthToken = function () {
	return jwt.sign(
		{ _id: this._id, username: this.username },
		process.env.JWT_SECRET,
		{
			expiresIn: "1h",
		}
	);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
