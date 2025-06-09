'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import '@/styles/teacherclass.css';

export default function ClassPage() {
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(true);  // Untuk menangani state loading

  useEffect(() => {
    const fetchClasses = async () => {
      const idUser = localStorage.getItem('id_user');
      if (!idUser) {
        console.error("ID User tidak ditemukan di localStorage");
        return;
      }

      try {
        // Step 1: Ambil id_guru dari id_user
        const resGuru = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/guru/user/${idUser}`);
        const guruData = await resGuru.json();
        console.log("Guru Data:", guruData);  // Cek data guru yang diterima

        if (!guruData.id_guru) {
          console.error("id_guru tidak ditemukan");
          return;
        }

        const idGuru = guruData.id_guru;

        // Step 2: Ambil kelas yang diajar oleh guru berdasarkan id_guru
        const resKelas = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas/guru/${idGuru}`);
        const kelas = await resKelas.json();
        console.log("Kelas Data:", kelas);  // Cek data kelas yang diterima

        setClassData(kelas);  // Menyimpan data kelas ke state
      } catch (error) {
        console.error('Gagal fetch data:', error);
      } finally {
        setLoading(false);  // Set loading false setelah data selesai diambil
      }
    };

    fetchClasses();
  }, []);

  // Fungsi untuk menentukan warna berdasarkan jumlah siswa
  function getColor(count) {
    if (count >= 100) return 'red';
    if (count >= 50) return 'orange';
    return 'green';
  }

  // Menampilkan UI saat data sedang dimuat
  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika tidak ada kelas
  if (classData.length === 0) {
    return <div>No classes found</div>;
  }

  return (
    <div className="class-page">
      <h2>Classes You Teach</h2>
      <div className="legend">
        <span className="dot green" /> Less
        <span className="dot orange" /> Much
        <span className="dot red" /> Full
      </div>
      <div className="class-grid">
        {classData.map((cls) => (
          <Link href={`/dashboard/Teacher/class/${cls.id_kelas}`} key={cls.id_kelas} 
          className="no-link-style"
>
            <div className={`class-box ${getColor(cls.jumlah_siswa || 0)}`}>
              <div className="box-header">
                <span className="class-title">{cls.nama_kelas}</span>
                <span className="class-year">{cls.tahun_ajaran}</span>
              </div>
              <div className="class-line" />  
              <div className="class-count">{cls.jumlah_siswa || 0}</div>
              <div className="class-footer">Participants</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
