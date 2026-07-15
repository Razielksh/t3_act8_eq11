import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

import chevronLeftIcon from '../assets/chevron-left.svg';
import homeIcon from '../assets/home.svg';
import bookOpenIcon from '../assets/book-open.svg';

export default function Sidebar({ collapsed, onToggle }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!collapsed && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onToggle(); // colapsa el sidebar
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [collapsed]);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} ref={sidebarRef}>
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
            <NavLink
              to="/"
              end
              className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <span className="menu-icon">
                    <img
                      src={homeIcon}
                      alt="Inicio"
                      className={`sidebar-icon ${isActive ? 'active-icon' : 'inactive-icon'}`}
                      style={{ width: '20px', height: '20px' }}
                    />
                  </span>
                  <span className="menu-text">Inicio</span>
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recetas"
              className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <span className="menu-icon">
                    <img
                      src={bookOpenIcon}
                      alt="Recetas"
                      className={`sidebar-icon ${isActive ? 'active-icon' : 'inactive-icon'}`}
                      style={{ width: '20px', height: '20px' }}
                    />
                  </span>
                  <span className="menu-text">Recetas</span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}