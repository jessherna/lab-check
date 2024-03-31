const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  day: String,
  time: String,
  checked: Boolean,
  checkedBy: String,
});

const RoomSchema = new mongoose.Schema({
  name: String,
  type: String,
  schedule: [ScheduleSchema],
});

module.exports = mongoose.model('Room', RoomSchema);