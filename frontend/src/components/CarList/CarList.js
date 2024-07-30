import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseCars from '../../data/baseCars';
import CarCard from '../CarCard/CarCard';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars', { withCredentials: true });
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch cars.');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="car-list-container">
      <h2>Base Cars</h2>
      <div className="car-grid">
        {baseCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      <h2>Your Cars</h2>
      <ul className="user-cars-list">
        {cars.map((car) => (
          <li key={car._id}>
            {car.name} - 0-60: {car.zero_to_sixty}s, Top Speed: {car.top_speed} mph
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
