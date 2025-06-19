'use client';

import SidebarTeacher from '@/components/SidebarTeacher';
import '@/styles/teacherDashboard.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBook } from '@fortawesome/free-solid-svg-icons';

export default function TeacherDashboardPage() {
  const router = useRouter();
  const [classCount, setClassCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('id_role');
    if (role !== '2') {
      alert('Akses ditolak');
      router.push('/unauthorized');
      return;
    }

    const fetchDashboardData = async () => {
      const idUser = localStorage.getItem('id_user');
      if (!idUser) {
        console.error('ID User tidak ditemukan di localStorage');
        return;
      }

      try {
        const resGuru = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru/user/${idUser}`);
        const guruData = await resGuru.json();

        if (!guruData.id_guru) {
          console.error("id_guru tidak ditemukan");
          return;
        }

        const idGuru = guruData.id_guru;

        const resKelas = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas/guru/${idGuru}`);
        const kelasData = await resKelas.json();
        setClassCount(kelasData.length || 0);

        const totalSiswa = kelasData.reduce((sum, k) => sum + (k.jumlah_siswa || 0), 0);
        setStudentCount(totalSiswa);
      } catch (error) {
        console.error('Gagal fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

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
            <div className="summary-card orange">
              <div className="summary-left">
                <div className="summary-count">{loading ? '...' : classCount}</div>
                <div className="summary-label">Kelas</div>
              </div>
              <div className="summary-icon">
                <FontAwesomeIcon icon={faUsers} className="summary-icon" />
              </div>
            </div>

            <div className="summary-card blue">
              <div className="summary-left">
                <div className="summary-count">{loading ? '...' : studentCount}</div>
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
