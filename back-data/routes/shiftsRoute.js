const express = require("express");
const router = express.Router();
const shiftModel = require("../models/shiftsModel");

router.get("/", async (req, res) => {
	try {
		const shifts = await shiftModel.getShifts();
		res.json(shifts);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.post("/", async (req, res) => {
	try {
		const newShift = req.body;
		const createdShift = await shiftModel.createShift(newShift);
		res.status(201).json(createdShift);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updates = req.body;
		const result = await shiftModel.updateShift(id, updates);
		if (result.matchedCount === 0) {
			return res.status(404).send("Shift not found");
		}
		res.send("Shift updated");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await shiftModel.deleteShift(id);
		if (result.deletedCount === 0) {
			return res.status(404).send("Shift not found");
		}
		res.send("Shift deleted");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
