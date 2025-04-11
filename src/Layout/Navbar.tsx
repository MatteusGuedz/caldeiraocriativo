// src/Layout/Navbar.tsx
import React, { useState, useRef, useEffect } from 'react';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';
import avatarImg from '../Assets/images/avatar.jpg';
import { useSearch, SearchResult } from '../hooks/useSearch';
import { useUserProgress } from '../hooks/useUserProgress';

interface NavbarProps {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { userProgress = { xp: 0, xpToNextLevel: 100, level: 1 } } = useUserProgress() || {};
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { results, loading, search } = useSearch();


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      search(searchQuery);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery, search]);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    console.log('Logout...');
    setIsDropdownOpen(false);
  };

  const goToProfile = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
    }
  };
  
  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={onToggleSidebar}>
          <div className="hamburger-container">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>
        <h1>Caldeirão Criativo</h1>
      </div>
      
      <div className="navbar-center" ref={searchRef}>
        <form className="search-container" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Buscar cursos, aulas..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSearchResults(!!searchQuery)}
          />
          <button type="submit">
            🔍
          </button>
        </form>
        
        {showSearchResults && (
          <div className="search-results">
            {loading ? (
              <div className="search-loading">Buscando...</div>
            ) : results.length > 0 ? (
              <>
                <div className="results-list">
                  {results.map(result => (
                    <div 
                      key={`${result.type}-${result.id}`} 
                      className="result-item"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="result-image">
                        <img src={result.image} alt={result.title} />
                      </div>
                      <div className="result-content">
                        <span className="result-title">{result.title}</span>
                        {result.type === 'lesson' && (
                          <span className="result-parent">
                            {result.parentTitle}
                          </span>
                        )}
                        <span className={`result-type ${result.type}`}>
                          {result.type === 'course' ? 'Curso' : 'Aula'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="show-all-results" onClick={handleSearch}>
                  Ver todos os resultados
                </div>
              </>
            ) : searchQuery ? (
              <div className="no-results">Nenhum resultado encontrado</div>
            ) : null}
          </div>
        )}
      </div>

      <div className="navbar-right" ref={dropdownRef}>
        <div className="user-progress">
          <div className="progress-bar">
          <div className="progress-fill" 
  style={{ width: `${userProgress?.xp ? (userProgress.xp / userProgress.xpToNextLevel) * 100 : 0}%` }}
></div>
          </div>
          <span className="progress-text">Nível {userProgress.level}</span>
        </div>
        
        <NotificationBell />
        
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

// Componente de notificações extraído para maior clareza
const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Carregar notificações do localStorage ou criar notificações demo
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Notificações demo
      const demoNotifications = [
        {
          id: 1,
          title: 'Novo curso disponível',
          message: 'Confira o novo curso de Criatividade na Prática',
          date: new Date().toISOString(),
          read: false,
          url: '/courses/3'
        },
        {
          id: 2,
          title: 'Continue aprendendo',
          message: 'Você não concluiu sua última aula. Continue de onde parou!',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: true,
          url: '/lesson/1/1/103'
        }
      ];
      setNotifications(demoNotifications);
      localStorage.setItem('notifications', JSON.stringify(demoNotifications));
    }
  }, []);

  // Detectar cliques fora do componente
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
  };

  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification, read: true
    }));
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notification-container" ref={notificationRef}>
      <div className="notification-bell" onClick={toggleNotifications}>
        <span className="notification-icon">🔔</span>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </div>
      
      {showNotifications && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3>Notificações</h3>
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                Marcar todas como lidas
              </button>
            )}
          </div>
          
          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => {
                    markAsRead(notification.id);
                    window.location.href = notification.url;
                  }}
                >
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {formatDate(new Date(notification.date))}
                    </span>
                  </div>
                  {!notification.read && (
                    <div className="unread-indicator"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-notifications">
                Nenhuma notificação
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Função auxiliar para formatar datas
function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'} atrás`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`;
  } else {
    return date.toLocaleDateString();
  }
}

export default Navbar;