import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '../../redux/slices/errorSlice';
import { useAppDispatch } from '../../redux/store';
import './FormStyles.scss';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

// Schema de validação
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('Confirmação de senha é obrigatória'),
  agreeTerms: yup
    .boolean()
    .oneOf([true], 'Você deve concordar com os termos para continuar')
});

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues: RegisterFormInputs = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onBlur'
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      setLoading(true);
      
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(showNotification({
        message: 'Registro realizado com sucesso! Você já pode fazer login.',
        type: 'success'
      }));
      
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      dispatch(showNotification({
        message: 'Erro ao registrar usuário. Tente novamente.',
        type: 'error'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="app-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">Crie sua conta</h2>
      <p className="form-subtitle">Junte-se ao Caldeirão Criativo e comece sua jornada!</p>
      
      <div className="form-group">
        <label htmlFor="name">Nome Completo</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className={errors.name ? 'has-error' : ''}
          placeholder="Seu nome completo"
        />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>
      
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
      
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmar Senha</label>
        <div className="password-input-wrapper">
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'has-error' : ''}
            placeholder="Confirme sua senha"
          />
        </div>
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword.message}</span>
        )}
      </div>
      
      <div className="form-group">
        <div className="checkbox-wrapper">
          <input
            id="agreeTerms"
            type="checkbox"
            {...register('agreeTerms')}
          />
          <label htmlFor="agreeTerms">
            Concordo com os <a href="#" className="form-link">Termos de Uso</a> e <a href="#" className="form-link">Política de Privacidade</a>
          </label>
        </div>
        {errors.agreeTerms && (
          <span className="error-message">{errors.agreeTerms.message}</span>
        )}
      </div>
      
      <button
        type="submit"
        className="form-button"
        disabled={loading}
      >
        {loading ? 'Registrando...' : 'Criar Conta'}
      </button>
      
      <div className="form-footer">
        <p>
          Já tem uma conta? <a href="/login" className="form-link">Fazer login</a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;