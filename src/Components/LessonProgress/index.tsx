import React from 'react';
import './style.scss';

interface Props {
  lessonId: string;
}

const LessonProgress = ({ lessonId }: Props) => {
  // Mock de dados
  const completed = true; // depois você pode puxar do backend
  const xp = 120; // XP fictício acumulado
  const progress = 75; // porcentagem da aula atual

  return (
    <div className="lesson-progress">
      <div className="progress-bar">
        <div className="fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-info">
        <span>{progress}% concluído</span>
        <span>{xp} XP</span>
      </div>
      {completed && <div className="badge">🏅 Aula Concluída</div>}
    </div>
  );
};

export default LessonProgress;
