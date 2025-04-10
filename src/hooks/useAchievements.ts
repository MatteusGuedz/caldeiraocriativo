import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requiredProgress?: number;
  currentProgress?: number;
}

const defaultAchievements: Achievement[] = [
  {
    id: 1,
    name: 'Primeira Aula',
    description: 'Assista sua primeira aula na plataforma',
    icon: '🎓',
    unlocked: false,
    requiredProgress: 1,
    currentProgress: 0
  },
  // ... outros achievements
];

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadAchievements = () => {
      const storedAchievements = localStorage.getItem('achievements');
      if (storedAchievements) {
        setAchievements(JSON.parse(storedAchievements));
      } else {
        setAchievements(defaultAchievements);
        localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
      }
      setLoading(false);
    };
    
    loadAchievements();
  }, []);
  
  const updateAchievementProgress = (
    achievementId: number, 
    progressIncrement: number = 1
  ) => {
    setAchievements(prevAchievements => {
      const updatedAchievements = prevAchievements.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          const newProgress = (achievement.currentProgress || 0) + progressIncrement;
          const requiredProgress = achievement.requiredProgress || 1;
          
          if (newProgress >= requiredProgress) {
            const updatedAchievement = {
              ...achievement,
              unlocked: true,
              unlockedAt: new Date().toISOString(),
              currentProgress: requiredProgress
            };
            
            return updatedAchievement;
          }
          
          return {
            ...achievement,
            currentProgress: newProgress
          };
        }
        return achievement;
      });
      
      localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
      
      return updatedAchievements;
    });
  };
  
  const unlockAchievement = (achievementId: number) => {
    setAchievements(prevAchievements => {
      const updatedAchievements = prevAchievements.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          return {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date().toISOString(),
            currentProgress: achievement.requiredProgress
          };
        }
        return achievement;
      });
      
      localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
      
      return updatedAchievements;
    });
  };

  return {
    achievements,
    loading,
    updateAchievementProgress,
    unlockAchievement
  };
}