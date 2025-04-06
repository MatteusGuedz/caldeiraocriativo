import React from 'react';
import './auth.scss';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2>Bem-vindo de volta 👋</h2>
        <p>Entre com sua conta para continuar</p>

        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>

        <div className="auth-footer">
          <Link to="/register">Criar Conta</Link>
          <Link to="#">Esqueci minha senha</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
