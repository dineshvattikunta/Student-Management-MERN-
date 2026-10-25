import React from 'react';
import {
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
  CheckCircle2,
  Clock,
  GraduationCap,
  AlertTriangle,
  UserX,
} from 'lucide-react';

export const StudentTable = ({
  students = [],
  loading = false,
  onViewStudent,
  onEditStudent,
  onDeleteStudent,
  onSort,
  sortBy,
  sortOrder,
}) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="badge-pill badge-pill-success">
            <span className="status-dot pulse-dot" />
            Active
          </span>
        );
      case 'On Leave':
        return (
          <span className="badge-pill badge-pill-warning">
            <Clock size={11} />
            On Leave
          </span>
        );
      case 'Graduated':
        return (
          <span className="badge-pill badge-pill-live">
            <GraduationCap size={11} />
            Graduated
          </span>
        );
      case 'Probation':
        return (
          <span className="badge-pill badge-pill-danger">
            <AlertTriangle size={11} />
            Probation
          </span>
        );
      default:
        return (
          <span className="badge-pill">
            <UserX size={11} />
            {status}
          </span>
        );
    }
  };

  const getGpaClass = (gpa) => {
    if (gpa >= 3.8) return 'gpa-pill-high';
    if (gpa >= 3.0) return 'gpa-pill-mid';
    return 'gpa-pill-low';
  };

  if (loading) {
    return (
      <div className="table-wrapper" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
          <span className="status-dot pulse-dot" style={{ color: 'var(--primary-indigo)', width: 10, height: 10 }} />
          <span>Synchronizing student records with MongoDB...</span>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="table-wrapper" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--bg-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: 'var(--text-tertiary)',
          }}
        >
          <GraduationCap size={24} />
        </div>
        <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>No Student Records Found</h4>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 360, margin: '0 auto' }}>
          Try clearing your search query or filters, or add a new student using the button above.
        </p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="campus-table">
        <thead>
          <tr>
            <th>Student Profile</th>
            <th>Department & Major</th>
            <th>Academic Standing</th>
            <th>GPA</th>
            <th>Credits</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const avatarUrl =
              student.avatar ||
              `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
                student.firstName + student.lastName
              )}`;

            return (
              <tr key={student._id}>
                {/* Student Profile */}
                <td>
                  <div className="student-avatar-cell">
                    <img
                      src={avatarUrl}
                      alt={`${student.firstName} ${student.lastName}`}
                      className="student-avatar"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(student.firstName)}`;
                      }}
                    />
                    <div>
                      <div className="student-name">
                        {student.firstName} {student.lastName}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                        <span className="student-id">{student.studentId}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>•</span>
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{student.email}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Department & Major */}
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {student.department}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                    {student.major}
                  </div>
                </td>

                {/* Academic Standing */}
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {student.academicLevel}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>
                    Class of {student.enrollmentYear + 4} (Adm. {student.enrollmentYear})
                  </div>
                </td>

                {/* GPA */}
                <td>
                  <div className={`gpa-pill ${getGpaClass(student.gpa)}`}>
                    <span>{student.gpa ? student.gpa.toFixed(2) : '—'}</span>
                  </div>
                </td>

                {/* Credits */}
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {student.creditsEarned}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>Credits</div>
                </td>

                {/* Status */}
                <td>{getStatusBadge(student.status)}</td>

                {/* Actions */}
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <button
                      className="btn-icon"
                      onClick={() => onViewStudent(student)}
                      title="View Student Dossier"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => onEditStudent(student)}
                      title="Edit Record"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => onDeleteStudent(student)}
                      title="Delete Record"
                      style={{ color: 'var(--accent-rose)' }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
