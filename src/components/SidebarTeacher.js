'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home, Presentation, LogOut } from 'lucide-react';
import Swal from 'sweetalert2';
import '@/styles/sidebarteacher.css';

export default function SidebarTeacher() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    if (pathname.includes('/class')) setActiveMenu('class');
    else if (pathname.includes('/Teacher')) setActiveMenu('dashboard');
  }, [pathname]);

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
        window.location.href = '/';
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
          <Home size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/dashboard/Teacher/class"
          className={`sidebar-link ${activeMenu === 'class' ? 'active' : ''}`}
        >
          <Presentation size={20} />
          <span>Class</span>
        </Link>
      </nav>

      <div className="sidebar-bottom">
        <button className="sidebar-link logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
