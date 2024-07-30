import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776; {/* This is the hamburger menu icon */}
      </div>
      <div className="navbar-title">
        <Link to="/">Car Speed Simulator</Link>
      </div>
      <div className="user-icon">
        <Link to="/auth">&#128100; {/* This is the user icon */}</Link>
      </div>
      {menuOpen && (
        <div className="menu">
          <ul>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/simulation" onClick={toggleMenu}>Simulation</Link></li>
            <li><Link to="/lineup" onClick={toggleMenu}>Line Up</Link></li>
            <li><Link to="/manage-cars" onClick={toggleMenu}>Manage Cars</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
