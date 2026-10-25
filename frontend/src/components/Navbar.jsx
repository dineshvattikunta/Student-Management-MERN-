import React from 'react';
import {
  GraduationCap,
  Sun,
  Moon,
  Plus,
  Search,
  Menu,
  Sparkles,
  Database,
} from 'lucide-react';

export const Navbar = ({
  theme,
  onToggleTheme,
  onOpenAddStudent,
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
  dbStatus = 'Connected',
}) => {
  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <button
          className="btn-icon mobile-menu-btn"
          onClick={onOpenMobileMenu}
          style={{ display: 'none' }}
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        <div className="brand-badge">
          <div className="brand-icon-wrapper">
            <GraduationCap size={20} />
          </div>
          <span>
            Campus<span className="gradient-text">OS</span>
          </span>
          <span className="badge-pill badge-pill-live" style={{ marginLeft: 6 }}>
            <span className="status-dot pulse-dot" />
            v2.4
          </span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Term info */}
        <div className="badge-pill" style={{ display: 'none' }} id="academic-term-badge">
          <Sparkles size={12} color="var(--primary-indigo)" />
          <span>Fall 2024 Session</span>
        </div>

        {/* Database indicator */}
        <div className="badge-pill badge-pill-success" title="MongoDB Live Sync">
          <Database size={12} />
          <span>{dbStatus}</span>
        </div>

        {/* Theme switcher */}
        <button
          className="btn-icon"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Quick Add Student Action */}
        <button className="btn btn-primary" onClick={onOpenAddStudent}>
          <Plus size={16} />
          <span>Add Student</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mobile-menu-btn {
            display: inline-flex !important;
          }
          #academic-term-badge {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          #academic-term-badge {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
};
