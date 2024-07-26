import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Simulation from './pages/Simulation/Simulation';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </Router>
  );
};

export default App;
