import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import Simulation from './pages/Simulation/Simulation';
import LineUp from './pages/LineUp/LineUp';
import AuthPage from './auth/AuthPage';
import CarManagementPage from './pages/CarManagementPage/CarManagementPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/lineup" element={<LineUp />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/manage-cars" element={<CarManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
