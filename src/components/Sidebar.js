'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import '@/styles/sidebaradmin.css';
import Swal from 'sweetalert2';

import {
  Home,
  Users,
  Shield,
  BookOpen,
  Presentation,
  LogOut,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('');

  useEffect(() => {
    if (pathname.includes('/datauser')) setActiveMenu('datauser');
    else if (pathname.includes('/users')) setActiveMenu('role');
    else if (pathname.includes('/class')) setActiveMenu('class');
    else if (pathname.includes('/subjects')) setActiveMenu('subjects');
    else setActiveMenu('dashboard');
  }, [pathname]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
        <p className="sidebar-admin">Hi, Admin</p>
      </div>

      <nav className="sidebar-nav">
        <Link
          href="/dashboard/admin"
          className={`sidebar-link ${activeMenu === 'dashboard' ? 'active' : ''}`}
        >
          <Home size={18} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/dashboard/admin/datauser"
          className={`sidebar-link ${activeMenu === 'datauser' ? 'active' : ''}`}
        >
          <Users size={18} />
          <span>Data Pengguna</span>
        </Link>

        <div
        className={`sidebar-link ${activeMenu === 'role' ? 'active' : ''}`}
        onClick={() => {
          toggleDropdown();
          setActiveMenu('role');
        }}
        style={{ cursor: 'pointer' }}
      >
        <Shield size={18} />
        <span style={{ flex: 1 }}>Role</span>
        {isDropdownOpen ? (
          <ChevronUp size={16} style={{ marginLeft: 'auto' }} />
        ) : (
          <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
        )}

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link
                href="/dashboard/admin/users/teacher"
                className={`dropdown-item ${activeRole === 'teacher' ? 'active-role-item' : ''}`}
                onClick={() => setActiveRole('teacher')}
              >
                Teacher
              </Link>
              <Link
                href="/dashboard/admin/users/student"
                className={`dropdown-item ${activeRole === 'student' ? 'active-role-item' : ''}`}
                onClick={() => setActiveRole('student')}
              >
                Siswa
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/dashboard/admin/class"
          className={`sidebar-link ${activeMenu === 'class' ? 'active' : ''}`}
        >
          <Presentation size={18} />
          <span>Kelas</span>
        </Link>

        <Link
          href="/dashboard/admin/subjects"
          className={`sidebar-link ${activeMenu === 'subjects' ? 'active' : ''}`}
        >
          <BookOpen size={18} />
          <span>Subjects</span>
        </Link>
      </nav>

      <div className="sidebar-bottom">
        <button onClick={handleLogout} className="sidebar-link logout">
          <LogOut size={18} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );
}