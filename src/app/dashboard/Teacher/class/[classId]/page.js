'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import '@/styles/classDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBook } from '@fortawesome/free-solid-svg-icons';


export default function ClassDetailPage() {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelass/${classId}`);
        if (!res.ok) throw new Error('Gagal mengambil data kelas');

        const data = await res.json();
        setClassData(data);
      } catch (error) {
        console.error('Gagal fetch data kelas:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [classId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!classData) return <div>No class data available</div>;

  return (
    <div className="class-detail-page">
      <div className="class-header">
        <h2>{classData.nama_kelas}</h2>
        <span>{classData.tahun_ajaran}</span>
      </div>

      <div className="class-stats">
        <Link href={`/dashboard/Teacher/class/${classId}/participants`} className="stat-card orange">
          <div className="stat-content">
            <div className="stat-text">
              <h3>{classData.jumlah_siswa || 0}</h3>
              <p>Participants</p>
            </div>
            <FontAwesomeIcon icon={faUsers} className="stat-icon" />
          </div>
        </Link>

        <div className="stat-card blue">
          <div className="stat-content">
            <div className="stat-text">
              <h3>{classData.mata_pelajaran?.length || '0'}</h3>
              <p>Subjects</p>
            </div>
            <FontAwesomeIcon icon={faBook} className="stat-icon" />
          </div>
        </div>
      </div>

      <div className="class-main-grid">
        <div className="subjects-box">
          <h3>Subjects</h3>
          <div className="subject-list">
            {classData.mata_pelajaran?.map((subj, i) => (
              <Link
                href={`/dashboard/Teacher/subjects/${subj.id_mapel}`}
                className="subject-card"
                key={i}>
                {subj.nama_mata_pelajaran}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
