import React, { useState } from 'react';
import './style.scss';

interface Comment {
  id: string;
  text: string;
  approved: boolean;
}

const LessonComments = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: '1', text: 'Ótima aula!', approved: true },
    { id: '2', text: 'Não entendi o segundo exemplo', approved: false },
  ]);
  const [input, setInput] = useState('');

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
