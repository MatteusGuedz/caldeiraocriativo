import React from 'react';

const Dashboard = () => {
  console.log("Dashboard carregado!");
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bem-vindo ao Caldeirão</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div style={{ background: '#f0f0f0', borderRadius: '10px', padding: '1.5rem' }}>
          <h3>Total de Alunos</h3>
          <p>15.000</p>
        </div>
        <div style={{ background: '#f0f0f0', borderRadius: '10px', padding: '1.5rem' }}>
          <h3>Total de Cursos</h3>
          <p>420</p>
        </div>
        <div style={{ background: '#f0f0f0', borderRadius: '10px', padding: '1.5rem' }}>
          <h3>Receita Total</h3>
          <p>$50.000</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
