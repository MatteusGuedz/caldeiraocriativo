import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Support.scss';

interface SupportTopic {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const supportTopics: SupportTopic[] = [
  {
    id: 1,
    title: 'Perguntas Frequentes',
    description: 'Encontre respostas rápidas para suas dúvidas mais comuns',
    icon: '❓',
    link: '/support/faq'
  },
  {
    id: 2,
    title: 'Enviar Feedback',
    description: 'Ajude-nos a melhorar nossa plataforma',
    icon: '💬',
    link: '/support/feedback'
  },
  {
    id: 3,
    title: 'Chat ao Vivo',
    description: 'Converse diretamente com nossa equipe de suporte',
    icon: '💬',
    link: '/support/chat'
  },
  {
    id: 4,
    title: 'Central de Ajuda',
    description: 'Guias detalhados e tutoriais',
    icon: '📚',
    link: '/support/help-center'
  }
];

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = supportTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="support-page">
      <div className="support-header">
        <h1>Central de Suporte</h1>
        <p>Como podemos ajudar você hoje?</p>
      </div>

      <div className="support-search">
        <input 
          type="text" 
          placeholder="Busque por tópicos de suporte..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="support-topics">
        {filteredTopics.map(topic => (
          <Link 
            to={topic.link} 
            key={topic.id} 
            className="support-topic-card"
          >
            <div className="topic-icon">{topic.icon}</div>
            <div className="topic-content">
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </div>
            <div className="topic-arrow">→</div>
          </Link>
        ))}
      </div>

      <div className="support-contact">
        <h2>Precisa de mais ajuda?</h2>
        <div className="contact-methods">
          <div className="contact-method">
            <h3>E-mail de Suporte</h3>
            <p>suporte@caldeiraocriativo.com</p>
          </div>
          <div className="contact-method">
            <h3>Telefone</h3>
            <p>+55 (11) 4002-8922</p>
          </div>
          <div className="contact-method">
            <h3>Horário de Atendimento</h3>
            <p>Segunda a Sexta: 9h - 18h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;