import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import authReducer, { signIn } from '../../redux/slices/authSlice';

// Criar uma função para configurar o store de testes
const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState
  });
};

// Mock da função de navegação
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('LoginForm', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore({
      auth: {
        loading: false,
        error: null
      }
    });
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders login form', () => {
    renderComponent();
    
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('validates form inputs', async () => {
    renderComponent();
    
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    await userEvent.type(emailInput, 'invalidemail');
    await userEvent.type(passwordInput, '123');
    await userEvent.click(submitButton);

    expect(screen.getByText(/Digite um e-mail válido/i)).toBeInTheDocument();
    expect(screen.getByText(/A senha deve ter pelo menos 6 caracteres/i)).toBeInTheDocument();
  });
});