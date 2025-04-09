import React, { useState } from 'react';
import ProgressCard from '../../Components/ProgressCard';
import './Profile.scss';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useAchievements } from '../../hooks/useAchievements';
import avatarImg from '../../Assets/images/avatar.jpg';

const Profile = () => {
  const { userProgress } = useUserProgress();
  const { achievements } = useAchievements();
  const [activeTab, setActiveTab] = useState('info');

  const progressCards = [
    {
      title: "Nível Atual",
      value: userProgress.level,
      icon: "🏆",
      description: `${userProgress.xp}/${userProgress.xpToNextLevel} XP`
    },
    {
      title: "Cursos Completados",
      value: userProgress.totalCoursesCompleted,
      icon: "📚",
      description: "de " + userProgress.totalCoursesStarted + " iniciados"
    },
    {
      title: "Aulas Concluídas",
      value: userProgress.totalLessonsCompleted,
      icon: "✅",
      description: "Total de aulas"
    }
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>Meu Perfil</h2>
      </div>

      <div className="profile-container">
        <div className="profile-left">
          <div className="avatar-container">
            <img src={avatarImg} alt="Avatar" className="avatar" />
            <h3>{userProgress.user?.name || 'Usuário'}</h3>
            <p>{userProgress.user?.email || 'email@exemplo.com'}</p>
          </div>

          <div className="personal-info">
            <h4>Informações</h4>
            <ul>
              {progressCards.map((card, index) => (
                <ProgressCard
                  key={index}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  description={card.description}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="profile-right">
          <div className="tabs">
            <button 
              className={activeTab === 'info' ? 'active' : ''} 
              onClick={() => setActiveTab('info')}
            >
              Informações Pessoais
            </button>
            <button 
              className={activeTab === 'achievements' ? 'active' : ''} 
              onClick={() => setActiveTab('achievements')}
            >
              Conquistas
            </button>
          </div>

          {activeTab === 'info' && (
            <div className="edit-form">
              <label>
                Nome
                <input 
                  type="text" 
                  defaultValue={userProgress.user?.name || ''} 
                  placeholder="Seu nome"
                />
              </label>
              <label>
                Email
                <input 
                  type="email" 
                  defaultValue={userProgress.user?.email || ''} 
                  placeholder="Seu email"
                />
              </label>
              <label>
                Bio
                <textarea 
                  placeholder="Conte um pouco sobre você..."
                />
              </label>
              <div className="form-actions">
                <button className="cancel">Cancelar</button>
                <button className="save">Salvar Alterações</button>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements-section">
              {/* Aqui você pode adicionar a lista de conquistas */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;