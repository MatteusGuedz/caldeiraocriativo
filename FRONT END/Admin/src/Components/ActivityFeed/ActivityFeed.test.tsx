// src/Components/ActivityFeed/ActivityFeed.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ActivityFeed from './index';

// Definindo o tipo correto para as atividades de teste
const mockActivities = [
  {
    id: 1,
    type: 'lesson_completed' as const,
    courseId: 1,
    courseTitle: 'Curso Teste',
    lessonId: 1,
    lessonTitle: 'Aula Teste',
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    type: 'achievement_unlocked' as const,
    achievementId: 1,
    achievementTitle: 'Primeira Conquista',
    achievementIcon: '🏆',
    timestamp: new Date().toISOString()
  },
  {
    id: 3,
    type: 'course_started' as const,
    courseId: 2,
    courseTitle: 'Curso Novo',
    timestamp: new Date().toISOString()
  },
  {
    id: 4,
    type: 'course_completed' as const,
    courseId: 1,
    courseTitle: 'Curso Concluído',
    timestamp: new Date().toISOString()
  }
];

describe('ActivityFeed', () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders activity items correctly', () => {
    renderWithRouter(<ActivityFeed activities={mockActivities} />);
    
    // Verifica se as atividades são renderizadas
    expect(screen.getByText(/Aula Concluída: Aula Teste/i)).toBeInTheDocument();
    expect(screen.getByText(/Conquista Desbloqueada: Primeira Conquista/i)).toBeInTheDocument();
    expect(screen.getByText(/Curso Iniciado: Curso Novo/i)).toBeInTheDocument();
    expect(screen.getByText(/Curso Concluído: Curso Concluído/i)).toBeInTheDocument();
  });

  it('shows empty state when no activities', () => {
    renderWithRouter(<ActivityFeed activities={[]} />);
    
    expect(screen.getByText(/Nenhuma atividade recente/i)).toBeInTheDocument();
  });

  it('renders correct icons for different activity types', () => {
    renderWithRouter(<ActivityFeed activities={mockActivities} />);
    
    // Verifica se os ícones corretos são renderizados
    const achievementIcon = screen.getByText('🏆');
    const lessonIcon = screen.getByText('✅');
    
    expect(achievementIcon).toBeInTheDocument();
    expect(lessonIcon).toBeInTheDocument();
  });

  it('formats timestamps correctly', () => {
    const oldActivity = {
      ...mockActivities[0],
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 dias atrás
    };
    
    renderWithRouter(<ActivityFeed activities={[oldActivity]} />);
    
    expect(screen.getByText(/3 dias atrás/i)).toBeInTheDocument();
  });
});