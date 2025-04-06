import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CourseDetail.scss';

const mockData = {
  courseTitle: 'Criação de Conteúdo com IA',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  modules: [
    {
      id: '1',
      title: 'Módulo 1 - Introdução',
      lessons: [
        { id: 'a1', title: 'Boas-vindas e objetivos', duration: '3:45' },
        { id: 'a2', title: 'O que você vai aprender', duration: '5:12' },
      ],
    },
    {
      id: '2',
      title: 'Módulo 2 - Prática com Ferramentas',
      lessons: [
        { id: 'a3', title: 'Usando o ChatGPT', duration: '7:21' },
        { id: 'a4', title: 'Criando com IA', duration: '4:32' },
      ],
    },
  ],
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="course-detail">
      <div className="video-area">
        <video controls src={mockData.videoUrl} />
        <h2>{mockData.courseTitle}</h2>
      </div>

      <aside className="lesson-sidebar">
        <h3>Conteúdo do Curso</h3>
        {mockData.modules.map((mod) => (
          <div className="module" key={mod.id}>
            <strong>{mod.title}</strong>
            <ul>
              {mod.lessons.map((les) => (
                <li
                  key={les.id}
                  onClick={() =>
                    navigate(`/lesson/${courseId}/${mod.id}/${les.id}`)
                  }
                >
                  <span>{les.title}</span>
                  <span className="duration">{les.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default CourseDetail;
