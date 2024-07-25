// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://choudhryahmad101:myGpe04BDIO62Q8U@cluster0.bxhpddw.mongodb.net/carSimulator?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const CarSchema = new mongoose.Schema({
  name: String,
  zero_to_sixty: Number,
  top_speed: Number,
  quarter_mile_time: Number,
  horsepower: Number,
  torque: Number,
  weight: Number,
  drag_coefficient: Number,
});

const Car = mongoose.model('Car', CarSchema);

app.post('/api/cars', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).send(cars);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(7043, () => {
  console.log('Server is running on port 7043');
});
