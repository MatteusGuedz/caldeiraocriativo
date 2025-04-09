import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { hour: '00:00', active: 120 },
  { hour: '02:00', active: 80 },
  { hour: '04:00', active: 45 },
  { hour: '06:00', active: 100 },
  { hour: '08:00', active: 250 },
  { hour: '10:00', active: 380 },
  { hour: '12:00', active: 420 },
  { hour: '14:00', active: 450 },
  { hour: '16:00', active: 400 },
  { hour: '18:00', active: 380 },
  { hour: '20:00', active: 300 },
  { hour: '22:00', active: 200 }
];

const UserActivityChart: React.FC = () => {
  const gradientId = 'userActivityGradient';

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={mockData}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="hour"
          tick={{ fill: '#64748b' }}
          axisLine={{ stroke: '#e2e8f0' }}
        />
        <YAxis
          tick={{ fill: '#64748b' }}
          axisLine={{ stroke: '#e2e8f0' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: 'none',
            borderRadius: '0.375rem',
            padding: '0.75rem'
          }}
          labelStyle={{ color: '#f8fafc' }}
          itemStyle={{ color: '#f8fafc' }}
          formatter={(value: number) => [`${value} usuários`, 'Ativos']}
        />
        <Area
          type="monotone"
          dataKey="active"
          stroke="#3b82f6"
          fill={`url(#${gradientId})`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default UserActivityChart;