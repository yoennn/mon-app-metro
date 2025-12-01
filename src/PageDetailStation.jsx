// src/PageDetailStation.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { stationsData, lignesMetro, dataRames, ligneColors } from './data.js';
import './PageDetailStation.css';

export default function PageDetailStation() {
  const { nom } = useParams();
  
  // Trouver la station par son nom
  // Note: La recherche d'URL est sensible à la casse, mais les données sont cohérentes.
  const station = stationsData.find(s => s.nom === nom);

  if (!station) {
    return <h2>Station non trouvée : {nom}</h2>;
  }

  // 1. Récupérer les données complètes des lignes
  const lignesPourStation = station.lignes
    .map(id => lignesMetro.find(l => l.id === id))
    .filter(Boolean); // Filtre au cas où une ligne ne serait pas trouvée

  // 2. Récupérer les rames uniques (directement depuis station.materiel)
  const ramesUniques = [...new Set(station.materiel)];
  const ramesData = ramesUniques
    .map(nomRame => ({ nom: nomRame, data: dataRames[nomRame] }))
    .filter(item => item.data); // Filtre les rames non trouvées

  return (
    <div className="station-detail-container">
      
      {/* --- HEADER --- */}
      <header className="station-detail-header">
        <h1>{station.nom}</h1>
        
        {/* Barre de couleur des lignes (style PageRepertoire) */}
        <div className="station-couleur-barre">
          {station.lignes.map(ligneId => (
            <span 
              key={ligneId} 
              className="couleur-segment" 
              style={{ backgroundColor: ligneColors[ligneId] || '#ccc' }}
              title={`Ligne ${ligneId}`}
            ></span>
          ))}
        </div>
      </header>

      {/* --- CONTENU 2 COLONNES (style PageDetailRame) --- */}
      <div className="station-detail-content">
        
        {/* --- COLONNE INFOBOX (gauche) --- */}
        <aside className="station-detail-infobox">
          <div className="infobox-section">
            <h3>Lignes en correspondance</h3>
            <div className="station-lignes-liste">
              {lignesPourStation.map(ligne => (
                <Link 
                  key={ligne.id} 
                  to={`/ligne/${ligne.id}`} 
                  className="ligne-logo-link"
                  title={ligne.nom}
                >
                  <img 
                    src={`/assets/${ligne.id}-logo.png`} 
                    alt={ligne.nom}
                    className="ligne-logo-station" // Style CSS spécifique
                  />
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* --- COLONNE PRINCIPALE (droite) --- */}
        <main className="station-detail-main">
          <h2>Matériel roulant à cette station</h2>
          <div className="station-rames-grille">
            {ramesData.map(item => (
              <Link key={item.nom} to={`/rame/${item.nom}`} className="rame-mini-carte">
                <div className="rame-mini-carte-img-wrapper">
                  <img 
                    src={`/assets/${item.data.image}`} 
                    alt={item.nom} 
                  />
                </div>
                <h4>{item.nom}</h4>
                <p>{item.data.nomComplet}</p>
              </Link>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}