// src/components/CarForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CarForm = ({ onAddCar }) => {
  const [name, setName] = useState('');
  const [zeroToSixty, setZeroToSixty] = useState('');
  const [topSpeed, setTopSpeed] = useState('');
  const [quarterMileTime, setQuarterMileTime] = useState('');
  const [horsepower, setHorsepower] = useState('');
  const [torque, setTorque] = useState('');
  const [weight, setWeight] = useState('');
  const [dragCoefficient, setDragCoefficient] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCar = {
      name,
      zero_to_sixty: parseFloat(zeroToSixty),
      top_speed: parseFloat(topSpeed),
      quarter_mile_time: parseFloat(quarterMileTime),
      horsepower: parseInt(horsepower),
      torque: parseInt(torque),
      weight: parseInt(weight),
      drag_coefficient: parseFloat(dragCoefficient),
    };

    try {
      const response = await axios.post('http://localhost:7043/api/cars', newCar);
      onAddCar(response.data);
      setName('');
      setZeroToSixty('');
      setTopSpeed('');
      setQuarterMileTime('');
      setHorsepower('');
      setTorque('');
      setWeight('');
      setDragCoefficient('');
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input value={zeroToSixty} onChange={(e) => setZeroToSixty(e.target.value)} placeholder="0-60 mph Time (s)" required />
      <input value={topSpeed} onChange={(e) => setTopSpeed(e.target.value)} placeholder="Top Speed (mph)" required />
      <input value={quarterMileTime} onChange={(e) => setQuarterMileTime(e.target.value)} placeholder="Quarter Mile Time (s)" required />
      <input value={horsepower} onChange={(e) => setHorsepower(e.target.value)} placeholder="Horsepower (HP)" required />
      <input value={torque} onChange={(e) => setTorque(e.target.value)} placeholder="Torque (lb-ft)" required />
      <input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (lbs)" required />
      <input value={dragCoefficient} onChange={(e) => setDragCoefficient(e.target.value)} placeholder="Drag Coefficient" required />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default CarForm;
