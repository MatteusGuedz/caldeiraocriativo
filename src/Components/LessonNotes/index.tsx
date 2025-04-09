// src/Components/LessonNotes/index.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAchievements } from '../../hooks/useAchievements';
import './style.scss';

const LessonNotes: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [note, setNote] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { updateAchievementProgress } = useAchievements();

  // Carregar notas existentes
  useEffect(() => {
    if (courseId && lessonId) {
      const savedNote = localStorage.getItem(`note_${courseId}_${lessonId}`);
      if (savedNote) {
        setNote(savedNote);
      }
    }
  }, [courseId, lessonId]);

  // Salvar notas com debounce
  useEffect(() => {
    if (!note || !courseId || !lessonId) return;

    const timer = setTimeout(() => {
      setIsSaving(true);
      
      // Salvar no localStorage
      localStorage.setItem(`note_${courseId}_${lessonId}`, note);
      
      // Atualizar conquista se fez anotações
      if (note.length > 0) {
        updateAchievementProgress(6); // "Anotador"
      }
      
      // Atualizar estados
      setLastSaved(new Date());
      setIsSaving(false);
    }, 1000); // Salva 1 segundo após parar de digitar

    return () => clearTimeout(timer);
  }, [note, courseId, lessonId, updateAchievementProgress]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="lesson-notes-container">
      <div className="notes-header">
        <h3>Minhas Anotações</h3>
        {lastSaved && (
          <div className="save-status">
            {isSaving ? 'Salvando...' : `Salvo às ${formatTime(lastSaved)}`}
          </div>
        )}
      </div>
      
      <div className="notes-content">
        <textarea 
          value={note}
          onChange={handleNoteChange}
          placeholder="Escreva suas anotações sobre esta aula..."
          autoFocus
        ></textarea>
        
        <div className="notes-footer">
          <div className="notes-tips">
            <p>Dica: Suas anotações são salvas automaticamente e ficam disponíveis apenas para você.</p>
          </div>
          
          <div className="notes-actions">
            <button 
              className="clear-button"
              onClick={() => setNote('')}
              disabled={!note}
            >
              Limpar
            </button>
            <button 
              className="export-button"
              onClick={() => {
                const blob = new Blob([note], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `anotacoes_aula_${lessonId}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              disabled={!note}
            >
              Exportar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonNotes;