const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Get all history
router.get('/', async (req, res) => {
    const history = await History.find();
    res.json(history);
});


module.exports = router;