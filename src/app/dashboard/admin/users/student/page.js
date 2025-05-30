'use client';
import React, { useEffect, useState } from 'react';
import '@/styles/student.css';
import Link from 'next/link';

export default function StudentPage() {
  const [siswas, setSiswas] = useState([]);
  const [editSiswa, setEditSiswa] = useState(null);
  const [kelasList, setKelasList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siswaRes, kelasRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa`),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/kelas`)
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

  const handleDeleteSiswa = async (id) => {
    if (!window.confirm("Yakin ingin menghapus siswa ini?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSiswas(siswas.filter(s => s.id_siswa !== id));
        alert("Siswa berhasil dihapus.");
      } else {
        alert("Gagal menghapus siswa.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menghapus siswa.');
    }
  };

  const handleEditSiswa = (siswa) => {
    setEditSiswa(siswa);
  };

  const handleUpdateGuru = async () => {
    if (!editSiswa) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/siswa/${editSiswa.id_siswa}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editSiswa),
      });

      if (response.ok) {
        setSiswas(siswas.map(s => s.id_siswa === editSiswa.id_siswa ? editSiswa : s));
        alert("Siswa berhasil diperbarui.");
        setEditSiswa(null); // Reset after update
      } else {
        alert("Gagal memperbarui siswa.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Terjadi kesalahan saat memperbarui siswa.");
    }
  };

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
                  <span title="Edit" onClick={() => handleEditSiswa(student)}>✏️</span>
                  <span title="Delete" onClick={() => handleDeleteSiswa(student.id_siswa)}>🗑️</span>
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

      {editSiswa && (
        <div className="edit-siswa-modal">
          <h3>Edit Student</h3>
          <input
            type="text"
            placeholder="Student Name"
            value={editSiswa.nama_siswa}
            onChange={(e) => setEditSiswa({ ...editSiswa, nama_siswa: e.target.value })}
          />
          <select
            value={editSiswa.id_kelas}
            onChange={(e) => setEditSiswa({ ...editSiswa, id_kelas: parseInt(e.target.value) })}
          >
            <option value="">Select Class</option>
            {kelasList.map((kelas) => (
              <option key={kelas.id_kelas} value={kelas.id_kelas}>
                {kelas.nama_kelas}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Address"
            value={editSiswa.alamat}
            onChange={(e) => setEditSiswa({ ...editSiswa, alamat: e.target.value })}
          />
          <input
            type="date"
            value={editSiswa.tanggal_lahir}
            onChange={(e) => setEditSiswa({ ...editSiswa, tanggal_lahir: e.target.value })}
          />
          <button onClick={handleUpdateGuru}>Save</button>
          <button onClick={() => setEditSiswa(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
