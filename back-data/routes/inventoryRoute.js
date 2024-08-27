const express = require("express");
const router = express.Router();
const inventoryModel = require("../models/inventoryModel");

router.get("/", async (req, res) => {
	try {
		const inventory = await inventoryModel.getInventory();
		res.json(inventory);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.post("/", async (req, res) => {
	try {
		const newInventory = req.body;
		const createdInventory = await inventoryModel.createInventory(newInventory);
		res.status(201).json(createdInventory);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const result = await inventoryModel.updateInventory(id, updates);
		if (result.matchedCount === 0) {
			return res.status(404).send("Inventory not found");
		}
		res.send("Inventory updated");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await inventoryModel.deleteInventory(id);
		if (result.deletedCount === 0) {
			return res.status(404).send("Inventory not found");
		}
		res.send("Inventory deleted");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
