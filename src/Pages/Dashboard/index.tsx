import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAchievements } from '../../hooks/useAchievements';
import ProgressCard from '../../Components/ProgressCard';
import AchievementsList from '../../Components/AchievementsList';
import CourseCard from '../../Components/CourseCard';
import ActivityFeed from '../../Components/ActivityFeed';
import './Dashboard.scss';
import ImagemCapa from '../../Assets/images/capa-exemple.jpeg';

const Dashboard: React.FC = () => {
  const userProgressContext = useUserProgress();
  
  console.log('User Progress Context:', userProgressContext);

  const { 
    userProgress = {
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalCoursesStarted: 0,
      totalCoursesCompleted: 0,
      totalLessonsCompleted: 0,
      user: {
        name: 'Usuário',
        email: 'usuario@exemplo.com'
      }
    },
    startCourse = () => {
      console.log('Fallback startCourse called');
    },
    completeLesson = () => {
      console.log('Fallback completeLesson called');
    },
  } = userProgressContext;

  const { achievements = [] } = useAchievements();
  const [inProgressCourses, setInProgressCourses] = useState<any[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = () => {
      const mockInProgressCourses = [
        {
          id: 1,
          title: 'Introdução à Criatividade com IA',
          image: ImagemCapa,
          progress: 45,
          lastAccessedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          moduleId: 1,
          lessonId: 103,
        },
        {
          id: 3,
          title: 'Criatividade na Prática',
          image: ImagemCapa,
          progress: 78,
          lastAccessedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          moduleId: 4,
          lessonId: 402,
        }
      ];

      const mockRecommendedCourses = [
        {
          id: 2,
          title: 'Design Thinking Avançado',
          image: ImagemCapa,
          available: true,
          isNew: false,
          isPopular: true,
          lessonCount: 8,
          duration: '4h 30min'
        },
        {
          id: 4,
          title: 'Criatividade para Negócios',
          image: ImagemCapa,
          available: true,
          isNew: true,
          isPopular: false,
          lessonCount: 6,
          duration: '3h 15min'
        }
      ];

      const mockActivities = [
        {
          id: 1,
          type: 'lesson_completed',
          courseId: 1,
          courseTitle: 'Introdução à Criatividade com IA',
          lessonId: 102,
          lessonTitle: 'Mitos sobre criatividade',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          type: 'achievement_unlocked',
          achievementId: 1,
          achievementTitle: 'Primeira Aula',
          achievementIcon: '🎓',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      setInProgressCourses(mockInProgressCourses);
      setRecommendedCourses(mockRecommendedCourses);
      setActivities(mockActivities);
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">Carregando seu painel...</div>;
  }

  // Valores seguros para todos os dados
  const unlockedAchievements = Array.isArray(achievements) 
    ? achievements.filter(a => a?.unlocked).slice(0, 3) 
    : [];

  const totalCoursesProgress = Array.isArray(inProgressCourses) && inProgressCourses.length > 0 
    ? inProgressCourses.reduce((acc, course) => acc + (course?.progress || 0), 0) / inProgressCourses.length 
    : 0;

  const progressCards = [
    {
      title: "Nível Atual",
      value: userProgress?.level || 1,
      icon: "🏆",
      description: `${userProgress?.xp || 0}/${userProgress?.xpToNextLevel || 100} XP para o próximo nível`
    },
    {
      title: "Cursos Completados",
      value: userProgress?.totalCoursesCompleted || 0,
      icon: "📚",
      description: `de ${userProgress?.totalCoursesStarted || 0} iniciados`
    },
    {
      title: "Aulas Concluídas",
      value: userProgress?.totalLessonsCompleted || 0,
      icon: "✅",
      description: "Total de aulas"
    }
  ];


  function formatTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
  
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'} atrás`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'} atrás`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'} atrás`;
    } else {
      return date.toLocaleDateString();
    }
  }

  return (
    <div className="dashboard-container">
      {/* Seções anteriores mantidas */}
  
      <div className="dashboard-main">
        <div className="dashboard-content">
          {/* Cursos em andamento */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Continue Aprendendo</h2>
              <div className="progress-overview">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${totalCoursesProgress}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {Math.round(totalCoursesProgress)}% concluído
                </span>
              </div>
            </div>
  
            <div className="in-progress-courses">
              {inProgressCourses.map(course => (
                <div key={course.id} className="in-progress-card">
                  <div className="course-image">
                    <img src={course.image} alt={course.title} />
                    <div className="course-progress-indicator">
                      <div className="progress-circle">
                        <svg viewBox="0 0 36 36">
                          <path
                            className="circle-bg"
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="circle"
                            strokeDasharray={`${course.progress}, 100`}
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <text x="18" y="20.35" className="percentage">
                            {course.progress}%
                          </text>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <p className="last-accessed">
                      Último acesso: {formatTimeAgo(new Date(course.lastAccessedAt))}
                    </p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <Link 
                      to={`/lesson/${course.id}/${course.moduleId}/${course.lessonId}`}
                      className="continue-btn"
                    >
                      Continuar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
  
          {/* Cursos recomendados */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recomendado para Você</h2>
              <Link to="/courses" className="view-all">Ver Todos os Cursos</Link>
            </div>
            
            <div className="recommended-courses">
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
  
        {/* Barra lateral */}
        <div className="dashboard-sidebar">
          {/* Conquistas */}
          <section className="dashboard-sidebar-section">
            <div className="section-header">
              <h2>Suas Conquistas</h2>
              <Link to="/profile" className="view-all">Ver Todas</Link>
            </div>
            
            <AchievementsList achievements={unlockedAchievements} />
            
            <div className="achievement-progress">
              <p>
                {unlockedAchievements.length} de {achievements.length} conquistas desbloqueadas
              </p>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${(unlockedAchievements.length / (achievements.length || 1)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </section>
  
          {/* Atividades recentes */}
          <section className="dashboard-sidebar-section">
            <div className="section-header">
              <h2>Atividades Recentes</h2>
            </div>
            
            <ActivityFeed activities={activities} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;