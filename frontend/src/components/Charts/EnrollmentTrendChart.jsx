import React, { useState } from 'react';
import { TrendingUp, Users } from 'lucide-react';

export const EnrollmentTrendChart = ({ data = [] }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Fallback data if DB has only recent items
  const chartData = data.length > 0
    ? data
    : [
        { year: 2021, enrolled: 85 },
        { year: 2022, enrolled: 120 },
        { year: 2023, enrolled: 175 },
        { year: 2024, enrolled: 240 },
        { year: 2025, enrolled: 310 },
      ];

  const maxVal = Math.max(...chartData.map((d) => d.enrolled), 10);
  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const points = chartData.map((d, i) => {
    const x = paddingX + (i / (chartData.length - 1 || 1)) * (width - paddingX * 2);
    const y = height - paddingY - (d.enrolled / maxVal) * (height - paddingY * 2);
    return { x, y, ...d };
  });

  const linePath = points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  );

  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : '';

  return (
    <div className="framer-card" style={{ padding: '24px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Enrolment Trajectory</h3>
            <span className="badge-pill badge-pill-live">Annual Velocity</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            Historical admissions & multi-year student retention
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--accent-emerald)', fontWeight: 600 }}>
          <TrendingUp size={16} />
          <span>+28.4% YoY</span>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>

          {/* Horizontal gridlines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = height - paddingY - pct * (height - paddingY * 2);
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="var(--border-subtle)"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Area Fill */}
          {areaPath && <path d={areaPath} fill="url(#enrollmentGradient)" />}

          {/* Line Stroke */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="url(#lineStroke)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points */}
          {points.map((p, i) => (
            <g
              key={i}
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredPoint?.year === p.year ? 7 : 5}
                fill="#FFFFFF"
                stroke="#6366F1"
                strokeWidth={hoveredPoint?.year === p.year ? 3.5 : 2.5}
                style={{ transition: 'all 0.15s ease' }}
              />
              <text
                x={p.x}
                y={height - 8}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-tertiary)"
              >
                {p.year}
              </text>
            </g>
          ))}
        </svg>

        {hoveredPoint && (
          <div
            style={{
              position: 'absolute',
              top: hoveredPoint.y - 45,
              left: `${(hoveredPoint.x / width) * 100}%`,
              transform: 'translateX(-50%)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-md)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {hoveredPoint.year}: <span style={{ color: 'var(--primary-indigo)' }}>{hoveredPoint.enrolled}</span> Enrolled
          </div>
        )}
      </div>
    </div>
  );
};
