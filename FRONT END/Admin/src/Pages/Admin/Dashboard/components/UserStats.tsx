import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Registrar componentes do ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface UserStatsProps {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userGrowthData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      tension: number;
      fill: boolean;
    }[];
  };
}

const UserStats: React.FC<UserStatsProps> = ({
  totalUsers,
  activeUsers,
  newUsers,
  userGrowthData
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Crescimento de Usuários',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="user-stats">
      <h3>Estatísticas de Usuários</h3>
      
      <div className="user-stats__metrics">
        <div className="user-stats__metric">
          <h4>Total de Usuários</h4>
          <p>{totalUsers}</p>
        </div>
        
        <div className="user-stats__metric">
          <h4>Usuários Ativos</h4>
          <p>{activeUsers}</p>
          <span className="user-stats__percentage">
            {Math.round((activeUsers / totalUsers) * 100)}%
          </span>
        </div>
        
        <div className="user-stats__metric">
          <h4>Novos Usuários (este mês)</h4>
          <p>{newUsers}</p>
        </div>
      </div>
      
      <div className="user-stats__chart">
        <Line options={options} data={userGrowthData} />
      </div>
    </div>
  );
};

export default UserStats;