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
import Analytics from './Pages/Admin/Analytics';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rotas protegidas */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/lesson/:courseId/:moduleId/:lessonId" element={<Lesson />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Rotas de admin */}
          <Route path="/admin/analytics" element={<Analytics />} />
          
          {/* Rotas adicionais */}
          <Route path="/" element={<CourseList />} />
        </Route>
        
        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;