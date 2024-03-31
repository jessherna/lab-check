const mongoose = require('mongoose');

const OnlineUserSchema = new mongoose.Schema({
  alias: {
    type: String,
    required: true
  },
  isOnline: {
    type: Boolean,
    default: false
  }
}, { timestamps: true } );

module.exports = mongoose.model('OnlineUser', OnlineUserSchema);
