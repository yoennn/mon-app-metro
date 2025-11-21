// src/PageCarte.jsx
import React from 'react';
import './PageCarte.css';

export default function PageCarte() {
  return (
    <div className="carte-container">
      <h1>Carte du Réseau</h1>
      <p>Un plan complet des lignes de métro actuelles et futures, incluant le Grand Paris Express.</p>
      
      <div className="carte-image-wrapper">
        <img 
          src="/assets/plan-paris.png" 
          alt="Plan du métro de Paris" 
        />
      </div>
      
      <p className="note-carte">
          Note : Faites défiler l'image horizontalement pour voir toute la carte.
      </p>
    </div>
  );
}