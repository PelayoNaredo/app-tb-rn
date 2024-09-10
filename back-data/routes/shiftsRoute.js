const express = require("express");
const {
  getShiftsByDate,
  createOrUpdateShift,
  deleteShift,
} = require("../controllers/shiftsController");

const router = express.Router();

router.get("/:date", getShiftsByDate);
router.post("/", createOrUpdateShift);
router.delete("/:date", deleteShift);

module.exports = router;