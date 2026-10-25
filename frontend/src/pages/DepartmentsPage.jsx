import React, { useState } from 'react';
import {
  Building2,
  BookOpen,
  Plus,
  Users,
  Award,
  GraduationCap,
  Edit2,
  Trash2,
  Clock,
  Layers,
} from 'lucide-react';

export const DepartmentsPage = ({
  departments = [],
  courses = [],
  onOpenAddDepartment,
  onEditDepartment,
  onDeleteDepartment,
  onOpenAddCourse,
  onEditCourse,
  onDeleteCourse,
}) => {
  const [activeSection, setActiveSection] = useState('departments'); // 'departments' | 'courses'

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
            <h1 style={{ fontSize: 28, fontWeight: 800 }}>Departments & Curriculum</h1>
            <span className="badge-pill badge-pill-live">
              {departments.length} Academic Divisions
            </span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
            Manage collegiate departments, faculty assignments, and course catalogs
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-secondary" onClick={onOpenAddCourse}>
            <Plus size={16} />
            <span>Add Course</span>
          </button>
          <button className="btn btn-primary" onClick={onOpenAddDepartment}>
            <Plus size={16} />
            <span>Add Department</span>
          </button>
        </div>
      </div>

      {/* Switcher */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
        <button
          className={`btn ${activeSection === 'departments' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSection('departments')}
        >
          <Building2 size={16} />
          <span>Academic Departments ({departments.length})</span>
        </button>
        <button
          className={`btn ${activeSection === 'courses' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveSection('courses')}
        >
          <BookOpen size={16} />
          <span>Course Catalog ({courses.length})</span>
        </button>
      </div>

      {/* SECTION 1: Departments Grid */}
      {activeSection === 'departments' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {departments.map((dept) => (
            <div key={dept._id || dept.code} className="framer-card framer-card-interactive" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-md)',
                      background: dept.accentColor || 'var(--primary-indigo)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: 16,
                      fontFamily: 'var(--font-display)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                    }}
                  >
                    {dept.code}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{dept.name}</h3>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                      Chair: {dept.headOfDepartment}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn-icon" onClick={() => onEditDepartment(dept)} title="Edit Department">
                    <Edit2 size={14} />
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => onDeleteDepartment(dept)}
                    title="Delete Department"
                    style={{ color: 'var(--accent-rose)' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {dept.description && (
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 18 }}>
                  {dept.description}
                </p>
              )}

              {/* Department Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 10,
                  padding: 12,
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  textAlign: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Students
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary-indigo)', marginTop: 2 }}>
                    {dept.studentCount ?? 0}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Courses
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginTop: 2 }}>
                    {dept.courseCount ?? 0}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                    Faculty
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent-emerald)', marginTop: 2 }}>
                    {dept.facultyCount ?? 12}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: Course Catalog Table */}
      {activeSection === 'courses' && (
        <div className="table-wrapper">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Department</th>
                <th>Instructor</th>
                <th>Credits</th>
                <th>Schedule</th>
                <th>Capacity</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id || course.code}>
                  <td>
                    <span className="badge-pill badge-pill-live" style={{ fontFamily: 'monospace' }}>
                      {course.code}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{course.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{course.term}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                      {course.department}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{course.instructor}</div>
                  </td>
                  <td>
                    <span className="badge-pill">{course.credits} Credits</span>
                  </td>
                  <td>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{course.schedule}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {course.enrolledCount ?? 0} / {course.capacity}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      <button className="btn-icon" onClick={() => onEditCourse(course)} title="Edit Course">
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="btn-icon"
                        onClick={() => onDeleteCourse(course)}
                        title="Delete Course"
                        style={{ color: 'var(--accent-rose)' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
