// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './SCSS/style.scss';

import Dashboard from './Pages/Dashboard';
import MainLayout from './Layout/MainLayout';
import CourseList from './Pages/Course/CourseList';
import CourseDetail from './Pages/Course/Detail';
import Lesson from './Pages/Lesson';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import NotFound from './Pages/Erros/NotFound';
import Profile from './Pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Temporariamente tornando todas as rotas públicas para testes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/lesson/:courseId/:moduleId/:lessonId" element={<Lesson />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Rotas de admin */}
          <Route path="/admin/analytics" element={<div>Analytics</div>} />
          <Route path="/admin/upload" element={<div>Upload de Aulas</div>} />
          
          {/* Rotas de suporte */}
          <Route path="/support/feedback" element={<div>Feedback</div>} />
          <Route path="/support/faq" element={<div>FAQ</div>} />
          
          {/* Rotas adicionais */}
          <Route path="/onboarding" element={<div>Onboarding</div>} />
          <Route path="/payment" element={<div>Checkout</div>} />
          <Route path="/" element={<CourseList />} />
        </Route>
        
        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;