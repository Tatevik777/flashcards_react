import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} Приложение для изучения слов</p>
    </footer>
  );
};

export default Footer;