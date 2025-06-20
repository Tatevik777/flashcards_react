import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
 
      <div className="navbar-links">
        <Link to="/">Главная</Link> 
        <Link to="/game">Карточки</Link> 
      </div>
    </nav>
  );
};

export default Navbar;
