import React from 'react';
import './auth.scss';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Crie sua conta 🔥</h2>
        <p>Junte-se ao Caldeirão</p>

        <input type="text" placeholder="Nome completo" />
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirmar senha" />

        <button type="submit">Criar Conta</button>

        <div className="auth-footer">
          <Link to="/login">Já tenho conta</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
