'use client';
import Link from 'next/link';
import '@/styles/sidebarteacher.css'; 

export default function SidebarTeacher() {
  return (
    <div className="sidebar">
      <div className="sidebar-top-horizontal">
        <img src="/logo-smas.png" alt="Logo Sekolah" className="sidebar-logo" />
        <p className="sidebar-admin">Hi, Teacher</p>
      </div>

      <nav className="sidebar-nav">
        <Link href="/dashboard/Teacher" className="sidebar-link">
         <span role="img" aria-label="dashboard">🏠</span>
          <i className="icon-home" /> Dashboard
        </Link>

        <Link href="/dashboard/Teacher/class" className="sidebar-link">
        <span role="img" aria-label="class">🏫</span>
          <i className="icon-class" /> Class
        </Link>

        {/* <Link href="/dashboard/Teacher/subjects" className="sidebar-link">
        <span role="img" aria-label="subject">📚</span>
          <i className="icon-book" /> Subjects
        </Link>

        <Link href="/dashboard/Teacher/history" className="sidebar-link">
        <span role="img" aria-label="history">⏱️</span>
          <i className="icon-clock" /> History
        </Link> */}
      </nav>

      {/* Bottom Logout */}
      <div className="sidebar-bottom">
        {/* When the user clicks this, redirect to login page */}
        <Link href="/login" className="sidebar-link logout">
          <span role="img" aria-label="logout">🚪</span>
          Logout
        </Link>
      </div>
    </div>
  );
}