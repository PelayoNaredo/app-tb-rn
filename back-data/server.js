const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// init express
const app = express();
app.use(express.json());

// Mongo connection
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

// Error/Success
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
	console.log("Conecting to MongoDB localy...");
});

// Routes
app.get("/shifts", async (req, res) => {
	try {
		const shifts = await mongoose.connection
			.collection("shifts")
			.find({})
			.toArray();
		res.json(shifts);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.post("/shifts", async (req, res) => {
	try {
		const newShift = req.body;
		const result = await mongoose.connection
			.collection("shifts")
			.insertOne(newShift);
		res.status(201).json(result.ops[0]);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.put("/shifts/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const result = await mongoose.connection
			.collection("shifts")
			.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: updates });
		if (result.matchedCount === 0) {
			return res.status(404).send("Shift not found");
		}
		res.send("Shift updated");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.delete("/shifts/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await mongoose.connection
			.collection("shifts")
			.deleteOne({ _id: mongoose.Types.ObjectId(id) });
		if (result.deletedCount === 0) {
			return res.status(404).send("Shift not found");
		}
		res.send("Shift deleted");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Routes for the employees collection
app.get("/employees", async (req, res) => {
	try {
		const employees = await mongoose.connection
			.collection("employees")
			.find({})
			.toArray();
		res.json(employees);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.post("/employees", async (req, res) => {
	try {
		const newEmployee = req.body;
		const result = await mongoose.connection
			.collection("employees")
			.insertOne(newEmployee);
		res.status(201).json(result.ops[0]);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.put("/employees/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const result = await mongoose.connection
			.collection("employees")
			.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: updates });
		if (result.matchedCount === 0) {
			return res.status(404).send("Employee not found");
		}
		res.send("Employee updated");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.delete("/employees/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await mongoose.connection
			.collection("employees")
			.deleteOne({ _id: mongoose.Types.ObjectId(id) });
		if (result.deletedCount === 0) {
			return res.status(404).send("Employee not found");
		}
		res.send("Employee deleted");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Routes for the inventory collection
app.get("/inventory", async (req, res) => {
	try {
		const inventory = await mongoose.connection
			.collection("inventory")
			.find({})
			.toArray();
		res.json(inventory);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.post("/inventory", async (req, res) => {
	try {
		const newItem = req.body;
		const result = await mongoose.connection
			.collection("inventory")
			.insertOne(newItem);
		res.status(201).json(result.ops[0]);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.put("/inventory/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const result = await mongoose.connection
			.collection("inventory")
			.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: updates });
		if (result.matchedCount === 0) {
			return res.status(404).send("Item not found");
		}
		res.send("Item updated");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.delete("/inventory/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await mongoose.connection
			.collection("inventory")
			.deleteOne({ _id: mongoose.Types.ObjectId(id) });
		if (result.deletedCount === 0) {
			return res.status(404).send("Item not found");
		}
		res.send("Item deleted");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on: ${PORT}`);
});
