import React from 'react';
import { Module } from '../index';
import { mockCourseDetails } from '../../../../data/mockData';

interface ModulesTableProps {
  modules: Module[];
  onEdit: (module: Module) => void;
  onDelete: (moduleId: number) => void;
}

const ModulesTable: React.FC<ModulesTableProps> = ({ modules, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getCourseTitle = (courseId: number) => {
    const course = Object.values(mockCourseDetails).find(c => c.id === courseId);
    return course ? course.title : 'Curso não encontrado';
  };

  return (
    <div className="modules-table">
      <table>
        <thead>
          <tr>
            <th>Módulo</th>
            <th>Curso</th>
            <th>Aulas</th>
            <th>Criado em</th>
            <th>Atualizado em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {modules.map(module => (
            <tr key={module.id}>
              <td>
                <div className="module-info">
                  <div className="module-details">
                    <div className="module-title">{module.title}</div>
                    <div className="module-description">
                      {module.description || 'Sem descrição'}
                    </div>
                  </div>
                </div>
              </td>
              <td>{getCourseTitle(module.courseId)}</td>
              <td>{module.lessons.length}</td>
              <td>{formatDate(module.createdAt || new Date().toISOString())}</td>
              <td>{formatDate(module.updatedAt || new Date().toISOString())}</td>
              <td>
                <div className="actions">
                  <button 
                    className="edit"
                    onClick={() => onEdit(module)}
                    title="Editar módulo"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    className="delete"
                    onClick={() => onDelete(module.id)}
                    title="Excluir módulo"
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

export default ModulesTable;