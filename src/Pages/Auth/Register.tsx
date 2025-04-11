import React from 'react';
import RegisterForm from '../../Components/Forms/RegisterForm';
import Notification from '../../Components/Notification';
import './auth.scss';

const Register = () => {
  return (
    <div className="auth-container">
      <Notification />
      <RegisterForm />
    </div>
  );
};

export default Register;