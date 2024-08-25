const mongoose = require("mongoose");
require("dotenv").config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
	console.log("Connecting to MongoDB localy...");
});

// Exportar las colecciones
const shiftsCollection = db.collection("shifts");
const employeesCollection = db.collection("employees");
const inventoryCollection = db.collection("inventory");

module.exports = {
	shiftsCollection,
	employeesCollection,
	inventoryCollection,
};
