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
    email: 'usuario@exemplo.com',
    avatar: '/default-avatar.png'
  }
};





const calculateXpForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

export function useUserProgress() {
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultProgress);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
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
    updateLastActive();
  }, []);
  
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
  
  const addXp = (amount: number) => {
    setUserProgress(prev => {
      let { level, xp, xpToNextLevel } = prev;
      
      xp += amount;
      
      while (xp >= xpToNextLevel) {
        xp -= xpToNextLevel;
        level += 1;
        xpToNextLevel = calculateXpForLevel(level);
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
  
  const completeLesson = (courseId: number, lessonId: number) => {
    const completedLessonsKey = `course_${courseId}_completed_lessons`;
    const completedLessons = JSON.parse(localStorage.getItem(completedLessonsKey) || '[]');
    
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem(completedLessonsKey, JSON.stringify(completedLessons));
      
      setUserProgress(prev => {
        const updated = {
          ...prev,
          totalLessonsCompleted: prev.totalLessonsCompleted + 1,
          lastActive: new Date().toISOString()
        };
        localStorage.setItem('userProgress', JSON.stringify(updated));
        return updated;
      });
      
      addXp(20);
    }
  };
  
  const startCourse = (courseId: number) => {
    const startedCoursesKey = 'started_courses';
    const startedCourses = JSON.parse(localStorage.getItem(startedCoursesKey) || '[]');
    
    if (!startedCourses.includes(courseId)) {
      startedCourses.push(courseId);
      localStorage.setItem(startedCoursesKey, JSON.stringify(startedCourses));
      
      setUserProgress(prev => {
        const updated = {
          ...prev,
          totalCoursesStarted: prev.totalCoursesStarted + 1,
          lastActive: new Date().toISOString()
        };
        localStorage.setItem('userProgress', JSON.stringify(updated));
        return updated;
      });
      
      addXp(10);
    }
  };
  
  const completeCourse = (courseId: number) => {
    const completedCoursesKey = 'completed_courses';
    const completedCourses = JSON.parse(localStorage.getItem(completedCoursesKey) || '[]');
    
    if (!completedCourses.includes(courseId)) {
      completedCourses.push(courseId);
      localStorage.setItem(completedCoursesKey, JSON.stringify(completedCourses));
      
      setUserProgress(prev => {
        const updated = {
          ...prev,
          totalCoursesCompleted: prev.totalCoursesCompleted + 1,
          lastActive: new Date().toISOString()
        };
        localStorage.setItem('userProgress', JSON.stringify(updated));
        return updated;
      });
      
      addXp(50);
    }
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