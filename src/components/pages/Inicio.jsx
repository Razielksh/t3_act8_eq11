import React from 'react';
import './Pages.css';

export default function Inicio() {
  return (
    <div className="page-container">
      <h1>Inicio</h1>
      <p className="page-subtitle">Bienvenido</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Recetas</h3>
          <p className="card-value">50</p>
        </div>
        <div className="card">
          <h3>Recetas Fáciles</h3>
          <p className="card-value">32</p>
        </div>
      </div>
    </div>
  );
}
