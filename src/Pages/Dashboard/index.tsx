// src/Pages/Dashboard/index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import CourseBanner from '../../Components/CourseBanner';
import CourseCard from '../../Components/CourseCard';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAchievements } from '../../hooks/useAchievements';
import './Dashboard.scss';

// Mockup de dados dos cursos (que virão da API no futuro)
const inProgressCourses = [
  {
    id: 1,
    title: 'Introdução à Criatividade com IA',
    image: 'https://placehold.co/600x400/0f172a/white?text=Criatividade+com+IA',
    progress: 30,
    lessonCount: 12,
    nextLesson: { id: 103, moduleId: 1, title: 'Como estimular sua criatividade' },
  },
  {
    id: 3,
    title: 'Criatividade na Prática',
    image: 'https://placehold.co/600x400/0f172a/white?text=Criatividade+Prática',
    progress: 75,
    lessonCount: 10,
    nextLesson: { id: 402, moduleId: 4, title: 'Técnicas de escrita livre' },
  }
];

const recommendedCourses = [
  {
    id: 2,
    title: 'Design Thinking Avançado',
    image: 'https://placehold.co/600x400/1e293b/white?text=Design+Thinking',
    available: false,
    isPopular: true,
    lessonCount: 8,
    duration: '4h 30min',
  },
  {
    id: 4,
    title: 'Criatividade para Negócios',
    image: 'https://placehold.co/600x400/1e293b/white?text=Negócios',
    available: true,
    isNew: true,
    lessonCount: 6,
    duration: '3h 15min',
  }
];

const Dashboard = () => {
  const { userProgress } = useUserProgress();
  const { achievements, loading: achievementsLoading } = useAchievements();

  return (
    <div className="dashboard-container">
      <CourseBanner />
      
      <div className="dashboard-content">
        <div className="dashboard-main">
          {/* Cursos em Andamento */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Continue Aprendendo</h2>
              <Link to="/courses" className="view-all">Ver todos</Link>
            </div>
            
            <div className="in-progress-courses">
              {inProgressCourses.map(course => (
                <div key={course.id} className="progress-course-card">
                  <div className="course-image">
                    <img src={course.image} alt={course.title} />
                    <div className="course-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span>{course.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <p className="next-lesson">
                      Próxima aula: <span>{course.nextLesson.title}</span>
                    </p>
                    <Link 
                      to={`/lesson/${course.id}/${course.nextLesson.moduleId}/${course.nextLesson.id}`}
                      className="continue-btn"
                    >
                      Continuar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Cursos Recomendados */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recomendado para Você</h2>
              <Link to="/courses" className="view-all">Explorar</Link>
            </div>
            
            <div className="course-grid">
              {recommendedCourses.map(course => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  image={course.image}
                  available={course.available}
                  isNew={course.isNew}
                  isPopular={course.isPopular}
                  lessonCount={course.lessonCount}
                  duration={course.duration}
                />
              ))}
            </div>
          </section>
        </div>
        
        <div className="dashboard-sidebar">
          {/* Perfil */}
          <div className="user-profile-card">
            <div className="user-header">
              <h3>Seu Progresso</h3>
            </div>
            
            <div className="level-info">
              <div className="level-badge">Nível {userProgress.level}</div>
              <div className="xp-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(userProgress.xp / userProgress.xpToNextLevel) * 100}%` }}
                  ></div>
                </div>
                <div className="xp-text">
                  {userProgress.xp} / {userProgress.xpToNextLevel} XP
                </div>
              </div>
            </div>
            
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Cursos iniciados</span>
                <span className="stat-value">{userProgress.totalCoursesStarted}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Aulas concluídas</span>
                <span className="stat-value">{userProgress.totalLessonsCompleted}</span>
              </div>
            </div>
          </div>
          
          {/* Conquistas */}
          <div className="achievements-card">
            <div className="card-header">
              <h3>Conquistas</h3>
              <Link to="/profile" className="view-all-small">Ver todas</Link>
            </div>
            
            <div className="achievements-list">
              {!achievementsLoading && achievements.slice(0, 3).map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`achievement-item ${!achievement.unlocked ? 'locked' : ''}`}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-name">{achievement.name}</div>
                  {!achievement.unlocked && achievement.currentProgress !== undefined && (
                    <div className="achievement-progress">
                      {achievement.currentProgress}/{achievement.requiredProgress}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;