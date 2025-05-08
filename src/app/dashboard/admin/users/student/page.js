'use client';
import React, { useEffect, useState } from 'react';
import '@/styles/student.css';
import Link from 'next/link';

export default function StudentPage() {
  const [siswas, setSiswas] = useState([]);
  const [kelasList, setKelasList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siswaRes, kelasRes] = await Promise.all([
          fetch('http://localhost:8080/siswa'),
          fetch('http://localhost:8080/kelas')
        ]);

        const [siswaData, kelasData] = await Promise.all([
          siswaRes.json(),
          kelasRes.json()
        ]);

        setSiswas(siswaData);
        setKelasList(kelasData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fungsi bantu: ambil nama kelas dari id_kelas
  const getNamaKelas = (id_kelas) => {
    const kelas = kelasList.find(k => k.id_kelas === id_kelas);
    return kelas ? kelas.nama_kelas : 'Kelas tidak ditemukan';
  };

  return (
    <div className="student-page">
      <div className="student-header">
        <div className="header-text">
          <h1>Student</h1>
          <p>All Student List</p>
        </div>
        <div className="header-actions">
          <input type="text" placeholder="🔍 Search by Name or roll." className="search-input" />
          <select className="filter-dropdown">
            <option>All Classes</option>
          </select>
          <Link href="/dashboard/admin/users/student/add" className="add-new-btn">
            + Add New
          </Link>
        </div>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading && siswas.length > 0 ? (
            siswas.map((student, index) => (
              <tr key={student.id_siswa}>
                <td>{index + 1}</td>
                <td>{student.nama_siswa}</td>
                <td>{getNamaKelas(student.id_kelas)}</td>
                <td>{student.alamat}</td>
                <td>{student.tanggal_lahir}</td>
                <td className="action-icons">
                  <span title="Edit">✏️</span>
                  <span title="Delete">🗑️</span>
                  <span title="More">⋯</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">{loading ? 'Loading...' : 'No students found.'}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
