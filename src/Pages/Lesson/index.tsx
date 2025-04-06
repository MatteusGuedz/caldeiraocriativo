import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LessonProgress from '../../Components/LessonProgress';
import LessonNotes from '../../Components/LessonNotes';
import LessonComments from '../../Components/LessonComments';
import './Lesson.scss';

const mockData = {
  courseTitle: 'Criação de Conteúdo com IA',
  modules: [
    {
      id: '1',
      title: 'Módulo 1 - Introdução',
      lessons: [
        { id: 'a1', title: 'Boas-vindas e objetivos', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 'a2', title: 'O que você vai aprender', video: 'https://www.w3schools.com/html/movie.mp4', transcript: 'Esta é a transcrição da aula 1.' },

      ],
    },
    {
      id: '2',
      title: 'Módulo 2 - Prática com Ferramentas',
      lessons: [
        { id: 'a3', title: 'Usando o ChatGPT', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 'a4', title: 'Criando Imagens com IA', video: 'https://www.w3schools.com/html/movie.mp4' },
      ],
    },
  ],
};

const Lesson = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();


  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };
  const moduleIndex = mockData.modules.findIndex((m) => m.id === moduleId);
  const [openModule, setOpenModule] = useState<number | null>(moduleIndex);
  
  const module = mockData.modules.find((m) => m.id === moduleId);
  const lesson = module?.lessons.find((l) => l.id === lessonId);
  
  if (!module || !lesson) return <div>Lição não encontrada.</div>;
  
  return (
    <div className="lesson-page">
      <div className="lesson-video">
        
        <video controls src={lesson.video} />
        <h2>{lesson.title}</h2>

     

        <div className="lesson-body">
          {/* Notas da aula */}
          <LessonNotes lessonId={lesson.id} />

          {/* Comentários da aula */}
          <LessonComments lessonId={lesson.id} />
        </div>

        {lesson.transcript && (
         <div className="lesson-transcript">
         <h3>Transcrição</h3>
         <p>{lesson.transcript || 'Esta aula não possui transcrição.'}</p>
       </div>
        )}
      </div>

      <aside className="lesson-sidebar">
           {/* Aqui aparece a barrinha de progresso da aula */}
           <LessonProgress lessonId={lesson.id} />
        <h3>{mockData.courseTitle}</h3>
        {mockData.modules.map((mod, idx) => (
          <div className="module" key={mod.id}>
            <button className="module-toggle" onClick={() => toggleModule(idx)}>
              <strong>{mod.title}</strong>
              <span className={`arrow ${openModule === idx ? 'open' : ''}`}>▾</span>
            </button>
            {openModule === idx && (
              <ul>
                {mod.lessons.map((les) => (
                  <li
                    key={les.id}
                    className={les.id === lessonId ? 'active' : ''}
                    onClick={() => navigate(`/lesson/${courseId}/${mod.id}/${les.id}`)}
                  >
                    {les.title}
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

export default Lesson;
