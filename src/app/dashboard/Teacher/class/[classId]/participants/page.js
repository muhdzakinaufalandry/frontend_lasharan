'use client';
import '@/styles/participants.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ParticipantsPage() {
  const { classId } = useParams(); // Ambil classId dari URL
  const [students, setStudents] = useState([]); // State untuk menyimpan data siswa
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State error

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Fetch data siswa berdasarkan classId
        const res = await fetch(`http://localhost:8080/siswaa/${classId}`); // Endpoint untuk mengambil siswa di kelas tertentu
        if (!res.ok) {
          throw new Error('Gagal mengambil data siswa');
        }

        const data = await res.json();
        setStudents(data); // Menyimpan data siswa yang diterima
      } catch (error) {
        console.error('Gagal fetch data siswa:', error);
        setError(error.message); // Menyimpan pesan error
      } finally {
        setLoading(false); // Set loading false setelah data selesai diambil
      }
    };

    fetchStudents();
  }, [classId]); // Menggunakan classId sebagai dependensi

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!students.length) {
    return <div>No students found in this class</div>;
  }

  return (
    <div className="participants-page">
      <h2>Participants</h2>

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>NISN</th>
              <th>Class</th>
              <th>User Email</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Points</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((stu, idx) => (
              <tr key={stu.id_siswa}>
                <td>{String(idx + 1).padStart(2, '0')}</td>
                <td className="avatar-cell clickable-cell">
                  <span className="avatar">👤</span>
                  {stu.nama_siswa || 'N/A'}
                </td>
                {/* NISN */}
                <td>{stu.nisn ? stu.nisn : 'N/A'}</td>
                {/* Kelas */}
                <td>{stu.id_kelas}</td>
                {/* User Email */}
                <td>{stu.email || 'N/A'}</td>
                {/* Tanggal Lahir */}
                <td>{stu.tanggal_lahir || 'N/A'}</td>
                {/* Alamat */}
                <td>{stu.alamat || 'N/A'}</td>
                {/* Kontak */}
                <td>{stu.contact || 'N/A'}</td>
                {/* Points */}
                <td>{stu.points || '0'}</td>
                <td className="action-cell">
                  <button title="Edit">✏️</button>
                  <button title="Delete">🗑️</button>
                  <button title="More">⋯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Navigasi halaman (dummy) */}
      <div className="pagination">
        <button disabled>Prev</button>
        <span>Page 1 / 2</span>
        <button>Next</button>
      </div>
    </div>
  );
}
