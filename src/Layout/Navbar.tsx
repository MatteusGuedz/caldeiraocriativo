import React, { useState, useRef, useEffect } from 'react';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';
import avatarImg from '../Assets/images/avatar.jpg'; // Certifique-se que a imagem está dentro de src

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    console.log('Logout...');
    setIsDropdownOpen(false);
  };

  const goToProfile = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1>Caldeirão Criativo</h1>
      </div>

      <div className="navbar-right" ref={dropdownRef}>
        <div className="user-dropdown" onClick={toggleDropdown}>
          <span className="username">Olá, Usuário</span>
          <img src={avatarImg} alt="Avatar" className="avatar" />
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-header">
              <div className="user-info">
                <strong>Usuário Demo</strong>
                <small>Admin</small>
              </div>
              <button className="close-btn" onClick={toggleDropdown}>
                ×
              </button>
            </div>
            <button onClick={goToProfile}>👤 Meu Perfil</button>
            <button onClick={() => alert('Inbox ainda não implementado')}>
              💬 Mensagens
            </button>
            <button onClick={() => alert('Configurações ainda não implementado')}>
              ⚙️ Configurações
            </button>
            <button onClick={handleLogout}>⎋ Sair</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
