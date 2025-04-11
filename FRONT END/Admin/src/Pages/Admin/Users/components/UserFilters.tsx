import React from 'react';

interface Filters {
  search: string;
  role: string;
  status: string;
}

interface UserFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFiltersChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <section className="filters-section">
      <div className="filters-grid">
        <div className="filter-item">
          <label htmlFor="search">Buscar</label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Nome ou email"
          />
        </div>

        <div className="filter-item">
          <label htmlFor="role">Função</label>
          <select
            id="role"
            name="role"
            value={filters.role}
            onChange={handleChange}
          >
            <option value="all">Todas</option>
            <option value="admin">Administrador</option>
            <option value="instructor">Instrutor</option>
            <option value="student">Aluno</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
          >
            <option value="all">Todos</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
            <option value="blocked">Bloqueado</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default UserFilters;