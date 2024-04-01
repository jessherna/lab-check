let mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckpointSubSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Checkpoint'
    },
    day: String,
    lab: String,
    startTime: String,
    checkedBy: String,
    actualTime: String,
    isChecked: Boolean,
}, { _id: false });

const ChecksheetSchema = new Schema({
    startDate: Date,
    endDate: Date,
    isCompleted: Boolean,
    checkpoints: [CheckpointSubSchema],
}, { timestamps: true });

module.exports = mongoose.model('Checksheet', ChecksheetSchema);