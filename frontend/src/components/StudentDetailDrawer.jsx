import React from 'react';
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  UserCheck,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';

export const StudentDetailDrawer = ({
  student,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!isOpen || !student) return null;

  const avatarUrl =
    student.avatar ||
    `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
      student.firstName + student.lastName
    )}`;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="badge-pill badge-pill-live">Student Dossier</span>
            <span style={{ fontSize: 12, fontFamily: 'monospace', color: 'var(--text-tertiary)' }}>
              {student.studentId}
            </span>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Identity Card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: 20,
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          >
            <img
              src={avatarUrl}
              alt={student.firstName}
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--primary-indigo)',
              }}
            />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>
                {student.firstName} {student.lastName}
              </h2>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
                {student.major}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                <span className="badge-pill" style={{ background: 'var(--bg-surface)' }}>
                  {student.department}
                </span>
                <span className="badge-pill badge-pill-success">
                  <span className="status-dot pulse-dot" />
                  {student.status}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                GPA
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary-indigo)', marginTop: 4 }}>
                {student.gpa ? student.gpa.toFixed(2) : '3.50'}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Credits
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginTop: 4 }}>
                {student.creditsEarned}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Level
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 8 }}>
                {student.academicLevel}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 12 }}>
              Student Contact & Location
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <Mail size={16} color="var(--primary-indigo)" />
                <span style={{ color: 'var(--text-primary)' }}>{student.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <Phone size={16} color="var(--primary-indigo)" />
                <span style={{ color: 'var(--text-primary)' }}>{student.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <MapPin size={16} color="var(--primary-indigo)" />
                <span style={{ color: 'var(--text-primary)' }}>
                  {student.address?.city || 'Boston, MA'}, {student.address?.country || 'United States'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                <Calendar size={16} color="var(--primary-indigo)" />
                <span style={{ color: 'var(--text-primary)' }}>
                  Enrolled in {student.enrollmentYear} ({student.semester})
                </span>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                Enrolled Courses & Attendance
              </h4>
              <span className="badge-pill">
                {student.enrolledCourses?.length || 0} Courses
              </span>
            </div>

            {student.enrolledCourses && student.enrolledCourses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {student.enrolledCourses.map((c, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{c.courseCode}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.courseTitle}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span className="badge-pill badge-pill-live" style={{ marginBottom: 4 }}>
                        Grade: {c.grade || 'A'}
                      </span>
                      <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                        {c.attendanceRate}% Attendance
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                }}
              >
                No active courses registered for this term.
              </div>
            )}
          </div>

          {/* Emergency Contact */}
          {student.emergencyContact && student.emergencyContact.name && (
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 12 }}>
                Emergency Contact
              </h4>
              <div
                style={{
                  padding: 14,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: 13,
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {student.emergencyContact.name}{' '}
                  <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>
                    ({student.emergencyContact.relationship})
                  </span>
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
                  Phone: {student.emergencyContact.phone}
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {student.notes && (
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 10 }}>
                Advising Remarks & Honors
              </h4>
              <div
                style={{
                  padding: 14,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                {student.notes}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button
            className="btn btn-danger"
            onClick={() => {
              onDelete(student);
              onClose();
            }}
          >
            <Trash2 size={16} />
            <span>Delete Student</span>
          </button>

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                onEdit(student);
                onClose();
              }}
            >
              <Edit2 size={16} />
              <span>Edit Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
