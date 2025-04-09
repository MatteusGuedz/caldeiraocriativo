import React from 'react';

interface Filters {
  search: string;
  status: string;
  instructor: string;
}

interface CourseFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({ filters, onFiltersChange }) => {
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
            placeholder="Título do curso"
          />
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
            <option value="available">Disponíveis</option>
            <option value="unavailable">Indisponíveis</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="instructor">Instrutor</label>
          <select
            id="instructor"
            name="instructor"
            value={filters.instructor}
            onChange={handleChange}
          >
            <option value="all">Todos</option>
            <option value="maria-silva">Maria Silva</option>
            <option value="joao-santos">João Santos</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default CourseFilters;