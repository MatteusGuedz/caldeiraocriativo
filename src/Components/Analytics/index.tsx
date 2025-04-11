// src/Pages/Admin/Analytics/index.tsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Analytics.scss';

interface AnalyticsData {
  activeUsers: number;
  totalLessonsCompleted: number;
  averageCompletionRate: number;
  coursesStarted: number;
  dailyStats: Array<{
    date: string;
    activeUsers: number;
    lessonsCompleted: number;
    newUsers: number;
  }>;
  popularCourses: Array<{
    id: number;
    title: string;
    enrollments: number;
    completionRate: number;
  }>;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de dados
    const fetchData = async () => {
      setLoading(true);
      // Em um ambiente real, isso seria uma chamada de API
      const mockData: AnalyticsData = {
        activeUsers: 1250,
        totalLessonsCompleted: 8750,
        averageCompletionRate: 68,
        coursesStarted: 450,
        dailyStats: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          activeUsers: Math.floor(Math.random() * 100) + 50,
          lessonsCompleted: Math.floor(Math.random() * 200) + 100,
          newUsers: Math.floor(Math.random() * 20) + 5,
        })),
        popularCourses: [
          { id: 1, title: 'Introdução à Criatividade com IA', enrollments: 320, completionRate: 75 },
          { id: 2, title: 'Design Thinking Avançado', enrollments: 280, completionRate: 62 },
          { id: 3, title: 'Criatividade na Prática', enrollments: 245, completionRate: 58 },
        ],
        
      };
      
      setData(mockData);
      setLoading(false);
    };

    fetchData();
  }, [timeRange]);

  if (loading || !data) {
    return <div className="loading">Carregando análises...</div>;
  }

  return (
    <div className="analytics-page">
      <header className="analytics-header">
        <h1>Analytics</h1>
        <div className="time-range-selector">
          <button 
            className={timeRange === 'week' ? 'active' : ''} 
            onClick={() => setTimeRange('week')}
          >
            7 dias
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''} 
            onClick={() => setTimeRange('month')}
          >
            30 dias
          </button>
          <button 
            className={timeRange === 'year' ? 'active' : ''} 
            onClick={() => setTimeRange('year')}
          >
            12 meses
          </button>
        </div>
      </header>

      <div className="analytics-overview">
        <div className="overview-card">
          <h3>Usuários Ativos</h3>
          <div className="value">{data.activeUsers}</div>
          <div className="trend positive">+5.2% ↑</div>
        </div>
        <div className="overview-card">
          <h3>Aulas Concluídas</h3>
          <div className="value">{data.totalLessonsCompleted}</div>
          <div className="trend positive">+12.8% ↑</div>
        </div>
        <div className="overview-card">
          <h3>Taxa de Conclusão</h3>
          <div className="value">{data.averageCompletionRate}%</div>
          <div className="trend negative">-2.4% ↓</div>
        </div>
        <div className="overview-card">
          <h3>Cursos Iniciados</h3>
          <div className="value">{data.coursesStarted}</div>
          <div className="trend positive">+8.7% ↑</div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-container">
          <h2>Atividade Diária</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="#3b82f6" 
                name="Usuários Ativos"
              />
              <Line 
                type="monotone" 
                dataKey="lessonsCompleted" 
                stroke="#10b981" 
                name="Aulas Concluídas"
              />
              <Line 
                type="monotone" 
                dataKey="newUsers" 
                stroke="#f59e0b" 
                name="Novos Usuários"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="popular-courses">
        <h2>Cursos Populares</h2>
        <div className="courses-table">
          <table>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Inscrições</th>
                <th>Taxa de Conclusão</th>
                <th>Tendência</th>
              </tr>
            </thead>
            <tbody>
              {data.popularCourses.map(course => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.enrollments}</td>
                  <td>
                    <div className="completion-bar">
                      <div 
                        className="completion-fill" 
                        style={{ width: `${course.completionRate}%` }}
                      />
                      <span>{course.completionRate}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="trend-indicator positive">↑</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;