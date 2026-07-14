import React from 'react';
import './Sidebar.css';

// Import SVG assets
import chevronLeftIcon from '../assets/chevron-left.svg';
import homeIcon from '../assets/home.svg';
import bookOpenIcon from '../assets/book-open.svg';

export default function Sidebar({ currentPage, onPageChange, collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <button className="back-btn" onClick={onToggle} aria-label="Ocultar/Mostrar menú lateral">
          <img 
            src={chevronLeftIcon} 
            alt="Colapsar" 
            className="sidebar-icon toggle-icon"
            style={{ width: '24px', height: '24px' }}
          />
        </button>
      </div>

      <nav className="sidebar-menu">
        <ul>
          <li>
            <button 
              onClick={() => onPageChange('inicio')} 
              className={`menu-item ${currentPage === 'inicio' ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              <span className="menu-icon">
                <img 
                  src={homeIcon} 
                  alt="Inicio" 
                  className={`sidebar-icon ${currentPage === 'inicio' ? 'active-icon' : 'inactive-icon'}`}
                  style={{ width: '20px', height: '20px' }}
                />
              </span>
              <span className="menu-text">Inicio</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => onPageChange('recetas')} 
              className={`menu-item ${currentPage === 'recetas' ? 'active' : ''}`}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
              <span className="menu-icon">
                <img 
                  src={bookOpenIcon} 
                  alt="Recetas" 
                  className={`sidebar-icon ${currentPage === 'recetas' ? 'active-icon' : 'inactive-icon'}`}
                  style={{ width: '20px', height: '20px' }}
                />
              </span>
              <span className="menu-text">Recetas</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
