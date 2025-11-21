// src/PageDetailLigne.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { lignesMetro, dataRames } from './data.js';
import './PageDetailLigne.css';

function PageDetailLigne() {
  const { id } = useParams();
  const ligne = lignesMetro.find(l => l.id == id); 
  // RESTAURATION DU STATE D'ANIMATION
  const [animatingRame, setAnimatingRame] = useState(null); 

  /* Hook pour le snap-scroll (à conserver pour le Layout) */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); 

  if (!ligne) {
    return <h2>Ligne non trouvée (ID: {id})</h2>;
  }

  const logoPath = `/assets/${id}-logo.png`;
  const planPath = `/assets/${id}-plan.png`;

  // Fonction pour obtenir les stats de base
  const getStatValue = (key) => {
      switch (key) {
          case 'stations': return ligne.stations;
          case 'longueur': return ligne.longueur;
          case 'ouverture': return ligne.ouverture;
          default: return 'N/A';
      }
  };


  return (
    <div className="detail-container snap-parent">
      
      {/* SECTION 1 : PLAN ET STATS */}
      <div className="snap-section plan-section">
        
        <header className="detail-header">
          <img src={logoPath} alt={`Logo ${ligne.nom}`} className="detail-logo" />
          <div className="detail-titres">
            <h1>{ligne.nom}</h1>
            <p className="detail-terminus">{ligne.terminus.join(' ↔ ')}</p>
          </div>
        </header>
        
        <div className="ligne-stats-box">
            <div className="stat-item">
                <span>Stations</span>
                <strong>{getStatValue('stations')}</strong>
            </div>
            <div className="stat-item">
                <span>Longueur</span>
                <strong>{getStatValue('longueur')}</strong>
            </div>
            <div className="stat-item">
                <span>Ouverture</span>
                <strong>{getStatValue('ouverture')}</strong>
            </div>
        </div>

        <div className="section-wrapper">
          <h2>Plan de la Ligne</h2>
          <div className="image-box"> 
            <img src={planPath} alt={`Plan ${ligne.nom}`} className="contenu-image" />
          </div>
        </div>
      </div>
      
      {/* SECTION 2 : RAME(S) */}
      {ligne.materiel && ligne.materiel.length > 0 && (
        <div className="snap-section rame-section-container"> 
          <h2>Matériel Roulant</h2>
          <div className="rame-list-scroller"> 
            
            {ligne.materiel.map((rame, index) => {
              const rameInfo = dataRames[rame.nom];
              if (!rameInfo) return null;

              return (
                <div 
                  key={index} 
                  // Applique la classe 'animate' si cet index correspond à l'état
                  className={`rame-content-wrapper ${animatingRame === index ? 'animate' : ''}`}
                >
                  <div 
                    className="rame-image-container"
                    // LOGIQUE D'ANIMATION: Active l'état au clic
                    onClick={() => {
                      // N'active que si aucune autre animation n'est en cours
                      if (animatingRame === null) setAnimatingRame(index);
                    }}
                    // Retire la classe 'animate' quand l'animation CSS est finie
                    onAnimationEnd={() => setAnimatingRame(null)}
                  >
                    <img 
                      src={`/assets/${rameInfo.image}`} 
                      alt={rame.nom} 
                      className="rame-image"
                    />
                  </div>
                  <div className="rame-infos">
                    <h3>
                      <Link to={`/rame/${rame.nom}`}>{rame.nom}</Link>
                    </h3>
                    <p>{rame.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default PageDetailLigne;