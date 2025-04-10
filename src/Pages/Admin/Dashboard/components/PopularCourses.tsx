import React from 'react';
import './Lists.scss';
import CourseCapa from '../../../../Assets/images/capa-exemple.jpeg'

const mockCourses = [
  {
    id: 1,
    title: 'Introdução à Criatividade com IA',
    enrollments: 245,
    thumbnail: CourseCapa ,
    rating: 4.8
  },
  {
    id: 2,
    title: 'Design Thinking Avançado',
    enrollments: 189,
    thumbnail: CourseCapa ,
    rating: 4.7
  },
  {
    id: 3,
    title: 'Criatividade na Prática',
    enrollments: 156,
    thumbnail: CourseCapa ,
    rating: 4.9
  },
  {
    id: 4,
    title: 'Fundamentos de UX/UI',
    enrollments: 134,
    thumbnail: CourseCapa ,
    rating: 4.6
  }
];

const PopularCourses: React.FC = () => {
  return (
    <div className="courses-list">
      {mockCourses.map(course => (
        <div key={course.id} className="list-item">
          <div className="course-thumbnail">
            <img src={course.thumbnail} alt={course.title} />
          </div>
          <div className="course-info">
            <div className="course-title">{course.title}</div>
            <div className="course-stats">
              <span className="enrollments">{course.enrollments} alunos</span>
              <span className="rating">★ {course.rating}</span>
            </div>
          </div>
        </div>
      ))}
      <button className="view-all">Ver Todos os Cursos</button>
    </div>
  );
};

export default PopularCourses;