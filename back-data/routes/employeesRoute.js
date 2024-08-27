const express = require("express");
const router = express.Router();
const EmployeeModel = require("../models/employeesModel");

router.get("/", async (req, res) => {
	try {
		const employees = await EmployeeModel.getEmployee();
		res.json(employees);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.post("/", async (req, res) => {
	try {
		const newEmployee = req.body;
		const createdEmployee = await EmployeeModel.createEmployee(newEmployee);
		res.status(201).json(createdEmployee);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const result = await EmployeeModel.updateEmployee(id, updates);
		if (result.matchedCount === 0) {
			return res.status(404).send("Employee not found");
		}
		res.send("Employee updated");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await EmployeeModel.deleteEmployee(id);
		if (result.deletedCount === 0) {
			return res.status(404).send("Employee not found");
		}
		res.send("Employee deleted");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
