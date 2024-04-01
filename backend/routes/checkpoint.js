const express = require('express');
const router = express.Router();
const Checkpoint = require('../models/Checkpoint');

// Checkpoint routes
router.post('/', (req, res) => {
    const checkpoint = new Checkpoint(req.body);
    checkpoint.save()
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});

router.get('/', (req, res) => {
    Checkpoint.find()
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err));
});

router.put('/:id', (req, res) => {
    Checkpoint.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send({ message: 'Checkpoint updated successfully' }))
        .catch(err => res.status(500).send(err));
});

router.delete('/:id', (req, res) => {
    Checkpoint.findByIdAndDelete(req.params.id)
        .then(() => res.send({ message: 'Checkpoint deleted successfully' }))
        .catch(err => res.status(500).send(err));
});

module.exports = router;