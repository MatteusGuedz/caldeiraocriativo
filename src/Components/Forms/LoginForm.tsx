import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { signIn } from '../../redux/slices/authSlice';
import './FormStyles.scss';

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  rememberMe: yup.boolean()
});

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const resultAction = await dispatch(signIn({
        email: data.email,
        password: data.password
      }));
      
      // If login was successful, redirect to dashboard
      if (signIn.fulfilled.match(resultAction)) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="app-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">Bem-vindo de volta</h2>
      <p className="form-subtitle">Entre com sua conta para continuar:</p>
      
      {error && <div className="form-error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="Seu e-mail"
          {...register('email')}
          className={errors.email ? 'has-error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <div className="password-input-wrapper">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Sua senha"
            {...register('password')}
            className={errors.password ? 'has-error' : ''}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>
      
      <div className="form-group-inline">
        <div className="checkbox-wrapper">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
          />
          <label htmlFor="rememberMe">Lembrar-me</label>
        </div>
        <a href="#" className="form-link">Esqueceu a senha?</a>
      </div>
      
      <button
        type="submit"
        className="form-button"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
      
      <div className="form-footer">
        <p>
          Não tem uma conta? <a href="/register" className="form-link">Criar conta</a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;