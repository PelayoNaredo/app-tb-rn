const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const shiftRoutes = require("./routes/shiftsRoute");
const employeeRoutes = require("./routes/employeesRoute");
const inventoryRoutes = require("./routes/inventoryRoute");
const userRoutes = require("./routes/usersRoute"); 

// Init express y CORS
const app = express();

const corsOptions = {
  origin: "http://localhost:8081", // Only for rn local testing
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

//MongoDB
mongoose.connect(process.env.MONGO_URI, {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully...");
});

// Routes
app.use("/shifts", shiftRoutes);
app.use("/employees", employeeRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/users", userRoutes); 

// Server port
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
