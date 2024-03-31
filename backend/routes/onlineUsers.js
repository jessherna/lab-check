const express = require('express');
const router = express.Router();
const OnlineUser = require('../models/OnlineUser');

// GET all online users
router.get('/', async (req, res) => {
  try {
    const onlineUsers = await OnlineUser.find();
    res.json(onlineUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST add a new online user or check if exists
router.post('/', async (req, res) => {
  const { alias } = req.body;

  try {
    let onlineUser = await OnlineUser.findOne({ alias });

    if (!onlineUser) {
      // If the alias doesn't exist, create a new online user
      onlineUser = new OnlineUser({
        alias
      });

      await onlineUser.save();
      console.log('New online user created:', onlineUser);
    }

    res.json(onlineUser); // Return the onlineUser whether it's existing or newly created
    console.log('Online user:', onlineUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// DELETE remove an online user
router.delete('/:id', async (req, res) => {
  try {
    let onlineUser = await OnlineUser.findById(req.params.id);

    if (!onlineUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await onlineUser.remove();

    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
