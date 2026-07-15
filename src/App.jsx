import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Inicio from './components/pages/Inicio';
import Recetas from './components/pages/Recetas';
import Login from './components/pages/Login';
import './App.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const guardado = localStorage.getItem('user');
    return guardado ? JSON.parse(guardado) : null;
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const handleLogin = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setCurrentUser(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-wrapper">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="dashboard-layout">   {/* ← Sidebar NO va aquí */}
        <Navbar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/recetas" element={<Recetas />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}