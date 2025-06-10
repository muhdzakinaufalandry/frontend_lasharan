'use client';

import Link from 'next/link';
import Swal from 'sweetalert2';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faHistory, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Importing FA icons
import '@/styles/sidebarstudent.css'; 

export default function SidebarStudent() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    if (pathname.includes('/dashboard/Student/subject')) {
      setActiveMenu('subjects');
    } else if (pathname.includes('/dashboard/Student/history')) {
      setActiveMenu('history');
    } else if (pathname.includes('/dashboard/Student')) {
      setActiveMenu('dashboard');
    }
  }, [pathname]);

  // Handle Logout with SweetAlert confirmation
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
        <p className="sidebar-admin">Hi, Student</p>
      </div>

      <nav className="sidebar-nav">
        <Link href="/dashboard/Student" 
          className={`sidebar-link ${activeMenu === 'Student' ? 'active' : ''}`} >
          <FontAwesomeIcon icon={faHome} />
          Dashboard
        </Link>

        <Link href="/dashboard/Student/subject"  
          className={`sidebar-link ${activeMenu === 'subjects' ? 'active' : ''}`} >
          <FontAwesomeIcon icon={faBook} />
          Subjects
        </Link>

        <Link href="/dashboard/Student/history" 
          className={`sidebar-link ${activeMenu === 'history' ? 'active' : ''}`} >
          <FontAwesomeIcon icon={faHistory} />
          History
        </Link>
      </nav>

      {/* Bottom Logout */}
      <div className="sidebar-bottom">
        <button className="sidebar-link logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </div>
    </div>
  );
}
