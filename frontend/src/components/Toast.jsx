import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const Toast = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type || 'success'}`}>
          {toast.type === 'error' ? (
            <AlertCircle size={18} color="var(--accent-rose)" />
          ) : (
            <CheckCircle2 size={18} color="var(--accent-emerald)" />
          )}
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => onDismiss(toast.id)}
            style={{ color: 'var(--text-tertiary)', padding: 4 }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
