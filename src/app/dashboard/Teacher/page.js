'use client';
import SidebarTeacher from '@/components/SidebarTeacher';
import '@/styles/teacherDashboard.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

export default function TeacherDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('id_role');
    if (role !== '2') { // misalnya '2' = guru
      alert('Akses ditolak');
      router.push('/unauthorized'); // atau redirect ke halaman lain
    }
  }, []);
  return (
    <div className="teacher-dashboard">
      <main className="dashboard-content-wrapper">
        <div className="dashboard-header">
          <h2>Welcome, Admin Higher Secondary School Team!</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed nulla suscipit,
            ultricies nunc sed, pharetra ante. Quisque gravida facilisis dui.
          </p>
        </div>

        <div className="summary-container">
          <div className="summary-grid">
            {/* Total Kelas */}
            <div className="summary-card orange">
              <div className="summary-left">
                <div className="summary-count">5</div>
                <div className="summary-label">Classes</div>
              </div>
              <div className="summary-icon">
                <FontAwesomeIcon icon={faUsers} className="summary-icon" />
              </div>
            </div>

            {/* Total Siswa */}
            <div className="summary-card blue">
              <div className="summary-left">
                <div className="summary-count">120</div>
                <div className="summary-label">Students</div>
              </div>
              <div className="summary-icon">
                <FontAwesomeIcon icon={faUsers} className="summary-icon" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}