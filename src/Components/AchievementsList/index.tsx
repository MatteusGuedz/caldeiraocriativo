// src/Components/AchievementsList/index.tsx
import React from 'react';
import { Achievement } from '../../hooks/useAchievements';
import './AchievementsList.scss';

interface AchievementsListProps {
  achievements: Achievement[];
  compact?: boolean;
}

const AchievementsList: React.FC<AchievementsListProps> = ({ 
  achievements, 
  compact = false 
}) => {
  if (achievements.length === 0) {
    return (
      <div className="achievements-empty">
        <p>Nenhuma conquista desbloqueada ainda. Continue aprendendo para ganhar conquistas!</p>
      </div>
    );
  }

  return (
    <div className={`achievements-list ${compact ? 'compact' : ''}`}>
      {achievements.map(achievement => (
        <div key={achievement.id} className="achievement-item">
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
      ))}
    </div>
  );
};

export default AchievementsList;