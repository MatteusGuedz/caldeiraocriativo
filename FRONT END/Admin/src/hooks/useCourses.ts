// src/hooks/useCourses.ts
import { useState, useEffect } from 'react';
import { api } from '../services/api';

// Interfaces
export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  available: boolean;
  progress: number;
  totalLessons: number;
  completedLessons: number;
}

export interface Module {
  id: number;
  courseId: number;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  duration: string;
  completed: boolean;
}

export interface CourseDetail extends Course {
  modules: Module[];
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await api.get('/courses');
        setCourses(data);
      } catch (err) {
        setError('Erro ao carregar cursos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const getCourseDetails = async (id: number): Promise<CourseDetail | null> => {
    try {
      setLoading(true);
      const data = await api.get(`/courses/${id}`);
      return data;
    } catch (err) {
      setError('Erro ao carregar detalhes do curso');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateLessonProgress = async (lessonId: number, completed: boolean) => {
    try {
      setLoading(true);
      await api.post('/lessons/progress', { lessonId, completed });
      
      // Atualizaria o estado local aqui também em um caso real
      // Para simular, estamos apenas retornando sucesso
      return true;
    } catch (err) {
      setError('Erro ao atualizar progresso da aula');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { 
    courses, 
    loading, 
    error, 
    getCourseDetails,
    updateLessonProgress
  };
}