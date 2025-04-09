import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { month: 'Jan', revenue: 4500 },
  { month: 'Fev', revenue: 5200 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Abr', revenue: 6000 },
  { month: 'Mai', revenue: 5700 },
  { month: 'Jun', revenue: 6500 },
  { month: 'Jul', revenue: 7200 },
  { month: 'Ago', revenue: 6800 },
  { month: 'Set', revenue: 7500 },
  { month: 'Out', revenue: 8200 },
  { month: 'Nov', revenue: 8800 },
  { month: 'Dez', revenue: 9500 }
];

const RevenueChart: React.FC = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={mockData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="month"
          tick={{ fill: '#64748b' }}
          axisLine={{ stroke: '#e2e8f0' }}
        />
        <YAxis
          tick={{ fill: '#64748b' }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickFormatter={formatCurrency}
        />
        <Tooltip
          formatter={(value: number) => [formatCurrency(value), 'Receita']}
          contentStyle={{
            backgroundColor: '#1e293b',
            border: 'none',
            borderRadius: '0.375rem',
            padding: '0.75rem'
          }}
          labelStyle={{ color: '#f8fafc' }}
          itemStyle={{ color: '#f8fafc' }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: '#3b82f6', r: 4 }}
          activeDot={{ r: 6, fill: '#2563eb' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;