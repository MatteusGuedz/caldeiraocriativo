import React, { useState, useEffect } from 'react';
import './PaymentHistory.scss';

interface PaymentTransaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'success' | 'pending' | 'failed';
  invoiceUrl?: string;
}

const PaymentHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de histórico de pagamentos
    const fetchPaymentHistory = async () => {
      const mockTransactions: PaymentTransaction[] = [
        {
          id: 'INV-2024-001',
          date: '2024-04-15',
          amount: 49.90,
          description: 'Plano Criativo - Abril 2024',
          status: 'success',
          invoiceUrl: '#'
        },
        {
          id: 'INV-2024-002',
          date: '2024-03-15',
          amount: 49.90,
          description: 'Plano Criativo - Março 2024',
          status: 'success',
          invoiceUrl: '#'
        },
        {
          id: 'INV-2024-003',
          date: '2024-02-15',
          amount: 49.90,
          description: 'Plano Criativo - Fevereiro 2024',
          status: 'success',
          invoiceUrl: '#'
        }
      ];

      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTransactions(mockTransactions);
      setLoading(false);
    };

    fetchPaymentHistory();
  }, []);

  const getStatusColor = (status: PaymentTransaction['status']) => {
    switch (status) {
      case 'success': return 'green';
      case 'pending': return 'orange';
      case 'failed': return 'red';
    }
  };

  if (loading) {
    return <div className="loading">Carregando histórico de pagamentos...</div>;
  }

  return (
    <div className="payment-history-page">
      <header className="payment-history-header">
        <h1>Histórico de Pagamentos</h1>
        <p>Visualize todos os seus pagamentos e faturas</p>
      </header>

      {transactions.length === 0 ? (
        <div className="no-transactions">
          <p>Você ainda não possui transações</p>
        </div>
      ) : (
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Número da Fatura</th>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                  <td>R$ {transaction.amount.toFixed(2)}</td>
                  <td>
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(transaction.status) }}
                    >
                      {transaction.status === 'success' ? 'Pago' : 
                       transaction.status === 'pending' ? 'Pendente' : 
                       'Falha'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="invoice-btn"
                      onClick={() => window.open(transaction.invoiceUrl, '_blank')}
                    >
                      Ver Fatura
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;