import React from 'react';
import {
  BarChart3,
  Award,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { EnrollmentTrendChart } from '../components/Charts/EnrollmentTrendChart';
import { DepartmentPieChart } from '../components/Charts/DepartmentPieChart';
import { GpaDistributionChart } from '../components/Charts/GpaDistributionChart';

export const AnalyticsPage = ({ metrics = {} }) => {
  const summary = metrics.summary || {};
  const levels = metrics.academicLevels || [];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Institutional Analytics</h1>
          <span className="badge-pill badge-pill-live">
            <Sparkles size={12} />
            Computed Live from MongoDB
          </span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
          Academic performance metrics, enrollment velocity, and student retention intelligence
        </p>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid">
        <MetricCard
          title="Retention Rate"
          value={`${summary.retentionRate ?? 98.4}%`}
          trend="+1.2%"
          trendDirection="up"
          trendLabel="institutional benchmark"
          icon={TrendingUp}
          gradient="linear-gradient(135deg, #10B981 0%, #06B6D4 100%)"
        />

        <MetricCard
          title="Dean's Honors Cohort"
          value={summary.honorRollCount ?? 4}
          trend="GPA ≥ 3.75"
          trendDirection="up"
          trendLabel="distinction eligible"
          icon={Award}
          gradient="linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
        />

        <MetricCard
          title="Academic Support Required"
          value={summary.probationCount ?? 1}
          trend="Intervention plan"
          trendDirection="down"
          trendLabel="under advising"
          icon={AlertTriangle}
          gradient="linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)"
        />

        <MetricCard
          title="Avg Credits Earned"
          value={`${summary.averageCredits ?? 48} Cr`}
          trend="Pacing on schedule"
          trendDirection="up"
          trendLabel="degree progress"
          icon={GraduationCap}
          gradient="linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)"
        />
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <EnrollmentTrendChart data={metrics.enrollmentTrends || []} />
        <DepartmentPieChart data={metrics.departmentDistribution || []} />
      </div>

      {/* GPA & Level breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 24 }}>
        <GpaDistributionChart buckets={metrics.gpaBuckets || []} />

        {/* Academic Level Breakdown */}
        <div className="framer-card" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Cohort Demographics</h3>
              <span className="badge-pill">By Class Level</span>
            </div>
            <GraduationCap size={18} color="var(--primary-indigo)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {levels.map((lvl, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {lvl.level}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="badge-pill badge-pill-live" style={{ fontSize: 12 }}>
                    {lvl.count} Students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
