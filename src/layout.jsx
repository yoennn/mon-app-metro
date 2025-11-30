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

// Créer l'ensemble des ID de ligne valides (une seule fois)
const allLineIDs = new Set(lignesMetro.map(l => l.id));

export default function Layout() { 
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [rechercheOuvert, setRechercheOuvert] = useState(false);
  const [recherche, setRecherche] = useState(''); 

  const filteredStations = useMemo(() => {
    const query = normalizeString(recherche);
    const lineSearchTerm = query.replace('ligne ', '').replace('m', '').trim();
    let stationsToShow = [];

    if (allLineIDs.has(lineSearchTerm)) {
      stationsToShow = stationsData.filter(station => 
        station.lignes.includes(lineSearchTerm)
      );
    } 
    else if (query.length >= 2) {
      stationsToShow = stationsData.filter(station => 
        normalizeString(station.nom).includes(query)
      );
    }

    return stationsToShow
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
    if (rechercheOuvert) closeRecherche(); 
  };

  // Fonctions pour la RECHERCHE
  const closeRecherche = () => {
    setRechercheOuvert(false);
    setRecherche(''); 
  }
  const toggleRecherche = () => {
    const newState = !rechercheOuvert;
    setRechercheOuvert(newState);
    if (menuOuvert) closeMenu(); 
    
    if (newState) {
      setTimeout(() => document.getElementById('header-search-input')?.focus(), 200);
    } else {
      setRecherche(''); 
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
            placeholder="Rechercher une station ou une ligne..."
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

      {/* --- MODIFICATION ICI --- */}
      {/* Le conteneur est TOUJOURS là, c'est la classe .open qui le montre */}
      <div className={`header-search-results-container ${rechercheOuvert ? 'open' : ''}`}>
        {/* Le CONTENU, lui, reste conditionnel pour la performance */}
        {recherche.length > 0 && filteredStations.length === 0 && !allLineIDs.has(recherche.replace('ligne ', '').replace('m', '').trim()) ? (
          <p className="search-no-results">Aucune station trouvée.</p>
        ) : recherche.length === 0 ? (
          <p className="search-prompt">Tapez un nom de station ou un n° de ligne.</p>
        ) : (
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
        )}
      </div>
      {/* --- FIN MODIFICATION --- */}

      
      {/* Ajout de onClick={closeRecherche} pour fermer en cliquant sur le contenu */}
      <div className="page-container" onClick={closeRecherche}>
        <main className="page-content">
          <Outlet /> 
        </main>
      </div>

      <MenuDeroulant 
        estOuvert={menuOuvert} 
        onClose={closeMenu} 
      />
    </>
  );
}