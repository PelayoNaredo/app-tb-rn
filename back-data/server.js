const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); //required for external communication
require("dotenv").config();

const shiftRoutes = require("./routes/shiftsRoute");
const employeeRoutes = require("./routes/employeesRoute");
const inventoryRoutes = require("./routes/inventoryRoute");
const userRoutes = require("./routes/usersRoute");

// init express and cors
const app = express();

const corsOptions = {
	origin: "http://localhost:8081", // Only from rn testing
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Mongo connection
mongoose.connect(process.env.MONGO_URI, {});

const db = mongoose.connection;

// Error/Success
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
	console.log("Running MongoDB localy...");
});

// Routes
app.use("/shifts", shiftRoutes);
app.use("/employees", employeeRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/users", userRoutes);

// Start server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
	console.log(`Server running on: ${PORT}`);
});
