import React, { useState } from 'react';
import AddCar from '../../components/AddCar/AddCar';
import CarList from '../../components/CarList/CarList';
import './CarManagementPage.css'; // Import the CSS file

const CarManagementPage = () => {
  const [carListKey, setCarListKey] = useState(Date.now());

  const handleCarAdded = () => {
    setCarListKey(Date.now());
  };

  return (
    <div className="car-management-page">
      <AddCar onCarAdded={handleCarAdded} />
      <CarList key={carListKey} />
    </div>
  );
};

export default CarManagementPage;
