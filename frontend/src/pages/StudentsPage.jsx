import React from 'react';
import {
  Search,
  Filter,
  Plus,
  Download,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { StudentTable } from '../components/StudentTable';

export const StudentsPage = ({
  students = [],
  pagination = {},
  loading = false,
  filters = {},
  onFilterChange,
  onResetFilters,
  onPageChange,
  onLimitChange,
  departments = [],
  onOpenAddStudent,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  onExportCsv,
}) => {
  const { page = 1, totalPages = 1, total = 0, limit = 10 } = pagination;

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>Student Directory</h1>
            <span className="badge-pill badge-pill-live">
              {total} Total Students
            </span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
            Query, inspect, and update student profiles, GPAs, and departmental standings
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-secondary" onClick={onExportCsv}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button className="btn btn-primary" onClick={onOpenAddStudent}>
            <Plus size={16} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="framer-card" style={{ padding: '20px 24px', marginBottom: 24 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 14,
            alignItems: 'center',
          }}
        >
          {/* Search */}
          <div style={{ gridColumn: 'span 2', minWidth: 240 }}>
            <div className="search-input-wrapper">
              <Search size={16} className="search-input-icon" />
              <input
                type="text"
                className="input-field"
                placeholder="Search name, ID, email, major..."
                value={filters.search || ''}
                onChange={(e) => onFilterChange('search', e.target.value)}
                style={{ height: 40 }}
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <select
              className="input-field"
              value={filters.department || 'All'}
              onChange={(e) => onFilterChange('department', e.target.value)}
              style={{ height: 40 }}
            >
              <option value="All">All Departments</option>
              {departments.map((dept) => (
                <option key={dept._id || dept.code} value={dept.name}>
                  {dept.code} - {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              className="input-field"
              value={filters.status || 'All'}
              onChange={(e) => onFilterChange('status', e.target.value)}
              style={{ height: 40 }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Graduated">Graduated</option>
              <option value="Probation">Probation</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Academic Level */}
          <div>
            <select
              className="input-field"
              value={filters.academicLevel || 'All'}
              onChange={(e) => onFilterChange('academicLevel', e.target.value)}
              style={{ height: 40 }}
            >
              <option value="All">All Levels</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          {/* Reset Filters button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn btn-ghost"
              onClick={onResetFilters}
              title="Reset all search filters"
              style={{ height: 40, fontSize: 13, gap: 6 }}
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Records Table */}
      <div className="framer-card">
        <StudentTable
          students={students}
          loading={loading}
          onViewStudent={onViewStudent}
          onEditStudent={onEditStudent}
          onDeleteStudent={onDeleteStudent}
        />

        {/* Pagination Bar */}
        <div className="pagination-bar">
          <div className="pagination-info">
            Showing{' '}
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {total === 0 ? 0 : (page - 1) * limit + 1}
            </span>{' '}
            to{' '}
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {Math.min(page * limit, total)}
            </span>{' '}
            of <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{total}</span> students
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Page size */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
              <span>Show:</span>
              <select
                className="input-field"
                value={limit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                style={{ height: 32, padding: '4px 8px', width: 68 }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Controls */}
            <div className="pagination-controls">
              <button
                className="btn-icon"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                title="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              <span style={{ fontSize: 13, fontWeight: 700, padding: '0 8px' }}>
                Page {page} of {totalPages}
              </span>

              <button
                className="btn-icon"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                title="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
