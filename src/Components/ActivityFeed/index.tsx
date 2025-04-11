// src/Components/ActivityFeed/index.tsx
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './ActivityFeed.scss';

type BaseActivity = {
  id: number;
  timestamp: string;
};

type LessonCompletedActivity = BaseActivity & {
  type: 'lesson_completed';
  courseId: number;
  courseTitle: string;
  lessonId: number;
  lessonTitle: string;
};

type AchievementUnlockedActivity = BaseActivity & {
  type: 'achievement_unlocked';
  achievementId: number;
  achievementTitle: string;
  achievementIcon: string;
};

type CourseStartedActivity = BaseActivity & {
  type: 'course_started';
  courseId: number;
  courseTitle: string;
};

type CourseCompletedActivity = BaseActivity & {
  type: 'course_completed';
  courseId: number;
  courseTitle: string;
};

type Activity = 
  | LessonCompletedActivity 
  | AchievementUnlockedActivity 
  | CourseStartedActivity 
  | CourseCompletedActivity;

interface ActivityFeedProps {
  activities: Activity[];
}

// Pure functions moved outside component for better performance
const getActivityIcon = (activity: Activity): string => {
  switch (activity.type) {
    case 'achievement_unlocked':
      return activity.achievementIcon;
    case 'lesson_completed':
      return '✅';
    case 'course_started':
      return '🎯';
    case 'course_completed':
      return '🎓';
  }
};

const getActivityIconClass = (activity: Activity): string => {
  switch (activity.type) {
    case 'achievement_unlocked':
      return 'achievement';
    case 'lesson_completed':
    case 'course_completed':
      return 'lesson';
    case 'course_started':
      return 'course';
  }
};

const getActivityTitle = (activity: Activity): string => {
  switch (activity.type) {
    case 'achievement_unlocked':
      return `Conquista Desbloqueada: ${activity.achievementTitle}`;
    case 'lesson_completed':
      return `Aula Concluída: ${activity.lessonTitle}`;
    case 'course_started':
      return `Curso Iniciado: ${activity.courseTitle}`;
    case 'course_completed':
      return `Curso Concluído: ${activity.courseTitle}`;
  }
};

const getActivityDescription = (activity: Activity): string => {
  switch (activity.type) {
    case 'achievement_unlocked':
      return 'Parabéns! Continue evoluindo para desbloquear mais conquistas.';
    case 'lesson_completed':
      return `Aula do curso "${activity.courseTitle}"`;
    case 'course_started':
      return 'Comece sua jornada de aprendizado neste novo curso!';
    case 'course_completed':
      return 'Parabéns por concluir mais um curso em sua jornada!';
  }
};

const getActivityLink = (activity: Activity): string => {
  switch (activity.type) {
    case 'achievement_unlocked':
      return '/profile';
    case 'lesson_completed':
    case 'course_started':
    case 'course_completed':
      return `/courses/${activity.courseId}`;
  }
};

const formatTimeAgo = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'} atrás`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`;
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`;
  } else {
    return date.toLocaleDateString();
  }
};

// Memoized activity item component
const ActivityItem = memo(({ activity }: { activity: Activity }) => {
  const activityLink = getActivityLink(activity);
  const activityIconClass = getActivityIconClass(activity);
  const activityIcon = getActivityIcon(activity);
  const activityTitle = getActivityTitle(activity);
  const activityDescription = getActivityDescription(activity);
  const timeAgo = formatTimeAgo(activity.timestamp);

  return (
    <Link 
      to={activityLink}
      className="activity-item"
      role="article"
    >
      <div className={`activity-icon ${activityIconClass}`}>
        {activityIcon}
      </div>
      
      <div className="activity-content">
        <div className="activity-title">
          {activityTitle}
        </div>
        <div className="activity-description">
          {activityDescription}
        </div>
        <time 
          className="activity-time"
          dateTime={activity.timestamp}
        >
          {timeAgo}
        </time>
      </div>
    </Link>
  );
});

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  // If there are no activities, show empty state
  if (!activities.length) {
    return (
      <div className="empty-feed" role="status">
        Nenhuma atividade recente para mostrar.
      </div>
    );
  }

  return (
    <div className="activity-feed" role="feed">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

// Export a memoized version of the component
export default memo(ActivityFeed, (prevProps, nextProps) => {
  if (prevProps.activities.length !== nextProps.activities.length) {
    return false;
  }
  
  // Compare activities by their IDs and timestamps
  return prevProps.activities.every((activity, index) => {
    const nextActivity = nextProps.activities[index];
    return (
      activity.id === nextActivity.id &&
      activity.timestamp === nextActivity.timestamp &&
      activity.type === nextActivity.type
    );
  });
});