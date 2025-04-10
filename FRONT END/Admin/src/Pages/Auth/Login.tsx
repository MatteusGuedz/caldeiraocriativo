import React from 'react';
import LoginForm from '../../Components/Forms/LoginForm';
import Notification from '../../Components/Notification';
import './auth.scss';

const Login = () => {
  return (
    <div className="auth-container">
      <Notification />
      <LoginForm />
    </div>
  );
};

export default Login;