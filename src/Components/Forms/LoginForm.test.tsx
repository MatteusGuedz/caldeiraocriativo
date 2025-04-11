import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginForm from './LoginForm';
import { signIn } from '../../redux/slices/authSlice';

// Mock the redux store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

// Mock the signIn action
jest.mock('../../redux/slices/authSlice', () => ({
  signIn: jest.fn().mockImplementation(() => ({
    type: 'auth/signIn/fulfilled',
    payload: {
      user: { name: 'Test User', email: 'test@example.com' },
      token: 'fake-token'
    }
  }))
}));

describe('LoginForm Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: {
        loading: false,
        error: null
      }
    });
    
    // Reset mocks
    (signIn as jest.Mock).mockReset();
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders login form elements', () => {
    renderWithProviders(<LoginForm />);
    
    expect(screen.getByText('Bem-vindo de volta')).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('validates email and password input', async () => {
    renderWithProviders(<LoginForm />);
    
    // Submit the form without filling in any fields
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/e-mail é obrigatório/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/senha é obrigatória/i)).toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    renderWithProviders(<LoginForm />);
    
    // Fill in an invalid email
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'invalid-email' }
    });
    
    // Fill a valid password
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'password123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    
    // Check for validation error
    await waitFor(() => {
      expect(screen.getByText(/digite um e-mail válido/i)).toBeInTheDocument();
    });
  });

  test('submits the form with valid data', async () => {
    // Mock the signIn action to return a fulfilled promise
    (signIn as jest.Mock).mockReturnValue({
      type: 'auth/signIn/fulfilled',
      payload: {
        user: { name: 'Test User', email: 'test@example.com' },
        token: 'fake-token'
      },
      meta: { arg: { email: 'test@example.com', password: 'password123' } }
    });
    
    renderWithProviders(<LoginForm />);
    
    // Fill in valid credentials
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'password123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    
    // Check if the signIn action was dispatched with correct arguments
    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  test('shows loading state when submitting', async () => {
    // Update the store to simulate loading state
    store = mockStore({
      auth: {
        loading: true,
        error: null
      }
    });
    
    renderWithProviders(<LoginForm />);
    
    // Check that the button shows loading text
    expect(screen.getByRole('button', { name: /entrando/i })).toBeInTheDocument();
    // And check that it's disabled
    expect(screen.getByRole('button', { name: /entrando/i })).toBeDisabled();
  });

  test('shows error message when login fails', () => {
    // Update the store to simulate an error state
    store = mockStore({
      auth: {
        loading: false,
        error: 'Credenciais inválidas'
      }
    });
    
    renderWithProviders(<LoginForm />);
    
    // Check that the error message is displayed
    expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
  });
});