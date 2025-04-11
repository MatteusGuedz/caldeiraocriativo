import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Bell, User, LogOut, Settings } from 'lucide-react';
import './AdminHeader.scss';
import ImgAvatar from '../../Assets/images/avatar.jpg';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="navbar admin-header">
      <div className="navbar-left">
        <button className="menu-button" onClick={onMenuClick}>
          <div className="hamburger-container">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>
        <h1>Caldeirão Criativo Admin</h1>
      </div>

      <div className="navbar-center">
        <div className="search-container">
          <input type="text" placeholder="Buscar..." />
          <button type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '50%' }}></div>
          </div>
          <span className="progress-text">Nível 1</span>
        </div>

        <div className="notification-container">
          <div className="notification-bell">
            <Bell color="#ffffff" size={24} strokeWidth={2} />
            <span className="notification-badge">3</span>
          </div>
        </div>

        <div 
          className="user-dropdown" 
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="username">Admin</span>
          <img 
            src={user?.avatar || ImgAvatar} 
            alt={user?.name || "Admin"} 
            className="avatar"
          />
        </div>

        {showDropdown && (
          <div className="dropdown-menu">
            <div className="dropdown-header">
              <div className="user-info">
                <strong>{user?.name || 'Admin'}</strong>
                <small>Administrador</small>
              </div>
              <button 
                className="close-btn" 
                onClick={() => setShowDropdown(false)}
              >
                ×
              </button>
            </div>
            <button onClick={() => {/* Navigate to profile */}}>
              <User size={16} /> Meu Perfil
            </button>
            <button onClick={() => {/* Navigate to settings */}}>
              <Settings size={16} /> Configurações
            </button>
            <button onClick={signOut}>
              <LogOut size={16} /> Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;