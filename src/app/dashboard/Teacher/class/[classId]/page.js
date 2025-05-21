'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import '@/styles/classDetail.css';

export default function ClassDetailPage() {
  const { classId } = useParams();  // Ambil ID kelas dari URL
  const [classData, setClassData] = useState(null);  // State untuk data kelas
  const [loading, setLoading] = useState(true);  // State loading
  const [error, setError] = useState(null);  // State error jika gagal fetch data

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        // Fetch data kelas berdasarkan classId yang diterima
        const res = await fetch(`http://localhost:8080/kelass/${classId}`);  // Ganti dengan endpoint yang sesuai
        if (!res.ok) {
          throw new Error('Gagal mengambil data kelas');
        }

        const data = await res.json();
        setClassData(data);  // Menyimpan data kelas yang diterima
      } catch (error) {
        console.error('Gagal fetch data kelas:', error);
        setError(error.message);  // Menyimpan pesan error
      } finally {
        setLoading(false);  // Set loading false setelah data selesai diambil
      }
    };

    fetchClassDetails();
  }, [classId]);  // Menggunakan classId sebagai dependensi agar data kelas terupdate

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!classData) {
    return <div>No class data available</div>;
  }

  return (
    <div className="class-detail-page">
      <div className="class-header">
        <h2>{classData.nama_kelas}</h2>
        <span>{classData.tahun_ajaran}</span>
      </div>

      <div className="class-stats">
        {/* Menampilkan jumlah siswa */}
        <Link href={`/dashboard/Teacher/class/${classId}/participants`} className="stat-card orange">
          <h3>{classData.jumlah_siswa || 0}</h3>  {/* Menampilkan jumlah siswa dari data kelas */}
          <p>Participants</p>
        </Link>

        <div className="stat-card blue">
          <h3>{classData.mata_pelajaran?.length || '0'}</h3>  {/* Menampilkan jumlah mata pelajaran */}
          <p>Subjects</p>
        </div>

        <div className="online-users">
          <h4>Online Users</h4>
          <ul>
            {/* Daftar pengguna online jika tersedia */}
            <li>👤 Tessa Brandon</li>
            <li>👤 Roberto Alonzo</li>
            <li>👤 George Harrison</li>
          </ul>
        </div>
      </div>

      <div className="class-main-grid">
        <div className="subjects-box">
          <h3>Subjects</h3>
          <div className="subject-list">
            {/* Menampilkan mata pelajaran dari data */}
            {classData.mata_pelajaran?.map((subj, i) => (
               <Link
            href={`/dashboard/Teacher/subjects/subjectdetails`}
            className="subject-card" key={i}>
                {subj.nama_mata_pelajaran}
               </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
