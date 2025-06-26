import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/">
        <img src={logo} alt="Логотип" className="logo" />
      </Link>
      <h1 className="app-title">Приложение для изучения слов</h1>
    </header>
  );
};

export default Header;