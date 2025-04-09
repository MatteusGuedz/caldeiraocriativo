// src/hooks/useUserProgress.ts
import { useState, useEffect } from 'react';

export interface UserProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalCoursesStarted: number;
  totalCoursesCompleted: number;
  totalLessonsCompleted: number;
  lastActive: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const defaultProgress: UserProgress = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  totalCoursesStarted: 0,
  totalCoursesCompleted: 0,
  totalLessonsCompleted: 0,
  lastActive: new Date().toISOString(),
  user: {
    name: 'Usuário',
    email: 'usuario@exemplo.com'
  }
};

// Resto do código permanece o mesmo...

// Calcular o XP necessário para um certo nível
const calculateXpForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

export function useUserProgress() {
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultProgress);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Carregar progresso do localStorage
    const loadProgress = () => {
      const storedProgress = localStorage.getItem('userProgress');
      if (storedProgress) {
        setUserProgress(JSON.parse(storedProgress));
      } else {
        setUserProgress(defaultProgress);
        localStorage.setItem('userProgress', JSON.stringify(defaultProgress));
      }
      setLoading(false);
    };
    
    loadProgress();
    
    // Registrar atividade do usuário
    updateLastActive();
  }, []);
  
  // Atualizar a data de última atividade
  const updateLastActive = () => {
    setUserProgress(prev => {
      const updated = {
        ...prev,
        lastActive: new Date().toISOString()
      };
      localStorage.setItem('userProgress', JSON.stringify(updated));
      return updated;
    });
  };
  
  // Adicionar XP e checar se subiu de nível
  const addXp = (amount: number) => {
    setUserProgress(prev => {
      let { level, xp, xpToNextLevel } = prev;
      
      // Adicionar XP
      xp += amount;
      
      // Verificar se subiu de nível
      while (xp >= xpToNextLevel) {
        xp -= xpToNextLevel;
        level += 1;
        xpToNextLevel = calculateXpForLevel(level);
        
        // Notificar sobre o novo nível
        showLevelUpNotification(level);
      }
      
      const updated = {
        ...prev,
        level,
        xp,
        xpToNextLevel,
        lastActive: new Date().toISOString()
      };
      
      localStorage.setItem('userProgress', JSON.stringify(updated));
      return updated;
    });
  };
  
  // Registrar uma lição completada
  const completeLesson = (courseId: number, lessonId: number) => {
    // Obter lições já completadas
    const completedLessonsKey = `course_${courseId}_completed_lessons`;
    const completedLessons = JSON.parse(localStorage.getItem(completedLessonsKey) || '[]');
    
    // Verificar se a lição já foi completada
    if (!completedLessons.includes(lessonId)) {
      // Adicionar à lista de completadas
      completedLessons.push(lessonId);
      localStorage.setItem(completedLessonsKey, JSON.stringify(completedLessons));
      
      // Atualizar progresso geral
      setUserProgress(prev => {
        const updated = {
          ...prev,
          totalLessonsCompleted: prev.totalLessonsCompleted + 1,
          lastActive: new Date().toISOString()
        };
        localStorage.setItem('userProgress', JSON.stringify(updated));
        return updated;
      });
      
      // Adicionar XP (20 pontos por lição)
      addXp(20);
    }
  };
  
  // Registrar um curso iniciado
  const startCourse = (courseId: number) => {
    // Obter cursos iniciados
    const startedCoursesKey = 'started_courses';
    const startedCourses = JSON.parse(localStorage.getItem(startedCoursesKey) || '[]');
    
    // Verificar se o curso já foi iniciado
    if (!startedCourses.includes(courseId)) {
      // Adicionar à lista de iniciados
      startedCourses.push(courseId);
      localStorage.setItem(startedCoursesKey, JSON.stringify(startedCourses));
      
      // Atualizar progresso geral
      setUserProgress(prev => {
        const updated = {
          ...prev,
          totalCoursesStarted: prev.totalCoursesStarted + 1,
          lastActive: new Date().toISOString()
        };
        localStorage.setItem('userProgress', JSON.stringify(updated));
        return updated;
      });
      
      // Adicionar XP (10 pontos por curso iniciado)
      addXp(10);
    }
  };
  
  // Registrar um curso completado
  const completeCourse = (courseId: number) => {
    // Obter cursos completados
    const completedCoursesKey = 'completed_courses';
    const completedCourses = JSON.parse(localStorage.getItem(completedCoursesKey) || '[]');
    
    // Verificar se o curso já foi completado
    if (!completedCourses.includes(courseId)) {
      // Adicionar à lista de completados
      completedCourses.push(courseId);
      localStorage.setItem(completedCoursesKey, JSON.stringify(completedCourses));
      
      // Atualizar progresso geral
      setUserProgress(prev => {
        const updated = {
          ...prev,
          totalCoursesCompleted: prev.totalCoursesCompleted + 1,
          lastActive: new Date().toISOString()
        };
        localStorage.setItem('userProgress', JSON.stringify(updated));
        return updated;
      });
      
      // Adicionar XP (50 pontos por curso completado)
      addXp(50);
    }
  };
  
  // Notificação de subida de nível
  const showLevelUpNotification = (newLevel: number) => {
    console.log(`Nível atingido: ${newLevel}!`);
    
    // Criar um elemento de notificação visual
    const notification = document.createElement('div');
    notification.className = 'level-up-notification';
    notification.innerHTML = `
      <div class="level-up-icon">🏆</div>
      <div class="level-up-info">
        <h3>Nível Atingido!</h3>
        <p>Você alcançou o nível ${newLevel}</p>
      </div>
    `;
    
    // Adicionar ao corpo do documento
    document.body.appendChild(notification);
    
    // Adicionar classe para animação
    setTimeout(() => {
      notification.classList.add('visible');
    }, 10);
    
    // Remover após alguns segundos
    setTimeout(() => {
      notification.classList.remove('visible');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 5000);
  };
  
  return {
    userProgress,
    loading,
    addXp,
    completeLesson,
    startCourse,
    completeCourse,
    updateLastActive
  };
}