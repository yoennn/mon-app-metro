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
      
      {/* J'ai supprimé la <p className="note-carte"> ici, 
        car il n'y a plus besoin de défiler.
      */}
    </div>
  );
}