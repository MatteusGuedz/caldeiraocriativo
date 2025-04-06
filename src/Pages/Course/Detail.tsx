import React, { useState } from 'react';
import './CourseDetail.scss';

const CourseDetail = () => {
  const [openModule, setOpenModule] = useState<number | null>(null);

  const course = {
    title: 'Criação de Conteúdo com IA',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    modules: [
      {
        title: 'Módulo 1 - Introdução',
        lessons: [
          { id: '1', title: 'Boas-vindas e objetivos', duration: '3:45' },
          { id: '2', title: 'O que você vai aprender', duration: '5:12' },
        ],
      },
      {
        title: 'Módulo 2 - Prática com Ferramentas',
        lessons: [
          { id: '3', title: 'Usando o ChatGPT', duration: '7:21' },
          { id: '4', title: 'Criando Imagens com IA', duration: '4:32' },
        ],
      },
    ],
  };

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <div className="course-detail">
      <div className="video-area">
        <video controls src={course.videoUrl} />
        <h2>{course.title}</h2>
      </div>

      <aside className="lesson-sidebar">
        <h3>Conteúdo do Curso</h3>
        {course.modules.map((mod, idx) => (
          <div className="module" key={idx}>
            <button
              className="module-toggle"
              onClick={() => toggleModule(idx)}
            >
              <strong>{mod.title}</strong>
              <span className={`arrow ${openModule === idx ? 'open' : ''}`}>
                ▾
              </span>
            </button>
            {openModule === idx && (
              <ul>
                {mod.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <span>{lesson.title}</span>
                    <span className="duration">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </aside>
    </div>
  );
};

export default CourseDetail;
