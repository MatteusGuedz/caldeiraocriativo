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

interface AchievementsContextData {
  achievements: Achievement[];
  loading: boolean;
  updateAchievementProgress: (achievementId: number, progressIncrement?: number) => void;
  unlockAchievement: (achievementId: number) => void;
}

const AchievementsContext = createContext<AchievementsContextData>({} as AchievementsContextData);

export const AchievementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  return (
    <AchievementsContext.Provider
      value={{
        achievements,
        loading,
        updateAchievementProgress,
        unlockAchievement
      }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};

export function useAchievements(): AchievementsContextData {
  const context = useContext(AchievementsContext);
  
  if (!context) {
    throw new Error('useAchievements deve ser usado dentro de um AchievementsProvider');
  }
  
  return context;
}