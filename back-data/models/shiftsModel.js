const mongoose = require('mongoose');

const ShiftSchema = new mongoose.Schema({
  _id: {
    type: String, // String for 'YYYY-MM-DD'
    required: true,
  },
  shifts: {
    type: Map, //Use map for a flexible k=>v 
    of: [
      {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
  },
});

const Shift = mongoose.model('Shift', ShiftSchema);

module.exports = Shift;