// src/hooks/useSearch.ts
import { useState, useEffect } from 'react';
import { mockCourses, mockCourseDetails } from '../data/mockData';

export interface SearchResult {
  id: number;
  title: string;
  type: 'course' | 'lesson';
  image: string;
  parentId?: number; // Se for uma lesson, o parentId é o id do curso
  parentTitle?: string; // Nome do curso pai (para lições)
  moduleId?: number; // ID do módulo (para lições)
  url: string;
}

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const search = (searchQuery: string) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    // Simular atraso de rede
    setTimeout(() => {
      const searchTerms = searchQuery.toLowerCase().split(' ');
      const courseResults: SearchResult[] = [];
      const lessonResults: SearchResult[] = [];
      
      // Buscar nos cursos
      Object.values(mockCourseDetails).forEach(course => {
        // Verificar se o título do curso contém os termos de busca
        const matchesCourse = searchTerms.every(term => 
          course.title.toLowerCase().includes(term)
        );
        
        if (matchesCourse) {
          courseResults.push({
            id: course.id,
            title: course.title,
            type: 'course',
            image: course.image,
            url: `/courses/${course.id}`
          });
        }
        
        // Buscar nas lições de cada curso
        course.modules.forEach(module => {
          module.lessons.forEach(lesson => {
            const matchesLesson = searchTerms.every(term => 
              lesson.title.toLowerCase().includes(term)
            );
            
            if (matchesLesson) {
              lessonResults.push({
                id: lesson.id,
                title: lesson.title,
                type: 'lesson',
                image: course.image,
                parentId: course.id,
                parentTitle: course.title,
                moduleId: module.id,
                url: `/lesson/${course.id}/${module.id}/${lesson.id}`
              });
            }
          });
        });
      });
      
      // Combinamos resultados, priorizando cursos
      setResults([...courseResults, ...lessonResults]);
      setLoading(false);
    }, 300); // 300ms de delay para simular busca
  };

  return { results, loading, search, query };
}