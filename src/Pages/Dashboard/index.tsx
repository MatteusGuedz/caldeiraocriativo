import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import AvatarIMG from '../../Assets/images/avatar.jpg';
import ProgressBar from '@ramonak/react-progress-bar'; // Certifique-se de que o pacote 'react-progress-bar' está instalado
import "./Dashboard.scss";

// Registrando os componentes do gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Dados dos gráficos
  const chartData = [
    {
      label: 'Cursos Pagos',
      data: [350, 460, 500, 600, 700],
      backgroundColor: '#34d399', // Verde
    },
    {
      label: 'Cursos Grátis',
      data: [120, 180, 90, 110, 200],
      backgroundColor: '#60a5fa', // Azul
    },
  ];

  // Dados do progresso do admin
  const progressData = {
    title: "Progresso Geral",
    progress: 70, // Percentagem de progresso
  };

  // Dados dos usuários
  const userData = [
    { 
      id: 1,
      name: 'Maria Oliveira',
      avatar:  AvatarIMG,
      status: 'Ativo',
      plan: 'Premium',
      expirationDate: '2025-07-20',
    },
    { 
      id: 2,
      name: 'João Silva',
      avatar:  AvatarIMG,
      status: 'Inativo',
      plan: 'Basic',
      expirationDate: '2025-05-14',
    },
    { 
      id: 3,
      name: 'Maria Oliveira',
      avatar:  AvatarIMG,
      status: 'Ativo',
      plan: 'Premium',
      expirationDate: '2025-07-20',
    },
    { 
      id: 4,
      name: 'João Silva',
      avatar:  AvatarIMG,
      status: 'Inativo',
      plan: 'Basic',
      expirationDate: '2025-05-14',
    },
    // Outros usuários
    
    // Outros usuários
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard Administrativo</h2>

      {/* Estatísticas */}
      <div className="stats">
        <div className="stat-card">
          <h3>Total de Estudantes</h3>
          <p>15,000</p>
        </div>
        <div className="stat-card">
          <h3>Total de Cursos</h3>
          <p>420</p>
        </div>
        <div className="stat-card">
          <h3>Receita Geral</h3>
          <p>$50,000</p>
        </div>
      </div>

 

      {/* Tabela de Usuários */}
      <div className="user-table">
        <h3>Gerenciar Usuários</h3>
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Plano</th>
              <th>Data de Vencimento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {userData.map(user => (
              <tr key={user.id}>
                <td><img src={user.avatar} alt={user.name} className="avatar" /></td>
                <td>{user.name}</td>
                <td>{user.status}</td>
                <td>{user.plan}</td>
                <td>{user.expirationDate}</td>
                <td>
                  <button onClick={() => alert(`Editar usuário ${user.name}`)}>Editar</button>
                  <button onClick={() => alert(`Alterar status de ${user.name}`)}>Ativar/Desativar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

           {/* Gráficos */}
           <div className="charts">
        <div className="chart">
          <h3>Taxa de Inscrição</h3>
          <Bar data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: chartData,
          }} />
        </div>

        {/* Barra de progresso */}
        <div className="chart">
          <h3>Progresso do Aluno</h3>
          <ProgressBar completed={progressData.progress} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
