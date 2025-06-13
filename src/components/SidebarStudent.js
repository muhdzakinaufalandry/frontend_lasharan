'use client';

import Link from 'next/link';
import Swal from 'sweetalert2';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Home, BookOpen, History, LogOut } from 'lucide-react';
import '@/styles/sidebarstudent.css';

export default function SidebarStudent() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    if (pathname.includes('/subject')) setActiveMenu('subjects');
    else if (pathname.includes('/history')) setActiveMenu('history');
    else if (pathname.includes('/Student')) setActiveMenu('dashboard');
    else setActiveMenu('dashboard');
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
        <p className="sidebar-admin">Hi, Student</p>
      </div>

      <nav className="sidebar-nav">
        <Link
          href="/dashboard/Student"
          className={`sidebar-link ${activeMenu === 'dashboard' ? 'active' : ''}`}
        >
          <Home size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/dashboard/Student/subject"
          className={`sidebar-link ${activeMenu === 'subjects' ? 'active' : ''}`}
        >
          <BookOpen size={20} />
          <span>Subjects</span>
        </Link>

        <Link
          href="/dashboard/Student/history"
          className={`sidebar-link ${activeMenu === 'history' ? 'active' : ''}`}
        >
          <History size={20} />
          <span>History</span>
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
