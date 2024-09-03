const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  shifts: [
    {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
    },
  ],
});

const Shift = mongoose.model("Shift", shiftSchema);

module.exports = Shift;
