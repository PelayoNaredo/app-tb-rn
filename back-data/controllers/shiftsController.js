const Shift = require("../models/shiftsModel");


const getShiftsByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const shifts = await Shift.findById(date).exec();
    if (!shifts) return res.status(404).json({ message: 'No shifts found for this date' });
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const createOrUpdateShift = async (req, res) => {
  const { date, employeeId, shifts } = req.body;

  try {
    const shift = await Shift.findById(date);

    if (shift) {
      shift.shifts.set(employeeId, shifts);
      await shift.save();

    } else {
      const newShift = new Shift({
        _id: date,
        shifts: { [employeeId]: shifts }
      });

      await newShift.save();
    }
    res.status(200).json({ message: 'Shift saved successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteShift = async (req, res) => {
  const { date } = req.params;
  try {
    const result = await Shift.findByIdAndDelete(date);
    if (!result) return res.status(404).json({ message: 'No shift found for this date' });
    res.status(200).json({ message: 'Shift deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getShiftsByDate,
  createOrUpdateShift,
  deleteShift,
};