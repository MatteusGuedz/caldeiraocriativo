// src/Pages/Course/CourseList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CourseList.scss';
import { mockCourses } from '../../data/mockData';

const CourseList = () => {
  return (
    <div className="course-list-page">
      <div className="course-banner">
        <div className="banner-content">
          <h1>Comece sua jornada criativa</h1>
          <p>Descubra cursos incríveis e desenvolva novas habilidades com a gente.</p>
          <button>Comece agora!</button>
        </div>
      </div>
      
      <div className="course-category">
        <h2>Cursos Disponíveis</h2>
        <div className="course-grid">
          {mockCourses.map(course => (
            <Link to={`/courses/${course.id}`} key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                {!course.available && <div className="course-locked">🔒</div>}
              </div>
              <div className="course-info">
                <h3>{course.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;