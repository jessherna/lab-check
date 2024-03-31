const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  room: String,
  schedule: {
    day: String,
    time: String,
    checked: Boolean,
    checkedBy: String,
  },
  checkedAt: Date,
});

module.exports = mongoose.model('History', HistorySchema);