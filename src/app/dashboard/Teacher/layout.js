'use client';
import SidebarTeacher from '@/components/SidebarTeacher'; 
import '@/styles/teacherDashboard.css';

export default function TeacherLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <SidebarTeacher />
      <div className="dashboard-content-wrapper">
        {children}
      </div>
    </div>
  );
}