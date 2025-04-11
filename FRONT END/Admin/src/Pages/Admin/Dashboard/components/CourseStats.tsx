import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registrar componentes do ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

interface CourseStatsProps {
  totalCourses: number;
  activeCourses: number;
  completionRate: number;
}

const CourseStats: React.FC<CourseStatsProps> = ({ 
  totalCourses, 
  activeCourses, 
  completionRate 
}) => {
  // Dados para o gráfico de Doughnut
  const chartData = {
    labels: ['Concluídos', 'Em Andamento', 'Não Iniciados'],
    datasets: [
      {
        data: [
          completionRate, 
          (activeCourses / totalCourses) * 100 - completionRate, 
          100 - (activeCourses / totalCourses) * 100
        ],
        backgroundColor: [
          '#4CAF50', // Verde para concluídos
          '#2196F3', // Azul para em andamento
          '#F5F5F5'  // Cinza claro para não iniciados
        ],
        borderColor: [
          '#43A047',
          '#1E88E5',
          '#E0E0E0'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw.toFixed(1)}%`;
          }
        }
      }
    },
  };

  return (
    <div className="course-stats">
      <h3>Estatísticas de Cursos</h3>
      
      <div className="course-stats__metrics">
        <div className="course-stats__metric">
          <h4>Total de Cursos</h4>
          <p>{totalCourses}</p>
        </div>
        
        <div className="course-stats__metric">
          <h4>Cursos Ativos</h4>
          <p>{activeCourses}</p>
        </div>
        
        <div className="course-stats__metric">
          <h4>Taxa de Conclusão</h4>
          <p>{completionRate}%</p>
        </div>
      </div>
      
      <div className="course-stats__chart">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CourseStats;