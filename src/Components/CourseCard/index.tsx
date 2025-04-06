import React from 'react';
import './CourseCard.scss';

interface CourseCardProps {
  title: string;
  image: string;
  available: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, image, available }) => {
  return (
    <div className={`course-card ${!available ? 'locked' : ''}`}>
      <img src={image} alt={title} />
      <div className="course-title">{title}</div>
    </div>
  );
};

export default CourseCard;
