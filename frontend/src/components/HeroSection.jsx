import React from 'react';
import {
  Plus,
  Search,
  Sparkles,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Download,
} from 'lucide-react';

export const HeroSection = ({
  onOpenAddStudent,
  onSearchSubmit,
  searchQuery,
  onSearchChange,
  metrics,
  onExportCsv,
}) => {
  const summary = metrics?.summary || {};

  return (
    <div className="hero-card">
      <div className="hero-glow-element" />

      <div className="hero-content">
        {/* Top Tag */}
        <div style={{ marginBottom: 16 }}>
          <span className="badge-pill badge-pill-live">
            <Sparkles size={12} />
            <span>Framer Creative Direction × CampusOS</span>
          </span>
        </div>

        {/* Mandatory Heading */}
        <h1 className="hero-headline">
          Every student.{' '}
          <span className="gradient-text">Every detail.</span>{' '}
          One campus.
        </h1>

        {/* Mandatory Supporting Text */}
        <p className="hero-subtitle">
          A smarter way to manage student records, academic information and enrolment.
        </p>

        {/* Hero Actions: Prominent Add Student & Student Search Field */}
        <div className="hero-actions-row">
          <button className="btn btn-primary" onClick={onOpenAddStudent} style={{ padding: '12px 24px', fontSize: 15 }}>
            <Plus size={18} />
            <span>Add Student</span>
          </button>

          {/* Quick Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (onSearchSubmit) onSearchSubmit();
            }}
            style={{ flex: '1 1 320px', maxWidth: 460 }}
          >
            <div className="search-input-wrapper">
              <Search size={18} className="search-input-icon" />
              <input
                type="text"
                className="input-field"
                placeholder="Search by student name, ID, or major..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{ height: 46, fontSize: 14 }}
              />
            </div>
          </form>

          {onExportCsv && (
            <button className="btn btn-secondary" onClick={onExportCsv} style={{ height: 46 }}>
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          )}
        </div>

        {/* Compact Live Statistics */}
        <div className="hero-stats-bar">
          <div className="hero-stat-item">
            <span className="status-dot pulse-dot" style={{ color: 'var(--accent-emerald)' }} />
            <span>Total Enrolled:</span>
            <span className="hero-stat-value">{summary.totalStudents ?? '...'} Students</span>
          </div>

          <div style={{ width: 1, height: 16, background: 'var(--border-subtle)' }} />

          <div className="hero-stat-item">
            <Award size={15} color="var(--primary-violet)" />
            <span>Avg GPA:</span>
            <span className="hero-stat-value">{summary.averageGpa ? summary.averageGpa.toFixed(2) : '3.52'}</span>
          </div>

          <div style={{ width: 1, height: 16, background: 'var(--border-subtle)' }} />

          <div className="hero-stat-item">
            <Users size={15} color="var(--primary-indigo)" />
            <span>Active Rate:</span>
            <span className="hero-stat-value">{summary.activeRate ? `${summary.activeRate}%` : '92%'}</span>
          </div>

          <div style={{ width: 1, height: 16, background: 'var(--border-subtle)' }} />

          <div className="hero-stat-item">
            <BookOpen size={15} color="var(--primary-cyan)" />
            <span>Departments:</span>
            <span className="hero-stat-value">{summary.totalDepartments ?? 5} Academic Units</span>
          </div>
        </div>
      </div>
    </div>
  );
};
