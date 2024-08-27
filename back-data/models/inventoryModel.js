const mongoose = require("mongoose");

const getInventory = async () => {
	return await mongoose.connection.collection("inventory").find({}).toArray();
};

const createInventory = async (InventoryData) => {
	const result = await mongoose.connection
		.collection("inventory")
		.insertOne(InventoryData);
	return result.ops[0];
};

const updateInventory = async (id, updates) => {
	return await mongoose.connection
		.collection("inventory")
		.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: updates });
};

const deleteInventory = async (id) => {
	return await mongoose.connection.collection("inventory").deleteOne({
		_id: mongoose.Types.ObjectId(id),
	});
};

module.exports = {
	getInventory,
	createInventory,
	updateInventory,
	deleteInventory,
};
