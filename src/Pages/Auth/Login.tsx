// src/Pages/Auth/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockLogin } from '../../utils/authUtils';
import './auth.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      setLoading(true);
      
      // Login simplificado sem context por enquanto
      mockLogin(email);
      
      // Redirecionamento direto
      navigate('/dashboard');
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Bem-vindo de volta</h2>
        <p>Entre com sua conta para continuar:</p>
        
        {error && <div className="auth-error">{error}</div>}
        
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
        
        <div className="auth-footer">
          <Link to="/register">Criar Conta</Link> | 
          <Link to="/">Esqueci minha senha</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;