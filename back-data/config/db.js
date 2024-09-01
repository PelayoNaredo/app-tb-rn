const mongoose = require("mongoose");
require("dotenv").config();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB locally.");
	})
	.catch((error) => {
		console.error("Connection error:", error);
	});

const db = mongoose.connection;

// Export collections (left sells and config)
const shiftsCollection = db.collection("shifts");
const employeesCollection = db.collection("employees");
const inventoryCollection = db.collection("inventory");

module.exports = {
	shiftsCollection,
	employeesCollection,
	inventoryCollection,
};
