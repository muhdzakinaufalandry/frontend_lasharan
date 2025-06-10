import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import '@/styles/sidebaradmin.css'; // pastikan path ini sesuai struktur folder kamu
import Swal from 'sweetalert2';
import {
   faHome,
  faUsers,
  faUserShield,
  faBook,
  faChalkboard,
  faRightFromBracket,
  faChevronUp,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Sidebar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeRole, setActiveRole] = useState('');


    useEffect(() => {
    if (pathname.includes('/datauser')) setActiveMenu('datauser');
    else if (pathname.includes('/users')) setActiveMenu('role');
    else if (pathname.includes('/class')) setActiveMenu('class');
    else setActiveMenu('dashboard');
  }, [pathname]);
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        <p className="sidebar-admin">Hi, Admin</p>
      </div>

      <nav className="sidebar-nav">
        <Link
          href="/dashboard/admin"
          className={`sidebar-link ${activeMenu === 'dashboard' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faHome} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/dashboard/admin/datauser"
          className={`sidebar-link ${activeMenu === 'datauser' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faUsers} />
          <span>Data User</span>
        </Link>

       <div className="dropdown-section">
        <button
          className={`sidebar-link dropdown-toggle ${activeMenu === 'role' ? 'active' : ''}`}
          onClick={() => {
            toggleDropdown();
            setActiveMenu('role');
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FontAwesomeIcon icon={faUserShield} />
            <span>Role</span>
            <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} className="dropdown-arrow" />
          </div>
        </button>

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
              Student
            </Link>
          </div>
          )}
        </div>

        <Link
          href="/dashboard/admin/class"
          className={`sidebar-link ${activeMenu === 'class' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faChalkboard} />
          <span>Class</span>
        </Link>

        <Link
          href="/dashboard/admin/subjects"
          className={`sidebar-link ${activeMenu === 'subjects' ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faBook} />
          <span>Subjects</span>
        </Link>
      </nav>

      <div className="sidebar-bottom">
        <button onClick={handleLogout} className="sidebar-link logout">
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
