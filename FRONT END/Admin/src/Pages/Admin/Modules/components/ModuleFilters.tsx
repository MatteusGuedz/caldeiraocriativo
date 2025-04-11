import React from 'react';

interface Filters {
  search: string;
  course: string;
}

interface Course {
  id: number;
  title: string;
}

interface ModuleFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  courses: Course[];
}

const ModuleFilters: React.FC<ModuleFiltersProps> = ({ 
  filters, 
  onFiltersChange, 
  courses 
}) => {
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
            placeholder="Título do módulo"
          />
        </div>

        <div className="filter-item">
          <label htmlFor="course">Curso</label>
          <select
            id="course"
            name="course"
            value={filters.course}
            onChange={handleChange}
          >
            <option value="all">Todos os Cursos</option>
            {courses.map(course => (
              <option key={course.id} value={course.id.toString()}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

export default ModuleFilters;