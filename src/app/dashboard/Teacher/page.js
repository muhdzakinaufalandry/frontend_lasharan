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
          <h2>Selamat Datang, Guru SMAS Lasharan Jaya Gowa!</h2>
          <p>
           Saya menyampaikan ucapan terima kasih kepada semua pihak yang telah membantu tersedianya website sekolah ini. Kritik dan saran yang konstruktif sangat kami harapkan demi perbaikan dan peningkatan kualitas serta kemanfaatan yang lebih luas.
          </p>
        </div>

        <div className="summary-container">
          <div className="summary-grid">
            {/* Total Kelas */}
            <div className="summary-card orange">
              <div className="summary-left">
                <div className="summary-count">5</div>
                <div className="summary-label">Kelas</div>
              </div>
              <div className="summary-icon">
                <FontAwesomeIcon icon={faUsers} className="summary-icon" />
              </div>
            </div>

            {/* Total Siswa */}
            <div className="summary-card blue">
              <div className="summary-left">
                <div className="summary-count">120</div>
                <div className="summary-label">Siswa</div>
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