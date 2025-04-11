import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { signIn } from '../../redux/slices/authSlice';
import './FormStyles.scss';

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Schema de validação com yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  rememberMe: yup.boolean().default(false)
});

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues: LoginFormInputs = {
    email: '',
    password: '',
    rememberMe: false
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const resultAction = await dispatch(signIn({
        email: data.email,
        password: data.password
      }));
      
      if (signIn.fulfilled.match(resultAction)) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
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
          {...register('email')}
          className={errors.email ? 'has-error' : ''}
          placeholder="Seu e-mail"
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <div className="password-input-wrapper">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={errors.password ? 'has-error' : ''}
            placeholder="Sua senha"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
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
        <a href="/reset-password" className="form-link">Esqueceu a senha?</a>
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