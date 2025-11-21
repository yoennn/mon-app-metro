// src/App.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { lignesMetro } from './data.js';
import './App.css'; 

export default function App() {
  const lignesActuelles = lignesMetro.filter(l => l.type === 'actuel');
  const lignesGPE = lignesMetro.filter(l => l.type === 'gpe');

  return (
    <>
      <div className="app-layout">
        <section className="main-reseau">
          <h2>Réseau Actuel</h2>
          <div className="lignes-grille">
            {lignesActuelles.map(ligne => (
              <Link to={`/ligne/${ligne.id}`} key={ligne.id} className="ligne-carte-link">
                <div className="ligne-carte">
                  
                  {/* --- MODIFICATION ICI --- */}
                  <div className="carte-logo-container">
                    <img src="/assets/metro-logo.png" alt="Métro" className="logo-metro-m" />
                    <img src={`/assets/${ligne.id}-logo.png`} alt="" className="logo-ligne-numero" />
                  </div>
                  {/* --- FIN MODIFICATION --- */}

                  <div className="carte-info">
                    <h3>{ligne.nom}</h3>
                    {ligne.terminus && (
                      <p>{ligne.terminus.join(' ↔ ')}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside className="sidebar-gpe">
          <h2>Grand Paris Express</h2>
          <div className="gpe-grille">
            {lignesGPE.map(ligne => (
              <Link to={`/ligne/${ligne.id}`} key={ligne.id} className="ligne-carte-link">
                <div className="ligne-carte gpe-carte">

                  {/* --- MODIFICATION ICI --- */}
                  <div className="carte-logo-container">
                    <img src="/assets/metro-logo.png" alt="Métro" className="logo-metro-m" />
                    <img src={`/assets/${ligne.id}-logo.png`} alt="" className="logo-ligne-numero" />
                  </div>
                  {/* --- FIN MODIFICATION --- */}

                  <div className="carte-info">
                    <h3>{ligne.nom}</h3>
                    {ligne.terminus && (
                      <p>{ligne.terminus.join(' ↔ ')}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}