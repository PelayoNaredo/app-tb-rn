const express = require("express");
const router = express.Router();
const sellsModel = require("../models/sellsModel");

router.get("/", async (req, res) => {
	try {
		const sells = await sellsModel.getSells();
		res.json(sells);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.post("/", async (req, res) => {
	try {
		const newSells = req.body;
		const createdSells = await sellsModel.createSells(newSells);
		res.status(201).json(createdSells);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const result = await sellsModel.updateSells(id, updates);
		if (result.matchedCount === 0) {
			return res.status(404).send("Sells not found");
		}
		res.send("Sells updated");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await sellsModel.deleteSells(id);
		if (result.deletedCount === 0) {
			return res.status(404).send("Sells not found");
		}
		res.send("Sells deleted");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
