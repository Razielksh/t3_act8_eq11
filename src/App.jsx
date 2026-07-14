import React, { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState('inicio');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

    const handleLogin = (data) => {
      localStorage.setItem('user', JSON.stringify(data));
      setCurrentUser(data);
    }

    const handleLogout = () => {
      localStorage.removeItem('user');
      setCurrentUser(null);
    }
  // Mostrar Login si no hay usuario logueado
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="dashboard-layout">
        <Navbar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        <main className="main-content">
          {currentPage === 'inicio' ? <Inicio /> : <Recetas />}
        </main>
      </div>
    </>
  );
}
