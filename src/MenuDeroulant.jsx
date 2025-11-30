// src/MenuDeroulant.jsx
import React from 'react'; // Imports nettoyés
import { Link } from 'react-router-dom';
import { lignesMetro } from './data.js'; // 'stationsData' n'est plus importé
import './MenuDeroulant.css';

export default function MenuDeroulant({ estOuvert, onClose }) {

  // --- TOUTE LA LOGIQUE DE RECHERCHE EST SUPPRIMÉE ---

  const lignesActuelles = lignesMetro.filter(l => l.type === 'actuel');
  const lignesGPE = lignesMetro.filter(l => l.type === 'gpe');
  
  // Fonction simplifiée
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={`menu-deroulant ${estOuvert ? 'open' : ''}`}>
      <div className="menu-content">
        
        {/* --- SECTION RECHERCHE ET RÉSULTATS SUPPRIMÉE --- */}
        
        {/* Navigation */}
        <h2 className="menu-titre-section">Navigation</h2>
        <Link to="/repertoire" className="menu-link-repertoire" onClick={handleClose}>
          Répertoire des Rames
        </Link>
        <Link to="/carte" className="menu-link-repertoire" onClick={handleClose}>
          Carte du Réseau
        </Link>

        {/* Réseau Actuel */}
        <h2 className="menu-titre-section">Réseau Actuel</h2>
        <div className="menu-grille">
          {lignesActuelles.map(ligne => (
            <Link key={ligne.id} to={`/ligne/${ligne.id}`} className="menu-item" onClick={handleClose}>
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
            <Link key={ligne.id} to={`/ligne/${ligne.id}`} className="menu-item" onClick={handleClose}>
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