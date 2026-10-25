import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

export const GpaDistributionChart = ({ buckets = [] }) => {
  const total = buckets.reduce((acc, b) => acc + (b.count || 0), 0) || 1;

  return (
    <div className="framer-card" style={{ padding: '24px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Academic Standing</h3>
            <span className="badge-pill badge-pill-live">GPA Distribution</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            Performance benchmarks across student population
          </p>
        </div>
        <Award size={18} color="var(--primary-indigo)" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {buckets.map((b, i) => {
          const pct = Math.round(((b.count || 0) / total) * 100);
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {b.label}{' '}
                  <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>({b.range})</span>
                </span>
                <span style={{ fontWeight: 700, color: b.color || 'var(--text-primary)' }}>
                  {b.count} students ({pct}%)
                </span>
              </div>

              {/* Progress bar */}
              <div
                style={{
                  height: 8,
                  width: '100%',
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: b.color || 'var(--primary-indigo)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
