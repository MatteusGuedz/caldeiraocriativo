import { useState, useCallback, useEffect } from 'react';

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

// Conquistas iniciais mockadas
const initialAchievements: Achievement[] = [
  {
    id: 1,
    name: 'Primeiro Passo',
    description: 'Conclua sua primeira aula',
    icon: '🚀',
    unlocked: false
  },
  {
    id: 2,
    name: 'Aprendiz Dedicado',
    description: 'Complete 5 aulas de um curso',
    icon: '📚',
    unlocked: false
  },
  {
    id: 3,
    name: 'Criativo Master',
    description: 'Conclua um curso completo',
    icon: '🏆',
    unlocked: false
  }
];

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    // Recuperar conquistas do localStorage ou usar iniciais
    const savedAchievements = localStorage.getItem('user-achievements');
    return savedAchievements 
      ? JSON.parse(savedAchievements) 
      : initialAchievements;
  });

  // Salvar conquistas sempre que mudarem
  useEffect(() => {
    localStorage.setItem('user-achievements', JSON.stringify(achievements));
  }, [achievements]);

  const updateAchievementProgress = useCallback((achievementId: number) => {
    setAchievements(currentAchievements => 
      currentAchievements.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          return {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date().toISOString()
          };
        }
        return achievement;
      })
    );
  }, []);

  const unlockAchievement = useCallback((achievementId: number) => {
    updateAchievementProgress(achievementId);
  }, [updateAchievementProgress]);

  // Garantir que sempre retorne um array
  const safeAchievements = achievements || [];

  return {
    achievements: safeAchievements,
    updateAchievementProgress,
    unlockAchievement
  };
};