const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend's URL
  credentials: true, // Allow credentials (cookies)
}));

app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using https
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb+srv://choudhryahmad101:myGpe04BDIO62Q8U@cluster0.bxhpddw.mongodb.net/carSimulator?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Incorrect username.' });

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword)
        return done(null, false, { message: 'Incorrect password.' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Authentication Routes
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(400).send('Error registering user');
  }
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.send('Logged in');
});

app.post('/api/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});

// Car Routes for authenticated users
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).send('Unauthorized');
};

app.get('/api/cars', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).send(user.cars);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/cars', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cars.push(req.body);
    await user.save();
    res.status(201).send(user.cars);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/api/cars/:carId', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const car = user.cars.id(req.params.carId);
    Object.assign(car, req.body);
    await user.save();
    res.status(200).send(user.cars);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/api/cars/:carId', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cars.id(req.params.carId).remove();
    await user.save();
    res.status(200).send(user.cars);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(7043, () => {
  console.log('Server is running on port 7043');
});
