import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ImgAvatar from '../../Assets/images/avatar.jpg';

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
    avatar: ImgAvatar
  }
};

interface UserProgressState {
  progress: UserProgress;
  loading: boolean;
  error: string | null;
}

const initialState: UserProgressState = {
  progress: defaultProgress,
  loading: false,
  error: null
};

const calculateXpForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Async thunks
export const loadUserProgress = createAsyncThunk(
  'userProgress/loadUserProgress',
  async () => {
    const storedProgress = localStorage.getItem('userProgress');
    if (storedProgress) {
      return JSON.parse(storedProgress) as UserProgress;
    }
    localStorage.setItem('userProgress', JSON.stringify(defaultProgress));
    return defaultProgress;
  }
);

export const updateLastActive = createAsyncThunk(
  'userProgress/updateLastActive',
  async (_, { getState }) => {
    const state = getState() as { userProgress: UserProgressState };
    const updated = {
      ...state.userProgress.progress,
      lastActive: new Date().toISOString()
    };
    localStorage.setItem('userProgress', JSON.stringify(updated));
    return updated;
  }
);

export const addXp = createAsyncThunk(
  'userProgress/addXp',
  async (amount: number, { getState }) => {
    const state = getState() as { userProgress: UserProgressState };
    let { level, xp, xpToNextLevel } = state.userProgress.progress;
    
    xp += amount;
    
    let leveledUp = false;
    
    while (xp >= xpToNextLevel) {
      xp -= xpToNextLevel;
      level += 1;
      xpToNextLevel = calculateXpForLevel(level);
      leveledUp = true;
    }
    
    const updated = {
      ...state.userProgress.progress,
      level,
      xp,
      xpToNextLevel,
      lastActive: new Date().toISOString(),
      leveledUp
    };
    
    localStorage.setItem('userProgress', JSON.stringify(updated));
    return updated;
  }
);

export const completeLesson = createAsyncThunk(
  'userProgress/completeLesson',
  async ({ 
    courseId, 
    lessonId 
  }: { 
    courseId: number; 
    lessonId: number 
  }, { dispatch, getState }) => {
    const completedLessonsKey = `course_${courseId}_completed_lessons`;
    const completedLessons = JSON.parse(localStorage.getItem(completedLessonsKey) || '[]');
    
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem(completedLessonsKey, JSON.stringify(completedLessons));
      
      const state = getState() as { userProgress: UserProgressState };
      const updated = {
        ...state.userProgress.progress,
        totalLessonsCompleted: state.userProgress.progress.totalLessonsCompleted + 1,
        lastActive: new Date().toISOString()
      };
      
      localStorage.setItem('userProgress', JSON.stringify(updated));
      
      // Add XP for completing a lesson
      dispatch(addXp(20));
      
      return updated;
    }
    
    return (getState() as { userProgress: UserProgressState }).userProgress.progress;
  }
);

export const startCourse = createAsyncThunk(
  'userProgress/startCourse',
  async (courseId: number, { dispatch, getState }) => {
    const startedCoursesKey = 'started_courses';
    const startedCourses = JSON.parse(localStorage.getItem(startedCoursesKey) || '[]');
    
    if (!startedCourses.includes(courseId)) {
      startedCourses.push(courseId);
      localStorage.setItem(startedCoursesKey, JSON.stringify(startedCourses));
      
      const state = getState() as { userProgress: UserProgressState };
      const updated = {
        ...state.userProgress.progress,
        totalCoursesStarted: state.userProgress.progress.totalCoursesStarted + 1,
        lastActive: new Date().toISOString()
      };
      
      localStorage.setItem('userProgress', JSON.stringify(updated));
      
      // Add XP for starting a course
      dispatch(addXp(10));
      
      return updated;
    }
    
    return (getState() as { userProgress: UserProgressState }).userProgress.progress;
  }
);

export const completeCourse = createAsyncThunk(
  'userProgress/completeCourse',
  async (courseId: number, { dispatch, getState }) => {
    const completedCoursesKey = 'completed_courses';
    const completedCourses = JSON.parse(localStorage.getItem(completedCoursesKey) || '[]');
    
    if (!completedCourses.includes(courseId)) {
      completedCourses.push(courseId);
      localStorage.setItem(completedCoursesKey, JSON.stringify(completedCourses));
      
      const state = getState() as { userProgress: UserProgressState };
      const updated = {
        ...state.userProgress.progress,
        totalCoursesCompleted: state.userProgress.progress.totalCoursesCompleted + 1,
        lastActive: new Date().toISOString()
      };
      
      localStorage.setItem('userProgress', JSON.stringify(updated));
      
      // Add XP for completing a course
      dispatch(addXp(50));
      
      return updated;
    }
    
    return (getState() as { userProgress: UserProgressState }).userProgress.progress;
  }
);

// Slice
const userProgressSlice = createSlice({
  name: 'userProgress',
  initialState,
  reducers: {
    clearProgressError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Load user progress
      .addCase(loadUserProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserProgress.fulfilled, (state, action: PayloadAction<UserProgress>) => {
        state.loading = false;
        state.progress = action.payload;
      })
      
      // Update last active
      .addCase(updateLastActive.fulfilled, (state, action: PayloadAction<UserProgress>) => {
        state.progress = action.payload;
      })
      
      // Add XP
      .addCase(addXp.fulfilled, (state, action: PayloadAction<UserProgress & { leveledUp?: boolean }>) => {
        const { leveledUp, ...progress } = action.payload;
        state.progress = progress;
      })
      
      // Complete lesson
      .addCase(completeLesson.fulfilled, (state, action: PayloadAction<UserProgress>) => {
        state.progress = action.payload;
      })
      
      // Start course
      .addCase(startCourse.fulfilled, (state, action: PayloadAction<UserProgress>) => {
        state.progress = action.payload;
      })
      
      // Complete course
      .addCase(completeCourse.fulfilled, (state, action: PayloadAction<UserProgress>) => {
        state.progress = action.payload;
      });
  }
});

export const { clearProgressError } = userProgressSlice.actions;

export default userProgressSlice.reducer;