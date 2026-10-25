import React, { useState } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Student Record',
  message = 'Are you sure you want to permanently remove this student?',
  item = null,
}) => {
  const [deleting, setDeleting] = useState(false);

  if (!isOpen || !item) return null;

  const handleConfirm = async () => {
    try {
      setDeleting(true);
      await onConfirm(item);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" style={{ maxWidth: 460 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(244, 63, 94, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-rose)',
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>{title}</h3>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {message}
          </p>

          <div
            style={{
              marginTop: 16,
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              fontSize: 13,
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {item.firstName} {item.lastName}
            </div>
            <div style={{ color: 'var(--text-tertiary)', marginTop: 2, fontFamily: 'monospace' }}>
              {item.studentId} • {item.department}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={deleting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleConfirm} disabled={deleting}>
            <Trash2 size={16} />
            <span>{deleting ? 'Deleting...' : 'Confirm Deletion'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
