import React, { useState } from 'react';
import { PieChart as PieIcon } from 'lucide-react';

export const DepartmentPieChart = ({ data = [] }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const colors = ['#6366F1', '#8B5CF6', '#06B6D4', '#EC4899', '#10B981', '#F59E0B'];

  const chartData = data.length > 0
    ? data
    : [
        { name: 'Computer Science & Engineering', count: 5, percentage: 41.7 },
        { name: 'Data Science & Artificial Intelligence', count: 3, percentage: 25.0 },
        { name: 'Electrical & Computer Engineering', count: 2, percentage: 16.7 },
        { name: 'Interactive Design & Media', count: 2, percentage: 16.7 },
      ];

  const total = chartData.reduce((acc, curr) => acc + curr.count, 0) || 1;

  // Compute donut SVG arcs
  let accumulatedAngle = 0;
  const radius = 64;
  const strokeWidth = 24;
  const center = 80;
  const circumference = 2 * Math.PI * radius;

  const slices = chartData.map((d, i) => {
    const fraction = d.count / total;
    const strokeDasharray = `${fraction * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedAngle * circumference;
    accumulatedAngle += fraction;
    return {
      ...d,
      color: colors[i % colors.length],
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="framer-card" style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Department Share</h3>
          <span className="badge-pill">Distribution</span>
        </div>
        <PieIcon size={16} color="var(--primary-violet)" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0', position: 'relative' }}>
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth={strokeWidth}
          />
          {slices.map((slice, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={hoveredIdx === i ? strokeWidth + 4 : strokeWidth}
              strokeDasharray={slice.strokeDasharray}
              strokeDashoffset={slice.strokeDashoffset}
              transform={`rotate(-90 ${center} ${center})`}
              style={{
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                opacity: hoveredIdx === null || hoveredIdx === i ? 1 : 0.4,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          ))}
        </svg>

        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <span style={{ fontSize: 20, fontWeight: 800, fontFamily: 'var(--font-display)' }}>
            {hoveredIdx !== null ? `${slices[hoveredIdx].percentage}%` : total}
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 700 }}>
            {hoveredIdx !== null ? 'Share' : 'Students'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
        {slices.slice(0, 4).map((slice, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '4px 6px',
              borderRadius: 'var(--radius-xs)',
              background: hoveredIdx === i ? 'var(--bg-elevated)' : 'transparent',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: slice.color, flexShrink: 0 }} />
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 160,
                }}
                title={slice.name}
              >
                {slice.name}
              </span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
              {slice.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
