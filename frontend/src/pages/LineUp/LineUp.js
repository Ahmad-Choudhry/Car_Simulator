import React, { useState, useEffect } from 'react';
import { fetchCars } from '../../api/Api';
import './LineUp.css';

const LineUp = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        console.log(data);
        setCars(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setLoading(false); // Ensure loading is set to false in case of an error
      }
    };

    loadCars();
  }, []);

  return (
    <div className="lineup-page">
      <h1>Race Lineup</h1>
      {loading ? (
        <p>Loading...</p> // Show a loading message or spinner while fetching data
      ) : (
        <ul>
          {cars.map((car, index) => (
            <li key={index}>
              {car.name} - 0-60: {car.zero_to_sixty}s, Top Speed: {car.top_speed} mph
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LineUp;
