// src/MenuDeroulant.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { lignesMetro } from './data.js';
import './MenuDeroulant.css';

export default function MenuDeroulant({ estOuvert, onClose }) {
  const lignesActuelles = lignesMetro.filter(l => l.type === 'actuel');
  const lignesGPE = lignesMetro.filter(l => l.type === 'gpe');
  
  return (
    <div className={`menu-deroulant ${estOuvert ? 'open' : ''}`}>
      <div className="menu-content">
        
        {/* Navigation */}
        <h2 className="menu-titre-section">Navigation</h2>
        <Link to="/repertoire" className="menu-link-repertoire" onClick={onClose}>
          Répertoire des Rames
        </Link>
        <Link to="/carte" className="menu-link-repertoire" onClick={onClose}>
          Carte du Réseau
        </Link>

        {/* Réseau Actuel */}
        <h2 className="menu-titre-section">Réseau Actuel</h2>
        <div className="menu-grille">
          {lignesActuelles.map(ligne => (
            <Link key={ligne.id} to={`/ligne/${ligne.id}`} className="menu-item" onClick={onClose}>
              <img 
                src={`/assets/${ligne.id}-logo.png`} 
                alt={`Ligne ${ligne.id}`} 
                className="menu-item-logo"
              />
              <span>Ligne {ligne.id}</span>
            </Link>
          ))}
        </div>

        {/* Grand Paris Express */}
        <h2 className="menu-titre-section">Grand Paris Express</h2>
        <div className="menu-grille">
          {lignesGPE.map(ligne => (
            <Link key={ligne.id} to={`/ligne/${ligne.id}`} className="menu-item" onClick={onClose}>
              <img 
                src={`/assets/${ligne.id}-logo.png`} 
                alt={`Ligne ${ligne.id}`} 
                className="menu-item-logo"
              />
              <span>Ligne {ligne.id}</span>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}