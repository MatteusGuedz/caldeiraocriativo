// src/Components/LessonComments/index.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';

interface CommentProps {
  id: number;
  user: string;
  userAvatar: string;
  text: string;
  date: string;
  likes: number;
  replies?: CommentProps[];
}

const LessonComments = () => {
  const { courseId, lessonId } = useParams();
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  
  useEffect(() => {
    // Carregar comentários do localStorage ou dados mockados
    const savedComments = localStorage.getItem(`comments_${courseId}_${lessonId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Comentários mockados com estrutura aninhada de respostas
      const mockComments = [
        { 
          id: 1, 
          user: 'Ana Silva', 
          userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          text: 'Adorei essa aula! Muito bem explicada.', 
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 3,
          replies: []
        },
        { 
          id: 2, 
          user: 'Carlos Oliveira',
          userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          text: 'Tenho uma dúvida sobre o exercício proposto. Alguém pode me ajudar?', 
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          likes: 1,
          replies: [
            {
              id: 3,
              user: 'Maria Eduarda',
              userAvatar: 'https://randomuser.me/api/portraits/women/22.jpg',
              text: 'Carlos, acho que você precisa aplicar o conceito de brainstorming que foi explicado no minuto 5:30.',
              date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
              likes: 2
            }
          ]
        }
      ];
      setComments(mockComments);
      localStorage.setItem(`comments_${courseId}_${lessonId}`, JSON.stringify(mockComments));
    }
  }, [courseId, lessonId]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // Criar novo comentário
    const newCommentObj = {
      id: Date.now(),
      user: 'Usuário Demo',
      userAvatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      text: newComment,
      date: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    
    // Adicionar ao estado
    const updatedComments = [...comments, newCommentObj];
    setComments(updatedComments);
    
    // Salvar no localStorage
    localStorage.setItem(`comments_${courseId}_${lessonId}`, JSON.stringify(updatedComments));
    
    // Limpar campo de comentário
    setNewComment('');
  };
  
  const handleAddReply = (commentId: number) => {
    if (!replyText.trim()) return;
    
    // Criar nova resposta
    const newReply = {
      id: Date.now(),
      user: 'Usuário Demo',
      userAvatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      text: replyText,
      date: new Date().toISOString(),
      likes: 0
    };
    
    // Adicionar ao comentário pai
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    localStorage.setItem(`comments_${courseId}_${lessonId}`, JSON.stringify(updatedComments));
    
    // Limpar campos
    setReplyText('');
    setReplyingTo(null);
  };
  
  const handleLike = (commentId: number, isReply = false, parentId?: number) => {
    const updatedComments = [...comments];
    
    if (!isReply) {
      // Curtir um comentário principal
      const commentIndex = updatedComments.findIndex(c => c.id === commentId);
      if (commentIndex !== -1) {
        updatedComments[commentIndex] = {
          ...updatedComments[commentIndex],
          likes: updatedComments[commentIndex].likes + 1
        };
      }
    } else if (parentId) {
      // Curtir uma resposta
      const parentIndex = updatedComments.findIndex(c => c.id === parentId);
      if (parentIndex !== -1 && updatedComments[parentIndex].replies) {
        const replyIndex = updatedComments[parentIndex].replies!.findIndex(r => r.id === commentId);
        if (replyIndex !== -1) {
          updatedComments[parentIndex].replies![replyIndex] = {
            ...updatedComments[parentIndex].replies![replyIndex],
            likes: updatedComments[parentIndex].replies![replyIndex].likes + 1
          };
        }
      }
    }
    
    setComments(updatedComments);
    localStorage.setItem(`comments_${courseId}_${lessonId}`, JSON.stringify(updatedComments));
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
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
      return `${date.toLocaleDateString()} às ${date.toLocaleTimeString().substring(0, 5)}`;
    }
  };

  return (
    <div className="lesson-comments">
      <h3 className="section-title">Comentários ({comments.length})</h3>
      
      <div className="comment-form main-form">
        <div className="user-avatar">
          <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Seu avatar" />
        </div>
        <form onSubmit={handleAddComment}>
          <textarea 
            placeholder="Deixe seu comentário ou dúvida..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button type="submit" disabled={!newComment.trim()}>
            Enviar Comentário
          </button>
        </form>
      </div>
      
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            Seja o primeiro a comentar nesta aula!
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-thread">
              <div className="comment">
                <div className="comment-avatar">
                  <img src={comment.userAvatar} alt={comment.user} />
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-user">{comment.user}</span>
                    <span className="comment-date">
                      {formatDate(comment.date)}
                    </span>
                  </div>
                  <div className="comment-text">{comment.text}</div>
                  <div className="comment-actions">
                    <button 
                      className={`like-button`} 
                      onClick={() => handleLike(comment.id)}
                    >
                      <span className="like-icon">👍</span> 
                      <span className="like-count">{comment.likes}</span>
                    </button>
                    <button 
                      className="reply-button"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      Responder
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Formulário de resposta */}
              {replyingTo === comment.id && (
                <div className="reply-form">
                  <div className="user-avatar">
                    <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="Seu avatar" />
                  </div>
                  <div className="reply-input">
                    <textarea 
                      placeholder={`Respondendo para ${comment.user}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    ></textarea>
                    <div className="reply-actions">
                      <button 
                        className="cancel-button"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText('');
                        }}
                      >
                        Cancelar
                      </button>
                      <button 
                        className="submit-button"
                        disabled={!replyText.trim()}
                        onClick={() => handleAddReply(comment.id)}
                      >
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Respostas */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="replies">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="comment reply">
                      <div className="comment-avatar">
                        <img src={reply.userAvatar} alt={reply.user} />
                      </div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <span className="comment-user">{reply.user}</span>
                          <span className="comment-date">
                            {formatDate(reply.date)}
                          </span>
                        </div>
                        <div className="comment-text">{reply.text}</div>
                        <div className="comment-actions">
                          <button 
                            className={`like-button`} 
                            onClick={() => handleLike(reply.id, true, comment.id)}
                          >
                            <span className="like-icon">👍</span> 
                            <span className="like-count">{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LessonComments;