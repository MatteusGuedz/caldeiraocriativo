import React, { useState, useEffect } from 'react';
import './Users.scss';
import UserFilters from './components/UserFilters';
import UsersTable from './components/UsersTable';
import UserModal from './components/UserModal';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  status: 'active' | 'inactive' | 'blocked';
  lastLogin: string;
  joinedAt: string;
  avatar: string;
  coursesEnrolled: number;
  coursesCompleted: number;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@email.com',
    role: 'student',
    status: 'active',
    lastLogin: '2024-04-09T10:30:00',
    joinedAt: '2024-01-15T08:00:00',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    coursesEnrolled: 3,
    coursesCompleted: 1
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    role: 'instructor',
    status: 'active',
    lastLogin: '2024-04-08T15:45:00',
    joinedAt: '2023-11-20T14:30:00',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    coursesEnrolled: 5,
    coursesCompleted: 5
  },
  // Adicione mais usuários mock aqui
];

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    role: 'all',
    status: 'all'
  });

  useEffect(() => {
    // Simular carregamento de dados
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Em um ambiente real, isso seria uma chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(mockUsers);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserDelete = (userId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         user.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesStatus = filters.status === 'all' || user.status === filters.status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="admin-users">
      <header className="users-header">
        <h1>Gestão de Usuários</h1>
        <button 
          className="btn-primary"
          onClick={() => {
            setSelectedUser(null);
            setIsModalOpen(true);
          }}
        >
          Adicionar Usuário
        </button>
      </header>

      <UserFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />

      {loading ? (
        <div className="loading">Carregando usuários...</div>
      ) : (
        <UsersTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleUserDelete}
        />
      )}

      {isModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUserUpdate}
        />
      )}
    </div>
  );
};

export default AdminUsers;