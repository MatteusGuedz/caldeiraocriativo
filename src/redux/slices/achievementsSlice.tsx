import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
    description: 'Assista 10 aulas na plataforma',
    icon: '🏃',
    unlocked: false,
    requiredProgress: 10,
    currentProgress: 0
  },
  {
    id: 3,
    name: 'Criativo Master',
    description: 'Complete um curso inteiro',
    icon: '🎯',
    unlocked: false,
    requiredProgress: 1,
    currentProgress: 0
  },
  {
    id: 4,
    name: 'Colecionador',
    description: 'Complete 3 cursos diferentes',
    icon: '🏆',
    unlocked: false,
    requiredProgress: 3,
    currentProgress: 0
  },
  {
    id: 5,
    name: 'Interativo',
    description: 'Faça 5 comentários em aulas',
    icon: '💬',
    unlocked: false,
    requiredProgress: 5,
    currentProgress: 0
  },
  {
    id: 6,
    name: 'Anotador',
    description: 'Faça anotações em 3 aulas diferentes',
    icon: '📝',
    unlocked: false,
    requiredProgress: 3,
    currentProgress: 0
  }
];

interface AchievementsState {
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
  recentlyUnlocked: Achievement | null;
}

const initialState: AchievementsState = {
  achievements: [],
  loading: false,
  error: null,
  recentlyUnlocked: null
};

// Async thunks
export const loadAchievements = createAsyncThunk(
  'achievements/loadAchievements',
  async () => {
    const storedAchievements = localStorage.getItem('achievements');
    if (storedAchievements) {
      return JSON.parse(storedAchievements) as Achievement[];
    }
    localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
    return defaultAchievements;
  }
);

export const updateAchievementProgress = createAsyncThunk(
  'achievements/updateAchievementProgress',
  async ({ 
    achievementId, 
    progressIncrement = 1 
  }: { 
    achievementId: number; 
    progressIncrement?: number 
  }, { getState }) => {
    const state = getState() as { achievements: AchievementsState };
    const updatedAchievements = state.achievements.achievements.map(achievement => {
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
    
    // Check if any achievement was unlocked
    const unlockedAchievement = updatedAchievements.find(
      (a, i) => a.unlocked && !state.achievements.achievements[i].unlocked
    );
    
    return {
      achievements: updatedAchievements,
      recentlyUnlocked: unlockedAchievement || null
    };
  }
);

export const unlockAchievement = createAsyncThunk(
  'achievements/unlockAchievement',
  async (achievementId: number, { getState }) => {
    const state = getState() as { achievements: AchievementsState };
    const updatedAchievements = state.achievements.achievements.map(achievement => {
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
    
    // Find the unlocked achievement
    const unlockedAchievement = updatedAchievements.find(a => a.id === achievementId);
    
    return {
      achievements: updatedAchievements,
      recentlyUnlocked: unlockedAchievement || null
    };
  }
);

// Slice
const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    clearAchievementError: (state) => {
      state.error = null;
    },
    clearRecentlyUnlocked: (state) => {
      state.recentlyUnlocked = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Load achievements
      .addCase(loadAchievements.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadAchievements.fulfilled, (state, action: PayloadAction<Achievement[]>) => {
        state.loading = false;
        state.achievements = action.payload;
      })
      
      // Update achievement progress
      .addCase(updateAchievementProgress.fulfilled, (state, action: PayloadAction<{
        achievements: Achievement[];
        recentlyUnlocked: Achievement | null;
      }>) => {
        state.achievements = action.payload.achievements;
        if (action.payload.recentlyUnlocked) {
          state.recentlyUnlocked = action.payload.recentlyUnlocked;
        }
      })
      
      // Unlock achievement
      .addCase(unlockAchievement.fulfilled, (state, action: PayloadAction<{
        achievements: Achievement[];
        recentlyUnlocked: Achievement | null;
      }>) => {
        state.achievements = action.payload.achievements;
        if (action.payload.recentlyUnlocked) {
          state.recentlyUnlocked = action.payload.recentlyUnlocked;
        }
      });
  }
});

export const { clearAchievementError, clearRecentlyUnlocked } = achievementsSlice.actions;

export default achievementsSlice.reducer;