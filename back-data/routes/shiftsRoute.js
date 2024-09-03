const express = require("express");
const {
  getAllShifts,
  getShiftsByDate,
  createShift,
  updateShift,
  deleteShift,
} = require("../controllers/shiftsController");

const router = express.Router();

router.get("/", getAllShifts); // Obtain all shifts
router.get("/date/:date", getShiftsByDate); // Obtain shifts by date
router.post("/", createShift); // Create a new shift
router.put("/:id", updateShift); // Update a shift
router.delete("/:id", deleteShift); // Delete a shift

module.exports = router;
