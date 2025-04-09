import React, { useState, useEffect } from 'react';
import './Modules.scss';
import ModuleFilters from './components/ModuleFilters';
import ModulesTable from './components/ModulesTable';
import ModuleModal from './components/ModuleModal';
import { mockCourseDetails } from '../../../data/mockData';

export interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  duration: string;
  completed: boolean;
}

export interface Module {
  id: number;
  courseId: number;
  title: string;
  description?: string;
  lessons: Lesson[];
  createdAt?: string;
  updatedAt?: string;
}

const AdminModules: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    course: 'all'
  });

  useEffect(() => {
    // Simular carregamento de dados
    const fetchModules = async () => {
      setLoading(true);
      try {
        // Coletar módulos de todos os cursos mockados
        const allModules: Module[] = Object.values(mockCourseDetails).flatMap(course => 
          course.modules.map(module => ({
            ...module,
            courseId: course.id,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            description: `Descrição do módulo ${module.title}`
          }))
        );

        setModules(allModules);
      } catch (error) {
        console.error('Erro ao carregar módulos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const handleEditModule = (module: Module) => {
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const handleModuleUpdate = (updatedModule: Module) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === updatedModule.id 
          ? { ...updatedModule, updatedAt: new Date().toISOString() } 
          : module
      )
    );
    setIsModalOpen(false);
    setSelectedModule(null);
  };

  const handleModuleDelete = (moduleId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este módulo?')) {
      setModules(prevModules => prevModules.filter(module => module.id !== moduleId));
    }
  };

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCourse = 
      filters.course === 'all' || 
      module.courseId.toString() === filters.course;
    
    return matchesSearch && matchesCourse;
  });

  // Obter lista de cursos únicos para seleção
  const availableCourses = Object.values(mockCourseDetails).map(course => ({
    id: course.id,
    title: course.title
  }));

  return (
    <div className="admin-modules">
      <header className="modules-header">
        <h1>Gestão de Módulos</h1>
        <button 
          className="btn-primary"
          onClick={() => {
            setSelectedModule(null);
            setIsModalOpen(true);
          }}
        >
          Adicionar Módulo
        </button>
      </header>

      <ModuleFilters 
        filters={filters}
        onFiltersChange={setFilters}
        courses={availableCourses}
      />

      {loading ? (
        <div className="loading">Carregando módulos...</div>
      ) : (
        <ModulesTable
          modules={filteredModules}
          onEdit={handleEditModule}
          onDelete={handleModuleDelete}
        />
      )}

      {isModalOpen && (
        <ModuleModal
          module={selectedModule}
          onClose={() => setIsModalOpen(false)}
          onSave={handleModuleUpdate}
          courses={availableCourses}
        />
      )}
    </div>
  );
};

export default AdminModules;