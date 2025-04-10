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
  {
    id: 2,
    name: 'Maratonista',
    description: 'Assista 5 aulas em sequência',
    icon: '🏃',
    unlocked: false,
    requiredProgress: 5,
    currentProgress: 0
  },
  {
    id: 3,
    name: 'Criativo Master',
    description: 'Complete um curso inteiro',
    icon: '🎨',
    unlocked: false,
    requiredProgress: 1,
    currentProgress: 0
  },
  {
    id: 4,
    name: 'Estudante Dedicado',
    description: 'Acesse a plataforma por 7 dias consecutivos',
    icon: '📚',
    unlocked: false,
    requiredProgress: 7,
    currentProgress: 0
  },
  {
    id: 5,
    name: 'Perguntador',
    description: 'Faça 3 comentários em aulas diferentes',
    icon: '💬',
    unlocked: false,
    requiredProgress: 3,
    currentProgress: 0
  },
  {
    id: 6,
    name: 'Anotador',
    description: 'Faça anotações em 5 aulas diferentes',
    icon: '📝',
    unlocked: false,
    requiredProgress: 5,
    currentProgress: 0
  }
];

interface AchievementsContextType {
  achievements: Achievement[];
  loading: boolean;
  updateAchievementProgress: (
    achievementId: number, 
    progressIncrement?: number
  ) => void;
  unlockAchievement: (achievementId: number) => void;
}

const AchievementsContext = createContext<AchievementsContextType>({} as AchievementsContextType);

export const AchievementsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Carregar conquistas do localStorage ou usar as padrão
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
  
  // Função para atualizar o progresso de uma conquista
  const updateAchievementProgress = (
    achievementId: number, 
    progressIncrement: number = 1
  ) => {
    setAchievements(prevAchievements => {
      const updatedAchievements = prevAchievements.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          // Incrementar o progresso
          const newProgress = (achievement.currentProgress || 0) + progressIncrement;
          const requiredProgress = achievement.requiredProgress || 1;
          
          // Verificar se a conquista foi desbloqueada
          if (newProgress >= requiredProgress) {
            // Desbloquear a conquista
            const updatedAchievement = {
              ...achievement,
              unlocked: true,
              unlockedAt: new Date().toISOString(),
              currentProgress: requiredProgress // Limitar ao progresso máximo
            };
            
            // Mostrar notificação para o usuário
            showAchievementNotification(updatedAchievement);
            
            return updatedAchievement;
          }
          
          // Apenas atualizar o progresso
          return {
            ...achievement,
            currentProgress: newProgress
          };
        }
        return achievement;
      });
      
      // Salvar no localStorage
      localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
      
      return updatedAchievements;
    });
  };
  
  // Função para desbloquear uma conquista diretamente
  const unlockAchievement = (achievementId: number) => {
    setAchievements(prevAchievements => {
      const updatedAchievements = prevAchievements.map(achievement => {
        if (achievement.id === achievementId && !achievement.unlocked) {
          // Desbloquear a conquista
          const updatedAchievement = {
            ...achievement,
            unlocked: true,
            unlockedAt: new Date().toISOString(),
            currentProgress: achievement.requiredProgress
          };
          
          // Mostrar notificação para o usuário
          showAchievementNotification(updatedAchievement);
          
          return updatedAchievement;
        }
        return achievement;
      });
      
      // Salvar no localStorage
      localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
      
      return updatedAchievements;
    });
  };
  
  // Função para mostrar uma notificação de conquista
  const showAchievementNotification = (achievement: Achievement) => {
    // Criar um elemento de notificação visual
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-info">
        <h3>Conquista Desbloqueada!</h3>
        <p>${achievement.name}</p>
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

  const contextValue: AchievementsContextType = {
    achievements,
    loading,
    updateAchievementProgress,
    unlockAchievement
  };

  return (
    <AchievementsContext.Provider value={contextValue}>
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error('useAchievements deve ser usado dentro de um AchievementsProvider');
  }
  return context;
};