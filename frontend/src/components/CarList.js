// src/components/CarList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:7043/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            {car.name} - 0-60 mph: {car.zero_to_sixty}s, Top Speed: {car.top_speed} mph, Quarter Mile: {car.quarter_mile_time}s, Horsepower: {car.horsepower} HP, Torque: {car.torque} lb-ft, Weight: {car.weight} lbs, Drag Coefficient: {car.drag_coefficient}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
