import React from 'react';
import './SCSS/style.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import MainLayout from './Layout/MainLayout';
import CourseList from './Pages/Course/List';
import CourseDetail from './Pages/Course/Detail';
import Lesson from './Pages/Lesson';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';




function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses"element={<CourseList />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/lesson/:courseId/:moduleId/:lessonId" element={<Lesson />} />
          <Route path="/admin/upload-lesson" element={<div>Upload de Aula</div>} />
          <Route path="/admin/analytics" element={<div>Analytics</div>} />
          <Route path="/support/faq" element={<div>FAQ</div>} />
          <Route path="/support/feedback" element={<div>Feedback</div>} />
        </Route>

        {/* Rotas FORA do layout (ex: login, cadastro, onboarding) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<div>Onboarding</div>} />
        <Route path="/payment" element={<div>Checkout</div>} />
      </Routes>
    </Router>
  );
}

export default App;