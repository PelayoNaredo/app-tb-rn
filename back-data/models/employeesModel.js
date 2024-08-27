const mongoose = require("mongoose");

const getEmployee = async () => {
	return await mongoose.connection.collection("employees").find({}).toArray();
};

const createEmployee = async (employeeData) => {
	const result = await mongoose.connection
		.collection("employees")
		.insertOne(employeeData);
	return result.ops[0];
};

const updateEmployee = async (id, updates) => {
	return await mongoose.connection
		.collection("employees")
		.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: updates });
};

const deleteEmployee = async (id) => {
	return await mongoose.connection.collection("employees").deleteOne({
		_id: mongoose.Types.ObjectId(id),
	});
};

module.exports = {
	getEmployee,
	createEmployee,
	updateEmployee,
	deleteEmployee,
};
