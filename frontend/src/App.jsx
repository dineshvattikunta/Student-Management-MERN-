import React, { useState, useEffect, useCallback } from 'react';
import { apiClient } from './api/client';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { StudentModal } from './components/StudentModal';
import { StudentDetailDrawer } from './components/StudentDetailDrawer';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { DepartmentModal } from './components/DepartmentModal';
import { CourseModal } from './components/CourseModal';

import { DashboardPage } from './pages/DashboardPage';
import { StudentsPage } from './pages/StudentsPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('campusos-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('campusos-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Navigation tab
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Toasts
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Data states
  const [metrics, setMetrics] = useState(null);
  const [recentStudents, setRecentStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [healthInfo, setHealthInfo] = useState(null);

  // Student directory filters & pagination
  const [studentDirectory, setStudentDirectory] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    department: 'All',
    status: 'All',
    academicLevel: 'All',
  });

  // Modals state
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [studentDrawerOpen, setStudentDrawerOpen] = useState(false);
  const [viewingStudent, setViewingStudent] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteType, setDeleteType] = useState('student'); // 'student' | 'department' | 'course'

  const [deptModalOpen, setDeptModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState(null);

  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Load Initial Data
  const loadDashboardData = useCallback(async () => {
    try {
      const data = await apiClient.getDashboardMetrics();
      setMetrics(data);
      setRecentStudents(data.recentStudents || []);
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
    }
  }, []);

  const loadDepartmentsAndCourses = useCallback(async () => {
    try {
      const [depts, crs, health] = await Promise.all([
        apiClient.getDepartments(),
        apiClient.getCourses(),
        apiClient.getHealth().catch(() => ({ status: 'online' })),
      ]);
      setDepartments(depts);
      setCourses(crs);
      setHealthInfo(health);
    } catch (err) {
      console.error('Failed to load departments/courses:', err);
    }
  }, []);

  const loadStudentsDirectory = useCallback(async () => {
    try {
      setLoadingStudents(true);
      const res = await apiClient.getStudents({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });
      setStudentDirectory(res.data);
      setPagination(res.pagination);
    } catch (err) {
      addToast(err.message || 'Failed to load students', 'error');
    } finally {
      setLoadingStudents(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    loadDashboardData();
    loadDepartmentsAndCourses();
  }, [loadDashboardData, loadDepartmentsAndCourses]);

  useEffect(() => {
    loadStudentsDirectory();
  }, [loadStudentsDirectory]);

  // Handlers for Student CRUD
  const handleOpenAddStudent = () => {
    setEditingStudent(null);
    setStudentModalOpen(true);
  };

  const handleOpenEditStudent = (student) => {
    setEditingStudent(student);
    setStudentModalOpen(true);
  };

  const handleViewStudent = (student) => {
    setViewingStudent(student);
    setStudentDrawerOpen(true);
  };

  const handleSaveStudent = async (formData) => {
    if (editingStudent) {
      const res = await apiClient.updateStudent(editingStudent._id, formData);
      addToast(`Updated record for ${formData.firstName} ${formData.lastName}`);
    } else {
      const res = await apiClient.createStudent(formData);
      addToast(`Successfully enrolled ${formData.firstName} ${formData.lastName}`);
    }
    loadDashboardData();
    loadStudentsDirectory();
    loadDepartmentsAndCourses();
  };

  const handlePromptDeleteStudent = (student) => {
    setDeleteType('student');
    setDeleteTarget(student);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (target) => {
    if (deleteType === 'student') {
      await apiClient.deleteStudent(target._id);
      addToast(`Deleted record for ${target.firstName} ${target.lastName}`);
      loadDashboardData();
      loadStudentsDirectory();
      loadDepartmentsAndCourses();
    } else if (deleteType === 'department') {
      await apiClient.deleteDepartment(target._id);
      addToast(`Deleted department ${target.name}`);
      loadDepartmentsAndCourses();
    } else if (deleteType === 'course') {
      await apiClient.deleteCourse(target._id);
      addToast(`Deleted course ${target.code}`);
      loadDepartmentsAndCourses();
    }
  };

  // Handlers for Department CRUD
  const handleOpenAddDept = () => {
    setEditingDept(null);
    setDeptModalOpen(true);
  };

  const handleOpenEditDept = (dept) => {
    setEditingDept(dept);
    setDeptModalOpen(true);
  };

  const handlePromptDeleteDept = (dept) => {
    setDeleteType('department');
    setDeleteTarget(dept);
    setDeleteModalOpen(true);
  };

  const handleSaveDept = async (formData) => {
    if (editingDept) {
      await apiClient.updateDepartment(editingDept._id, formData);
      addToast(`Updated department ${formData.name}`);
    } else {
      await apiClient.createDepartment(formData);
      addToast(`Created department ${formData.name}`);
    }
    loadDepartmentsAndCourses();
    loadDashboardData();
  };

  // Handlers for Course CRUD
  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course) => {
    setEditingCourse(course);
    setCourseModalOpen(true);
  };

  const handlePromptDeleteCourse = (course) => {
    setDeleteType('course');
    setDeleteTarget(course);
    setDeleteModalOpen(true);
  };

  const handleSaveCourse = async (formData) => {
    if (editingCourse) {
      await apiClient.updateCourse(editingCourse._id, formData);
      addToast(`Updated course ${formData.code}`);
    } else {
      await apiClient.createCourse(formData);
      addToast(`Created course ${formData.code}`);
    }
    loadDepartmentsAndCourses();
    loadDashboardData();
  };

  // Demo Reset Handler
  const handleResetDemo = async () => {
    await apiClient.resetDemoData();
    addToast('CampusOS database reset to pristine showcase dataset');
    await Promise.all([
      loadDashboardData(),
      loadDepartmentsAndCourses(),
      loadStudentsDirectory(),
    ]);
  };

  // Export CSV
  const handleExportCsv = () => {
    window.open(apiClient.exportStudentsCsvUrl(), '_blank');
    addToast('Downloading campusos_students.csv...');
  };

  // Filter handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      department: 'All',
      status: 'All',
      academicLevel: 'All',
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Quick search from Dashboard hero
  const handleHeroSearchSubmit = () => {
    setActiveTab('students');
  };

  return (
    <div className="app-container">
      {/* Framer Ambient Mesh Glows */}
      <div className="ambient-glow-wrapper">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
        <div className="ambient-blob-3" />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navbar */}
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenAddStudent={handleOpenAddStudent}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          dbStatus="MongoDB Live"
        />

        {/* Page Content */}
        <main className="page-wrapper">
          {activeTab === 'dashboard' && (
            <DashboardPage
              metrics={metrics}
              recentStudents={recentStudents}
              loading={!metrics}
              onOpenAddStudent={handleOpenAddStudent}
              onNavigateToStudents={() => setActiveTab('students')}
              onViewStudent={handleViewStudent}
              onEditStudent={handleOpenEditStudent}
              onDeleteStudent={handlePromptDeleteStudent}
              searchQuery={filters.search}
              onSearchChange={(val) => handleFilterChange('search', val)}
              onSearchSubmit={handleHeroSearchSubmit}
              onExportCsv={handleExportCsv}
            />
          )}

          {activeTab === 'students' && (
            <StudentsPage
              students={studentDirectory}
              pagination={pagination}
              loading={loadingStudents}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
              onLimitChange={(limit) => setPagination((prev) => ({ ...prev, limit, page: 1 }))}
              departments={departments}
              onOpenAddStudent={handleOpenAddStudent}
              onViewStudent={handleViewStudent}
              onEditStudent={handleOpenEditStudent}
              onDeleteStudent={handlePromptDeleteStudent}
              onExportCsv={handleExportCsv}
            />
          )}

          {activeTab === 'departments' && (
            <DepartmentsPage
              departments={departments}
              courses={courses}
              onOpenAddDepartment={handleOpenAddDept}
              onEditDepartment={handleOpenEditDept}
              onDeleteDepartment={handlePromptDeleteDept}
              onOpenAddCourse={handleOpenAddCourse}
              onEditCourse={handleOpenEditCourse}
              onDeleteCourse={handlePromptDeleteCourse}
            />
          )}

          {activeTab === 'analytics' && <AnalyticsPage metrics={metrics || {}} />}

          {activeTab === 'settings' && (
            <SettingsPage onResetDemo={handleResetDemo} healthInfo={healthInfo} />
          )}
        </main>
      </div>

      {/* Student Modals & Slide-over Drawer */}
      <StudentModal
        isOpen={studentModalOpen}
        onClose={() => setStudentModalOpen(false)}
        onSubmit={handleSaveStudent}
        student={editingStudent}
        departments={departments}
      />

      <StudentDetailDrawer
        isOpen={studentDrawerOpen}
        onClose={() => setStudentDrawerOpen(false)}
        student={viewingStudent}
        onEdit={handleOpenEditStudent}
        onDelete={handlePromptDeleteStudent}
      />

      {/* Department & Course Modals */}
      <DepartmentModal
        isOpen={deptModalOpen}
        onClose={() => setDeptModalOpen(false)}
        onSubmit={handleSaveDept}
        department={editingDept}
      />

      <CourseModal
        isOpen={courseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        onSubmit={handleSaveCourse}
        course={editingCourse}
        departments={departments}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        item={deleteTarget}
        title={
          deleteType === 'student'
            ? 'Delete Student Record'
            : deleteType === 'department'
            ? 'Delete Academic Department'
            : 'Delete Course'
        }
        message={
          deleteType === 'student'
            ? 'Are you sure you want to permanently delete this student from the university database? This action cannot be reversed.'
            : deleteType === 'department'
            ? 'Are you sure you want to delete this department? All associated courses should be re-assigned.'
            : 'Are you sure you want to delete this course from the curriculum catalog?'
        }
      />

      {/* Toast Feedback Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
