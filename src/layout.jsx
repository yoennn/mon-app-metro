// src/Layout.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import MenuDeroulant from './MenuDeroulant.jsx';
// Import des données nécessaires pour la recherche
import { lignesMetro, stationsData } from './data.js'; 
import './layout.css';

// Logique de recherche
const normalizeString = (str) => 
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function Layout() { 
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [rechercheOuvert, setRechercheOuvert] = useState(false);
  const [recherche, setRecherche] = useState(''); 

  const filteredStations = useMemo(() => {
    const query = normalizeString(recherche);
    if (query.length < 2) return [];
    
    return stationsData
      .filter(station => normalizeString(station.nom).includes(query))
      .map(station => {
        const lignes = station.lignes;
        const materielNoms = lignes.flatMap(ligneId => {
          const ligneInfo = lignesMetro.find(l => l.id === ligneId);
          return (ligneInfo && ligneInfo.materiel) ? ligneInfo.materiel.map(m => m.nom) : [];
        });
        const uniqueRames = [...new Set(materielNoms)];
        return { ...station, rames: uniqueRames };
      })
      .sort((a, b) => a.nom.localeCompare(b.nom));
  }, [recherche]);

  // Fonctions pour le MENU
  const closeMenu = () => setMenuOuvert(false);
  const toggleMenu = () => {
    setMenuOuvert(!menuOuvert);
    if (rechercheOuvert) closeRecherche(); // Ferme la recherche si on ouvre le menu
  };

  // Fonctions pour la RECHERCHE
  const closeRecherche = () => {
    setRechercheOuvert(false);
    setRecherche(''); 
  }
  const toggleRecherche = () => {
    const newState = !rechercheOuvert;
    setRechercheOuvert(newState);
    if (menuOuvert) closeMenu(); // Ferme le menu si on ouvre la recherche
    
    if (newState) {
      // Focus sur l'input lors de l'ouverture
      setTimeout(() => document.getElementById('header-search-input')?.focus(), 200);
    } else {
      setRecherche(''); // Vide la recherche si on ferme
    }
  };
  
  // Fonction pour l'overlay
  const closeAll = () => {
    closeMenu();
    closeRecherche();
  }

  // --- CORRECTION DU SCROLL (existante) ---
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0); 
    // Ferme aussi la recherche et le menu lors d'un changement de page
    closeAll();
  }, [pathname]);

  // Fonction pour fermer la recherche depuis un lien de résultat
  const handleLinkClick = () => {
    closeRecherche();
  };

  return (
    <>
      {/* L'OVERLAY n'apparaît QUE si le menu est ouvert */}
      {menuOuvert && (
        <div 
          className="menu-overlay"
          onClick={closeMenu}
        ></div>
      )}

      {/* --- STRUCTURE DU HEADER (inchangée) --- */}
      <header className="global-header-container">
        
        {/* 1. Bouton Hamburger (Gauche) */}
        <button 
          className={`hamburger-btn ${menuOuvert ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Ouvrir le menu"
          aria-expanded={menuOuvert}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* 2. Logo (Centre) */}
        <Link to="/" onClick={closeAll} className="global-logo-link">
          <img 
            src="/assets/ratp-grand.png" 
            alt="Paris Métro Grand Guide - Logo RATP" 
            className="global-logo" 
          />
        </Link>

        {/* 3. Conteneur de Recherche (Droite) */}
        <div className="header-search-wrapper">
          <input
            type="text"
            id="header-search-input"
            className={`header-search-input ${rechercheOuvert ? 'open' : ''}`}
            placeholder="Rechercher une station..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
          <button 
            className="header-search-toggle-btn"
            onClick={toggleRecherche}
            aria-label={rechercheOuvert ? "Fermer la recherche" : "Ouvrir la recherche"}
          >
            <img 
              src="/assets/loupe.png" 
              alt="Rechercher" 
              className={`search-icon-loupe ${rechercheOuvert ? 'hidden' : ''}`}
            />
            <div className={`search-icon-close ${rechercheOuvert ? 'visible' : ''}`}>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </header>

      {/* --- Conteneur de résultats (inchangé) --- */}
      {rechercheOuvert && (
        <div className="header-search-results-container">
          {recherche.length < 2 ? (
              <p className="search-prompt">Tapez au moins 2 caractères...</p>
          ) : filteredStations.length > 0 ? (
            filteredStations.map(station => (
              <div key={station.nom} className="result-item"> 
                <h4 className="result-item-titre">{station.nom}</h4>
                <div className="result-item-lignes">
                  {station.lignes.map(id => (
                    <Link key={id} to={`/ligne/${id}`} onClick={handleLinkClick}>
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
                    <Link key={nomRame} to={`/rame/${nomRame}`} className="result-item-rame-tag" onClick={handleLinkClick}>
                      {nomRame}
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="search-no-results">Aucune stationnée.</p>
          )}
        </div>
      )}
      
      {/* --- MODIFICATION ICI --- */}
      {/* Ajout de onClick={closeRecherche} pour fermer en cliquant sur le contenu */}
      <div className="page-container" onClick={closeRecherche}>
        <main className="page-content">
          <Outlet /> 
        </main>
      </div>
      {/* --- FIN MODIFICATION --- */}

      <MenuDeroulant 
        estOuvert={menuOuvert} 
        onClose={closeMenu} 
      />
    </>
  );
}