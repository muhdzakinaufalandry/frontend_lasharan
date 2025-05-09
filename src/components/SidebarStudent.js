'use client';
import Link from 'next/link';
import '@/styles/sidebarstudent.css'; 

export default function SidebarStudent() {
  return (
    <div className="sidebar">
      <div className="sidebar-top-horizontal">
        <img src="/logo-smas.png" alt="Logo Sekolah" className="sidebar-logo" />
        <p className="sidebar-admin">Hi, Student</p>
      </div>

      <nav className="sidebar-nav">
        <Link href="/dashboard/Student" className="sidebar-link">
         <span role="img" aria-label="dashboard">🏠</span>
          <i className="icon-home" /> Dashboard
        </Link>


        <Link href="/dashboard/Student/subject" className="sidebar-link">
        <span role="img" aria-label="subject">📚</span>
          <i className="icon-book" /> Subjects
        </Link>

        <Link href="/dashboard/Student/history" className="sidebar-link">
        <span role="img" aria-label="history">⏱️</span>
          <i className="icon-clock" /> History
        </Link>
      </nav>

      <div className="sidebar-bottom">
        <Link href="/logout" className="sidebar-link logout">
        <span role="img" aria-label="logout">🚪</span>
          <i className="icon-logout" /> Logout
        </Link>
      </div>
    </div>
  );
}