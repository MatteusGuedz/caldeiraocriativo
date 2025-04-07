import React from 'react';
import CourseCard from '../../Components/CourseCard';
import './CourseList.scss';
import ImgUrso from 'Assets/images/courses/urso.jpg';


const categories = [
  {
    title: 'Recomendados pra você',
    courses: [
      { title: 'Curso de React', image: ImgUrso, available: true },
      { title: 'Curso de Node.js', image: ImgUrso, available: false },
      { title: 'Curso de UX Design', image: ImgUrso, available: true },
      { title: 'Curso de Node.js', image: ImgUrso, available: false },
      { title: 'Curso de UX Design', image: ImgUrso, available: true },
      { title: 'Curso de Node.js', image: ImgUrso, available: false },
      { title: 'Curso de UX Design', image: ImgUrso, available: true },
      { title: 'Curso de Node.js', image: ImgUrso, available: false },
      { title: 'Curso de UX Design', image: ImgUrso, available: true },
    ],
  },
  {
    title: 'Mais Recentes',
    courses: [
      { title: 'Curso de IA', image: ImgUrso, available: true },
      { title: 'Curso de Tailwind', image: ImgUrso, available: false },
    ],
  },
  
];

const CourseList = () => {
  return (
    
    <div className="course-list-page">
      
    {categories.map((cat, index) => (
      <div key={index} className="course-category">
        <h2>{cat.title}</h2>
        <div className="course-scroll">
          {cat.courses.map((course, idx) => (
            <CourseCard
              key={idx}
              title={course.title}
              image={course.image}
              available={course.available}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
  );
};

export default CourseList;
