const mongoose = require("mongoose");

const getSells = async () => {
	return await mongoose.connection.collection("sells").find({}).toArray();
};

const createSells = async (sellsData) => {
	const result = await mongoose.connection
		.collection("sells")
		.insertOne(sellsDataData);
	return result.ops[0];
};

const updateSells = async (id, updates) => {
	return await mongoose.connection
		.collection("sells")
		.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: updates });
};

const deleteSells = async (id) => {
	return await mongoose.connection.collection("sells").deleteOne({
		_id: mongoose.Types.ObjectId(id),
	});
};

module.exports = {
	getSells,
	createSells,
	updateSells,
	deleteSells,
};
