import React, { useState, useEffect } from 'react';
import { fetchCars } from '../../api/Api';
import CarSimulation from '../../components/CarSimulation/CarSimulation';
import './Simulation.css';

const Simulation = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setLoading(false); // Ensure loading is set to false in case of an error
      }
    };

    loadCars();
  }, []);

  const addCar = (newCar) => {
    setCars([...cars, newCar]);
  };

  return (
    <div className="simulation-page">
      <h1>Car Speed Simulator</h1>
      {loading ? (
        <p>Loading...</p> // Show a loading message or spinner while fetching data
      ) : (
        <CarSimulation cars={cars} />
      )}
    </div>
  );
};

export default Simulation;
