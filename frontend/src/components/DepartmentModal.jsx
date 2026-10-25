import React, { useState, useEffect } from 'react';
import { X, Building2, Check } from 'lucide-react';

export const DepartmentModal = ({
  isOpen,
  onClose,
  onSubmit,
  department = null,
}) => {
  const isEdit = Boolean(department);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    headOfDepartment: '',
    email: '',
    officeLocation: 'Main Science Tower',
    facultyCount: 16,
    accentColor: '#6366F1',
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (department) {
      setFormData({
        code: department.code || '',
        name: department.name || '',
        headOfDepartment: department.headOfDepartment || '',
        email: department.email || '',
        officeLocation: department.officeLocation || 'Main Science Tower',
        facultyCount: department.facultyCount ?? 16,
        accentColor: department.accentColor || '#6366F1',
        description: department.description || '',
      });
    } else {
      setFormData({
        code: '',
        name: '',
        headOfDepartment: '',
        email: '',
        officeLocation: 'Science & Engineering Complex',
        facultyCount: 12,
        accentColor: '#6366F1',
        description: '',
      });
    }
    setError('');
  }, [department, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code.trim() || !formData.name.trim() || !formData.headOfDepartment.trim()) {
      setError('Code, Name, and Department Head are required.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save department');
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
              <Building2 size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700 }}>
                {isEdit ? 'Edit Department' : 'Create Academic Department'}
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
                <label className="input-label">Code *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="CS"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  required
                />
              </div>
              <div>
                <label className="input-label">Department Name *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Computer Science & Engineering"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="input-label">Head of Department *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Dr. Aris Thorne"
                  value={formData.headOfDepartment}
                  onChange={(e) => setFormData({ ...formData, headOfDepartment: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="input-label">Faculty Count</label>
                <input
                  type="number"
                  className="input-field"
                  value={formData.facultyCount}
                  onChange={(e) => setFormData({ ...formData, facultyCount: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="input-label">Office Location</label>
              <input
                type="text"
                className="input-field"
                placeholder="Alan Turing Science Tower, Level 4"
                value={formData.officeLocation}
                onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
              />
            </div>

            <div>
              <label className="input-label">Description & Focus</label>
              <textarea
                rows={2}
                className="input-field"
                placeholder="Core mission and research themes..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Check size={16} />
              <span>{submitting ? 'Saving...' : isEdit ? 'Update Department' : 'Create Department'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
