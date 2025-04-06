import React, { useState } from 'react';
import './Navbar.scss';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('open');
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          ☰
        </button>
        <h1>Caldeirão Criativo</h1>
      </div>
      <div className="navbar-right">
        <span>Olá, Usuário</span>
        <button className="logout">Sair</button>
      </div>
    </nav>
  );
};

export default Navbar;
