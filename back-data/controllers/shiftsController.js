const mongoose = require("mongoose");

const getShifts = async () => {
	return await mongoose.connection.collection("shifts").find({}).toArray();
};

const createShift = async (shiftData) => {
	const result = await mongoose.connection
		.collection("shifts")
		.insertOne(shiftData);
	return result.ops[0];
};

const updateShift = async (id, updates) => {
	return await mongoose.connection
		.collection("shifts")
		.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: updates });
};

const deleteShift = async (id) => {
	return await mongoose.connection.collection("shifts").deleteOne({
		_id: mongoose.Types.ObjectId(id),
	});
};

module.exports = {
	getShifts,
	createShift,
	updateShift,
	deleteShift,
};
