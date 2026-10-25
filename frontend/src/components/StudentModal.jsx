import React, { useState, useEffect } from 'react';
import { X, Sparkles, User, BookOpen, Phone, MapPin, Check } from 'lucide-react';

export const StudentModal = ({
  isOpen,
  onClose,
  onSubmit,
  student = null, // null if creating, student object if editing
  departments = [],
}) => {
  const isEdit = Boolean(student);

  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'academic' | 'contact'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentId: '',
    avatar: '',
    department: 'Computer Science & Engineering',
    major: 'Computer Science',
    academicLevel: 'Sophomore',
    enrollmentYear: 2024,
    semester: 'Fall 2024',
    gpa: 3.5,
    creditsEarned: 45,
    status: 'Active',
    emergencyContact: {
      name: '',
      relationship: 'Parent / Guardian',
      phone: '',
    },
    address: {
      city: 'Boston, MA',
      country: 'United States',
    },
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        phone: student.phone || '',
        studentId: student.studentId || '',
        avatar: student.avatar || '',
        department: student.department || 'Computer Science & Engineering',
        major: student.major || 'Computer Science',
        academicLevel: student.academicLevel || 'Sophomore',
        enrollmentYear: student.enrollmentYear || 2024,
        semester: student.semester || 'Fall 2024',
        gpa: student.gpa ?? 3.5,
        creditsEarned: student.creditsEarned ?? 45,
        status: student.status || 'Active',
        emergencyContact: {
          name: student.emergencyContact?.name || '',
          relationship: student.emergencyContact?.relationship || 'Parent / Guardian',
          phone: student.emergencyContact?.phone || '',
        },
        address: {
          city: student.address?.city || 'Boston, MA',
          country: student.address?.country || 'United States',
        },
        notes: student.notes || '',
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '+1 (555) 000-0000',
        studentId: '',
        avatar: '',
        department: departments[0]?.name || 'Computer Science & Engineering',
        major: 'Computer Science',
        academicLevel: 'Freshman',
        enrollmentYear: new Date().getFullYear(),
        semester: 'Fall 2024',
        gpa: 3.75,
        creditsEarned: 15,
        status: 'Active',
        emergencyContact: {
          name: '',
          relationship: 'Parent',
          phone: '',
        },
        address: {
          city: 'San Francisco, CA',
          country: 'United States',
        },
        notes: '',
      });
    }
    setError('');
    setActiveTab('general');
  }, [student, isOpen, departments]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First and Last names are mandatory.');
      setActiveTab('general');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email address is mandatory.');
      setActiveTab('general');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const previewAvatar =
    formData.avatar ||
    `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
      (formData.firstName || 'Student') + (formData.lastName || '')
    )}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>
              {isEdit ? 'Edit Student Dossier' : 'Enroll New Student'}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              {isEdit
                ? `Updating profile for ${formData.firstName} ${formData.lastName}`
                : 'Register student into academic records'}
            </p>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '0 28px',
            background: 'var(--bg-elevated)',
            gap: 16,
          }}
        >
          {[
            { id: 'general', label: 'General Info', icon: User },
            { id: 'academic', label: 'Academic Standing', icon: BookOpen },
            { id: 'contact', label: 'Emergency & Location', icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 4px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: isActive ? 'var(--primary-indigo)' : 'var(--text-secondary)',
                  borderBottom: isActive ? '2px solid var(--primary-indigo)' : '2px solid transparent',
                  marginBottom: -1,
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="modal-body">
            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(244, 63, 94, 0.15)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#FB7185',
                  fontSize: 13,
                  marginBottom: 16,
                }}
              >
                {error}
              </div>
            )}

            {/* TAB: General Info */}
            {activeTab === 'general' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Avatar preview */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 18,
                    padding: 16,
                    background: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <img
                    src={previewAvatar}
                    alt="Preview"
                    style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Avatar Image URL</div>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Leave blank for auto-generated avatar"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      style={{ height: 36, fontSize: 13 }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="input-label">First Name *</label>
                    <input
                      type="text"
                      className="input-field"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Elena"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Last Name *</label>
                    <input
                      type="text"
                      className="input-field"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Rostova"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="input-label">Email Address *</label>
                    <input
                      type="email"
                      className="input-field"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="elena@campusos.edu"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Phone Number</label>
                    <input
                      type="text"
                      className="input-field"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 234-5678"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="input-label">Student ID (Leave blank to auto-generate)</label>
                    <input
                      type="text"
                      className="input-field"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder="e.g. STU-2024-042"
                    />
                  </div>
                  <div>
                    <label className="input-label">Current Status</label>
                    <select
                      className="input-field"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Graduated">Graduated</option>
                      <option value="Probation">Probation</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Academic Standing */}
            {activeTab === 'academic' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="input-label">Department *</label>
                  <select
                    className="input-field"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    {departments.length > 0 ? (
                      departments.map((dept) => (
                        <option key={dept._id || dept.code} value={dept.name}>
                          {dept.name} ({dept.code})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                        <option value="Data Science & Artificial Intelligence">Data Science & Artificial Intelligence</option>
                        <option value="Electrical & Computer Engineering">Electrical & Computer Engineering</option>
                        <option value="Interactive Design & Media">Interactive Design & Media</option>
                        <option value="Business & Tech Management">Business & Tech Management</option>
                      </>
                    )}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="input-label">Major / Specialization *</label>
                    <input
                      type="text"
                      className="input-field"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      placeholder="e.g. Artificial Intelligence"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Academic Level</label>
                    <select
                      className="input-field"
                      name="academicLevel"
                      value={formData.academicLevel}
                      onChange={handleChange}
                    >
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="input-label">Cumulative GPA (0 - 4.0)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.0"
                      className="input-field"
                      name="gpa"
                      value={formData.gpa}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="input-label">Credits Earned</label>
                    <input
                      type="number"
                      className="input-field"
                      name="creditsEarned"
                      value={formData.creditsEarned}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="input-label">Enrollment Year</label>
                    <input
                      type="number"
                      className="input-field"
                      name="enrollmentYear"
                      value={formData.enrollmentYear}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Academic Notes & Advising Remarks</label>
                  <textarea
                    rows={3}
                    className="input-field"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Scholarship awards, research interests, special accommodations..."
                  />
                </div>
              </div>
            )}

            {/* TAB: Contact & Location */}
            {activeTab === 'contact' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)' }}>
                  Emergency Contact
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="input-label">Contact Name</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.emergencyContact.name}
                      onChange={(e) => handleNestedChange('emergencyContact', 'name', e.target.value)}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="input-label">Relationship</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.emergencyContact.relationship}
                      onChange={(e) => handleNestedChange('emergencyContact', 'relationship', e.target.value)}
                      placeholder="Parent / Guardian"
                    />
                  </div>
                </div>

                <div>
                  <label className="input-label">Emergency Phone</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => handleNestedChange('emergencyContact', 'phone', e.target.value)}
                    placeholder="+1 (555) 999-1234"
                  />
                </div>

                <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)', marginTop: 8 }}>
                  Residential Location
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="input-label">City, State / Province</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.address.city}
                      onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
                      placeholder="Boston, MA"
                    />
                  </div>
                  <div>
                    <label className="input-label">Country</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.address.country}
                      onChange={(e) => handleNestedChange('address', 'country', e.target.value)}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <Check size={16} />
              <span>{submitting ? 'Saving...' : isEdit ? 'Update Student Record' : 'Enroll Student'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
