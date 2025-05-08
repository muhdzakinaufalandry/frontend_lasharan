import Link from 'next/link';
import { useState } from 'react';
import '@/styles/sidebaradmin.css'; // pastikan path ini sesuai struktur folder kamu

export default function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="sidebar">
      {/* Top Section */}
      <div className="sidebar-top-horizontal">
        <img src="/logo-smas.png" alt="Logo Sekolah" className="sidebar-logo" />
        <p className="sidebar-admin">Hi, Admin</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <Link href="/dashboard/admin" className="sidebar-link">
          <span role="img" aria-label="dashboard">🏠</span>
          Dashboard
        </Link>

        <Link href="/dashboard/admin/datauser" className="sidebar-link">
          <span role="img" aria-label="class">👥</span>
          Data User
        </Link>

        <div className="dropdown-section">
          <button className="sidebar-link dropdown-toggle" onClick={toggleDropdown}>
            <span role="img" aria-label="user">🌐</span>
            Role {isDropdownOpen ? '▲' : '▼'}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link href="/dashboard/admin/users/teacher" className="dropdown-item">Teacher</Link>
              <Link href="/dashboard/admin/users/student" className="dropdown-item">Student</Link>
            </div>
          )}
        </div>

        <Link href="/dashboard/admin/class" className="sidebar-link">
          <span role="img" aria-label="class">📚</span>
          Class
        </Link>

        <Link href="/dashboard/admin/subjects" className="sidebar-link">
          <span role="img" aria-label="subjects">📖</span>
          Subjects
        </Link>
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
