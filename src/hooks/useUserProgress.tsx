// src/hooks/useUserProgress.ts (simplificado)
import { useAppSelector, useAppDispatch } from '../redux/store';
import { 
  addXp, 
  completeLesson, 
  startCourse 
} from '../redux/slices/userProgressSlice';

export function useUserProgress() {
  const userProgress = useAppSelector(state => state.userProgress.progress);
  const loading = useAppSelector(state => state.userProgress.loading);
  const dispatch = useAppDispatch();
  
  return {
    userProgress,
    loading,
    addXp: (amount: number) => dispatch(addXp(amount)),
    completeLesson: (courseId: number, lessonId: number) => 
      dispatch(completeLesson({courseId, lessonId})),
    startCourse: (courseId: number) => dispatch(startCourse(courseId))
  };
}