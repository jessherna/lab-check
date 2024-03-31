const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

router.post('/', async (req, res) => {
    try {
        // Delete all documents in the Schedule collection
        await Schedule.deleteMany({});

        const schedules = req.body;
        const savedSchedules = [];

        for (let schedule of schedules) {
            const newSchedule = new Schedule(schedule);
            const savedSchedule = await newSchedule.save();
            savedSchedules.push(savedSchedule);
        }

        res.json(savedSchedules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;