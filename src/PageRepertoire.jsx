// src/PageRepertoire.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { lignesMetro, dataRames } from './data.js';
import './PageRepertoire.css'; 

export default function PageRepertoire() {
  
  // Noms des rames GPE à regrouper
  const ramesGPE_Noms = ["MRV", "MR3V", "MR6V"];
  
  // 1. On filtre les rames GPE de la liste principale
  const ramesTriees = Object.entries(dataRames)
    .filter(([nom]) => !ramesGPE_Noms.includes(nom))
    .sort(([nomA], [nomB]) => nomA.localeCompare(nomB));

  // 2. On crée la fonction pour trouver les lignes
  const trouverLignesPourRame = (nomRame) => {
    return lignesMetro
      .filter(ligne => ligne.materiel.some(m => m.nom === nomRame))
      .map(ligne => ligne.id);
  };

  // 3. On prépare les données pour la carte GPE groupée
  const lignesGPE = [
    ...trouverLignesPourRame("MRV"), 
    ...trouverLignesPourRame("MR3V"), 
    ...trouverLignesPourRame("MR6V")
  ];
  const imageGPE = dataRames["MRV"].image; 

  return (
    <div className="repertoire-container">
      <h1>Répertoire du Matériel Roulant</h1>
      <div className="repertoire-grille">
        
        {/* Rames classiques */}
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

        {/* --- MODIFICATION ICI --- */}
        {/* Carte spéciale GPE (placée à la fin) */}
        <div key="gpe-group" className="rame-carte">
          <div className="rame-carte-image-container">
            <img 
              src={`/assets/${imageGPE}`} 
              alt="Matériel Grand Paris Express" 
              className="rame-carte-image"
            />
          </div>
          <div className="rame-carte-infos">
            
            {/* Les 3 liens sur une seule ligne */}
            <h3>
              <Link to={`/rame/MR6V`}>MR6V</Link> / 
              <Link to={`/rame/MR3V`}>MR3V</Link> / 
              <Link to={`/rame/MRV`}>MRV</Link>
            </h3>
            
            <p>Circule sur les lignes :</p>
            <div className="rame-lignes-liste">
              {lignesGPE.map(ligneId => (
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
        {/* --- FIN MODIFICATION --- */}

      </div>
    </div>
  );
}