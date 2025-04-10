import React, { useState, useEffect } from 'react';
import './styles.scss';
import StatsCard from './components/StatsCard';
import RevenueChart from './components/RevenueChart';
import UserActivityChart from './components/UserActivityChart';
import RecentUsers from './components/RecentUsers';
import PopularCourses from './components/PopularCourses';

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalCourses: 0,
    completionRate: 0
  });

  useEffect(() => {
    // Simulação de carregamento de dados
    const fetchData = async () => {
      setLoading(true);
      try {
        // Em um ambiente real, estes dados viriam da API
        const mockStats = {
          totalUsers: 1254,
          activeUsers: 892,
          totalCourses: 45,
          completionRate: 67
        };
        
        setStats(mockStats);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="admin-loading">Carregando dados...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <button className="btn-primary">Exportar Relatório</button>
          <select className="period-select">
            <option value="today">Hoje</option>
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="year">Último Ano</option>
          </select>
        </div>
      </header>

      <div className="stats-grid">
        <StatsCard
          title="Total de Usuários"
          value={stats.totalUsers}
          change={+12.5}
          icon="👥"
        />
        <StatsCard
          title="Usuários Ativos"
          value={stats.activeUsers}
          change={+8.2}
          icon="🎯"
        />
        <StatsCard
          title="Total de Cursos"
          value={stats.totalCourses}
          change={+5.0}
          icon="📚"
        />
        <StatsCard
          title="Taxa de Conclusão"
          value={`${stats.completionRate}%`}
          change={-2.4}
          icon="📊"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h2>Receita Mensal</h2>
          <RevenueChart />
        </div>
        <div className="chart-container">
          <h2>Atividade dos Usuários</h2>
          <UserActivityChart />
        </div>
      </div>

      <div className="data-grid">
        <div className="data-container">
          <h2>Usuários Recentes</h2>
          <RecentUsers />
        </div>
        <div className="data-container">
          <h2>Cursos Populares</h2>
          <PopularCourses />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;