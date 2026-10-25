import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const MetricCard = ({
  title,
  value,
  trend,
  trendDirection = 'up',
  trendLabel = 'vs last semester',
  icon: Icon,
  gradient = 'var(--gradient-framer)',
  accentColor = 'var(--primary-indigo)',
}) => {
  return (
    <div className="framer-card framer-card-interactive metric-card">
      <div className="metric-top-row">
        <span className="metric-label">{title}</span>
        <div className="metric-icon-box" style={{ background: gradient }}>
          {Icon && <Icon size={20} />}
        </div>
      </div>

      <div className="metric-value-row">
        <span className="metric-big-number">{value}</span>
      </div>

      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <span className={`metric-trend ${trendDirection}`}>
            {trendDirection === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend}
          </span>
          <span style={{ color: 'var(--text-tertiary)' }}>{trendLabel}</span>
        </div>
      )}
    </div>
  );
};
