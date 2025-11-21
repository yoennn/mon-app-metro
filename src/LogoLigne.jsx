// src/LogoLigne.jsx

import React from 'react';
import './App.css'; // On suppose que les styles .logo-ligne-container sont ici

// Le composant LogoLigne (avec une majuscule)
export function LogoLigne({ id }) {
  return (
    <div className="logo-ligne-container">
      <img src="/assets/metro-logo.png" alt="M" className="logo-m" />
      <img src={`/assets/${id}-logo.png`} alt={`Ligne ${id}`} className="logo-num" />
    </div>
  );
}