'use client';
import Sidebar from '@/components/Sidebar';
import '@/styles/dashboard.css';

export default function AdminLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
