import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProgressProvider } from './hooks/useUserProgress';
import { AchievementsProvider } from './hooks/useAchievements';
import './SCSS/style.scss';

// Layouts
import MainLayout from './Layout/MainLayout';
import AdminLayout from './Layout/AdminLayout';
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute';

// Páginas Públicas
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import NotFound from './Pages/Erros/NotFound';

// Páginas de Usuário
import Dashboard from './Pages/Dashboard';
import CourseList from './Pages/Course/CourseList';
import CourseDetail from './Pages/Course/Detail';
import Lesson from './Pages/Lesson';
import Profile from './Pages/Profile';

// Páginas de Suporte
import Faq from './Pages/Support/Faq';
import Feedback from './Pages/Support/Feedback';
import Support from './Pages/Support/Support'; // Futura implementação

// Páginas de Checkout e Pagamento
import Checkout from './Pages/Payment/Subscriptions';
import Subscriptions from './Pages/Payment/Subscriptions'; // Futura implementação
import PaymentHistory from './Pages/Payment/PaymentHistory'; // Futura implementação

// Páginas Administrativas
import AdminDashboard from './Pages/Admin/Dashboard';
import AdminUsers from './Pages/Admin/Users';
import AdminCourses from './Pages/Admin/Courses';
import AdminModules from './Pages/Admin/Modules';
import AdminTheme from './Pages/Admin/Theme';
import AdminSettings from './Pages/Admin/Settings';
import AdminAnalytics from './Pages/Admin/Analytics';

function App() {
  return (
    <AuthProvider>
      <UserProgressProvider>
        <AchievementsProvider>
          <Router>
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Rotas Protegidas de Usuário */}
              <Route element={<MainLayout />}>
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/courses" element={<CourseList />} />
                  <Route path="/courses/:courseId" element={<CourseDetail />} />
                  <Route path="/lesson/:courseId/:moduleId/:lessonId" element={<Lesson />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/" element={<CourseList />} />
                </Route>
              </Route>

              {/* Rotas de Suporte */}
              <Route element={<ProtectedRoute />}>
                <Route path="/support/faq" element={<Faq />} />
                <Route path="/support/feedback" element={<Feedback />} />
                <Route path="/support" element={<Support />} />
              </Route>

              {/* Rotas de Pagamento */}
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/payment-history" element={<PaymentHistory />} />
              </Route>

              {/* Rotas Admin */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="courses" element={<AdminCourses />} />
                  <Route path="modules" element={<AdminModules />} />
                  <Route path="theme" element={<AdminTheme />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                </Route>
              </Route>
              
              {/* Rota 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AchievementsProvider>
      </UserProgressProvider>
    </AuthProvider>
  );
}

export default App;