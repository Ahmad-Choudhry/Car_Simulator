const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send('Error registering user');
  }
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Logged in');
});

module.exports = router;
