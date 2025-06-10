'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@/styles/sidebarteacher.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChalkboard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function SidebarTeacher() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    if (pathname.includes('/class')) setActiveMenu('class');
    else if (pathname.includes('/Teacher')) setActiveMenu('dashboard');
  }, [pathname]);

  // SweetAlert Logout Confirmation
  const handleLogout = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!',
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to login page after confirmation
          window.location.href = '/'; // Ensure to navigate to the correct page
        }
      });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top-horizontal">
        <img src="/logo-smas.png" alt="Logo Sekolah" className="sidebar-logo" />
        <p className="sidebar-admin">Hi, Teacher</p>
      </div>

      <nav className="sidebar-nav">
        <Link
          href="/dashboard/Teacher"
          className={`sidebar-link ${activeMenu === 'dashboard' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/dashboard/Teacher/class"
          className={`sidebar-link ${activeMenu === 'class' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faChalkboard} />
          <span>Class</span>
        </Link>
      </nav>

      {/* Bottom Logout */}
      <div className="sidebar-bottom">
        <button className="sidebar-link logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
