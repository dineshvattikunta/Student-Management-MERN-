import React, { useState } from 'react';
import {
  Settings,
  Database,
  Server,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Layers,
  Container,
} from 'lucide-react';

export const SettingsPage = ({ onResetDemo, healthInfo }) => {
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleReset = async () => {
    try {
      setResetting(true);
      setResetDone(false);
      await onResetDemo();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div style={{ maxWidth: 900 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>System Architecture & Settings</h1>
          <span className="badge-pill badge-pill-live">CampusOS v2.4</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
          Environment diagnostics, backend services, database synchronizer, and demo reset
        </p>
      </div>

      {/* Stack & Docker info */}
      <div className="framer-card" style={{ padding: '28px', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div className="brand-icon-wrapper">
            <Container size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700 }}>MERN Production Stack</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Fullstack containerized deployment configuration
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          <div style={{ padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Database</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>MongoDB 8.0</div>
            <div style={{ fontSize: 12, color: 'var(--accent-emerald)', marginTop: 2 }}>● Active Persistence</div>
          </div>

          <div style={{ padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Backend API</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>Node.js + Express</div>
            <div style={{ fontSize: 12, color: 'var(--primary-indigo)', marginTop: 2 }}>Port 5000 REST</div>
          </div>

          <div style={{ padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Frontend Client</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>React + Vite</div>
            <div style={{ fontSize: 12, color: 'var(--primary-cyan)', marginTop: 2 }}>Framer Design System</div>
          </div>

          <div style={{ padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Container</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>Docker Compose</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>Multi-stage Build</div>
          </div>
        </div>
      </div>

      {/* Demo Reset Card */}
      <div className="framer-card" style={{ padding: '28px', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700 }}>Restore Pristine Showcase Data</h3>
              <span className="badge-pill badge-pill-live">One-Click</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, maxWidth: 520 }}>
              Reset MongoDB with the curated Framer-grade demo dataset: 5 academic departments, 8 accredited courses, and realistic student profiles.
            </p>
          </div>

          <button className="btn btn-primary" onClick={handleReset} disabled={resetting}>
            <RefreshCw size={16} className={resetting ? 'spin-animation' : ''} />
            <span>{resetting ? 'Resetting Database...' : 'Reset Demo Records'}</span>
          </button>
        </div>

        {resetDone && (
          <div
            style={{
              marginTop: 16,
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34D399',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <CheckCircle2 size={16} />
            <span>Database restored successfully to pristine state!</span>
          </div>
        )}
      </div>

      <style>{`
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
