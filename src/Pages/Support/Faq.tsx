import React, { useState } from 'react';
import './Faq.scss';

interface FaqItem {
  category: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

const faqData: FaqItem[] = [
  {
    category: 'Geral',
    questions: [
      {
        question: 'O que é o Caldeirão Criativo?',
        answer: 'O Caldeirão Criativo é uma plataforma de aprendizado online focada em desenvolver habilidades criativas através de cursos interativos e práticos.'
      },
      {
        question: 'Como funciona a plataforma?',
        answer: 'Você pode se cadastrar, escolher cursos, assistir aulas, fazer exercícios e acompanhar seu progresso de aprendizado.'
      }
    ]
  },
  {
    category: 'Cursos',
    questions: [
      {
        question: 'Quais tipos de cursos são oferecidos?',
        answer: 'Oferecemos cursos de criatividade, design thinking, inovação, inteligência artificial aplicada à criatividade e muito mais.'
      },
      {
        question: 'Como faço para começar um curso?',
        answer: 'Após o cadastro, navegue pelos cursos disponíveis, escolha um que lhe interesse e clique em "Iniciar Curso".'
      }
    ]
  },
  {
    category: 'Conta e Pagamento',
    questions: [
      {
        question: 'Os cursos são gratuitos?',
        answer: 'Temos cursos gratuitos e pagos. Alguns conteúdos básicos são liberados gratuitamente, enquanto cursos avançados requerem assinatura.'
      },
      {
        question: 'Como faço para alterar meus dados cadastrais?',
        answer: 'Você pode alterar seus dados no menu "Perfil" após fazer login na plataforma.'
      }
    ]
  }
];

const Faq: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(faqData[0].category);
  const [openQuestions, setOpenQuestions] = useState<{[key: string]: boolean}>({});

  const toggleQuestion = (category: string, question: string) => {
    const key = `${category}-${question}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const categories = faqData.map(item => item.category);

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>Central de Ajuda</h1>
        <p>Encontre respostas para suas dúvidas mais frequentes</p>
      </div>

      <div className="faq-content">
        <div className="faq-categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="faq-questions">
          {faqData
            .filter(item => item.category === activeCategory)
            .map(item => (
              <div key={item.category} className="category-section">
                {item.questions.map(question => (
                  <div 
                    key={question.question} 
                    className="faq-item"
                  >
                    <button 
                      className="question-toggle"
                      onClick={() => toggleQuestion(item.category, question.question)}
                    >
                      {question.question}
                      <span className="toggle-icon">
                        {openQuestions[`${item.category}-${question.question}`] ? '−' : '+'}
                      </span>
                    </button>
                    {openQuestions[`${item.category}-${question.question}`] && (
                      <div className="answer">
                        {question.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      <div className="faq-contact">
        <h2>Ainda com dúvidas?</h2>
        <p>Entre em contato conosco através do nosso e-mail de suporte:</p>
        <a href="mailto:suporte@caldeiraocriativo.com" className="contact-email">
          suporte@caldeiraocriativo.com
        </a>
      </div>
    </div>
  );
};

export default Faq;