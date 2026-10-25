import React from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

export const Sidebar = ({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'departments', label: 'Departments & Courses', icon: Building2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'System & Demo', icon: Settings },
  ];

  return (
    <>
      {isMobileOpen && (
        <div className="mobile-overlay" onClick={onCloseMobile} aria-label="Close navigation" />
      )}

      <aside
        className={`sidebar-container ${isCollapsed ? 'collapsed' : ''} ${
          isMobileOpen ? 'mobile-open' : ''
        }`}
      >
        <div className="sidebar-header">
          {!isCollapsed && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                University OS
              </span>
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                Campus Console
              </span>
            </div>
          )}

          <button
            className="btn-icon"
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{ marginLeft: isCollapsed ? 'auto' : undefined, marginRight: isCollapsed ? 'auto' : undefined }}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-title">
            {!isCollapsed ? 'Academic Management' : '•••'}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                title={item.label}
              >
                <Icon size={19} style={{ flexShrink: 0 }} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="sidebar-footer">
            <div
              style={{
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <ShieldCheck size={18} color="var(--primary-indigo)" />
              <div style={{ fontSize: 12 }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Campus Engine</div>
                <div style={{ color: 'var(--text-tertiary)' }}>MongoDB Persistent</div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
