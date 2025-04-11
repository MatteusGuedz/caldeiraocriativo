import React, { useState } from 'react';
import FeedbackForm from '../../Components/Forms/FeedbackForm';
import Notification from '../../Components/Notification';
import './Feedback.scss';

const Feedback: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
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
      <Notification />
      <FeedbackForm onSubmitSuccess={handleSubmitSuccess} />
    </div>
  );
};

export default Feedback;