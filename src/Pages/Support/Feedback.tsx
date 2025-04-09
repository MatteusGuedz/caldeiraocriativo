import React, { useState } from 'react';
import './Feedback.scss';

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'geral',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de envio de feedback
    console.log('Feedback enviado:', formData);
    
    // Em um cenário real, você enviaria para um backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="feedback-page">
        <div className="feedback-success">
          <h2>Obrigado pelo seu feedback!</h2>
          <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
          <button onClick={() => setSubmitted(false)}>
            Enviar outro feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <h1>Envie seu Feedback</h1>
        <p>Sua opinião é importante para melhorarmos nossos serviços.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="topic">Tópico</label>
            <select 
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
            >
              <option value="geral">Feedback Geral</option>
              <option value="curso">Sobre um Curso</option>
              <option value="tecnico">Problema Técnico</option>
              <option value="sugestao">Sugestão de Melhoria</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Sua Mensagem</label>
            <textarea 
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Descreva detalhadamente seu feedback..."
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Enviar Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;