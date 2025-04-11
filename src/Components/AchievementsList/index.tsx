// src/Components/AchievementsList/index.tsx
import React, { memo } from 'react';
import { Achievement } from '../../redux/slices/achievementsSlice';
import './AchievementsList.scss';

interface AchievementsListProps {
  achievements: Achievement[];
  compact?: boolean;
}

// Memoized achievement item component for better performance
const AchievementItem = memo(({ 
  achievement, 
  compact 
}: { 
  achievement: Achievement; 
  compact: boolean 
}) => {
  return (
    <div className="achievement-item">
      <div className="achievement-icon">{achievement.icon}</div>
      <div className="achievement-info">
        <div className="achievement-name">{achievement.name}</div>
        {!compact && (
          <div className="achievement-description">{achievement.description}</div>
        )}
        {achievement.unlockedAt && (
          <div className="achievement-date">
            Conquistado em {new Date(achievement.unlockedAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
});

const AchievementsList: React.FC<AchievementsListProps> = ({ 
  achievements, 
  compact = false 
}) => {
  if (!achievements || achievements.length === 0) {
    return (
      <div className="achievements-empty">
        <p>Nenhuma conquista desbloqueada ainda. Continue aprendendo para ganhar conquistas!</p>
      </div>
    );
  }

  return (
    <div className={`achievements-list ${compact ? 'compact' : ''}`}>
      {achievements.map(achievement => (
        <AchievementItem 
          key={achievement.id} 
          achievement={achievement} 
          compact={compact} 
        />
      ))}
    </div>
  );
};

// Export a memoized version of the component
export default memo(AchievementsList, (prevProps, nextProps) => {
  // Only re-render if the achievements array or compact prop has changed
  if (prevProps.compact !== nextProps.compact) return false;
  if (prevProps.achievements.length !== nextProps.achievements.length) return false;
  
  // Deep comparison of achievements arrays
  return prevProps.achievements.every((achievement, index) => {
    const nextAchievement = nextProps.achievements[index];
    return (
      achievement.id === nextAchievement.id &&
      achievement.unlocked === nextAchievement.unlocked &&
      achievement.unlockedAt === nextAchievement.unlockedAt
    );
  });
});