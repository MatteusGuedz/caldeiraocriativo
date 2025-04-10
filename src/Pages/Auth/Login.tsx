import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './auth.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Tentando fazer login com:", email, password);
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Usar o método signIn do AuthContext
      const success = await signIn(email, password);
      // console.log("Resultado do login:", success);
      
      if (success) {
        // console.log("Login bem-sucedido, redirecionando para dashboard");
        navigate('/dashboard');
      } else {
        setError('Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Erro ao fazer login. Tente novamente.');
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