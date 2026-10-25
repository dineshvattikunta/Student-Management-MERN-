import React from 'react';
import {
  Users,
  Award,
  BookOpen,
  Building2,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { MetricCard } from '../components/MetricCard';
import { EnrollmentTrendChart } from '../components/Charts/EnrollmentTrendChart';
import { DepartmentPieChart } from '../components/Charts/DepartmentPieChart';
import { GpaDistributionChart } from '../components/Charts/GpaDistributionChart';
import { StudentTable } from '../components/StudentTable';

export const DashboardPage = ({
  metrics,
  recentStudents = [],
  loading = false,
  onOpenAddStudent,
  onNavigateToStudents,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onExportCsv,
}) => {
  const summary = metrics?.summary || {};

  return (
    <div>
      {/* 1. Opening Framer Hero Section */}
      <HeroSection
        onOpenAddStudent={onOpenAddStudent}
        onSearchSubmit={onSearchSubmit}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        metrics={metrics}
        onExportCsv={onExportCsv}
      />

      {/* 2. Key MongoDB Live Metrics Grid */}
      <div className="metrics-grid">
        <MetricCard
          title="Total Student Body"
          value={summary.totalStudents ?? '12'}
          trend="+8.2%"
          trendDirection="up"
          trendLabel="vs last academic year"
          icon={Users}
          gradient="linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)"
        />

        <MetricCard
          title="Active Enrolment Rate"
          value={`${summary.activeRate ?? 92.3}%`}
          trend="+3.4%"
          trendDirection="up"
          trendLabel="retention benchmark"
          icon={TrendingUp}
          gradient="linear-gradient(135deg, #10B981 0%, #06B6D4 100%)"
        />

        <MetricCard
          title="Cumulative Campus GPA"
          value={summary.averageGpa ? summary.averageGpa.toFixed(2) : '3.52'}
          trend="+0.14 pts"
          trendDirection="up"
          trendLabel="Dean's average"
          icon={Award}
          gradient="linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)"
        />

        <MetricCard
          title="Academic Departments"
          value={summary.totalDepartments ?? '5'}
          trend="8 Majors"
          trendDirection="up"
          trendLabel="accredited curricula"
          icon={Building2}
          gradient="linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)"
        />
      </div>

      {/* 3. Refined Analytics Charts: Enrolment Trends & Department Share */}
      <div className="charts-grid">
        <EnrollmentTrendChart data={metrics?.enrollmentTrends || []} />
        <DepartmentPieChart data={metrics?.departmentDistribution || []} />
      </div>

      {/* 4. Realistic Student Records Table */}
      <div className="framer-card" style={{ marginBottom: 36 }}>
        <div className="card-header-row">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700 }}>Recent Student Admissions</h3>
              <span className="badge-pill badge-pill-live">Real-time DB Sync</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              Active students recently registered into the university database
            </p>
          </div>

          <button
            className="btn btn-secondary"
            onClick={onNavigateToStudents}
            style={{ fontSize: 13, gap: 6 }}
          >
            <span>View All Records</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <StudentTable
          students={recentStudents}
          loading={loading}
          onViewStudent={onViewStudent}
          onEditStudent={onEditStudent}
          onDeleteStudent={onDeleteStudent}
        />
      </div>

      {/* 5. Academic Performance Standing */}
      <div style={{ marginBottom: 20 }}>
        <GpaDistributionChart buckets={metrics?.gpaBuckets || []} />
      </div>
    </div>
  );
};
