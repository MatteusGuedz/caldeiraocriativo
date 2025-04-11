import React, { useState, useRef } from 'react';
import { Camera, Edit, Users, Trophy, BookOpen, Star } from 'lucide-react';
import ProgressCard from '../../Components/ProgressCard';
import AchievementsList from '../../Components/AchievementsList';
import CourseCard from '../../Components/CourseCard';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAchievements } from '../../hooks/useAchievements';
import avatarImg from '../../Assets/images/avatar.jpg';
import './Profile.scss';

const Profile: React.FC = () => {

  const { userProgress } = useUserProgress();
  const { achievements = [] } = useAchievements(); // Fornecer um array vazio como padrão
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'courses' | 'edit'>('overview');
  const [selectedAvatar, setSelectedAvatar] = useState(avatarImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const progressCards = [
    {
      title: "Nível Atual",
      value: userProgress.level,
      icon: "🏆",
      description: `${userProgress.xp}/${userProgress.xpToNextLevel} XP para o próximo nível`
    },
    {
      title: "Cursos Completados",
      value: userProgress.totalCoursesCompleted,
      icon: "📚",
      description: `de ${userProgress.totalCoursesStarted} iniciados`
    },
    {
      title: "Aulas Concluídas",
      value: userProgress.totalLessonsCompleted,
      icon: "✅",
      description: "Total de aulas"
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="profile-overview">
            <div className="overview-stats">
              {progressCards.map((card, index) => (
                <ProgressCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  description={card.description}
                />
              ))}
            </div>
            <div className="overview-achievements">
              <h3>Últimas Conquistas</h3>
              <AchievementsList 
  achievements={Array.isArray(achievements) ? achievements.slice(0, 3) : []} 
  compact 
/>
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="profile-achievements">
            <h3>Todas as Conquistas</h3>
            <AchievementsList achievements={achievements} />
          </div>
        );
      case 'courses':
        return (
          <div className="profile-courses">
            <h3>Cursos em Progresso</h3>
            <div className="courses-grid">
              {/* Mockup de cursos em progresso */}
              <CourseCard 
                id={1}
                title="Introdução à Criatividade com IA"
                image={avatarImg}
                available={true}
                progress={45}
              />
              <CourseCard 
                id={2}
                title="Design Thinking Avançado"
                image={avatarImg}
                available={true}
                progress={75}
              />
            </div>
          </div>
        );
      case 'edit':
        return (
          <div className="profile-edit">
            <form>
              <div className="form-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  defaultValue={userProgress.user?.name} 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  defaultValue={userProgress.user?.email} 
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea 
                  placeholder="Conte um pouco sobre sua jornada criativa..."
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary">Cancelar</button>
                <button type="submit" className="btn-primary">Salvar Alterações</button>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <img 
              src={selectedAvatar} 
              alt="Avatar" 
              className="avatar" 
            />
             <button 
              className="avatar-edit"
              onClick={() => fileInputRef.current?.click()}
            >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
           
              <Camera size={16} />
            </button>
            <h2>{userProgress.user?.name || 'Usuário'}</h2>
            <p>{userProgress.user?.email || 'email@exemplo.com'}</p>
          </div>
          <div className="profile-navigation">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              <Users size={16} /> Visão Geral
            </button>
            <button 
              className={activeTab === 'achievements' ? 'active' : ''}
              onClick={() => setActiveTab('achievements')}
            >
              <Trophy size={16} /> Conquistas
            </button>
            <button 
              className={activeTab === 'courses' ? 'active' : ''}
              onClick={() => setActiveTab('courses')}
            >
              <BookOpen size={16} /> Meus Cursos
            </button>
            <button 
              className={activeTab === 'edit' ? 'active' : ''}
              onClick={() => setActiveTab('edit')}
            >
              <Edit size={16} /> Editar Perfil
            </button>
          </div>
        </div>
        <div className="profile-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;