// src/PageRepertoire.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// --- MODIFICATION: Importer ligneColors ---
import { lignesMetro, dataRames, ligneColors } from './data.js';
import './PageRepertoire.css'; 

export default function PageRepertoire() {
  
  const ramesGPE_Noms = ["MRV", "MR3V", "MR6V"];
  
  const ramesTriees = Object.entries(dataRames)
    .filter(([nom]) => !ramesGPE_Noms.includes(nom))
    .sort(([nomA], [nomB]) => nomA.localeCompare(nomB));

  const trouverLignesPourRame = (nomRame) => {
    return lignesMetro
      .filter(ligne => ligne.materiel.some(m => m.nom === nomRame))
      .map(ligne => ligne.id);
  };

  // On enlève les doublons au cas où (ex: 3 et 7bis ont la même couleur)
  // et on s'assure que l'ordre est stable
  const getLignesUniques = (noms) => {
    const lignes = noms.flatMap(trouverLignesPourRame);
    return [...new Set(lignes)].sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
  }

  const lignesGPE = getLignesUniques(ramesGPE_Noms);
  const imageGPE = dataRames["MRV"].image; 

  return (
    <div className="repertoire-container">
      <h1>Répertoire du Matériel Roulant</h1>
      <div className="repertoire-grille">
        
        {/* Rames classiques */}
        {ramesTriees.map(([nom, data]) => {
          const lignes = getLignesUniques([nom]);
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

                {/* --- NOUVELLE BARRE DE COULEUR --- */}
                <div className="rame-carte-couleurs">
                  {lignes.map(ligneId => (
                    <span 
                      key={ligneId} 
                      className="couleur-segment" 
                      style={{ backgroundColor: ligneColors[ligneId] || '#ccc' }}
                      title={`Ligne ${ligneId}`}
                    ></span>
                  ))}
                </div>
                {/* --- FIN BARRE --- */}
                
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

            {/* --- NOUVELLE BARRE DE COULEUR GPE --- */}
            <div className="rame-carte-couleurs">
              {lignesGPE.map(ligneId => (
                <span 
                  key={ligneId} 
                  className="couleur-segment" 
                  style={{ backgroundColor: ligneColors[ligneId] || '#ccc' }}
                  title={`Ligne ${ligneId}`}
                ></span>
              ))}
            </div>
            {/* --- FIN BARRE --- */}
            
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

      </div>
    </div>
  );
}