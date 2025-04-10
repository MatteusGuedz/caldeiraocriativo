// src/Pages/Course/Detail.tsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ImgCourseFull from '../../Assets/images/courses/course-1-exemple.png';
import './CourseDetail.scss';

// Dados mockados diretamente no componente
const mockCourseDetails = {
  1: {
    id: 1,
    title: 'Introdução à Criatividade com IA',
    description: 'Aprenda a desenvolver sua criatividade usando IA como ferramenta potencializadora. Neste curso, você descobrirá como utilizar ferramentas de inteligência artificial para expandir seus horizontes criativos e produzir conteúdo inovador.',
    image:ImgCourseFull ,
    available: true,
    progress: 30,
    totalLessons: 12,
    completedLessons: 4,
    modules: [
      {
        id: 1,
        title: 'Fundamentos da Criatividade',
        lessons: [
          {
            id: 101,
            title: 'O que é criatividade?',
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            duration: '10:25',
            completed: true,
          },
          {
            id: 102,
            title: 'Mitos sobre criatividade',
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            duration: '08:15',
            completed: true,
          },
          {
            id: 103,
            title: 'Como estimular sua criatividade',
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            duration: '12:30',
            completed: false,
          }
        ]
      },
      {
        id: 2,
        title: 'Inteligência Artificial e Criatividade',
        lessons: [
          {
            id: 201,
            title: 'Introdução à IA para criativos',
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            duration: '15:10',
            completed: true,
          },
          {
            id: 202,
            title: 'Ferramentas de IA para brainstorming',
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            duration: '11:45',
            completed: false,
          }
        ]
      }
    ]
  },
  2: {
    id: 2,
    title: 'Design Thinking Avançado',
    description: 'Metodologias avançadas de Design Thinking para projetos criativos. Aprenda a aplicar técnicas de empatia, ideação e prototipagem rápida em projetos reais.',
    image: ImgCourseFull,
    available: false,
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    modules: [
      {
        id: 3,
        title: 'Imersão e Empatia',
        lessons: [
          {
            id: 301,
            title: 'Pesquisa com usuários',
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            duration: '14:30',
            completed: false,
          },
          {
            id: 302,
            title: 'Mapa de empatia',
            videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
            duration: '09:45',
            completed: false,
          }
        ]
      }
    ]
  }
};

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const courseIdNum = parseInt(courseId || '1');
  
  // Busca os dados mockados do curso
  const course = mockCourseDetails[courseIdNum as keyof typeof mockCourseDetails];
  
  const [activeModuleId, setActiveModuleId] = useState<number | null>(
    course?.modules[0]?.id || null
  );

  // Se o curso não existir nos dados mockados
  if (!course) {
    return <div className="error">Curso não encontrado.</div>;
  }

  const toggleModule = (moduleId: number) => {
    setActiveModuleId(activeModuleId === moduleId ? null : moduleId);
  };

  const startCourse = () => {
    if (!course.modules || course.modules.length === 0) return;
    
    const firstModule = course.modules[0];
    if (!firstModule.lessons || firstModule.lessons.length === 0) return;
    
    const firstLesson = firstModule.lessons[0];
    navigate(`/lesson/${course.id}/${firstModule.id}/${firstLesson.id}`);
  };

  const resumeCourse = () => {
    if (!course.modules) return;
    
    // Lógica para encontrar a primeira aula não completa
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (!lesson.completed) {
          navigate(`/lesson/${course.id}/${module.id}/${lesson.id}`);
          return;
        }
      }
    }
    
    // Se todas as aulas estiverem completas, inicie a primeira
    startCourse();
  };

  return (
    <div className="course-detail">
      <div className="course-header" style={{ backgroundImage: `url(${course.image})` }}>
        <div className="course-header-overlay">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          
          <div className="course-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <span>{course.progress}% concluído</span>
          </div>
          
          <div className="course-actions">
            {course.progress > 0 ? (
              <button onClick={resumeCourse} className="btn-primary">Continuar</button>
            ) : (
              <button onClick={startCourse} className="btn-primary">Começar Curso</button>
            )}
          </div>
        </div>
      </div>
      
      <div className="course-content">
        <div className="course-info">
          <div className="info-item">
            <span className="info-label">Aulas:</span>
            <span className="info-value">{course.totalLessons}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Concluídas:</span>
            <span className="info-value">{course.completedLessons}</span>
          </div>
        </div>
        
        <div className="course-modules">
          <h2>Conteúdo do Curso</h2>
          
          {course.modules.map(module => (
            <div key={module.id} className="module">
              <div 
                className="module-header" 
                onClick={() => toggleModule(module.id)}
              >
                <h3>{module.title}</h3>
                <span className={`module-toggle ${activeModuleId === module.id ? 'active' : ''}`}>
                  {activeModuleId === module.id ? '−' : '+'}
                </span>
              </div>
              
              {activeModuleId === module.id && (
                <div className="module-lessons">
                  {module.lessons.map(lesson => (
                    <Link 
                      key={lesson.id}
                      to={`/lesson/${course.id}/${module.id}/${lesson.id}`}
                      className={`lesson-item ${lesson.completed ? 'completed' : ''}`}
                    >
                      <div className="lesson-info">
                        <span className="lesson-title">{lesson.title}</span>
                        <span className="lesson-duration">{lesson.duration}</span>
                      </div>
                      <div className="lesson-status">
                        {lesson.completed ? '✓' : ''}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;