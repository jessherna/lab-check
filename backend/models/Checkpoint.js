let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckpointSchema = new Schema({
    day: { type: String, default: '' },
    startTime: { type: String, default: '' },
    lab: { type: String, default: '' },
    checkedBy: { type: String, default: '' },
    actualTime: { type: String, default: '' },
    isChecked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Checkpoint', CheckpointSchema);