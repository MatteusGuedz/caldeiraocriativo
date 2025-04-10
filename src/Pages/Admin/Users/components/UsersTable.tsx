import React from 'react';
import { User } from '../index';

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="users-table">
      <table>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Função</th>
            <th>Status</th>
            <th>Cursos</th>
            <th>Último Acesso</th>
            <th>Data de Cadastro</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>
              </td>
              <td>
                {user.role === 'admin' && 'Administrador'}
                {user.role === 'instructor' && 'Instrutor'}
                {user.role === 'student' && 'Aluno'}
              </td>
              <td>
                <span className={`user-status ${user.status}`}>
                  {user.status === 'active' && 'Ativo'}
                  {user.status === 'inactive' && 'Inativo'}
                  {user.status === 'blocked' && 'Bloqueado'}
                </span>
              </td>
              <td>
                {user.coursesCompleted}/{user.coursesEnrolled}
              </td>
              <td>{formatDate(user.lastLogin)}</td>
              <td>{formatDate(user.joinedAt)}</td>
              <td>
                <div className="actions">
                  <button 
                    className="edit"
                    onClick={() => onEdit(user)}
                    title="Editar usuário"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="delete"
                    onClick={() => onDelete(user.id)}
                    title="Excluir usuário"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;