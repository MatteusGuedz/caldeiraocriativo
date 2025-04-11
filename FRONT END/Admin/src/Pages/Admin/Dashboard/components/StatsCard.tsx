import React from 'react';
import './StatsCard.scss';

interface StatsCardProps {
  title: string;
  value: number | string;
  change: number;
  icon: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon
}) => {
  const isPositive = change >= 0;

  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>
      <div className="stats-info">
        <h3>{title}</h3>
        <div className="stats-value">{value}</div>
        <div className={`stats-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}%
          <span className="period">vs. último mês</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;