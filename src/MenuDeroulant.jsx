// src/MenuDeroulant.jsx
import React, { useState, useMemo } from 'react'; // Ajout de useState et useMemo
import { Link } from 'react-router-dom';
// AJOUT : Importer les nouvelles données
import { lignesMetro, stationsData } from './data.js'; 
import './MenuDeroulant.css';

// PETIT HELPER pour normaliser la recherche
const normalizeString = (str) => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");


export default function MenuDeroulant({ estOuvert, onClose }) {
  const [recherche, setRecherche] = useState(''); // État pour la recherche

  // Logique de recherche
  const filteredStations = useMemo(() => {
    const query = normalizeString(recherche);
    if (query.length < 2) {
      return []; // On ne cherche pas avant 2 caractères
    }
    
    return stationsData
      .filter(station => normalizeString(station.nom).includes(query))
      .map(station => {
        // 1. Trouver les lignes de la station (ex: ["1", "4"])
        const lignes = station.lignes;
        
        // 2. Trouver le matériel roulant pour ces lignes
        const materielNoms = lignes.flatMap(ligneId => {
          const ligneInfo = lignesMetro.find(l => l.id === ligneId);
          return ligneInfo ? ligneInfo.materiel.map(m => m.nom) : [];
        });
        
        // 3. Rendre la liste de rames unique
        const uniqueRames = [...new Set(materielNoms)];

        return {
          ...station,
          rames: uniqueRames
        };
      })
      .sort((a, b) => a.nom.localeCompare(b.nom)); // Trier les résultats
  }, [recherche]); // Recalcule seulement si 'recherche' change


  const lignesActuelles = lignesMetro.filter(l => l.type === 'actuel');
  const lignesGPE = lignesMetro.filter(l => l.type === 'gpe');
  
  // Fonction pour vider la recherche en fermant
  const handleClose = () => {
    setRecherche('');
    onClose();
  };

  return (
    <div className={`menu-deroulant ${estOuvert ? 'open' : ''}`}>
      <div className="menu-content">
        
        {/* --- NOUVELLE SECTION RECHERCHE --- */}
        <h2 className="menu-titre-section">Rechercher une station</h2>
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Ex: Châtelet, Bastille..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>

        {/* --- NOUVELLE SECTION RÉSULTATS --- */}
        {recherche.length >= 2 && (
          <div className="search-results-container">
            {filteredStations.length > 0 ? (
              filteredStations.map(station => (
                <div key={station.nom} className="result-item">
                  <h4 className="result-item-titre">{station.nom}</h4>
                  <div className="result-item-lignes">
                    {station.lignes.map(id => (
                      <Link key={id} to={`/ligne/${id}`} onClick={handleClose}>
                        <img 
                          src={`/assets/${id}-logo.png`} 
                          alt={`Ligne ${id}`} 
                          className="result-item-logo"
                          title={`Ligne ${id}`}
                        />
                      </Link>
                    ))}
                  </div>
                  <p className="result-item-rames-label">Rames possibles :</p>
                  <div className="result-item-rames">
                    {station.rames.map(nomRame => (
                      <Link key={nomRame} to={`/rame/${nomRame}`} className="result-item-rame-tag" onClick={handleClose}>
                        {nomRame}
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="search-no-results">Aucune station trouvée.</p>
            )}
          </div>
        )}
        
        {/* --- SECTIONS EXISTANTES (avec onClick={handleClose}) --- */}

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