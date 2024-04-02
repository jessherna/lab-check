const express = require('express');
const router = express.Router();
const OnlineUser = require('../models/OnlineUser');

// GET all online users
router.get('/', async (req, res) => {
  try {
    const onlineUsers = await OnlineUser.find({ isOnline: true });
    res.json(onlineUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST add a new online user
router.post('/', async (req, res) => {
  const { alias } = req.body;

  try {
    // Check if the alias already exists
    let onlineUser = await OnlineUser.findOne({ alias });

    if (onlineUser) {
      // If user already exists, update isOnline to true
      onlineUser.isOnline = true;
      await onlineUser.save();
    } else {
      // If user doesn't exist, create a new user
      onlineUser = new OnlineUser({
        alias,
        isOnline: true,
      });

      await onlineUser.save();
    }

    res.json(onlineUser); // Return the onlineUser
    console.log('Online user:', onlineUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET fetch an existing online user by ID
router.get('/:id', async (req, res) => {
  try {
    const onlineUser = await OnlineUser.findById(req.params.id);

    if (!onlineUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(onlineUser); // Return the existing onlineUser
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// PATCH update an online user's status
router.patch('/:id', async (req, res) => {
  const { isOnline } = req.body;

  try {
    const onlineUser = await OnlineUser.findByIdAndUpdate(req.params.id, { isOnline }, { new: true });

    if (!onlineUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(onlineUser);
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
