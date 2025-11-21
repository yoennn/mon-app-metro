// src/PageDetailRame.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataRames, lignesMetro } from './data.js';
import './PageDetailRame.css';

export default function PageDetailRame() {
  const { nom } = useParams();
  const rame = dataRames[nom];

  if (!rame) {
    return <h2>Rame non trouvée : {nom}</h2>;
  }

  const lignesCirculation = lignesMetro.filter(ligne => 
    ligne.materiel.some(m => m.nom === nom)
  );

  return (
    <div className="rame-detail-container">
      <header className="rame-detail-header">
        <h1>{nom}</h1>
        <p>{rame.nomComplet}</p>
      </header>

      <div className="rame-detail-content">
        
        {/* --- COLONNE DE GAUCHE (INFOBOX) --- */}
        <aside className="rame-detail-infobox">
          <div className="infobox-section">
            <h3>Fiche Technique</h3>
            <ul className="rame-stats-liste">
              <li>
                <span>Constructeur</span>
                <strong>{rame.constructeur || 'N/A'}</strong>
              </li>
              <li>
                <span>Mise en service</span>
                <strong>{rame.miseEnService || 'N/A'}</strong>
              </li>
              <li>
                <span>Composition</span>
                <strong>{rame.composition || 'N/A'}</strong>
              </li>
              <li>
                <span>Capacité</span>
                <strong>{rame.capacite || 'N/A'}</strong>
              </li>
              <li>
                <span>Vitesse max.</span>
                <strong>{rame.vitesseMax || 'N/A'}</strong>
              </li>
            </ul>
          </div>
          
          <div className="infobox-section">
            <h3>Circule sur</h3>
            <div className="rame-lignes-liste">
              {lignesCirculation.map(ligne => (
                <Link 
                  key={ligne.id} 
                  to={`/ligne/${ligne.id}`} 
                  className="ligne-logo-link"
                  title={ligne.nom}
                >
                  <img 
                    src={`/assets/${ligne.id}-logo.png`} 
                    alt={ligne.nom}
                    className="ligne-logo-repertoire"
                  />
                </Link>
              ))}
            </div>
          </div>
        </aside>
        
        {/* --- COLONNE DE DROITE (CONTENU) --- */}
        <main className="rame-detail-main">
          <div className="rame-detail-image-box">
            <img src={`/assets/${rame.image}`} alt={nom} />
          </div>
          <h3>Description</h3>
          <p>{rame.descriptionLongue || 'Aucune description.'}</p>
        </main>

      </div>
    </div>
  );
}