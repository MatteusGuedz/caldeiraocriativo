import React, { useState, useEffect } from 'react';
import './Courses.scss';
import CourseFilters from './components/CourseFilters';
import CoursesTable from './components/CoursesTable';
import CourseModal from './components/CourseModal';
import { mockCourses } from '../../../data/mockData';

export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  available: boolean;
  modules?: any[];
  instructors?: any[];
  createdAt?: string;
  updatedAt?: string;
}

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    instructor: 'all'
  });

  useEffect(() => {
    // Simular carregamento de dados
    const fetchCourses = async () => {
      setLoading(true);
      try {
        // Em um ambiente real, isso seria uma chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCourses(mockCourses.map(course => ({
          ...course,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          instructors: ['Maria Silva', 'João Santos']
        })));
      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCourseUpdate = (updatedCourse: Course) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleCourseDelete = (courseId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = 
      filters.status === 'all' || 
      (filters.status === 'available' && course.available) ||
      (filters.status === 'unavailable' && !course.available);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-courses">
      <header className="courses-header">
        <h1>Gestão de Cursos</h1>
        <button 
          className="btn-primary"
          onClick={() => {
            setSelectedCourse(null);
            setIsModalOpen(true);
          }}
        >
          Adicionar Curso
        </button>
      </header>

      <CourseFilters 
        filters={filters}
        onFiltersChange={setFilters}
      />

      {loading ? (
        <div className="loading">Carregando cursos...</div>
      ) : (
        <CoursesTable
          courses={filteredCourses}
          onEdit={handleEditCourse}
          onDelete={handleCourseDelete}
        />
      )}

      {isModalOpen && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setIsModalOpen(false)}
          onSave={handleCourseUpdate}
        />
      )}
    </div>
  );
};

export default AdminCourses;