const Employee = require("../models/employeesModel");

const getEmployees = async (req, res) => {
	try {
		const employees = await Employee.find();
		res.status(200).json(employees);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const createEmployee = async (req, res) => {
	const employee = new Employee(req.body);
	try {
		const savedEmployee = await employee.save();
		res.status(201).json(savedEmployee);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const updateEmployee = async (req, res) => {
	try {
		const updatedEmployee = await Employee.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedEmployee);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const deleteEmployee = async (req, res) => {
	try {
		await Employee.findByIdAndDelete(req.params.id);
		res.status(204).send();
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

module.exports = {
	getEmployees,
	createEmployee,
	updateEmployee,
	deleteEmployee,
};
