// src/Components/ProgressCard/index.tsx
import React from 'react';
import './ProgressCard.scss';

interface ProgressCardProps {
  title: string;
  value: number;
  icon: string;
  description?: string;
  progress?: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ 
  title, 
  value, 
  icon, 
  description, 
  progress 
}) => {
  return (
    <div className="progress-card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <div className="card-value">{value}</div>
        <div className="card-title">{title}</div>
        {description && <div className="card-description">{description}</div>}
        {progress !== undefined && (
          <div className="card-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressCard;