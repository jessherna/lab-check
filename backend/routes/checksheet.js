const express = require('express');
const router = express.Router();
const Checksheet = require('../models/Checksheet');

// Create a new checksheet
router.post('/', (req, res) => {
    const checksheet = new Checksheet(req.body);
    checksheet.save()
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});

// Get all checksheets
router.get('/', (req, res) => {
    Checksheet.find()
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});

// Get a checksheet by id
router.get('/:id', (req, res) => {
    Checksheet.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});

// Update a checksheet by id
router.put('/:id', (req, res) => {
    Checksheet.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send({ message: 'Checksheet updated successfully' }))
        .catch(err => res.status(500).send(err));
});

// Update a checkpoint inside the checksheet
router.patch('/:checksheetId/:checkpointId', async (req, res) => {
    try {
        const checksheet = await Checksheet.findById(req.params.checksheetId);
        const checkpoint = checksheet.checkpoints.id(req.params.checkpointId);

        checkpoint.set(req.body);

        await checksheet.save();

        res.json(checkpoint);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete a checksheet by id
router.delete('/:id', (req, res) => {
    Checksheet.findByIdAndDelete(req.params.id)
        .then(() => res.send({ message: 'Checksheet deleted successfully' }))
        .catch(err => res.status(500).send(err));
});

module.exports = router;