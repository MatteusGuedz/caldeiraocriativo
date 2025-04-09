// src/Pages/Lesson/index.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { mockCourseDetails } from '../../data/mockData';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAchievements } from '../../hooks/useAchievements';
import LessonComments from '../../Components/LessonComments';
import LessonNotes from '../../Components/LessonNotes';
import './Lesson.scss';

interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  duration: string;
  completed: boolean;
}

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  available: boolean;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  modules: Module[];
}

const LessonPage = () => {
  const { courseId, moduleId, lessonId } = useParams<{
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>();
  
  const navigate = useNavigate();
  
  // Hooks devem ser chamados no nível superior, antes de qualquer condicional
  const [activeTab, setActiveTab] = useState<'transcription' | 'notes' | 'comments'>('transcription');
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  
  // Hooks de progresso e conquistas
  const { completeLesson, startCourse } = useUserProgress();
  const { updateAchievementProgress, unlockAchievement } = useAchievements();
  
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
    
    // Registrar que iniciou o curso
    startCourse(courseIdNum);
    
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
    
  }, [courseId, moduleId, lessonId, startCourse]);

  const handleVideoEnd = () => {
    if (!currentLesson || !courseId || !moduleId) return;
    
    const courseIdNum = parseInt(courseId);
    const lessonIdNum = currentLesson.id;
    
    // Marcar a lição como concluída
    completeLesson(courseIdNum, lessonIdNum);
    
    // Atualizar conquistas
    updateAchievementProgress(1); // "Primeira Aula"
    updateAchievementProgress(2); // Incrementar progresso de "Maratonista"
    
    // Verificar se completou o curso (lógica simplificada)
    const totalLessons = currentCourse?.modules.reduce(
      (total: number, module: Module) => total + module.lessons.length, 0
    ) || 0;
    
    const completedLessonsKey = `course_${courseId}_completed_lessons`;
    const completedLessons = JSON.parse(localStorage.getItem(completedLessonsKey) || '[]');
    
    if (completedLessons.length >= totalLessons) {
      unlockAchievement(3); // "Criativo Master"
    }
    
    // Atualizar UI
    setCurrentLesson({
      ...currentLesson,
      completed: true
    });
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
              Comentários
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
                <LessonNotes />
              </div>
            )}
            
            {activeTab === 'comments' && (
              <div className="comments">
                <LessonComments />
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
              onClick={handleVideoEnd}
              className="btn-complete"
            >
              Marcar como Concluída
            </button>
          )}
        </div>
      </div>
      
      <div className="lesson-sidebar">
        <div className="module-title">{currentModule.title}</div>
        
        {currentCourse.modules.map((module: Module) => (
          <div key={module.id} className="sidebar-module">
            <div className="sidebar-module-title">
              {module.title}
            </div>
            
            <div className="sidebar-lessons">
              {module.lessons.map((lessonItem: Lesson) => (
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

export default LessonPage;