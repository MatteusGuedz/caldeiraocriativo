import React from 'react';
import { Course } from '../index';

interface CoursesTableProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (courseId: number) => void;
}

const CoursesTable: React.FC<CoursesTableProps> = ({ courses, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="courses-table">
      <table>
        <thead>
          <tr>
            <th>Curso</th>
            <th>Status</th>
            <th>Módulos</th>
            <th>Instrutor</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>
                <div className="course-info">
                  <img src={course.image} alt={course.title} className="course-thumbnail" />
                  <div className="course-details">
                    <div className="course-title">{course.title}</div>
                    <div className="course-description">{course.description}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className={`course-status ${course.available ? 'available' : 'unavailable'}`}>
                  {course.available ? 'Disponível' : 'Indisponível'}
                </span>
              </td>
              <td>{course.modules?.length || 0}</td>
              <td>{course.instructors?.[0] || 'Não definido'}</td>
              <td>{formatDate(course.createdAt || new Date().toISOString())}</td>
              <td>{formatDate(course.updatedAt || new Date().toISOString())}</td>
              <td>
                <div className="actions">
                  <button 
                    className="edit"
                    onClick={() => onEdit(course)}
                    title="Editar curso"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="delete"
                    onClick={() => onDelete(course.id)}
                    title="Excluir curso"
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

export default CoursesTable;