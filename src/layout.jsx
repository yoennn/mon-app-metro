// src/Layout.jsx
import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import MenuDeroulant from './MenuDeroulant.jsx';
import './layout.css';

export default function Layout() { 
  const [menuOuvert, setMenuOuvert] = useState(false);
  const closeMenu = () => setMenuOuvert(false);

  return (
    <>
      <header className="global-header-container">
        
        {/* Bouton Hamburger à gauche */}
        <button 
          className={`hamburger-btn ${menuOuvert ? 'open' : ''}`}
          onClick={() => setMenuOuvert(!menuOuvert)}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOuvert}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Logo Centré */}
        <Link to="/" onClick={closeMenu} className="global-logo-link">
          <img 
            src="/assets/ratp-grand.png" 
            alt="Paris Métro Grand Guide - Logo RATP" 
            className="global-logo" 
          />
        </Link>

        {/* Espaceur à droite pour centrer le logo */}
        <div className="header-spacer"></div>

      </header>

      <div className="page-container">
        <main className="page-content">
          <Outlet /> 
        </main>
      </div>

      <MenuDeroulant 
        estOuvert={menuOuvert} 
        onClose={closeMenu} 
      />
    </>
  );
}