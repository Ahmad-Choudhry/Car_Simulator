import React, { useState } from 'react';
import axios from 'axios';

const AddCar = ({ onCarAdded }) => {
  const [name, setName] = useState('');
  const [zeroToSixty, setZeroToSixty] = useState('');
  const [topSpeed, setTopSpeed] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/cars', { name, zero_to_sixty: zeroToSixty, top_speed: topSpeed }, { withCredentials: true });
      onCarAdded(response.data);
      setName('');
      setZeroToSixty('');
      setTopSpeed('');
      setError('');
    } catch (error) {
      setError('Failed to add car.');
    }
  };

  return (
    <div>
      <h2>Add Car</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Car Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="0-60 (seconds)"
          value={zeroToSixty}
          onChange={(e) => setZeroToSixty(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Top Speed (mph)"
          value={topSpeed}
          onChange={(e) => setTopSpeed(e.target.value)}
          required
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
