import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import './Analytics.scss';

// Interface para tipos de dados de análise
interface AnalyticsData {
  userGrowth: Array<{month: string; users: number}>;
  coursePerformance: Array<{course: string; completionRate: number; enrollments: number}>;
  revenueData: Array<{month: string; revenue: number}>;
  userEngagement: {
    activeUsers: number;
    totalUsers: number;
    newUsers: number;
  };
  courseDistribution: Array<{name: string; value: number}>;
}

const AdminAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados de análise
    const fetchAnalyticsData = async () => {
      setLoading(true);
      
      // Dados mockados para demonstração
      const mockAnalyticsData: AnalyticsData = {
        userGrowth: [
          { month: 'Jan', users: 100 },
          { month: 'Fev', users: 150 },
          { month: 'Mar', users: 200 },
          { month: 'Abr', users: 250 },
          { month: 'Mai', users: 300 },
          { month: 'Jun', users: 350 }
        ],
        coursePerformance: [
          { course: 'Criatividade com IA', completionRate: 75, enrollments: 250 },
          { course: 'Design Thinking', completionRate: 65, enrollments: 180 },
          { course: 'Criatividade Prática', completionRate: 55, enrollments: 150 }
        ],
        revenueData: [
          { month: 'Jan', revenue: 5000 },
          { month: 'Fev', revenue: 6200 },
          { month: 'Mar', revenue: 7500 },
          { month: 'Abr', revenue: 8700 },
          { month: 'Mai', revenue: 9200 },
          { month: 'Jun', revenue: 10500 }
        ],
        userEngagement: {
          activeUsers: 1250,
          totalUsers: 5000,
          newUsers: 350
        },
        courseDistribution: [
          { name: 'Criatividade com IA', value: 40 },
          { name: 'Design Thinking', value: 30 },
          { name: 'Criatividade Prática', value: 20 },
          { name: 'Outros', value: 10 }
        ]
      };

      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAnalyticsData(mockAnalyticsData);
      setLoading(false);
    };

    fetchAnalyticsData();
  }, [timeRange]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  if (loading) {
    return <div className="loading">Carregando análises...</div>;
  }

  if (!analyticsData) {
    return <div className="error">Erro ao carregar dados</div>;
  }

  return (
    <div className="admin-analytics-page">
      <header className="analytics-header">
        <h1>Painel de Analytics</h1>
        <div className="time-range-selector">
          {['week', 'month', 'year'].map(range => (
            <button 
              key={range}
              className={timeRange === range ? 'active' : ''}
              onClick={() => setTimeRange(range as 'week' | 'month' | 'year')}
            >
              {range === 'week' ? '7 dias' : 
               range === 'month' ? '30 dias' : 
               '12 meses'}
            </button>
          ))}
        </div>
      </header>

      <div className="analytics-grid">
        <div className="analytics-card user-growth">
          <h2>Crescimento de Usuários</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-card course-performance">
          <h2>Desempenho dos Cursos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.coursePerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completionRate" fill="#10b981" name="Taxa de Conclusão (%)" />
              <Bar dataKey="enrollments" fill="#3b82f6" name="Matrículas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-card revenue">
          <h2>Receita Mensal</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${value}`, 'Receita']} />
              <Line type="monotone" dataKey="revenue" stroke="#f59e0b" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-card user-engagement">
          <h2>Engajamento de Usuários</h2>
          <div className="engagement-stats">
            <div className="stat">
              <span className="stat-label">Usuários Ativos</span>
              <span className="stat-value">{analyticsData.userEngagement.activeUsers}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Total de Usuários</span>
              <span className="stat-value">{analyticsData.userEngagement.totalUsers}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Novos Usuários</span>
              <span className="stat-value">{analyticsData.userEngagement.newUsers}</span>
            </div>
          </div>
        </div>

        <div className="analytics-card course-distribution">
          <h2>Distribuição de Cursos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.courseDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {analyticsData.courseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;