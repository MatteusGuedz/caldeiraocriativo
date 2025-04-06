import React, { useEffect, useState } from 'react';
import './style.scss';

// Tipagem explícita da prop
interface LessonNotesProps {
  lessonId: string;
}

const LessonNotes: React.FC<LessonNotesProps> = ({ lessonId }) => {
  const [note, setNote] = useState('');

  // Carrega a anotação do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`note-${lessonId}`);
    if (saved) setNote(saved);
  }, [lessonId]);

  // Salva a anotação
  const handleSave = () => {
    localStorage.setItem(`note-${lessonId}`, note);
  };

  return (
    <div className="lesson-notes">
      <h3>Minhas Anotações</h3>
      <textarea
        placeholder="Escreva suas anotações sobre essa aula..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={handleSave}>Salvar Anotações</button>
    </div>
  );
};

export default LessonNotes;
