import React, { useState } from 'react';
import { useForm, DefaultValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch } from '../../redux/store';
import { showNotification } from '../../redux/slices/errorSlice';
import './FormStyles.scss';

interface FeedbackFormInputs {
  name: string;
  email: string;
  topic: string;
  message: string;
}

// Validation schema
const schema = yup.object({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('E-mail é obrigatório'),
  topic: yup
    .string()
    .required('Selecione um tópico'),
  message: yup
    .string()
    .required('Mensagem é obrigatória')
    .min(10, 'Sua mensagem deve ter pelo menos 10 caracteres')
});

interface FeedbackFormProps {
  onSubmitSuccess?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmitSuccess }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const defaultValues: DefaultValues<FeedbackFormInputs> = {
    name: '',
    email: '',
    topic: '',
    message: ''
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FeedbackFormInputs>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onBlur'
  });

  const onSubmit = async (data: FeedbackFormInputs) => {
    try {
      setLoading(true);
      
      // Aqui você faria a chamada para a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(showNotification({
        message: 'Feedback enviado com sucesso! Obrigado por contribuir.',
        type: 'success'
      }));
      
      reset();
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      dispatch(showNotification({
        message: 'Erro ao enviar feedback. Tente novamente.',
        type: 'error'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="app-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">Envie seu Feedback</h2>
      <p className="form-subtitle">Sua opinião é importante para melhorarmos nossos serviços.</p>
      
      <div className="form-group">
        <label htmlFor="name">Nome Completo</label>
        <input
          id="name"
          type="text"
          placeholder="Seu nome completo"
          {...register('name')}
          className={errors.name ? 'has-error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>
      
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
        <label htmlFor="topic">Tópico</label>
        <select
          id="topic"
          {...register('topic')}
          className={errors.topic ? 'has-error' : ''}
        >
          <option value="">Selecione um tópico</option>
          <option value="geral">Feedback Geral</option>
          <option value="curso">Sobre um Curso</option>
          <option value="tecnico">Problema Técnico</option>
          <option value="sugestao">Sugestão de Melhoria</option>
        </select>
        {errors.topic && <span className="error-message">{errors.topic.message}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Sua Mensagem</label>
        <textarea
          id="message"
          placeholder="Descreva detalhadamente seu feedback..."
          rows={5}
          {...register('message')}
          className={errors.message ? 'has-error' : ''}
        />
        {errors.message && <span className="error-message">{errors.message.message}</span>}
      </div>
      
      <button
        type="submit"
        className="form-button"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;