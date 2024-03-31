const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const History = require('../models/History');

// Mark a schedule as checked and save it to history
router.patch('/:roomId/schedule/:scheduleId', async (req, res) => {
    const room = await Room.findById(req.params.roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const schedule = room.schedule.id(req.params.scheduleId);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });

    // If the schedule exists, then proceed with the update
    schedule.checked = true;
    schedule.checkedBy = req.body.checkedBy;

    await room.save();

    // Save the schedule to history
    const history = new History({
        room: room.name,
        schedule: schedule,
        checkedAt: new Date(),
    });

    await history.save();

    res.json(history);
});

// Get all rooms
router.get('/', async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
});

// Get a single room
router.get('/:id', async (req, res) => {
    const room = await Room.findById(req.params.id);
    res.json(room);
});

// Get a list of schedules for a room
router.get('/:id/schedule', async (req, res) => {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room.schedule);
});

// Get the schedules of all rooms for a specific day
router.get('/schedule/:day', async (req, res) => {
    const day = req.params.day;
    const rooms = await Room.find();
    const schedules = rooms.map(room => ({
        room: room.name,
        schedule: room.schedule.filter(schedule => schedule.day === day)
    }));
    res.json(schedules);
});

// Add a room
router.post('/', async (req, res) => {
    const room = new Room(req.body);
    await room.save();
    res.json(room);
});

// Update a room or add a new schedule
router.patch('/:id', async (req, res) => {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // If req.body has a schedule, add it to the room's schedule array
    if (req.body.schedule) {
        room.schedule.push(req.body.schedule);
    }

    // Update each property with a new value if it exists in req.body
    for (let key in req.body) {
        if (key !== 'schedule') {
            room[key] = req.body[key];
        }
    }

    await room.save();
    res.json(room);
});

// Delete a room
router.delete('/:id', async (req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Room deleted' });
});

module.exports = router;