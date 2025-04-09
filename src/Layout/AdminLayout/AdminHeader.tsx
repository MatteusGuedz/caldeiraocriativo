import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './AdminLayout.scss';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-button" onClick={onMenuClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <span className="brand">Painel Administrativo</span>
      </div>

      <div className="header-right">
        <div className="admin-info">
          <img
            src={user?.avatar || '/default-avatar.png'}
            alt="Admin Avatar"
          />
          <span>{user?.name || 'Admin'}</span>
        </div>
        <button className="menu-button" onClick={handleLogout}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;