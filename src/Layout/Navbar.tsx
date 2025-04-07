import React from 'react';
import './Navbar.scss';

interface NavbarProps {
  onToggleSidebar: () =>  void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => { 
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
      <button className="menu-button" onClick={() => {  onToggleSidebar();
}}>

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
