import React, { useState, useEffect } from 'react';
import './style.scss';

// Interface das props
interface LessonCommentsProps {
  lessonId: string;
}

// Interface do comentário
interface Comment {
  id: string;
  text: string;
  approved: boolean;
}

const LessonComments: React.FC<LessonCommentsProps> = ({ lessonId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [input, setInput] = useState('');

  // Carrega os comentários do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`comments-${lessonId}`);
    if (saved) setComments(JSON.parse(saved));
  }, [lessonId]);

  // Salva os comentários sempre que mudar
  useEffect(() => {
    localStorage.setItem(`comments-${lessonId}`, JSON.stringify(comments));
  }, [comments, lessonId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      text: input,
      approved: false,
    };

    setComments((prev) => [...prev, newComment]);
    setInput('');
  };

  return (
    <div className="lesson-comments">
      <h3>Comentários</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Escreva seu comentário..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Enviar para moderação</button>
      </form>

      <div className="comment-list">
        {comments
          .filter((c) => c.approved)
          .map((c) => (
            <div key={c.id} className="comment">
              <p>{c.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LessonComments;
