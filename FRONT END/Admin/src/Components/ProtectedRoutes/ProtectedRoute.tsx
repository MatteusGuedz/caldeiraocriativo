// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAppSelector(state => state.auth);
  
  // Adicionando console.log para debug
  console.log('ProtectedRoute status:', { isAuthenticated, loading });
  
  // Mostrar um carregamento apenas por curto período, com timeout de segurança
  if (loading) {
    return (
      <div className="loading-screen">
        <p>Carregando...</p>
      </div>
    );
  }
  
  // Se não estiver autenticado após carregar, redirecionar para login
  if (!isAuthenticated) {
    console.log('Não autenticado, redirecionando para login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('Autenticado, renderizando conteúdo protegido');
  return <Outlet />;
};

export default ProtectedRoute;