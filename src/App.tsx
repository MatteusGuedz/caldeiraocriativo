import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './SCSS/style.scss';

import Dashboard from './Pages/Dashboard';
import MainLayout from './Layout/MainLayout';
import AdminLayout from './Layout/AdminLayout';
import CourseList from './Pages/Course/CourseList';
import CourseDetail from './Pages/Course/Detail';
import Lesson from './Pages/Lesson';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import NotFound from './Pages/Erros/NotFound';
import Profile from './Pages/Profile';
import Analytics from './Pages/Admin/Analytics';

// Admin Pages
import AdminDashboard from './Pages/Admin/Dashboard';
import AdminUsers from './Pages/Admin/Users';
import AdminCourses from './Pages/Admin/Courses';
import AdminModules from './Pages/Admin/Modules';
import AdminSettings from './Pages/Admin/Settings';
import AdminTheme from './Pages/Admin/Theme';

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
          <Route path="/" element={<CourseList />} />
        </Route>

        {/* Rotas admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="modules" element={<AdminModules />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="theme" element={<AdminTheme />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        
        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;