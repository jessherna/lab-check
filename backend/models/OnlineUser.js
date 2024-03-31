const mongoose = require('mongoose');

const OnlineUserSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true
  },
  // Add any other fields you might need, such as user ID, timestamps, etc.
});

module.exports = mongoose.model('OnlineUser', OnlineUserSchema);
