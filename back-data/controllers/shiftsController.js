const Shift = require("../models/shiftsModel");

const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: "Error: Can't obtain shifts.", error });
  }
};

const getShiftsByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const parsedDate = new Date(date);
    const shifts = await Shift.find({
      date: {
        $gte: new Date(parsedDate.setHours(0, 0, 0, 0)), // Inicio del día
        $lt: new Date(parsedDate.setHours(23, 59, 59, 999)), // Fin del día
      },
    });
    res.json(shifts);
  } catch (error) {
    res.status(500).json({ message: "Error obtaining shifts by date.", error });
  }
};

const createShift = async (req, res) => {
  const { employeeName, date, shifts } = req.body;

  try {
    const newShift = new Shift({ employeeName, date, shifts });
    await newShift.save();
    res.status(201).json(newShift);
  } catch (error) {
    res.status(400).json({ message: "Error creating new shift.", error });
  }
};

const updateShift = async (req, res) => {
  const { id } = req.params;
  const { employeeName, date, shifts } = req.body;

  try {
    const updatedShift = await Shift.findByIdAndUpdate(
      id,
      { employeeName, date, shifts },
      { new: true }
    );
    if (!updatedShift)
      return res.status(404).json({ message: "Error: Shift not found." });
    res.json(updatedShift);
  } catch (error) {
    res.status(400).json({ message: "Error updating shift.", error });
  }
};

const deleteShift = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedShift = await Shift.findByIdAndDelete(id);
    if (!deletedShift)
      return res.status(404).json({ message: "Shift not found." });
    res.json({ message: "Shift deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shift.", error });
  }
};

module.exports = {
  getAllShifts,
  getShiftsByDate,
  createShift,
  updateShift,
  deleteShift,
};
