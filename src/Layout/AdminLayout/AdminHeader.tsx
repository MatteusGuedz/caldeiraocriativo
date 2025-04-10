import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminHeader.scss';
import ImgAvatar from '../../Assets/images/avatar.jpg';

interface AdminHeaderProps {
  onMenuClick: () => void; // Definição da propriedade
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="admin-header">
      <div className="admin-header__logo">
        <Link to="/admin/dashboard">
          <img src="/logo.png" alt="Logo Admin" />
        </Link>
      </div>

      <div className="admin-header__search">
        <input type="text" placeholder="Buscar..." />
        <button type="button">
          <i className="fa fa-search">🔍</i>
        </button>
      </div>

      <div className="admin-header__actions">
        <div className="admin-header__notifications">
          <button type="button">
            <i className="fa fa-bell">🔔</i>
            <span className="badge">3</span>
          </button>
        </div>

        <div className="admin-header__user">
          <div 
            className="admin-header__user-info" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img 
              src={user?.avatar || ImgAvatar} 
              alt={user?.name || "Admin"} 
              className="admin-header__avatar"
            />
            <span className="admin-header__username">{user?.name || "Admin"}</span>
          </div>

          {showDropdown && (
            <div className="admin-header__dropdown">
              <ul>
                <li>
                  <Link to="/admin/profile">Meu Perfil</Link>
                </li>
                <li>
                  <Link to="/admin/settings">Configurações</Link>
                </li>
                <li>
                  <button onClick={signOut}>Sair</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;