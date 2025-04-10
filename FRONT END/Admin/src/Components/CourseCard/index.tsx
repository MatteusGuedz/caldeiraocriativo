// src/Components/CourseCard/index.tsx
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.scss';

interface CourseCardProps {
  id: number;
  title: string;
  image: string;
  available: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  progress?: number;
  lessonCount?: number;
  duration?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  image,
  available,
  isNew = false,
  isPopular = false,
  progress = 0,
  lessonCount,
  duration,
}) => {
  return (
    <Link to={`/courses/${id}`} className={`course-card ${!available ? 'locked' : ''}`}>
      <div className="card-image-container">
        <img src={image} alt={title} />
        
        {!available && <div className="lock-overlay">🔒</div>}
        
        {/* Badges */}
        <div className="card-badges">
          {isNew && <span className="badge new">Novo</span>}
          {isPopular && <span className="badge popular">Popular</span>}
        </div>
        
        {/* Info */}
        {available && lessonCount && (
          <div className="card-meta">
            <span className="lessons-count">{lessonCount} aulas</span>
            {duration && <span className="duration">{duration}</span>}
          </div>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        
        {available && progress > 0 && (
          <div className="card-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">{progress}% completo</span>
          </div>
        )}
      </div>
    </Link>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(CourseCard, (prevProps, nextProps) => {
  // Custom comparison function to determine if the component should re-render
  return (
    prevProps.id === nextProps.id &&
    prevProps.title === nextProps.title &&
    prevProps.image === nextProps.image &&
    prevProps.available === nextProps.available &&
    prevProps.isNew === nextProps.isNew &&
    prevProps.isPopular === nextProps.isPopular &&
    prevProps.progress === nextProps.progress &&
    prevProps.lessonCount === nextProps.lessonCount &&
    prevProps.duration === nextProps.duration
  );
});