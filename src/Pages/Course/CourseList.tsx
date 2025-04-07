import React, { useRef, useState } from 'react';
import CourseCard from '../../Components/CourseCard';
import CourseBanner from '../../Components/CourseBanner'; // 🔥 Novo import
import './CourseList.scss';
import ImgUrso from '../../Assets/images/urso.jpg';

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
      { title: 'Curso de Node.js', image: ImgUrso, available: false },
      { title: 'Curso de UX Design', image: ImgUrso, available: true },
      { title: 'Curso de Node.js', image: ImgUrso, available: false },
      { title: 'Curso de UX Design', image: ImgUrso, available: true },
      { title: 'Curso de Node.js', image: ImgUrso, available: false },
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
  const scrollRefs = useRef<HTMLDivElement[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragState, setDragState] = useState({ startX: 0, scrollLeft: 0 });

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    const scrollRef = scrollRefs.current[index];
    if (!scrollRef) return;
    setDraggingIndex(index);
    setDragState({
      startX: e.pageX - scrollRef.offsetLeft,
      scrollLeft: scrollRef.scrollLeft,
    });
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (draggingIndex !== index) return;
    const scrollRef = scrollRefs.current[index];
    if (!scrollRef) return;
    const x = e.pageX - scrollRef.offsetLeft;
    const walk = (x - dragState.startX) * 1.2;
    scrollRef.scrollLeft = dragState.scrollLeft - walk;
  };

  const handleMouseUp = () => setDraggingIndex(null);
  const handleMouseLeave = () => setDraggingIndex(null);

  return (
    <div className="course-list-page">
      <CourseBanner /> {/* 🔥 Banner no topo */}

      {categories.map((cat, index) => (
        <div key={index} className="course-category">
          <h2>{cat.title}</h2>
          <div
            className="course-scroll"
            ref={(el) => {
              if (el) scrollRefs.current[index] = el;
            }}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => handleMouseMove(e, index)}
          >
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
