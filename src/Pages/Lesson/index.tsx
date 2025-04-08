// src/Pages/Lesson/index.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import './Lesson.scss';

// Importar os dados mockados
import { mockCourseDetails } from '../../data/mockData';

const Lesson = () => {
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>();
  
  const navigate = useNavigate();
  
  // Hooks devem ser chamados no nível superior, antes de qualquer condicional
  const [activeTab, setActiveTab] = useState<'transcription' | 'notes' | 'comments'>('transcription');
  const [note, setNote] = useState<string>('');
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<any>(null);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  
  // Usar useEffect para lidar com a lógica condicional após os hooks
  useEffect(() => {
    if (!courseId) return;
    
    const courseIdNum = parseInt(courseId);
    const course = mockCourseDetails[courseIdNum as keyof typeof mockCourseDetails];
    
    if (!course) {
      console.error('Curso não encontrado');
      return;
    }
    
    setCurrentCourse(course);
    
    if (!moduleId) return;
    const moduleIdNum = parseInt(moduleId);
    const module = course.modules.find(m => m.id === moduleIdNum);
    
    if (!module) {
      console.error('Módulo não encontrado');
      return;
    }
    
    setCurrentModule(module);
    
    if (!lessonId) return;
    const lessonIdNum = parseInt(lessonId);
    const lesson = module.lessons.find(l => l.id === lessonIdNum);
    
    if (!lesson) {
      console.error('Aula não encontrada');
      return;
    }
    
    setCurrentLesson(lesson);
    
    // Carregar notas do localStorage
    const savedNote = localStorage.getItem(`note_${courseId}_${lessonId}`);
    if (savedNote) {
      setNote(savedNote);
    }
  }, [courseId, moduleId, lessonId]);
  
  // Comentários mockados
  const comments = [
    { 
      id: 1, 
      user: 'Ana Silva', 
      text: 'Adorei essa aula! Muito bem explicada.', 
      date: '2023-10-15T14:30:00' 
    },
    { 
      id: 2, 
      user: 'Carlos Oliveira', 
      text: 'Tenho uma dúvida sobre o exercício proposto. Alguém pode me ajudar?', 
      date: '2023-10-16T09:15:00' 
    }
  ];

  const handleVideoEnd = () => {
    if (!currentLesson) return;
    // Marcar como concluída (em um sistema real, isso chamaria uma API)
    console.log('Aula concluída:', currentLesson.id);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value;
    setNote(newNote);
    
    // Salvar no localStorage
    if (courseId && lessonId) {
      localStorage.setItem(`note_${courseId}_${lessonId}`, newNote);
    }
  };

  const handleNextLesson = () => {
    if (!currentCourse || !currentLesson) return;
    
    let foundCurrent = false;
    let foundNext = false;
    
    // Procurar a próxima lição
    for (const module of currentCourse.modules) {
      for (const lesson of module.lessons) {
        if (foundCurrent && !foundNext) {
          // Esta é a próxima lição após a atual
          navigate(`/lesson/${courseId}/${module.id}/${lesson.id}`);
          foundNext = true;
          break;
        }
        
        if (lesson.id === currentLesson.id) {
          foundCurrent = true;
        }
      }
      
      if (foundNext) break;
    }
    
    // Se não encontrou a próxima lição, significa que é a última
    if (!foundNext && courseId) {
      // Redirecionar para a página do curso com uma mensagem de conclusão
      navigate(`/courses/${courseId}`);
    }
  };

  // Se os dados ainda não foram carregados, mostrar uma mensagem de carregamento
  if (!currentCourse || !currentModule || !currentLesson) {
    return <div className="loading">Carregando aula...</div>;
  }

  return (
    <div className="lesson-page">
      <div className="lesson-content">
        <div className="lesson-header">
          <h1>{currentLesson.title}</h1>
          <div className="lesson-breadcrumb">
            <span>{currentCourse.title}</span> &gt; <span>{currentModule.title}</span>
          </div>
        </div>
        
        <div className="video-container">
          <ReactPlayer
            url={currentLesson.videoUrl}
            width="100%"
            height="100%"
            controls
            onEnded={handleVideoEnd}
          />
        </div>
        
        <div className="lesson-tabs">
          <div className="tab-headers">
            <button 
              className={activeTab === 'transcription' ? 'active' : ''}
              onClick={() => setActiveTab('transcription')}
            >
              Transcrição
            </button>
            <button 
              className={activeTab === 'notes' ? 'active' : ''}
              onClick={() => setActiveTab('notes')}
            >
              Minhas Anotações
            </button>
            <button 
              className={activeTab === 'comments' ? 'active' : ''}
              onClick={() => setActiveTab('comments')}
            >
              Comentários ({comments.length})
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'transcription' && (
              <div className="transcription">
                <p>
                  Nesta aula, vamos explorar os conceitos fundamentais de criatividade e como podemos 
                  utilizar ferramentas de inteligência artificial para potencializar nosso processo criativo.
                  A criatividade não é um dom inato, mas uma habilidade que pode ser desenvolvida com prática
                  e as ferramentas certas. Vamos discutir os principais mitos sobre criatividade e como superá-los.
                </p>
                <p>
                  Um dos maiores equívocos é pensar que a criatividade é algo que algumas pessoas têm e outras não.
                  Na verdade, todos nós somos criativos por natureza, mas expressamos essa criatividade de maneiras
                  diferentes. O importante é encontrar o método que funciona melhor para você e praticar regularmente.
                </p>
                <p>
                  As ferramentas de IA podem ajudar a superar bloqueios criativos, fornecendo estímulos e ideias
                  que talvez não teríamos pensado sozinhos. No entanto, é importante lembrar que a IA é uma
                  ferramenta e não um substituto para o processo criativo humano.
                </p>
              </div>
            )}
            
            {activeTab === 'notes' && (
              <div className="notes">
                <textarea 
                  value={note}
                  onChange={handleNoteChange}
                  placeholder="Escreva suas anotações sobre esta aula..."
                ></textarea>
              </div>
            )}
            
            {activeTab === 'comments' && (
              <div className="comments">
                <div className="comments-list">
                  {comments.map(comment => (
                    <div key={comment.id} className="comment">
                      <div className="comment-header">
                        <span className="comment-user">{comment.user}</span>
                        <span className="comment-date">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="comment-text">{comment.text}</div>
                    </div>
                  ))}
                </div>
                
                <div className="comment-form">
                  <textarea placeholder="Deixe seu comentário ou dúvida..."></textarea>
                  <button>Enviar Comentário</button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="lesson-navigation">
          <button onClick={handleNextLesson} className="btn-next">
            Próxima Aula
          </button>
          
          {!currentLesson.completed && (
            <button 
              onClick={() => console.log('Marcar como concluída:', currentLesson.id)}
              className="btn-complete"
            >
              Marcar como Concluída
            </button>
          )}
        </div>
      </div>

<div className="lesson-sidebar">
  <div className="module-title">{currentModule.title}</div>
  
  {currentCourse.modules.map((module: any) => (
    <div key={module.id} className="sidebar-module">
      <div className="sidebar-module-title">
        {module.title}
      </div>
      
      <div className="sidebar-lessons">
        {module.lessons.map((lessonItem: any) => (
          <div
            key={lessonItem.id}
            className={`sidebar-lesson ${lessonItem.id === currentLesson.id ? 'active' : ''} ${lessonItem.completed ? 'completed' : ''}`}
            onClick={() => navigate(`/lesson/${courseId}/${module.id}/${lessonItem.id}`)}
          >
            <span className="lesson-title">{lessonItem.title}</span>
            {lessonItem.completed && <span className="lesson-status">✓</span>}
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default Lesson;