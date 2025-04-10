import React from 'react';
import './Lists.scss';

const mockUsers = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    joinedAt: '2024-04-08T14:30:00'
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    joinedAt: '2024-04-08T10:15:00'
  },
  {
    id: 3,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    joinedAt: '2024-04-07T16:45:00'
  },
  {
    id: 4,
    name: 'Pedro Costa',
    email: 'pedro.costa@email.com',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    joinedAt: '2024-04-07T09:20:00'
  }
];

const RecentUsers: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="users-list">
      {mockUsers.map(user => (
        <div key={user.id} className="list-item">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-email">{user.email}</div>
          </div>
          <div className="user-joined">
            {formatDate(user.joinedAt)}
          </div>
        </div>
      ))}
      <button className="view-all">Ver Todos os Usuários</button>
    </div>
  );
};

export default RecentUsers;