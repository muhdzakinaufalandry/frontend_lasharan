'use client';
import SidebarStudent from '@/components/SidebarStudent'; 
import '@/styles/studentDashboard.css';

export default function StudentLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <SidebarStudent />
      <div className="dashboard-content-wrapper">
        {children}
      </div>
    </div>
  );
}