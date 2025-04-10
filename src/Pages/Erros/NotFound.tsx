import React from 'react';
import './NotFound.scss';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>O feitiço que você tentou acessar não existe!</p>
      <button onClick={() => navigate('/')}>Voltar ao caldeirão 🧙</button>
    </div>
  );
};

export default NotFound;
