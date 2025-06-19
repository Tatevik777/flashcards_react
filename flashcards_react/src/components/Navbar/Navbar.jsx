import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Мое Приложение</Link> {/* Логотип и ссылка на главную страницу */}
      </div>
      <div className="navbar-links">
        <Link to="/">Главная</Link> {/* Ссылка на главную страницу */}
        <Link to="/game">Карточки</Link> {/* Ссылка на страницу карточек */}
      </div>
    </nav>
  );
};

export default Navbar;