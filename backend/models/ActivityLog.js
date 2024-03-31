const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    activity: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);