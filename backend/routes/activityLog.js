const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');

// GET all activity logs
router.get('/', async (req, res) => {
    try {
        const activityLogs = await ActivityLog.find();
        res.json(activityLogs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST add a new activity log
router.post('/', async (req, res) => {
    const { timestamp, activity } = req.body;

    try {
        const newActivityLog = new ActivityLog({
            timestamp,
            activity
        });

        const activityLog = await newActivityLog.save();
        res.json(activityLog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;