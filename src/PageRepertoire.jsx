// src/PageRepertoire.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { lignesMetro, dataRames } from './data.js';
import './PageRepertoire.css'; 

export default function PageRepertoire() {
  
  // 1. On prend dataRames comme source
  const ramesTriees = Object.entries(dataRames)
    .sort(([nomA], [nomB]) => nomA.localeCompare(nomB));

  // 2. On crée une fonction pour trouver les lignes
  const trouverLignesPourRame = (nomRame) => {
    return lignesMetro
      .filter(ligne => ligne.materiel.some(m => m.nom === nomRame))
      .map(ligne => ligne.id);
  };

  return (
    <div className="repertoire-container">
      <h1>Répertoire du Matériel Roulant</h1>
      <div className="repertoire-grille">
        
        {ramesTriees.map(([nom, data]) => {
          const lignes = trouverLignesPourRame(nom);
          return (
            <div key={nom} className="rame-carte">
              <div className="rame-carte-image-container">
                <img 
                  src={`/assets/${data.image}`} 
                  alt={nom} 
                  className="rame-carte-image"
                />
              </div>
              <div className="rame-carte-infos">
                {/* LE LIEN CLIQUABLE */}
                <h3>
                  <Link to={`/rame/${nom}`}>{nom}</Link>
                </h3>
                <p>Circule sur les lignes :</p>
                <div className="rame-lignes-liste">
                  {lignes.map(ligneId => (
                    <Link 
                      key={ligneId} 
                      to={`/ligne/${ligneId}`} 
                      className="ligne-logo-link"
                      title={`Ligne ${ligneId}`}
                    >
                      <img 
                        src={`/assets/${ligneId}-logo.png`} 
                        alt={`Ligne ${ligneId}`}
                        className="ligne-logo-repertoire"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}