import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';

// Importation des composants
import Layout from './layout.jsx'; 
import App from './App.jsx';
import PageDetailLigne from './PageDetailLigne.jsx';
import PageRepertoire from './PageRepertoire.jsx';
import PageDetailRame from './PageDetailRame.jsx';
import PageCarte from './PageCarte.jsx';

import './index.css';

// Hook pour forcer le re-rendu de PageDetailLigne lors du changement d'ID
const PageDetailLigneWithKey = () => {
  const { id } = useParams();
  return <PageDetailLigne key={id} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />, 
      },
      {
        path: "ligne/:id",
        element: <PageDetailLigneWithKey />,
      },
      {
        path: "repertoire",
        element: <PageRepertoire />,
      },
      {
        path: "rame/:nom",
        element: <PageDetailRame />,
      },
      {
        path: "carte",
        element: <PageCarte />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);