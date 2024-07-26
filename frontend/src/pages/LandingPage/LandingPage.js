import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Handle sign in action
  };

  const handleContinueAsGuest = () => {
    navigate('/simulation');
  };

  return (
    <div className="landing-page">
      <video autoPlay muted loop className="video-background">
        <source src="/assets/bgvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h2>Welcome to</h2>
        <h1>Car Speed Simulator</h1>
      </div>
      <div className="button-container">
        <Button label="Sign In" onClick={handleSignIn} styleClass="primary" />
        <Button label="Continue as Guest" onClick={handleContinueAsGuest} styleClass="primary" />
      </div>
    </div>
  );
};

export default LandingPage;
