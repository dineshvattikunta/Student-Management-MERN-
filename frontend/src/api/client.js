const BASE_URL = '/api';

export const apiClient = {
  // Analytics & Dashboard
  async getDashboardMetrics() {
    const res = await fetch(`${BASE_URL}/analytics/dashboard`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch dashboard metrics');
    return data.data;
  },

  // Students
  async getStudents(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });

    const res = await fetch(`${BASE_URL}/students?${query.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch students');
    return data;
  },

  async getStudentById(id) {
    const res = await fetch(`${BASE_URL}/students/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch student details');
    return data.data;
  },

  async createStudent(studentData) {
    const res = await fetch(`${BASE_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create student');
    return data;
  },

  async updateStudent(id, studentData) {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update student');
    return data;
  },

  async deleteStudent(id) {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete student');
    return data;
  },

  exportStudentsCsvUrl() {
    return `${BASE_URL}/students/export/csv`;
  },

  // Departments
  async getDepartments() {
    const res = await fetch(`${BASE_URL}/departments`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch departments');
    return data.data;
  },

  async createDepartment(deptData) {
    const res = await fetch(`${BASE_URL}/departments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deptData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create department');
    return data;
  },

  async updateDepartment(id, deptData) {
    const res = await fetch(`${BASE_URL}/departments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deptData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update department');
    return data;
  },

  async deleteDepartment(id) {
    const res = await fetch(`${BASE_URL}/departments/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete department');
    return data;
  },

  // Courses
  async getCourses(params = {}) {
    const query = new URLSearchParams(params);
    const res = await fetch(`${BASE_URL}/courses?${query.toString()}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch courses');
    return data.data;
  },

  async createCourse(courseData) {
    const res = await fetch(`${BASE_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create course');
    return data;
  },

  async updateCourse(id, courseData) {
    const res = await fetch(`${BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update course');
    return data;
  },

  async deleteCourse(id) {
    const res = await fetch(`${BASE_URL}/courses/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete course');
    return data;
  },

  // Reset Demo Data
  async resetDemoData() {
    const res = await fetch(`${BASE_URL}/system/reset-demo`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to reset demo data');
    return data;
  },

  // System Health
  async getHealth() {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    if (!res.ok) throw new Error('Health check failed');
    return data;
  },
};
