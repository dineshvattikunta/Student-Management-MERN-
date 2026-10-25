import React, { useState, useEffect } from 'react';
import { X, BookOpen, Check } from 'lucide-react';

export const CourseModal = ({
  isOpen,
  onClose,
  onSubmit,
  course = null,
  departments = [],
}) => {
  const isEdit = Boolean(course);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    department: 'Computer Science & Engineering',
    credits: 3,
    instructor: '',
    term: 'Fall 2024',
    schedule: 'Mon / Wed 10:00 - 11:30 AM',
    capacity: 60,
    status: 'Active',
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      setFormData({
        code: course.code || '',
        title: course.title || '',
        department: course.department || (departments[0]?.name || 'Computer Science & Engineering'),
        credits: course.credits ?? 3,
        instructor: course.instructor || '',
        term: course.term || 'Fall 2024',
        schedule: course.schedule || 'Mon / Wed 10:00 - 11:30 AM',
        capacity: course.capacity ?? 60,
        status: course.status || 'Active',
        description: course.description || '',
      });
    } else {
      setFormData({
        code: '',
        title: '',
        department: departments[0]?.name || 'Computer Science & Engineering',
        credits: 3,
        instructor: '',
        term: 'Fall 2024',
        schedule: 'Tue / Thu 11:00 - 12:30 PM',
        capacity: 60,
        status: 'Active',
        description: '',
      });
    }
    setError('');
  }, [course, isOpen, departments]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code.trim() || !formData.title.trim() || !formData.instructor.trim()) {
      setError('Course Code, Title, and Instructor are required.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save course');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="brand-icon-wrapper" style={{ width: 34, height: 34 }}>
              <BookOpen size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700 }}>
                {isEdit ? 'Edit Curriculum Course' : 'Create Curriculum Course'}
              </h3>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#FB7185',
                  fontSize: 13,
                }}
              >
                {error}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 14 }}>
              <div>
                <label className="input-label">Course Code *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="CS-401"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  required
                />
              </div>
              <div>
                <label className="input-label">Course Title *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Neural Information Processing"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label">Academic Department</label>
              <select
                className="input-field"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                {departments.map((d) => (
                  <option key={d._id || d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="input-label">Lead Instructor *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Prof. Alan Turing"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="input-label">Credits (1 - 6)</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  className="input-field"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="input-label">Class Schedule</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Mon / Wed 10:00 - 11:30 AM"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                />
              </div>
              <div>
                <label className="input-label">Seat Capacity</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Check size={16} />
              <span>{submitting ? 'Saving...' : isEdit ? 'Update Course' : 'Create Course'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
