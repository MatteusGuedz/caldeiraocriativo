import React from 'react';
import './CourseCard.scss';

interface CourseCardProps {
  title: string;
  image: string;
  available: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, image, available }) => {
  return (
    <div  className={`course-card-vertical ${!available ? 'locked' : ''}`}>
      <img draggable={false} src={image} alt={title} />
      {!available && <div className="lock-icon">🔒</div>}
      <div className="card-info">
        <span className="course-title">{title}</span>
      </div>
    </div>
  );
};

export default CourseCard;
